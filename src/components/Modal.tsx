/** @jsx h */
import { h, VNode } from 'preact'
import { Text } from './common/Text'
import { emit } from '@create-figma-plugin/utilities'
import type { SavedClass } from '../types'
import { Button, IconButton } from './common'

// Props per il Modal base
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: VNode | VNode[] | string | null
}

// Props per il Dialog di conferma
interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message?: string
  children?: VNode | VNode[] | string | null
  confirmText?: string
  variant?: 'danger' | 'warning' | 'success' | 'info'
  showCancelButton?: boolean
  cancelButtonText?: string
}

// Props per il Modal dei dettagli della classe
interface ClassDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  classData: SavedClass | null
}

// Funzione helper per formattare i valori in stile CSS
function formatCSSValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'number') {
    // Aggiungi 'px' ai valori numerici che rappresentano dimensioni
    if (['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'padding', 'spacing'].some(dim => 
      String(value).includes(dim)
    )) {
      return `${value}px`
    }
    // Converti opacity in percentuale
    if (String(value).includes('opacity')) {
      return `${value * 100}%`
    }
    return value.toString()
  }
  if (typeof value === 'boolean') return value ? '1' : '0'
  if (Array.isArray(value)) return `[${value.join(', ')}]`
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

// Funzione helper per convertire camelCase in kebab-case
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

// Funzione per copiare il testo negli appunti
function copyToClipboard(text: string): void {
  try {
    // Crea un elemento textarea temporaneo
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    
    // Seleziona e copia il testo
    textarea.select()
    document.execCommand('copy')
    
    // Rimuovi l'elemento temporaneo
    document.body.removeChild(textarea)
    
    // Notifica l'utente
    emit('SHOW_NOTIFICATION', 'Copied to clipboard')
  } catch (err) {
    console.error('Failed to copy text:', err)
    emit('SHOW_ERROR', 'Failed to copy text')
  }
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      <div className="relative z-10 w-[300px] bg-[var(--figma-color-bg)] rounded-lg shadow-lg">
        <div className="flex items-center justify-between py-3 px-4 border-b border-[var(--figma-color-border)]">
          <div>
            <Text size="lg" weight="bold">{title}</Text>
          </div>
          <IconButton 
            onClick={onClose}
            variant="secondary"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
  confirmText = 'Confirm',
  variant = 'info',
  showCancelButton = true,
  cancelButtonText = 'Cancel'
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-2">
        {message && <Text size="base">{message}</Text>}
        {children}
        <div className="flex justify-end gap-2 mt-4">
          {showCancelButton && (
            <Button
              onClick={onClose}
              variant="secondary"
              size="medium"
            >
              {cancelButtonText}
            </Button>
          )}
          <Button 
            onClick={onConfirm}
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="medium"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export function ClassDetailsModal({ isOpen, onClose, classData }: ClassDetailsModalProps) {
  if (!isOpen || !classData) return null

  const allProperties: { [key: string]: unknown } = {
    // Layout properties
    width: classData.width,
    height: classData.height,
    minWidth: classData.minWidth,
    maxWidth: classData.maxWidth,
    minHeight: classData.minHeight,
    maxHeight: classData.maxHeight,
    display: classData.layoutMode === 'NONE' ? 'block' : 'flex',
    ...(classData.layoutMode !== 'NONE' && classData.layoutProperties ? {
      flexDirection: classData.layoutMode === 'HORIZONTAL' ? 'row' : 'column',
      flexWrap: classData.layoutProperties.layoutWrap === 'WRAP' ? 'wrap' : 'nowrap',
      justifyContent: classData.layoutProperties.primaryAxisAlignItems.toLowerCase().replace('_', '-'),
      alignItems: classData.layoutProperties.counterAxisAlignItems.toLowerCase(),
      gap: classData.layoutProperties.itemSpacing,
      rowGap: classData.layoutProperties.counterAxisSpacing,
      paddingTop: classData.layoutProperties.padding.top,
      paddingRight: classData.layoutProperties.padding.right,
      paddingBottom: classData.layoutProperties.padding.bottom,
      paddingLeft: classData.layoutProperties.padding.left,
      position: classData.layoutProperties.layoutPositioning.toLowerCase()
    } : {}),

    // Appearance properties
    ...(classData.appearance ? {
      opacity: classData.appearance.opacity,
      mixBlendMode: classData.appearance.blendMode.toLowerCase(),
      borderRadius: classData.appearance.cornerRadius,
      borderWidth: classData.appearance.strokeWeight,
      borderStyle: classData.appearance.dashPattern.length > 0 ? 'dashed' : 'solid',
      borderPosition: classData.appearance.strokeAlign.toLowerCase()
    } : {}),

    // Style properties
    ...((() => {
      const styleProps: { [key: string]: unknown } = {}

      // Gestione del background-color
      if (classData.styles?.fills && Array.isArray(classData.styles.fills) && classData.styles.fills.length > 0) {
        styleProps.backgroundColor = classData.styles.fills[0]
      } else if (classData.styleReferences?.fillStyleId) {
        const fillStyleId = String(classData.styleReferences.fillStyleId)
        styleProps.backgroundColor = `[style-id: ${fillStyleId}]`
      }

      // Gestione del border-color
      if (classData.styles?.strokes && Array.isArray(classData.styles.strokes) && classData.styles.strokes.length > 0) {
        styleProps.borderColor = classData.styles.strokes[0]
      } else if (classData.styleReferences?.strokeStyleId) {
        const strokeStyleId = String(classData.styleReferences.strokeStyleId)
        styleProps.borderColor = `[style-id: ${strokeStyleId}]`
      }

      // Gestione del box-shadow
      if (classData.styles?.effects && Array.isArray(classData.styles.effects) && classData.styles.effects.length > 0) {
        styleProps.boxShadow = classData.styles.effects[0]
      } else if (classData.styleReferences?.effectStyleId) {
        const effectStyleId = String(classData.styleReferences.effectStyleId)
        styleProps.boxShadow = `[style-id: ${effectStyleId}]`
      }

      return styleProps
    })())
  }

  const CodeBlock = ({ properties }: { properties: Record<string, unknown> }) => {
    // Filtra le proprietà non definite
    const definedProperties = Object.entries(properties).filter(([_, value]) => 
      value !== null && value !== undefined && value !== ''
    )

    if (definedProperties.length === 0) return null

    // Genera il codice CSS
    const cssCode = `
.${classData.name} {
${definedProperties.map(([key, value]) => `  ${toKebabCase(key)}: ${formatCSSValue(value)};`).join('\n')}
}`

    return (
      <div className="mb-4">
        <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#333]">
            <div className="flex items-center gap-2">
              <span className="text-[#f39c12] text-xs uppercase">css</span>
              <span className="text-[#666] text-xs">Styles</span>
            </div>
            <Button
              onClick={() => copyToClipboard(cssCode)}
              variant="secondary"
              size="small"
            >
              COPY
            </Button>
          </div>

          {/* Code content */}
          <div className="p-4 font-mono text-xs">
            <div className="text-[#e6e6e6]">
              <span className="text-[#9b703f]">.</span>
              <span className="text-[#cc7832]">{classData.name}</span>
              <span className="text-[#9b703f]"> {`{`}</span>
            </div>
            {definedProperties.map(([key, value]) => (
              <div key={key} className="ml-4">
                <span className="text-[#6a8759]">{toKebabCase(key)}</span>
                <span className="text-[#9b703f]">:</span>
                <span className="text-[#cc7832]"> {formatCSSValue(value)}</span>
                <span className="text-[#9b703f]">;</span>
              </div>
            ))}
            <div className="text-[#9b703f]">{`}`}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Info">
      <div className="max-h-[70vh] overflow-y-auto">
        <CodeBlock properties={allProperties} />
      </div>
    </Modal>
  )
}