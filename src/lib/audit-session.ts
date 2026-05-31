import type { AuditCadFileOutput } from "@/ai/flows/audit-cad-file"

export const AUDIT_SESSION_KEY = "dwg-guardian:last-audit"

export type StoredAuditSession = {
  fileName: string
  createdAt: string
  issues: AuditCadFileOutput["issues"]
}

export function persistAuditSession(fileName: string, output: AuditCadFileOutput) {
  if (typeof window === "undefined") return

  const session: StoredAuditSession = {
    fileName,
    createdAt: new Date().toISOString(),
    issues: output.issues,
  }

  window.sessionStorage.setItem(AUDIT_SESSION_KEY, JSON.stringify(session))
}

export function readAuditSession(): StoredAuditSession | null {
  if (typeof window === "undefined") return null

  const raw = window.sessionStorage.getItem(AUDIT_SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as StoredAuditSession
  } catch {
    window.sessionStorage.removeItem(AUDIT_SESSION_KEY)
    return null
  }
}
