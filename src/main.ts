import { emit, on, showUI } from '@create-figma-plugin/utilities'

export interface ClassData {
  width: number
  height: number
  name: string
}

export interface SavedClassResult {
  width: number
  height: number
}

export interface SaveClassEvent {
  name: string
}

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
  async function saveToStorage(classes: ClassData[]) {
    try {
      await figma.clientStorage.setAsync(STORAGE_KEY, classes)
      figma.notify('Classes saved successfully')
    } catch (error) {
      console.error('Error saving classes:', error)
      figma.notify('Failed to save classes', { error: true })
    }
  }

  async function handleSaveClass(event: SaveClassEvent) {
    // Validate class name
    if (!event.name || event.name.trim() === '') {
      figma.notify('Please enter a class name', { error: true })
      return null
    }

    // Check for duplicate names
    const savedClasses = await loadSavedClasses()
    if (savedClasses.some((cls: ClassData) => cls.name === event.name)) {
      figma.notify('A class with this name already exists', { error: true })
      return null
    }

    // Check frame selection
    if (!checkSelection()) {
      figma.notify('Please select a frame first', { error: true })
      return null
    }

    const frame = figma.currentPage.selection[0]
    const data = {
      width: frame.width,
      height: frame.height
    }

    emit('CLASS_SAVED', data)
    return data
  }

  function handleApplyClass(classData: ClassData) {
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
      frame.resize(classData.width, classData.height)
      figma.notify('Class applied successfully')
      return true
    } catch (error) {
      figma.notify('Failed to apply class', { error: true })
      return false
    }
  }

  function handleUpdateClass(_oldName: string): SavedClassResult | null {
    if (!checkSelection()) {
      figma.notify('Please select a frame first', { error: true })
      return null
    }

    const frame = figma.currentPage.selection[0]
    const data = {
      width: frame.width,
      height: frame.height
    }

    emit('CLASS_SAVED', data)
    return data
  }

  // Event handlers
  on('SAVE_CLASS', handleSaveClass)
  on('APPLY_CLASS', handleApplyClass)
  on('UPDATE_CLASS', handleUpdateClass)
  on('SAVE_TO_STORAGE', saveToStorage)
  on('LOAD_CLASSES', loadSavedClasses)
  on('CHECK_SELECTION', checkSelection)

  // Listen for selection changes
  figma.on('selectionchange', () => {
    checkSelection()
  })

  // Initialize
  showUI(options)
  loadSavedClasses()
  checkSelection() // Check initial selection
} 