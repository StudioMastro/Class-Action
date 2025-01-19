/** @jsx h */
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import {
  Button,
  IconButton,
  Stack,
  Text,
  SearchTextbox,
  Textbox,
  VerticalSpace,
  IconEllipsis32,
  IconTrash32,
  IconSwap16,
  IconLayerInstance16,
  render,
  Columns,
  Container
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'

interface SavedClass {
  name: string
  width: number
  height: number
}

function Plugin() {
  const [savedClasses, setSavedClasses] = useState<SavedClass[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [_editingClass, setEditingClass] = useState<SavedClass | null>(null)
  const [hasSelectedFrame, setHasSelectedFrame] = useState(false)
  const [newClassName, setNewClassName] = useState('')

  useEffect(() => {
    function handleClassesLoaded(classes: SavedClass[]) {
      setSavedClasses(classes)
    }

    function handleSelectionChanged(hasFrame: boolean) {
      setHasSelectedFrame(hasFrame)
    }

    function handleClassSaved(data: { width: number; height: number }) {
      if (newClassName.trim() === '') return
      if (savedClasses.some(cls => cls.name === newClassName)) return

      const newClass = {
        ...data,
        name: newClassName
      }

      const updatedClasses = [...savedClasses, newClass]
      setSavedClasses(updatedClasses)
      emit('SAVE_TO_STORAGE', updatedClasses)
      setNewClassName('')
    }

    const unsubscribeClasses = on('CLASSES_LOADED', handleClassesLoaded)
    const unsubscribeSelection = on('SELECTION_CHANGED', handleSelectionChanged)
    const unsubscribeClassSaved = on('CLASS_SAVED', handleClassSaved)

    // Initial load
    emit('LOAD_CLASSES')
    emit('CHECK_SELECTION')

    return () => {
      unsubscribeClasses()
      unsubscribeSelection()
      unsubscribeClassSaved()
    }
  }, [newClassName, savedClasses])

  const handleSaveClass = () => {
    emit('SAVE_CLASS', { name: newClassName.trim() })
  }

  const filteredClasses = savedClasses.filter((cls: SavedClass) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApplyClass = (savedClass: SavedClass) => {
    emit('APPLY_CLASS', { type: 'APPLY_CLASS', class: savedClass })
  }

  const handleUpdate = (savedClass: SavedClass) => {
    if (!hasSelectedFrame) return
    setActiveMenu(null)
    emit('UPDATE_CLASS', { type: 'UPDATE_CLASS', class: savedClass })
  }

  const handleRename = (savedClass: SavedClass) => {
    setActiveMenu(null)
    setEditingClass(savedClass)
  }

  const handleDelete = (savedClass: SavedClass) => {
    setActiveMenu(null)
    const updatedClasses = savedClasses.filter(cls => cls.name !== savedClass.name)
    setSavedClasses(updatedClasses)
    emit('DELETE_CLASS', { type: 'DELETE_CLASS', class: savedClass })
  }

  return (
    <Container space="medium">
      <Columns space="medium">
        <Textbox
          placeholder="Enter class name..."
          value={newClassName}
          onValueInput={setNewClassName}
          onKeyDown={e => {
            if (e.key === 'Enter' && hasSelectedFrame) {
              handleSaveClass()
            }
          }}
        />
        <Button 
          fullWidth 
          onClick={handleSaveClass}
          disabled={!hasSelectedFrame}
        >
          Save class
        </Button>
      </Columns>

      <VerticalSpace space="medium" />
      
      <SearchTextbox
        placeholder="Search classes..."
        value={searchQuery}
        onValueInput={setSearchQuery}
      />
      <VerticalSpace space="small" />
      {filteredClasses.length > 0 ? (
        <Stack space="small">
          {filteredClasses.map((savedClass) => (
            <div key={savedClass.name} className="flex items-center justify-between w-full p-2 border border-[var(--figma-color-border)] rounded-md">
              <Text>{savedClass.name}</Text>
              <div className="flex items-center gap-2">
                <Button onClick={() => handleApplyClass(savedClass)}>Apply</Button>
                <IconButton onClick={() => setActiveMenu(activeMenu === savedClass.name ? null : savedClass.name)}>
                  <IconEllipsis32 />
                </IconButton>
              </div>
              {activeMenu === savedClass.name && (
                <div className="absolute right-0 mt-8 bg-[var(--figma-color-bg)] border border-[var(--figma-color-border)] rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <div 
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--figma-color-bg-hover)] cursor-pointer"
                      onClick={() => handleUpdate(savedClass)}
                    >
                      <IconSwap16 />
                      <Text>Update</Text>
                    </div>
                    <div 
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--figma-color-bg-hover)] cursor-pointer"
                      onClick={() => handleRename(savedClass)}
                    >
                      <IconLayerInstance16 />
                      <Text>Rename</Text>
                    </div>
                    <div 
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--figma-color-bg-danger)] cursor-pointer text-[var(--figma-color-text-danger)]"
                      onClick={() => handleDelete(savedClass)}
                    >
                      <IconTrash32 />
                      <Text>Delete</Text>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Stack>
      ) : (
        <Text style={{ color: 'var(--figma-color-text-secondary)' }}>
          No classes found
        </Text>
      )}
    </Container>
  )
}

export default render(Plugin)