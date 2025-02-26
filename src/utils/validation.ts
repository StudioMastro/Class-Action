import { SavedClass } from '../types/index';

/**
 * Validates a single class before export
 */
export const validateClassData = (cls: SavedClass): boolean => {
  // Base validation
  if (!cls.name || typeof cls.name !== 'string') return false;
  if (typeof cls.width !== 'number' || typeof cls.height !== 'number') return false;
  if (!['NONE', 'HORIZONTAL', 'VERTICAL'].includes(cls.layoutMode)) return false;

  // Layout properties validation
  if (cls.layoutProperties) {
    const {
      primaryAxisSizingMode,
      counterAxisSizingMode,
      primaryAxisAlignItems,
      counterAxisAlignItems,
      layoutWrap,
      padding,
    } = cls.layoutProperties;

    if (!primaryAxisSizingMode || !['FIXED', 'AUTO'].includes(primaryAxisSizingMode)) return false;
    if (!counterAxisSizingMode || !['FIXED', 'AUTO'].includes(counterAxisSizingMode)) return false;
    if (
      !primaryAxisAlignItems ||
      !['MIN', 'MAX', 'CENTER', 'SPACE_BETWEEN'].includes(primaryAxisAlignItems)
    )
      return false;
    if (!counterAxisAlignItems || !['MIN', 'MAX', 'CENTER'].includes(counterAxisAlignItems))
      return false;
    if (!layoutWrap || !['NO_WRAP', 'WRAP'].includes(layoutWrap)) return false;
    if (
      !padding ||
      typeof padding.top !== 'number' ||
      typeof padding.right !== 'number' ||
      typeof padding.bottom !== 'number' ||
      typeof padding.left !== 'number'
    )
      return false;
  }

  // Appearance validation
  if (cls.appearance) {
    const { opacity, blendMode, cornerRadius, strokeWeight } = cls.appearance;
    if (typeof opacity !== 'number' || opacity < 0 || opacity > 1) return false;
    if (!blendMode) return false;
    if (cornerRadius !== figma.mixed && typeof cornerRadius !== 'number') return false;
    if (strokeWeight !== figma.mixed && typeof strokeWeight !== 'number') return false;
  }

  return true;
};

/**
 * Generates a checksum for the exported classes
 */
export const generateChecksum = (classes: SavedClass[]): string => {
  // Simple checksum implementation
  return classes.reduce((acc, cls) => {
    const str = JSON.stringify(cls);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return acc + Math.abs(hash).toString(16);
  }, '');
};
