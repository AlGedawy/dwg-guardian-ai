import type { AuditCadFileOutput } from "@/ai/flows/audit-cad-file"

export const AUDIT_SESSION_KEY = "dwg-guardian:last-audit"
export const AUDIT_HISTORY_KEY = "dwg-guardian:audit-history"

export type StoredAuditSession = {
  id: string
  fileName: string
  createdAt: string
  status: "Completed"
  issues: AuditCadFileOutput["issues"]
  storagePath?: string
}

function createAuditId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `audit-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function parseSession(raw: string | null): StoredAuditSession | null {
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as StoredAuditSession
    if (!parsed.id || !parsed.fileName || !Array.isArray(parsed.issues)) return null
    return parsed
  } catch {
    return null
  }
}

export function persistAuditSession(fileName: string, output: AuditCadFileOutput) {
  if (typeof window === "undefined") return null

  const session: StoredAuditSession = {
    id: createAuditId(),
    fileName,
    createdAt: new Date().toISOString(),
    status: "Completed",
    issues: output.issues,
  }

  const history = listAuditSessions()
  const nextHistory = [session, ...history.filter(item => item.id !== session.id)].slice(0, 100)

  window.localStorage.setItem(AUDIT_SESSION_KEY, JSON.stringify(session))
  window.localStorage.setItem(AUDIT_HISTORY_KEY, JSON.stringify(nextHistory))
  window.sessionStorage.setItem(AUDIT_SESSION_KEY, JSON.stringify(session))

  return session
}

export function updateAuditSessionStoragePath(id: string, storagePath: string) {
  if (typeof window === "undefined") return null

  const history = listAuditSessions()
  const updated = history.map(session => session.id === id ? { ...session, storagePath } : session)
  const session = updated.find(item => item.id === id) ?? null

  window.localStorage.setItem(AUDIT_HISTORY_KEY, JSON.stringify(updated))
  if (session) {
    window.localStorage.setItem(AUDIT_SESSION_KEY, JSON.stringify(session))
    window.sessionStorage.setItem(AUDIT_SESSION_KEY, JSON.stringify(session))
  }

  return session
}

export function readAuditSession(id?: string): StoredAuditSession | null {
  if (typeof window === "undefined") return null

  if (id) {
    return listAuditSessions().find(session => session.id === id) ?? null
  }

  const persistent = parseSession(window.localStorage.getItem(AUDIT_SESSION_KEY))
  if (persistent) return persistent

  return parseSession(window.sessionStorage.getItem(AUDIT_SESSION_KEY))
}

export function listAuditSessions(): StoredAuditSession[] {
  if (typeof window === "undefined") return []

  try {
    const raw = window.localStorage.getItem(AUDIT_HISTORY_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw) as StoredAuditSession[]
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter(session => session.id && session.fileName && Array.isArray(session.issues))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  } catch {
    window.localStorage.removeItem(AUDIT_HISTORY_KEY)
    return []
  }
}

export function deleteAuditSession(id: string) {
  if (typeof window === "undefined") return

  const history = listAuditSessions().filter(session => session.id !== id)
  window.localStorage.setItem(AUDIT_HISTORY_KEY, JSON.stringify(history))

  const current = readAuditSession()
  if (current?.id === id) {
    const next = history[0]
    if (next) {
      window.localStorage.setItem(AUDIT_SESSION_KEY, JSON.stringify(next))
    } else {
      window.localStorage.removeItem(AUDIT_SESSION_KEY)
      window.sessionStorage.removeItem(AUDIT_SESSION_KEY)
    }
  }
}
