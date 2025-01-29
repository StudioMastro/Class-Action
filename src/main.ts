import { emit, on, showUI } from '@create-figma-plugin/utilities'
import type { SavedClass, ClassData, SavedClassResult, AppearanceProperties } from './types'

const STORAGE_KEY = 'savedClasses'

export default function () {
  const options = { width: 320, height: 480 }
  
  // Check if current selection is a frame
  function checkSelection() {
    const selection = figma.currentPage.selection
    const hasFrame = selection.length === 1 && selection[0].type === 'FRAME'
    emit('SELECTION_CHANGED', hasFrame)
    return hasFrame
  }

  // Load saved classes on startup
  async function loadSavedClasses() {
    try {
      const savedClasses = await figma.clientStorage.getAsync(STORAGE_KEY) || []
      emit('CLASSES_LOADED', savedClasses)
      return savedClasses
    } catch (error) {
      console.error('Error loading classes:', error)
      figma.notify('Failed to load saved classes', { error: true })
      return []
    }
  }

  // Save classes to storage
  async function saveToStorage(classes: ClassData[], showNotification = false) {
    try {
      await figma.clientStorage.setAsync(STORAGE_KEY, classes)
      if (showNotification) {
        figma.notify('Classes saved successfully')
      }
    } catch (error) {
      console.error('Error saving classes:', error)
      figma.notify('Failed to save classes', { error: true })
    }
  }

  async function extractFrameProperties(frame: FrameNode): Promise<Omit<SavedClass, 'name'>> {
    console.log('Extracting properties from frame:', frame.name)
    console.log('Frame fills:', frame.fills)
    console.log('Frame strokes:', frame.strokes)
    
    // Initialize with basic properties that all frames have
    const properties: Omit<SavedClass, 'name'> = {
      width: frame.width,
      height: frame.height,
      layoutMode: frame.layoutMode,
      minWidth: undefined,
      maxWidth: undefined,
      minHeight: undefined,
      maxHeight: undefined
    }

    // Add auto-layout specific properties
    if (frame.layoutMode === 'HORIZONTAL' || frame.layoutMode === 'VERTICAL') {
      console.log('Frame has auto-layout, extracting sizing properties')
      
      // Add min/max constraints only for auto-layout frames
      properties.minWidth = frame.minWidth
      properties.maxWidth = frame.maxWidth
      properties.minHeight = frame.minHeight
      properties.maxHeight = frame.maxHeight

      properties.layoutProperties = {
        primaryAxisSizingMode: frame.primaryAxisSizingMode,
        counterAxisSizingMode: frame.counterAxisSizingMode,
        primaryAxisAlignItems: frame.primaryAxisAlignItems as 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN',
        counterAxisAlignItems: frame.counterAxisAlignItems as 'MIN' | 'MAX' | 'CENTER',
        layoutWrap: frame.layoutWrap,
        itemSpacing: typeof frame.itemSpacing === 'number' ? frame.itemSpacing : null,
        counterAxisSpacing: typeof frame.counterAxisSpacing === 'number' ? frame.counterAxisSpacing : null,
        padding: {
          top: frame.paddingTop,
          right: frame.paddingRight,
          bottom: frame.paddingBottom,
          left: frame.paddingLeft
        },
        layoutPositioning: frame.layoutPositioning
      }

      console.log('Extracted auto-layout properties:', {
        layoutWrap: frame.layoutWrap,
        itemSpacing: frame.itemSpacing,
        counterAxisSpacing: frame.counterAxisSpacing,
        padding: {
          top: frame.paddingTop,
          right: frame.paddingRight,
          bottom: frame.paddingBottom,
          left: frame.paddingLeft
        }
      })
    } else {
      console.log('Frame has no auto-layout, saving only fixed dimensions')
    }

    // Add appearance properties
    const appearance: AppearanceProperties = {
      opacity: frame.opacity,
      blendMode: frame.blendMode,
      cornerRadius: frame.cornerRadius,
      strokeWeight: frame.strokeWeight,
      strokeAlign: frame.strokeAlign,
      dashPattern: [...frame.dashPattern] // Create a copy of the array
    }
    properties.appearance = appearance

    // Handle style references first
    const styleReferences: Required<NonNullable<SavedClass['styleReferences']>> = {
      fillStyleId: '',
      strokeStyleId: '',
      effectStyleId: '',
      gridStyleId: ''
    }
    let hasStyleReferences = false

    // Check style IDs and get style names and values
    async function getStyleInfo(styleId: string): Promise<{ name: string; value?: string }> {
      try {
        const style = await figma.getStyleByIdAsync(styleId)
        if (!style) return { name: styleId }

        let value: string | undefined
        if ('paints' in style) {
          const paint = style.paints[0]
          if (paint.type === 'SOLID') {
            const { r, g, b } = paint.color
            const opacity = 'opacity' in paint ? paint.opacity : 1
            value = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`
          }
        }

        return { 
          name: style.name,
          value
        }
      } catch (error) {
        console.error('Error getting style info:', error)
        return { name: styleId }
      }
    }

    if (frame.fillStyleId && typeof frame.fillStyleId === 'string') {
      const { name, value } = await getStyleInfo(frame.fillStyleId)
      styleReferences.fillStyleId = `${name}${value ? ` (${value})` : ''}`
      hasStyleReferences = true
      console.log('Found fill style:', name, value)
    }
    if (frame.strokeStyleId && typeof frame.strokeStyleId === 'string') {
      const { name, value } = await getStyleInfo(frame.strokeStyleId)
      styleReferences.strokeStyleId = `${name}${value ? ` (${value})` : ''}`
      hasStyleReferences = true
      console.log('Found stroke style:', name, value)
    }
    if (frame.effectStyleId && typeof frame.effectStyleId === 'string') {
      const { name } = await getStyleInfo(frame.effectStyleId)
      styleReferences.effectStyleId = name
      hasStyleReferences = true
      console.log('Found effect style:', name)
    }
    if (frame.gridStyleId && typeof frame.gridStyleId === 'string') {
      const { name } = await getStyleInfo(frame.gridStyleId)
      styleReferences.gridStyleId = name
      hasStyleReferences = true
    }

    if (hasStyleReferences) {
      properties.styleReferences = styleReferences
    }

    // Handle direct styles only if no style references exist for that property
    const styles: Required<NonNullable<SavedClass['styles']>> = {
      fills: [],
      strokes: [],
      effects: [],
      layoutGrids: []
    }
    let hasStyles = false

    // Convert Figma Paint to CSS color
    function paintToCSS(paint: Paint): string | null {
      console.log('Converting paint to CSS:', paint)
      if (paint.type === 'SOLID') {
        const { r, g, b } = paint.color
        const opacity = 'opacity' in paint ? paint.opacity : 1
        const cssColor = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`
        console.log('Generated CSS color:', cssColor)
        return cssColor
      }
      return null
    }

    if (Array.isArray(frame.fills) && !styleReferences.fillStyleId) {
      console.log('Processing fills for frame:', frame.fills)
      const cssColors = frame.fills.map(paintToCSS).filter((color): color is string => color !== null)
      if (cssColors.length > 0) {
        styles.fills = cssColors
        hasStyles = true
        console.log('Saved CSS colors for fills:', cssColors)
      }
    }

    if (Array.isArray(frame.strokes) && !styleReferences.strokeStyleId) {
      console.log('Processing strokes for frame:', frame.strokes)
      const cssColors = frame.strokes.map(paintToCSS).filter((color): color is string => color !== null)
      if (cssColors.length > 0) {
        styles.strokes = cssColors
        hasStyles = true
        console.log('Saved CSS colors for strokes:', cssColors)
      }
    }

    if (Array.isArray(frame.effects) && !styleReferences.effectStyleId) {
      console.log('Processing effects:', frame.effects)
      const cssEffects = frame.effects.map(effect => {
        if (effect.type === 'DROP_SHADOW') {
          const { offset, radius, color } = effect
          return `${offset.x}px ${offset.y}px ${radius}px rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`
        }
        return null
      }).filter((effect): effect is string => effect !== null)
      if (cssEffects.length > 0) {
        styles.effects = cssEffects
        hasStyles = true
        console.log('Saved CSS shadows:', cssEffects)
      }
    }

    if (hasStyles) {
      console.log('Final styles object:', styles)
      properties.styles = styles
    }

    console.log('Final properties object:', properties)
    return properties
  }

  async function handleSaveClass(event: { name: string }): Promise<SavedClassResult | null> {
    if (!checkSelection()) {
      figma.notify('Please select a frame first', { error: true })
      return null
    }

    const frame = figma.currentPage.selection[0]
    if (frame.type !== 'FRAME') {
      figma.notify('Please select a frame', { error: true })
      return null
    }

    try {
      // Load existing classes first
      const existingClasses = await loadSavedClasses()
      
      // Check if class name already exists
      if (existingClasses.some((cls: ClassData) => cls.name === event.name)) {
        figma.notify('A class with this name already exists', { error: true })
        return null
      }

      const frameProperties = await extractFrameProperties(frame)
      console.log('Extracted frame properties:', frameProperties)

      const classData = {
        ...frameProperties,
        name: event.name
      }
      console.log('Class data to save:', classData)

      // Add new class to existing ones
      const updatedClasses = [...existingClasses, classData]
      
      // Save to storage
      await saveToStorage(updatedClasses)
      
      // Emit the event with the complete class data including name
      emit('CLASS_SAVED', classData)
      return frameProperties
    } catch (error) {
      console.error('Error saving class:', error)
      figma.notify('Failed to save class', { error: true })
      return null
    }
  }

  async function handleApplyClass(classData: SavedClass) {
    if (!checkSelection()) {
      figma.notify('Please select a frame first', { error: true })
      return false
    }

    const frame = figma.currentPage.selection[0]
    if (frame.type !== 'FRAME') {
      figma.notify('Please select a frame', { error: true })
      return false
    }

    try {
      // Set frame name to class name
      frame.name = classData.name
      console.log('Setting frame name to:', classData.name)

      // Set layout mode first as it affects how dimensions are applied
      frame.layoutMode = classData.layoutMode
      console.log('Setting layout mode to:', classData.layoutMode)

      if (frame.layoutMode === 'NONE') {
        // For frames without auto-layout, apply only fixed dimensions
        console.log('Applying fixed dimensions:', { width: classData.width, height: classData.height })
        frame.resize(classData.width, classData.height)
      } else {
        // For auto-layout frames, apply all dimension properties
        frame.resize(classData.width, classData.height)
        
        if (classData.minWidth !== null && classData.minWidth !== undefined) {
          frame.minWidth = classData.minWidth
        }
        if (classData.maxWidth !== null && classData.maxWidth !== undefined) {
          frame.maxWidth = classData.maxWidth
        }
        if (classData.minHeight !== null && classData.minHeight !== undefined) {
          frame.minHeight = classData.minHeight
        }
        if (classData.maxHeight !== null && classData.maxHeight !== undefined) {
          frame.maxHeight = classData.maxHeight
        }

        console.log('Applied auto-layout dimensions:', {
          width: classData.width,
          height: classData.height,
          minWidth: frame.minWidth,
          maxWidth: frame.maxWidth,
          minHeight: frame.minHeight,
          maxHeight: frame.maxHeight
        })

        // Apply layout properties if present
        if (classData.layoutProperties) {
          frame.primaryAxisSizingMode = classData.layoutProperties.primaryAxisSizingMode
          frame.counterAxisSizingMode = classData.layoutProperties.counterAxisSizingMode
          frame.primaryAxisAlignItems = classData.layoutProperties.primaryAxisAlignItems
          frame.counterAxisAlignItems = classData.layoutProperties.counterAxisAlignItems
          frame.layoutWrap = classData.layoutProperties.layoutWrap
          
          // Apply spacing only if values are not null
          if (classData.layoutProperties.itemSpacing !== null) {
            frame.itemSpacing = classData.layoutProperties.itemSpacing
          }
          if (classData.layoutProperties.counterAxisSpacing !== null) {
            frame.counterAxisSpacing = classData.layoutProperties.counterAxisSpacing
          }

          // Apply individual padding values
          frame.paddingTop = classData.layoutProperties.padding.top
          frame.paddingRight = classData.layoutProperties.padding.right
          frame.paddingBottom = classData.layoutProperties.padding.bottom
          frame.paddingLeft = classData.layoutProperties.padding.left

          console.log('Applied auto-layout properties:', {
            layoutWrap: frame.layoutWrap,
            itemSpacing: frame.itemSpacing,
            counterAxisSpacing: frame.counterAxisSpacing,
            padding: {
              top: frame.paddingTop,
              right: frame.paddingRight,
              bottom: frame.paddingBottom,
              left: frame.paddingLeft
            }
          })

          frame.layoutPositioning = classData.layoutProperties.layoutPositioning
        }
      }

      // Apply appearance properties
      if (classData.appearance) {
        frame.opacity = classData.appearance.opacity
        frame.blendMode = classData.appearance.blendMode
        frame.cornerRadius = classData.appearance.cornerRadius
        if (classData.appearance.strokeWeight !== figma.mixed) {
          frame.strokeWeight = classData.appearance.strokeWeight
        }
        frame.strokeAlign = classData.appearance.strokeAlign
        frame.dashPattern = [...classData.appearance.dashPattern] // Create a copy of the array
      }

      // Apply style references first
      if (classData.styleReferences) {
        const { fillStyleId, strokeStyleId, effectStyleId, gridStyleId } = classData.styleReferences
        
        if (fillStyleId && typeof fillStyleId === 'string') {
          await frame.setFillStyleIdAsync(fillStyleId)
          console.log('Applied fill style ID:', fillStyleId)
        }
        if (strokeStyleId && typeof strokeStyleId === 'string') {
          await frame.setStrokeStyleIdAsync(strokeStyleId)
        }
        if (effectStyleId && typeof effectStyleId === 'string') {
          await frame.setEffectStyleIdAsync(effectStyleId)
        }
        if (gridStyleId && typeof gridStyleId === 'string') {
          await frame.setGridStyleIdAsync(gridStyleId)
        }
      }

      // Apply direct styles only if no style references exist for that property
      if (classData.styles) {
        if (!classData.styleReferences?.fillStyleId && classData.styles.fills !== figma.mixed) {
          if (Array.isArray(classData.styles.fills)) {
            if (typeof classData.styles.fills[0] === 'string') {
              // Se sono valori CSS, creiamo un nuovo Paint object
              const newFills = classData.styles.fills.map(cssColor => {
                if (typeof cssColor !== 'string') return null
                const matches = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
                if (matches) {
                  const [_, r, g, b, a = '1'] = matches
                  return {
                    type: 'SOLID',
                    color: {
                      r: parseInt(r) / 255,
                      g: parseInt(g) / 255,
                      b: parseInt(b) / 255
                    },
                    opacity: parseFloat(a)
                  } as Paint
                }
                return null
              }).filter((fill): fill is Paint => fill !== null)
              if (newFills.length > 0) {
                frame.fills = newFills
              }
            } else {
              // Se sono Paint objects, li applichiamo direttamente
              frame.fills = classData.styles.fills as Paint[]
            }
          }
        }
        
        if (!classData.styleReferences?.strokeStyleId && classData.styles.strokes !== figma.mixed) {
          if (Array.isArray(classData.styles.strokes)) {
            if (typeof classData.styles.strokes[0] === 'string') {
              // Se sono valori CSS, creiamo un nuovo Paint object
              const newStrokes = classData.styles.strokes.map(cssColor => {
                if (typeof cssColor !== 'string') return null
                const matches = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
                if (matches) {
                  const [_, r, g, b, a = '1'] = matches
                  return {
                    type: 'SOLID',
                    color: {
                      r: parseInt(r) / 255,
                      g: parseInt(g) / 255,
                      b: parseInt(b) / 255
                    },
                    opacity: parseFloat(a)
                  } as Paint
                }
                return null
              }).filter((stroke): stroke is Paint => stroke !== null)
              if (newStrokes.length > 0) {
                frame.strokes = newStrokes
              }
            } else {
              // Se sono Paint objects, li applichiamo direttamente
              frame.strokes = classData.styles.strokes as Paint[]
            }
          }
        }

        if (!classData.styleReferences?.effectStyleId && classData.styles.effects !== figma.mixed) {
          if (Array.isArray(classData.styles.effects)) {
            if (typeof classData.styles.effects[0] === 'string') {
              // Se sono valori CSS, creiamo nuovi Effect objects
              const newEffects = classData.styles.effects.map(cssShadow => {
                if (typeof cssShadow !== 'string') return null
                const matches = cssShadow.match(/(-?\d+)px\s+(-?\d+)px\s+(-?\d+)px\s+rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)
                if (matches) {
                  const [_, x, y, blur, r, g, b, a] = matches
                  return {
                    type: 'DROP_SHADOW',
                    color: {
                      r: parseInt(r) / 255,
                      g: parseInt(g) / 255,
                      b: parseInt(b) / 255,
                      a: parseFloat(a)
                    },
                    offset: { x: parseInt(x), y: parseInt(y) },
                    radius: parseInt(blur),
                    visible: true,
                    blendMode: 'NORMAL'
                  } as Effect
                }
                return null
              }).filter((effect): effect is Effect => effect !== null)
              if (newEffects.length > 0) {
                frame.effects = newEffects
              }
            } else {
              // Se sono Effect objects, li applichiamo direttamente
              frame.effects = classData.styles.effects as Effect[]
            }
          }
        }
      }

      figma.notify('Class applied successfully')
      emit('CLASS_APPLIED', { success: true })
      return true
    } catch (error) {
      console.error('Error applying class:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      figma.notify('Failed to apply class', { error: true })
      emit('CLASS_APPLIED', { success: false, error: errorMessage })
      return false
    }
  }

  async function handleUpdateClass(classToUpdate: SavedClass): Promise<SavedClassResult | null> {
    if (!checkSelection()) {
      figma.notify('Please select a frame first', { error: true })
      return null
    }

    const frame = figma.currentPage.selection[0]
    if (frame.type !== 'FRAME') {
      figma.notify('Please select a frame', { error: true })
      return null
    }

    try {
      // Extract new properties from the selected frame
      const frameProperties = await extractFrameProperties(frame)
      console.log('Extracted new properties:', frameProperties)

      // Load existing classes
      const savedClasses = await loadSavedClasses()
      
      // Update the class with new properties while keeping the same name
      const updatedClasses = savedClasses.map((cls: ClassData) => 
        cls.name === classToUpdate.name 
          ? { ...frameProperties, name: classToUpdate.name }
          : cls
      )

      // Save to storage
      await saveToStorage(updatedClasses)
      
      // Emit event to update UI
      emit('CLASS_UPDATED', { 
        name: classToUpdate.name, 
        properties: frameProperties 
      })

      figma.notify('Class updated successfully')
      return frameProperties
    } catch (error) {
      console.error('Error updating class:', error)
      figma.notify('Failed to update class', { error: true })
      return null
    }
  }

  async function handleDeleteClass(classData: ClassData) {
    try {
      const savedClasses = await loadSavedClasses()
      const updatedClasses = savedClasses.filter((cls: ClassData) => cls.name !== classData.name)
      await saveToStorage(updatedClasses)
      figma.notify('Class deleted successfully')
      // Emit event to update UI
      emit('CLASS_DELETED', classData.name)
      return true
    } catch (error) {
      console.error('Error deleting class:', error)
      figma.notify('Failed to delete class', { error: true })
      return false
    }
  }

  // Event handlers
  on('SAVE_CLASS', handleSaveClass)
  on('APPLY_CLASS', handleApplyClass)
  on('UPDATE_CLASS', handleUpdateClass)
  on('DELETE_CLASS', handleDeleteClass)
  on('SAVE_TO_STORAGE', saveToStorage)
  on('LOAD_CLASSES', loadSavedClasses)
  on('CHECK_SELECTION', checkSelection)
  on('SHOW_ERROR', (message: string) => {
    figma.notify(message, { error: true })
  })
  on('SHOW_NOTIFICATION', (message: string) => {
    figma.notify(message)
  })

  // Listen for selection changes
  figma.on('selectionchange', () => {
    checkSelection()
  })

  // Initialize
  showUI(options)
} 