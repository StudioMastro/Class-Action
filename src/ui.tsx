/** @jsx h */
import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import {
  SearchTextbox,
  Textbox,
  render
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import '!./output.css'
import { ConfirmDialog, ClassDetailsModal } from './components/Modal'
import { Button, IconButton, Text } from './components/common'
import { DropdownItem } from './components/common/DropdownItem'
import type { SavedClass, ImportResult } from './types'

// Icone personalizzate
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 7.5V11.5" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="8" cy="5" r="1" fill="currentColor"/>
  </svg>
)

const UpdateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8C2.5 4.96243 4.96243 2.5 8 2.5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 5L10.5 2.5L8 0" stroke="currentColor" stroke-width="1.5"/>
  </svg>
)

const RenameIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.5 2.5L13.5 4.5M8 13H14M2 11L10.5 2.5L12.5 4.5L4 13H2V11Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>
)

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2.5 4.5H13.5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12.5 4.5L11.9359 12.6575C11.8889 13.3819 11.2845 14 10.5575 14H5.44248C4.71553 14 4.11112 13.3819 4.06413 12.6575L3.5 4.5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M5.5 4.5V3C5.5 2.17157 6.17157 1.5 7 1.5H9C9.82843 1.5 10.5 2.17157 10.5 3V4.5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M6.5 7V11" stroke="currentColor" stroke-width="1.5"/>
    <path d="M9.5 7V11" stroke="currentColor" stroke-width="1.5"/>
  </svg>
)

const EllipsisIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z" fill="currentColor"/>
    <path d="M3 9C3.55228 9 4 8.55228 4 8C4 7.44772 3.55228 7 3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9Z" fill="currentColor"/>
    <path d="M13 9C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7C12.4477 7 12 7.44772 12 8C12 8.55228 12.4477 9 13 9Z" fill="currentColor"/>
  </svg>
)

const ImportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2V11M8 11L5 8M8 11L11 8" stroke="currentColor" stroke-width="1.5"/>
    <path d="M3 13H13" stroke="currentColor" stroke-width="1.5"/>
  </svg>
)

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 11V2M8 2L5 5M8 2L11 5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M3 13H13" stroke="currentColor" stroke-width="1.5"/>
  </svg>
)

function Plugin() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [savedClasses, setSavedClasses] = useState<SavedClass[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [_editingClass, _setEditingClass] = useState<SavedClass | null>(null)
  const [hasSelectedFrame, setHasSelectedFrame] = useState(false)
  const [newClassName, setNewClassName] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [classToDelete, setClassToDelete] = useState<SavedClass | null>(null)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
  const [classToRename, setClassToRename] = useState<SavedClass | null>(null)
  const [newName, setNewName] = useState('')
  const [classToUpdate, setClassToUpdate] = useState<SavedClass | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [classToView, setClassToView] = useState<SavedClass | null>(null)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importConflicts, setImportConflicts] = useState<string[]>([])

  // Aggiungiamo un ref per il dropdown
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Gestore click fuori dal dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    let mounted = true

    // Registra gli handlers
    const unsubscribeClasses = on('CLASSES_LOADED', (classes: SavedClass[]) => {
      if (!mounted) return
      setSavedClasses(classes)
      setIsInitialized(true)
    })

    const unsubscribeSelection = on('SELECTION_CHANGED', (hasFrame: boolean) => {
      if (!mounted) return
      setHasSelectedFrame(hasFrame)
    })

    const unsubscribeClassSaved = on('CLASS_SAVED', (data: SavedClass) => {
      if (!mounted) return
      setSavedClasses(prevClasses => [...prevClasses, data])
      setNewClassName('')
    })

    const unsubscribeClassDeleted = on('CLASS_DELETED', (deletedClassName: string) => {
      if (!mounted) return
      setSavedClasses(prevClasses => 
        prevClasses.filter(cls => cls.name !== deletedClassName)
      )
    })

    const unsubscribeClassUpdated = on('CLASS_UPDATED', (data: { name: string, properties: Omit<SavedClass, 'name'> }) => {
      if (!mounted) return
      setSavedClasses(prevClasses => 
        prevClasses.map(cls => 
          cls.name === data.name 
            ? { ...data.properties, name: data.name }
            : cls
        )
      )
      setUpdateModalOpen(false)
    })

    const unsubscribeClassApplied = on('CLASS_APPLIED', (result: { success: boolean, error?: string }) => {
      if (result.success) {
        setActiveMenu(null)
      } else if (result.error) {
        console.error('Error applying class:', result.error)
      }
    })

    const unsubscribeImportResult = on('IMPORT_RESULT', (result: ImportResult) => {
      if (result.success) {
        // Non mostriamo più una notifica qui perché viene già mostrata dal plugin
        emit('LOAD_CLASSES')
      } else {
        emit('SHOW_ERROR', result.error || 'Failed to import classes')
      }
    })

    // Carica i dati iniziali dopo aver registrato gli handlers
    requestAnimationFrame(() => {
      if (mounted) {
        emit('LOAD_CLASSES')
        emit('CHECK_SELECTION')
      }
    })

    return () => {
      mounted = false
      unsubscribeClasses()
      unsubscribeSelection()
      unsubscribeClassSaved()
      unsubscribeClassDeleted()
      unsubscribeClassUpdated()
      unsubscribeClassApplied()
      unsubscribeImportResult()
    }
  }, [])

  const handleSaveClass = async (name: string) => {
    if (!name.trim()) {
      emit('SHOW_ERROR', 'Class name cannot be empty')
      return
    }
    
    if (savedClasses.some(cls => cls.name === name.trim())) {
      emit('SHOW_ERROR', 'A class with this name already exists')
      return
    }

    await emit('SAVE_CLASS', { name: name.trim() })
    setActiveMenu(null) // Chiude il dropdown dopo il salvataggio
  }

  const filteredClasses = savedClasses.filter((cls: SavedClass) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApplyClass = async (classData: SavedClass) => {
    try {
      // Assicuriamoci che layoutMode sia definito prima di inviare i dati
      const classToApply = {
        ...classData,
        layoutMode: classData.layoutMode || 'NONE' // Valore di default se non definito
      }
      
      await emit('APPLY_CLASS', classToApply)
      setActiveMenu(null) // Chiude il dropdown dopo l'applicazione
      return true
    } catch (error) {
      console.error('Error applying class:', error)
      emit('SHOW_ERROR', 'An error occurred while applying the class')
      return false
    }
  }

  const handleUpdate = (savedClass: SavedClass) => {
    setActiveMenu(null)
    setClassToUpdate(savedClass)
    setUpdateModalOpen(true)
  }

  const handleRename = (savedClass: SavedClass) => {
    setActiveMenu(null)
    setClassToRename(savedClass)
    setNewName(savedClass.name)
    setIsRenameModalOpen(true)
  }

  const handleDeleteClick = (classData: SavedClass) => {
    setClassToDelete(classData)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!classToDelete) return
    
    await emit('DELETE_CLASS', classToDelete)
    setIsDeleteModalOpen(false)
    setClassToDelete(null)
  }

  const handleConfirmUpdate = async () => {
    if (!classToUpdate) return
    
    await emit('UPDATE_CLASS', classToUpdate)
    setUpdateModalOpen(false)
    setClassToUpdate(null)
  }

  const handleConfirmRename = async () => {
    if (!classToRename) return
    
    const trimmedName = newName.trim()
    console.log('Attempting to rename in UI:', classToRename.name, 'to:', trimmedName)
    
    // Validazione nome vuoto
    if (!trimmedName) {
      emit('SHOW_ERROR', 'Class name cannot be empty')
      return
    }

    // Validazione lunghezza massima
    if (trimmedName.length > 20) {
      emit('SHOW_ERROR', 'Class name cannot be longer than 20 characters')
      return
    }
    
    // Verifica se il nuovo nome è già utilizzato (escludendo il nome attuale)
    const existingClass = savedClasses.find(cls => 
      cls.name.toLowerCase() === trimmedName.toLowerCase() && 
      cls.name !== classToRename.name
    )
    
    if (existingClass) {
      console.log('Found duplicate in UI:', existingClass)
      emit('SHOW_ERROR', 'A class with this name already exists')
      return
    }

    console.log('Emitting RENAME_CLASS event')
    await emit('RENAME_CLASS', { oldName: classToRename.name, newName: trimmedName })
    setIsRenameModalOpen(false)
    setClassToRename(null)
    setNewName('')
  }

  const handleViewDetails = (savedClass: SavedClass) => {
    setActiveMenu(null)
    setClassToView(savedClass)
    setIsDetailsModalOpen(true)
  }

  const handleExportClasses = async () => {
    const exportResult = await emit('EXPORT_CLASSES')
    if (typeof exportResult === 'string') {
      // Crea un blob con il JSON
      const blob = new Blob([exportResult], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      // Crea un link temporaneo per il download
      const link = document.createElement('a')
      link.href = url
      link.download = `class-action-export-${new Date().toISOString().split('T')[0]}.classaction`
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      emit('SHOW_NOTIFICATION', 'Classes exported successfully')
    }
  }

  const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files || input.files.length === 0) return
    
    const file = input.files[0]
    const reader = new FileReader()
    
    reader.onload = (e) => {
      if (!e.target?.result) return
      const jsonString = e.target.result as string
      emit('IMPORT_CLASSES', jsonString)
      // Reset the input value so the same file can be imported again
      input.value = ''
    }
    
    reader.readAsText(file)
  }

  // Aggiungi questa funzione per gestire il salvataggio del file
  const handleSaveDialog = async (data: { suggestedFileName: string, fileContent: string, totalClasses: number }) => {
    try {
      // Crea un Blob con il contenuto JSON
      const blob = new Blob([data.fileContent], { type: 'application/json' })
      
      // Crea un elemento <a> per il download
      const downloadLink = document.createElement('a')
      downloadLink.href = URL.createObjectURL(blob)
      downloadLink.download = data.suggestedFileName
      
      // Simula il click per far partire il download
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      
      // Pulisci l'URL object
      URL.revokeObjectURL(downloadLink.href)
      
      // Mostra notifica di successo
      emit('SHOW_NOTIFICATION', `Successfully exported ${data.totalClasses} classes`)
    } catch (error) {
      console.error('Error saving file:', error)
      emit('SHOW_ERROR', 'Failed to save export file')
    }
  }

  // Aggiungi l'event listener per SHOW_SAVE_DIALOG
  on('SHOW_SAVE_DIALOG', handleSaveDialog)

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Text size="base">Initializing plugin...</Text>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Text size="lg" weight="bold" className="text-[var(--figma-color-text)]">
          Class Action
        </Text>
      </div>

      {/* Save Class Section */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Textbox
            placeholder="Enter class name..."
            value={newClassName}
            onValueInput={setNewClassName}
            onKeyDown={e => {
              if (e.key === 'Enter' && hasSelectedFrame) {
                handleSaveClass(newClassName)
              }
            }}
            variant="border"
          />
        </div>
        <Button
          onClick={() => handleSaveClass(newClassName)}
          disabled={!hasSelectedFrame}
          variant="primary"
          size="medium"
        >
          Save class
        </Button>
      </div>

      {/* Search Section */}
      <div className="w-full">
        <div 
          className="w-full bg-[var(--figma-color-bg-secondary)] border border-[var(--figma-color-border)] rounded-md"
        >
          <SearchTextbox
            placeholder="Search classes..."
            value={searchQuery}
            onValueInput={setSearchQuery}
          />
        </div>
      </div>

      {/* Classes List */}
      <div className="flex flex-col gap-2">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((savedClass) => (
            <div 
              key={savedClass.name}
              className="relative flex flex-col p-2 border rounded-md"
              style={{ borderColor: 'var(--figma-color-border)' }}
            >
              <div className="flex items-center justify-between">
                <Text>{savedClass.name}</Text>
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={() => handleApplyClass(savedClass)}
                    variant="primary"
                    size="medium"
                  >
                    Apply
                  </Button>
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveMenu(activeMenu === savedClass.name ? null : savedClass.name)
                    }}
                    variant="secondary"
                    size="medium"
                  >
                    <EllipsisIcon />
                  </IconButton>
                </div>
              </div>

              {/* Dropdown Menu */}
              {activeMenu === savedClass.name && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 top-full p-1 mt-1 rounded-md z-10 overflow-hidden whitespace-nowrap shadow-lg"
                  style={{ 
                    backgroundColor: 'var(--figma-color-bg)',
                    border: '1px solid var(--figma-color-border)'
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <DropdownItem 
                      onClick={() => handleViewDetails(savedClass)}
                      variant="secondary"
                      icon={<InfoIcon />}
                    >
                      Info
                    </DropdownItem>

                    <DropdownItem 
                      onClick={() => handleRename(savedClass)}
                      variant="secondary"
                      icon={<RenameIcon />}
                    >
                      Rename
                    </DropdownItem>

                    <DropdownItem 
                      onClick={() => handleUpdate(savedClass)}
                      variant="secondary"
                      icon={<UpdateIcon />}
                    >
                      Update
                    </DropdownItem>
                    
                    <DropdownItem
                      onClick={() => handleDeleteClick(savedClass)}
                      variant="danger"
                      icon={<TrashIcon />}
                    >
                      Delete
                    </DropdownItem>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <Text variant="muted">
            No classes found
          </Text>
        )}
      </div>

      {/* Import/Export Section */}
      <div className="flex items-center justify-between mb-2">
        <Text size="base" weight="medium">Saved Classes</Text>
        <div className="flex gap-2">
          <div>
            <input
              type="file"
              accept=".classaction,application/json"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="import-input"
            />
            <Button
              variant="secondary"
              size="medium"
              onClick={() => document.getElementById('import-input')?.click()}
            >
              <div className="flex items-center gap-1">
                <ImportIcon />
                <span>Import</span>
              </div>
            </Button>
          </div>
          <Button
            onClick={handleExportClasses}
            variant="secondary"
            size="medium"
          >
            <div className="flex items-center gap-1">
              <ExportIcon />
              <span>Export</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Class"
        message={`Are you sure you want to delete the class "${classToDelete?.name}"?`}
        confirmText="Delete"
        variant="danger"
      />

      <ConfirmDialog
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        title="Update Class"
        message="Do you want to update this class with the current frame dimensions?"
        confirmText="Update"
        variant="info"
      />

      <ConfirmDialog
        isOpen={isRenameModalOpen}
        onClose={() => {
          setIsRenameModalOpen(false)
          setClassToRename(null)
          setNewName('')
        }}
        onConfirm={handleConfirmRename}
        title="Rename Class"
        variant="info"
        message="Enter new name for the selected class:"
      >
        <div className="mt-2">
          <Textbox
            value={newName}
            onValueInput={setNewName}
            variant="border"
            placeholder="Enter new name..."
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleConfirmRename()
              }
            }}
          />
        </div>
      </ConfirmDialog>

      <ClassDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setClassToView(null)
        }}
        classData={classToView}
      />

      {/* Import Conflicts Modal */}
      {isImportModalOpen && (
        <ConfirmDialog
          isOpen={isImportModalOpen}
          onClose={() => {
            setIsImportModalOpen(false)
            setImportConflicts([])
          }}
          title="Import Conflicts"
          message={`The following classes already exist:\n${importConflicts.join(', ')}\n\nDo you want to overwrite them?`}
          onConfirm={() => {
            // TODO: Implementare la logica di overwrite
            setIsImportModalOpen(false)
            setImportConflicts([])
          }}
          confirmText="Overwrite"
          variant="warning"
        />
      )}
    </div>
  )
}

export default render(Plugin)