import Compressor from 'compressorjs'

export const toBase64 = (file: File | Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      typeof reader.result === 'string' && resolve(reader.result.replace('data:image/webp;base64,', ''))
    }
    reader.onerror = reject
  })
}

export const compressImage = (file: File, optons?: object) => {
  return new Promise<string>((resolve, reject) => {
    new Compressor(file, {
      resize: 'cover',
      mimeType: 'image/webp',
      error: reject,
      success: result => toBase64(result).then(resolve).catch(reject),
      ...optons,
    })
  })
}
