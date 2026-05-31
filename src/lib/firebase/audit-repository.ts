import { collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore"
import type { StoredAuditSession } from "@/lib/audit-session"
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase/client"

type CloudAuditRecord = StoredAuditSession & {
  ownerId: string
  workspaceId: string
}

function getAuthenticatedContext() {
  const auth = getFirebaseAuth()
  const db = getFirebaseDb()
  const user = auth?.currentUser

  if (!db || !user) return null

  return {
    db,
    ownerId: user.uid,
    workspaceId: user.uid,
  }
}

export async function saveAuditToCloud(session: StoredAuditSession) {
  const context = getAuthenticatedContext()
  if (!context) return false

  const record: CloudAuditRecord = {
    ...session,
    ownerId: context.ownerId,
    workspaceId: context.workspaceId,
  }

  await setDoc(doc(context.db, "audits", session.id), record)
  return true
}

export async function readAuditFromCloud(id: string) {
  const context = getAuthenticatedContext()
  if (!context) return null

  const snapshot = await getDoc(doc(context.db, "audits", id))
  if (!snapshot.exists()) return null

  const audit = snapshot.data() as CloudAuditRecord
  if (audit.ownerId !== context.ownerId || audit.workspaceId !== context.workspaceId) return null

  return audit
}

export async function listCloudAudits() {
  const context = getAuthenticatedContext()
  if (!context) return []

  const auditsQuery = query(
    collection(context.db, "audits"),
    where("workspaceId", "==", context.workspaceId),
    orderBy("createdAt", "desc"),
    limit(100),
  )

  const snapshot = await getDocs(auditsQuery)
  return snapshot.docs.map(item => item.data() as CloudAuditRecord)
}

export async function deleteAuditFromCloud(id: string) {
  const context = getAuthenticatedContext()
  if (!context) return false

  const existing = await readAuditFromCloud(id)
  if (!existing) return false

  await deleteDoc(doc(context.db, "audits", id))
  return true
}
