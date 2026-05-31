import type { AuditCadFileOutput } from "@/ai/flows/audit-cad-file"

type DxfPair = { code: number, value: string }
type DxfEntity = { type: string, values: Map<number, string[]> }

function decodeDataUri(dataUri: string) {
  const payload = dataUri.split(';base64,')[1]
  if (!payload) throw new Error('Invalid DXF payload.')
  return Buffer.from(payload, 'base64').toString('utf8')
}

function parsePairs(text: string): DxfPair[] {
  const lines = text.replace(/\r/g, '').split('\n')
  const pairs: DxfPair[] = []

  for (let index = 0; index + 1 < lines.length; index += 2) {
    const code = Number.parseInt(lines[index].trim(), 10)
    if (Number.isNaN(code)) continue
    pairs.push({ code, value: lines[index + 1].trim() })
  }

  return pairs
}

function parseEntities(pairs: DxfPair[]) {
  const entities: DxfEntity[] = []
  let inEntitiesSection = false
  let current: DxfEntity | null = null

  for (let index = 0; index < pairs.length; index++) {
    const pair = pairs[index]
    const next = pairs[index + 1]

    if (pair.code === 0 && pair.value === 'SECTION' && next?.code === 2) {
      inEntitiesSection = next.value === 'ENTITIES'
      current = null
      index += 1
      continue
    }

    if (pair.code === 0 && pair.value === 'ENDSEC') {
      inEntitiesSection = false
      current = null
      continue
    }

    if (!inEntitiesSection) continue

    if (pair.code === 0) {
      current = { type: pair.value, values: new Map() }
      entities.push(current)
      continue
    }

    if (!current) continue
    const existing = current.values.get(pair.code) ?? []
    existing.push(pair.value)
    current.values.set(pair.code, existing)
  }

  return entities
}

function first(entity: DxfEntity, code: number) {
  return entity.values.get(code)?.[0] ?? ''
}

function numberValue(entity: DxfEntity, code: number) {
  const parsed = Number.parseFloat(first(entity, code))
  return Number.isFinite(parsed) ? parsed : 0
}

function rounded(value: number) {
  return Math.round(value * 1000) / 1000
}

function entitySignature(entity: DxfEntity) {
  const layer = first(entity, 8) || '0'
  const coordinates = [10, 20, 30, 11, 21, 31, 40]
    .map(code => rounded(numberValue(entity, code)))
    .join('|')
  return `${entity.type}|${layer}|${coordinates}|${first(entity, 1)}`
}

export function auditAsciiDxf(fileDataUri: string): AuditCadFileOutput {
  const entities = parseEntities(parsePairs(decodeDataUri(fileDataUri)))
  const issues: AuditCadFileOutput['issues'] = []

  if (entities.length === 0) {
    issues.push({
      category: 'General',
      severity: 'Critical',
      description: 'No model-space entities were detected in the ASCII DXF ENTITIES section.',
      suggestedRemediation: 'Verify that the uploaded file is an ASCII DXF containing an ENTITIES section.'
    })
    return { issues }
  }

  const layerZeroCount = entities.filter(entity => (first(entity, 8) || '0') === '0').length
  if (layerZeroCount > 0) {
    issues.push({
      category: 'Layer',
      severity: layerZeroCount > 20 ? 'High' : 'Medium',
      description: `${layerZeroCount} drawing entities are assigned to Layer 0.`,
      suggestedRemediation: 'Review Layer 0 usage and move production geometry to discipline-specific layers where required.'
    })
  }

  const zeroLengthLines = entities.filter(entity => {
    if (entity.type !== 'LINE') return false
    const dx = numberValue(entity, 11) - numberValue(entity, 10)
    const dy = numberValue(entity, 21) - numberValue(entity, 20)
    const dz = numberValue(entity, 31) - numberValue(entity, 30)
    return Math.sqrt((dx * dx) + (dy * dy) + (dz * dz)) < 0.000001
  }).length

  if (zeroLengthLines > 0) {
    issues.push({
      category: 'General',
      severity: 'Medium',
      description: `${zeroLengthLines} zero-length LINE entities were detected.`,
      suggestedRemediation: 'Remove zero-length geometry before plotting or downstream coordination.'
    })
  }

  const emptyTextCount = entities.filter(entity => ['TEXT', 'MTEXT'].includes(entity.type) && first(entity, 1).trim().length === 0).length
  if (emptyTextCount > 0) {
    issues.push({
      category: 'Text',
      severity: 'Low',
      description: `${emptyTextCount} empty text entities were detected.`,
      suggestedRemediation: 'Delete empty text entities or populate the required annotations.'
    })
  }

  const signatures = new Map<string, number>()
  for (const entity of entities) {
    const signature = entitySignature(entity)
    signatures.set(signature, (signatures.get(signature) ?? 0) + 1)
  }

  const duplicateCount = Array.from(signatures.values()).reduce((total, count) => total + Math.max(0, count - 1), 0)
  if (duplicateCount > 0) {
    issues.push({
      category: 'General',
      severity: duplicateCount > 50 ? 'High' : 'Medium',
      description: `${duplicateCount} potentially duplicated drawing entities were detected.`,
      suggestedRemediation: 'Review coincident entities and remove duplicates after visual verification.'
    })
  }

  const farFromOriginCount = entities.filter(entity => {
    const x = numberValue(entity, 10)
    const y = numberValue(entity, 20)
    return Math.abs(x) > 1000000 || Math.abs(y) > 1000000
  }).length

  if (farFromOriginCount > 0) {
    issues.push({
      category: 'Plotting',
      severity: 'Medium',
      description: `${farFromOriginCount} entities are positioned more than 1,000,000 drawing units from the origin.`,
      suggestedRemediation: 'Review coordinate strategy and remove accidental remote geometry before plotting.'
    })
  }

  if (issues.length === 0) {
    issues.push({
      category: 'General',
      severity: 'Informational',
      description: `Deterministic DXF review completed for ${entities.length} entities without detecting configured rule violations.`,
      suggestedRemediation: 'Continue with discipline-specific manual review before formal issue.'
    })
  }

  return { issues }
}
