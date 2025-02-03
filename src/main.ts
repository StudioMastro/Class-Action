import { emit, on, showUI } from '@create-figma-plugin/utilities'
import type { SavedClass, ClassData, SavedClassResult, AppearanceProperties, ClassExportFormat } from './types'
import { validateClassData, generateChecksum } from './utils/validation'

const STORAGE_KEY = 'savedClasses'

// Costanti per i timeout delle notifiche
const NOTIFICATION_TIMEOUT = {
  SUCCESS: 2000,
  ERROR: 3000
}

// Funzione centralizzata per gestire le notifiche
let currentNotification: NotificationHandler | null = null
function showNotification(message: string, options: { error?: boolean, timeout?: number } = {}) {
  // Chiudi la notifica precedente se esiste
  if (currentNotification) {
    currentNotification.cancel()
  }
  
  // Mostra la nuova notifica
  currentNotification = figma.notify(message, {
    timeout: options.error ? NOTIFICATION_TIMEOUT.ERROR : NOTIFICATION_TIMEOUT.SUCCESS,
    ...options
  })
}

export default function () {
  const options = { width: 320, height: 480 }
  
  // Check if current selection is a frame
  function checkSelection() {
    const selection = figma.currentPage.selection
    const hasFrames = selection.length > 0 && selection.every(node => node.type === 'FRAME')
    emit('SELECTION_CHANGED', hasFrames)
    return hasFrames
  }

  // Load saved classes on startup
  async function loadSavedClasses() {
    try {
      const savedClasses = await figma.clientStorage.getAsync(STORAGE_KEY) || []
      emit('CLASSES_LOADED', savedClasses)
      return savedClasses
    } catch (error) {
      console.error('Error loading classes:', error)
      showNotification('Failed to load saved classes', { error: true })
      return []
    }
  }

  // Save classes to storage
  async function saveToStorage(classes: ClassData[], shouldNotify = false) {
    try {
      await figma.clientStorage.setAsync(STORAGE_KEY, classes)
      if (shouldNotify) {
        showNotification('Classes saved successfully')
      }
    } catch (error) {
      console.error('Error saving classes:', error)
      showNotification('Failed to save classes', { error: true })
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
    async function getStyleInfo(styleId: string): Promise<{ id: string; name: string; value?: string }> {
      try {
        const style = await figma.getStyleByIdAsync(styleId)
        if (!style) return { id: styleId, name: styleId }

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
          id: styleId,
          name: style.name,
          value
        }
      } catch (error) {
        console.error('Error getting style info:', error)
        return { id: styleId, name: styleId }
      }
    }

    if (frame.fillStyleId && typeof frame.fillStyleId === 'string') {
      const { id } = await getStyleInfo(frame.fillStyleId)
      styleReferences.fillStyleId = id
      hasStyleReferences = true
      console.log('Found fill style ID:', id)
    }
    if (frame.strokeStyleId && typeof frame.strokeStyleId === 'string') {
      const { id } = await getStyleInfo(frame.strokeStyleId)
      styleReferences.strokeStyleId = id
      hasStyleReferences = true
      console.log('Found stroke style ID:', id)
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
    // 1. Validazione della Selezione (primo blocco)
    const selection = figma.currentPage.selection
    if (selection.length === 0) {
      showNotification('Please select a frame to save the class', { error: true })
      return null
    }
    if (selection.length > 1) {
      showNotification('Please select only one frame to save the class. Multiple selection is not supported for class creation.', { error: true })
      return null
    }
    const frame = selection[0]
    if (frame.type !== 'FRAME') {
      showNotification('Please select a frame to save the class. Other element types are not supported.', { error: true })
      return null
    }

    // 2. Validazione dei Dati di Input (secondo blocco)
    if (!event.name || event.name.trim() === '') {
      showNotification('Please enter a valid class name', { error: true })
      return null
    }
    if (event.name.length > 64) {  // Aggiungiamo un limite ragionevole
      showNotification('Class name is too long. Maximum 64 characters allowed.', { error: true })
      return null
    }

    try {
      // 3. Validazione delle Operazioni (terzo blocco)
      const existingClasses = await loadSavedClasses()
      // Verifica case-insensitive per i nomi delle classi
      if (existingClasses.some((cls: ClassData) => cls.name.toLowerCase() === event.name.trim().toLowerCase())) {
        showNotification('A class with this name already exists (names are case-insensitive)', { error: true })
        return null
      }

      // Estrazione e validazione delle proprietà
      const frameProperties = await extractFrameProperties(frame)
      if (!frameProperties) {
        showNotification('Failed to extract frame properties', { error: true })
        return null
      }

      const classData = {
        ...frameProperties,
        name: event.name.trim()  // Manteniamo il case originale per la visualizzazione
      }

      // Salvataggio e notifica di successo
      const updatedClasses = [...existingClasses, classData]
      await saveToStorage(updatedClasses)
      emit('CLASS_SAVED', classData)
      showNotification(`Class "${event.name}" saved successfully from frame "${frame.name}"`)
      return frameProperties
    } catch (error) {
      console.error('Error saving class:', error)
      showNotification('Failed to save class', { error: true })
      return null
    }
  }

  async function handleApplyClass(classData: SavedClass, shouldNotify = true) {
    if (!checkSelection()) {
      showNotification('Please select at least one frame', { error: true })
      return false
    }

    const frames = figma.currentPage.selection.filter(node => node.type === 'FRAME') as FrameNode[]
    if (frames.length === 0) {
      showNotification('Please select at least one frame', { error: true })
      return false
    }

    try {
      let successCount = 0
      for (const frame of frames) {
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
          frame.dashPattern = [...classData.appearance.dashPattern]
        }

        // Apply style references first
        if (classData.styleReferences) {
          const { fillStyleId, strokeStyleId, effectStyleId, gridStyleId } = classData.styleReferences
          
          try {
            if (fillStyleId && typeof fillStyleId === 'string') {
              await frame.setFillStyleIdAsync(fillStyleId)
              console.log('Applied fill style ID:', fillStyleId)
            }
            if (strokeStyleId && typeof strokeStyleId === 'string') {
              await frame.setStrokeStyleIdAsync(strokeStyleId)
              console.log('Applied stroke style ID:', strokeStyleId)
            }
            if (effectStyleId && typeof effectStyleId === 'string') {
              await frame.setEffectStyleIdAsync(effectStyleId)
              console.log('Applied effect style ID:', effectStyleId)
            }
            if (gridStyleId && typeof gridStyleId === 'string') {
              await frame.setGridStyleIdAsync(gridStyleId)
              console.log('Applied grid style ID:', gridStyleId)
            }
          } catch (error) {
            console.error('Error applying style references:', error)
            // Continue with direct styles if style references fail
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
        successCount++
      }

      if (shouldNotify) {
        const message = frames.length === 1 
          ? 'Class applied successfully' 
          : `Class applied to ${successCount} frames successfully`
        showNotification(message)
      }
      
      return true
    } catch (error) {
      console.error('Error applying class:', error)
      showNotification('Failed to apply class', { error: true })
      return false
    }
  }

  async function handleUpdateClass(classToUpdate: SavedClass): Promise<SavedClassResult | null> {
    // Verifica specifica per la selezione singola nel caso di aggiornamento
    const selection = figma.currentPage.selection
    if (selection.length === 0) {
      showNotification('Please select a frame to update the class', { error: true })
      return null
    }
    if (selection.length > 1) {
      showNotification('Please select only one frame to update the class. Multiple selection is not supported for class updates.', { error: true })
      return null
    }

    const frame = selection[0]
    if (frame.type !== 'FRAME') {
      showNotification('Please select a frame to update the class', { error: true })
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
      
      // Emit event to update UI with more detailed information
      emit('CLASS_UPDATED', { 
        name: classToUpdate.name, 
        properties: frameProperties,
        updatedFrom: frame.name
      })

      showNotification(`Class "${classToUpdate.name}" updated successfully from frame "${frame.name}"`)
      return frameProperties
    } catch (error) {
      console.error('Error updating class:', error)
      showNotification('Failed to update class', { error: true })
      return null
    }
  }

  async function handleDeleteClass(classData: ClassData) {
    try {
      const savedClasses = await loadSavedClasses()
      const updatedClasses = savedClasses.filter((cls: ClassData) => cls.name !== classData.name)
      await saveToStorage(updatedClasses)
      showNotification('Class deleted successfully')
      // Emit event to update UI
      emit('CLASS_DELETED', classData.name)
      return true
    } catch (error) {
      console.error('Error deleting class:', error)
      showNotification('Failed to delete class', { error: true })
      return false
    }
  }

  async function handleExportClasses(selectedClasses?: string[]) {
    try {
      const savedClasses = await loadSavedClasses()
      const classesToExport = selectedClasses 
        ? savedClasses.filter((cls: ClassData) => selectedClasses.includes(cls.name))
        : savedClasses

      // Validazione delle classi
      const invalidClasses = classesToExport.filter((cls: ClassData) => !validateClassData(cls))
      if (invalidClasses.length > 0) {
        const invalidNames = invalidClasses.map((cls: ClassData) => cls.name).join(', ')
        throw new Error(`Invalid class data found in: ${invalidNames}`)
      }

      // Preparazione dati di export
      const exportData: ClassExportFormat = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        classes: classesToExport,
        metadata: {
          pluginVersion: '1.0.0',
          figmaVersion: figma.editorType,
          checksum: '', // Sarà aggiunto dopo
          totalClasses: classesToExport.length,
          exportedBy: 'Unknown' // Default value
        }
      }

      // Try to get current user if permission is available
      try {
        exportData.metadata.exportedBy = figma.currentUser?.name || 'Unknown'
      } catch (error) {
        console.log('Current user information not available')
      }

      // Aggiungi checksum
      exportData.metadata.checksum = generateChecksum(exportData.classes)

      // Genera nome file suggerito
      const timestamp = new Date().toISOString()
        .split('T')[0] // Prende solo la parte della data (YYYY-MM-DD)
      const suggestedFileName = `class-action-export-${timestamp}.json`

      // Prepara il contenuto del file
      const jsonString = JSON.stringify(exportData, null, 2)

      // Emetti evento per mostrare dialog di salvataggio
      emit('SHOW_SAVE_DIALOG', {
        suggestedFileName,
        fileContent: jsonString,
        totalClasses: classesToExport.length
      })
      
      return jsonString
    } catch (error) {
      console.error('Error exporting classes:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to export classes'
      showNotification(errorMessage, { error: true, timeout: 3000 })
      return false
    }
  }

  async function handleImportClasses(jsonString: string) {
    try {
      console.log('Starting import process with data:', jsonString.substring(0, 200) + '...')
      
      const importData = JSON.parse(jsonString) as ClassExportFormat
      console.log('Parsed import data:', {
        version: importData.version,
        totalClasses: importData.classes?.length,
        metadata: importData.metadata
      })
      
      // Validazione base del formato
      if (!importData.version || !importData.classes || !Array.isArray(importData.classes)) {
        console.error('Validation failed:', { 
          hasVersion: !!importData.version,
          hasClasses: !!importData.classes,
          isArray: Array.isArray(importData.classes)
        })
        emit('IMPORT_RESULT', {
          success: false,
          error: 'Invalid file format'
        })
        return
      }

      // Carica le classi esistenti
      const existingClasses = await loadSavedClasses()
      console.log('Loaded existing classes:', existingClasses.length)
      
      // Identifica le classi da importare e quelle già presenti
      const existingNames = new Set(existingClasses.map((cls: ClassData) => cls.name))
      const newClasses = []
      const alreadyExistingClasses = []

      for (const importClass of importData.classes) {
        if (existingNames.has(importClass.name)) {
          alreadyExistingClasses.push(importClass.name)
        } else {
          newClasses.push(importClass)
        }
      }

      // Prepara il messaggio appropriato
      let notificationMessage = ''
      if (newClasses.length === 0 && alreadyExistingClasses.length > 0) {
        notificationMessage = `No classes imported - all ${alreadyExistingClasses.length} classes already exist`
      } else if (newClasses.length > 0 && alreadyExistingClasses.length > 0) {
        notificationMessage = `Imported ${newClasses.length} classes, skipped ${alreadyExistingClasses.length} existing classes`
      } else if (newClasses.length > 0) {
        notificationMessage = `Successfully imported ${newClasses.length} classes`
      } else {
        notificationMessage = 'No classes to import'
      }

      // Se ci sono nuove classi da importare, le aggiungiamo
      if (newClasses.length > 0) {
        const mergedClasses = [...existingClasses, ...newClasses]
        await saveToStorage(mergedClasses)
        console.log('Successfully saved merged classes')
      }

      // Notifica l'utente
      showNotification(notificationMessage)

      // Invia il risultato dell'importazione alla UI
      emit('IMPORT_RESULT', {
        success: true,
        importedClasses: newClasses,
        skippedClasses: alreadyExistingClasses,
        message: notificationMessage
      })

    } catch (error) {
      console.error('Error importing classes:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      showNotification('Failed to import classes: ' + errorMessage, { error: true })
      emit('IMPORT_RESULT', {
        success: false,
        error: errorMessage
      })
    }
  }

  async function handleApplyAllMatchingClasses() {
    try {
      // Load all saved classes
      const savedClasses = await loadSavedClasses()
      if (!savedClasses.length) {
        showNotification('No saved classes found')
        return false
      }

      // Get all frames in current page
      const frames = figma.currentPage.findAll(node => node.type === 'FRAME') as FrameNode[]
      if (!frames.length) {
        showNotification('No frames found in current page')
        return false
      }

      let appliedCount = 0
      let errorCount = 0

      // For each frame, try to find and apply matching class
      for (const frame of frames) {
        const matchingClass = savedClasses.find((cls: SavedClass) => cls.name === frame.name)
        if (matchingClass) {
          try {
            // Create a temporary selection to use handleApplyClass
            figma.currentPage.selection = [frame]
            await handleApplyClass(matchingClass, false)
            appliedCount++
          } catch (error) {
            console.error(`Error applying class to frame ${frame.name}:`, error)
            errorCount++
          }
        }
      }

      // Show results
      if (appliedCount > 0) {
        showNotification(`Applied ${appliedCount} classes successfully${errorCount > 0 ? ` (${errorCount} errors)` : ''}`)
        emit('CLASSES_APPLIED_ALL', { success: true, appliedCount, errorCount })
        return true
      } else {
        showNotification('No matching classes found')
        return false
      }
    } catch (error) {
      console.error('Error in apply all matching classes:', error)
      showNotification('Failed to apply matching classes', { error: true })
      emit('CLASSES_APPLIED_ALL', { success: false, error: String(error) })
      return false
    }
  }

  async function handleAnalyzeApplyAll() {
    try {
      // Load all saved classes
      const savedClasses = await loadSavedClasses()
      if (!savedClasses.length) {
        showNotification('No saved classes found')
        return
      }

      // Get all frames in current page
      const frames = figma.currentPage.findAll(node => node.type === 'FRAME') as FrameNode[]
      if (!frames.length) {
        showNotification('No frames found in current page')
        return
      }

      // Count matching frames
      const matchingFrames = frames.filter(frame => 
        savedClasses.some((cls: SavedClass) => cls.name === frame.name)
      ).length

      // Emit analysis result
      emit('APPLY_ALL_ANALYSIS_RESULT', {
        totalFrames: frames.length,
        matchingFrames
      })
    } catch (error) {
      console.error('Error analyzing frames:', error)
      showNotification('Failed to analyze frames', { error: true })
    }
  }

  // Event handlers
  on('SAVE_CLASS', handleSaveClass)
  on('APPLY_CLASS', handleApplyClass)
  on('APPLY_ALL_MATCHING_CLASSES', handleApplyAllMatchingClasses)
  on('ANALYZE_APPLY_ALL', handleAnalyzeApplyAll)
  on('UPDATE_CLASS', handleUpdateClass)
  on('DELETE_CLASS', handleDeleteClass)
  on('EXPORT_CLASSES', handleExportClasses)
  on('IMPORT_CLASSES', handleImportClasses)
  on('SAVE_TO_STORAGE', saveToStorage)
  on('LOAD_CLASSES', loadSavedClasses)
  on('CHECK_SELECTION', checkSelection)
  on('SHOW_ERROR', (message: string) => {
    showNotification(message, { error: true })
  })
  on('SHOW_NOTIFICATION', (message: string) => {
    showNotification(message)
  })

  // Listen for selection changes
  figma.on('selectionchange', () => {
    checkSelection()
  })

  // Initialize
  showUI(options)
} 