import { ref, uploadBytes } from "firebase/storage"
import { getFirebaseAuth, getFirebaseStorage } from "@/lib/firebase/client"

export async function storeDrawing(auditId: string, file: File) {
  const auth = getFirebaseAuth()
  const storage = getFirebaseStorage()
  const user = auth?.currentUser

  if (!storage || !user) return null

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
  const path = `users/${user.uid}/audits/${auditId}/${safeName}`

  await uploadBytes(ref(storage, path), file, {
    contentType: file.type || "application/octet-stream",
  })

  return path
}
