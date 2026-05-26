export const isImageUrl = (url?: string | null): boolean => {
  if (!url) return false
  return url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')
}
