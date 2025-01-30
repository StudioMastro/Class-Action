import { ClassData, SavedClass } from '../types'

/**
 * Valida una singola classe prima dell'export
 */
export const validateClassData = (cls: ClassData | SavedClass): boolean => {
  // Validazione base
  if (!cls.name || typeof cls.name !== 'string') return false
  if (typeof cls.width !== 'number' || typeof cls.height !== 'number') return false
  if (!['NONE', 'HORIZONTAL', 'VERTICAL'].includes(cls.layoutMode)) return false

  // Validazione layout properties
  if (cls.layoutProperties) {
    const { 
      primaryAxisSizingMode, 
      counterAxisSizingMode,
      primaryAxisAlignItems,
      counterAxisAlignItems,
      layoutWrap,
      padding
    } = cls.layoutProperties

    if (!primaryAxisSizingMode || !counterAxisSizingMode) return false
    if (!primaryAxisAlignItems || !counterAxisAlignItems) return false
    if (!layoutWrap) return false
    if (!padding || 
        typeof padding.top !== 'number' || 
        typeof padding.right !== 'number' || 
        typeof padding.bottom !== 'number' || 
        typeof padding.left !== 'number') return false
  }

  // Validazione appearance
  if (cls.appearance) {
    const { opacity, blendMode, cornerRadius } = cls.appearance
    if (typeof opacity !== 'number' || opacity < 0 || opacity > 1) return false
    if (!blendMode) return false
    if (typeof cornerRadius !== 'number' && !Array.isArray(cornerRadius)) return false
  }

  return true
}

/**
 * Genera un checksum per i dati esportati
 */
export const generateChecksum = (data: any): string => {
  const str = JSON.stringify(data)
  let hash = 0
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return hash.toString(16) // Converti in hex
} 