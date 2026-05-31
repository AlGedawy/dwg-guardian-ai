import type { AuditCadFileOutput } from "@/ai/flows/audit-cad-file"
import { listAuditSessions, persistAuditSession, readAuditSession, type StoredAuditSession } from "@/lib/audit-session"
import { listCloudAudits, readAuditFromCloud, saveAuditToCloud } from "@/lib/firebase/audit-repository"

export async function saveAudit(fileName: string, output: AuditCadFileOutput) {
  const session = persistAuditSession(fileName, output)
  if (!session) return null
  try { await saveAuditToCloud(session) } catch (error) { console.warn("Cloud audit sync skipped", error) }
  return session
}

export async function getAudit(id?: string): Promise<StoredAuditSession | null> {
  if (id) {
    try {
      const cloudAudit = await readAuditFromCloud(id)
      if (cloudAudit) return cloudAudit
    } catch (error) { console.warn("Cloud audit read skipped", error) }
  }
  return readAuditSession(id)
}

export async function getAudits(): Promise<StoredAuditSession[]> {
  try {
    const cloudAudits = await listCloudAudits()
    if (cloudAudits.length > 0) return cloudAudits
  } catch (error) { console.warn("Cloud audit listing skipped", error) }
  return listAuditSessions()
}
