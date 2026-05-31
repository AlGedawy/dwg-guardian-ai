export const MAX_DRAWING_FILE_BYTES = 20 * 1024 * 1024

export const SUPPORTED_DRAWING_EXTENSIONS = ['.dwg', '.dxf', '.pdf'] as const

export function getFileExtension(fileName: string) {
  const dotIndex = fileName.lastIndexOf('.')
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : ''
}

export function validateDrawingFile(file: Pick<File, 'name' | 'size'>) {
  const extension = getFileExtension(file.name)

  if (!SUPPORTED_DRAWING_EXTENSIONS.includes(extension as typeof SUPPORTED_DRAWING_EXTENSIONS[number])) {
    return { valid: false, error: 'Unsupported file format. Upload a DWG, DXF, or PDF file.' }
  }

  if (file.size <= 0) {
    return { valid: false, error: 'The selected file is empty.' }
  }

  if (file.size > MAX_DRAWING_FILE_BYTES) {
    return { valid: false, error: 'The selected file exceeds the 20 MB upload limit.' }
  }

  return { valid: true, error: '' }
}

export function validateDrawingDataUri(fileName: string, fileDataUri: string) {
  const extension = getFileExtension(fileName)

  if (!SUPPORTED_DRAWING_EXTENSIONS.includes(extension as typeof SUPPORTED_DRAWING_EXTENSIONS[number])) {
    return { valid: false, error: 'Unsupported drawing file extension.' }
  }

  if (!fileDataUri.startsWith('data:') || !fileDataUri.includes(';base64,')) {
    return { valid: false, error: 'Invalid drawing payload.' }
  }

  const encodedPayload = fileDataUri.split(';base64,')[1] ?? ''
  const estimatedBytes = Math.floor((encodedPayload.length * 3) / 4)

  if (estimatedBytes <= 0) {
    return { valid: false, error: 'The drawing payload is empty.' }
  }

  if (estimatedBytes > MAX_DRAWING_FILE_BYTES) {
    return { valid: false, error: 'The drawing payload exceeds the 20 MB limit.' }
  }

  return { valid: true, error: '' }
}
