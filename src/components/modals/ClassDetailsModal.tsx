/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Button } from '../common/Button';
import { Modal } from './Modal';
import { emit, on } from '@create-figma-plugin/utilities';
import type { SavedClass } from '../../types';

// Props per il Modal dei dettagli della classe
interface ClassDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: SavedClass | null;
}

// Funzione helper per formattare i valori in stile CSS
function formatCSSValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') {
    // Aggiungi 'px' ai valori numerici che rappresentano dimensioni
    if (
      [
        'width',
        'height',
        'minWidth',
        'maxWidth',
        'minHeight',
        'maxHeight',
        'padding',
        'spacing',
      ].some((dim) => String(value).includes(dim))
    ) {
      return `${value}px`;
    }
    // Converti opacity in percentuale
    if (String(value).includes('opacity')) {
      return `${value * 100}%`;
    }
    return value.toString();
  }
  if (typeof value === 'boolean') return value ? '1' : '0';
  if (Array.isArray(value)) return `[${value.join(', ')}]`;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

// Funzione helper per convertire camelCase in kebab-case
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Funzione per convertire un nome qualsiasi in un nome di classe CSS valido
function toCssClassName(name: string): string {
  // Rimuovi i punti (già vietati nell'input)
  let cssName = name.replace(/\./g, '');

  // Sostituisci spazi e caratteri non validi con trattini
  cssName = cssName.replace(/\s+/g, '-');

  // Rimuovi caratteri non validi per i selettori CSS
  cssName = cssName.replace(/[^\w-]/g, '');

  // Assicurati che non inizi con un numero o un trattino
  if (/^[0-9-]/.test(cssName)) {
    cssName = 'class-' + cssName;
  }

  // Se il nome è vuoto dopo la pulizia, usa un fallback
  if (!cssName) {
    cssName = 'figma-class';
  }

  return cssName.toLowerCase();
}

// Funzione per copiare il testo negli appunti
function copyToClipboard(text: string): void {
  try {
    // Crea un elemento textarea temporaneo
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    // Seleziona e copia il testo
    textarea.select();
    document.execCommand('copy');

    // Rimuovi l'elemento temporaneo
    document.body.removeChild(textarea);

    // Notifica l'utente
    emit('SHOW_NOTIFICATION', 'Copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text:', err);
    emit('SHOW_ERROR', 'Failed to copy text');
  }
}

export function ClassDetailsModal({ isOpen, onClose, classData }: ClassDetailsModalProps) {
  if (!isOpen || !classData) return null;

  const [resolvedColors, setResolvedColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Reset resolved colors when modal opens with new class data
    setResolvedColors({});

    // Collect style IDs that need to be resolved
    const styleIds: { [key: string]: string } = {};

    if (classData.styleReferences?.fillStyleId) {
      const fillStyleId = String(classData.styleReferences.fillStyleId);
      if (fillStyleId.startsWith('S:')) {
        styleIds.backgroundColor = fillStyleId;
      }
    }

    if (classData.styleReferences?.strokeStyleId) {
      const strokeStyleId = String(classData.styleReferences.strokeStyleId);
      if (strokeStyleId.startsWith('S:')) {
        styleIds.borderColor = strokeStyleId;
      }
    }

    // Only request color resolution if we have style IDs to resolve
    if (Object.keys(styleIds).length > 0) {
      // Listen for resolved colors
      const removeListener = on('RESOLVED_STYLE_COLORS', (msg) => {
        setResolvedColors(msg.resolvedColors);
      });

      // Request color resolution
      emit('RESOLVE_STYLE_COLORS', { styleIds });

      // Cleanup listener when component unmounts or modal closes
      return () => removeListener();
    }

    return () => {}; // Add default cleanup function
  }, [classData]);

  const allProperties: { [key: string]: unknown } = {
    // Layout properties
    width: classData.width,
    height: classData.height,
    minWidth: classData.minWidth,
    maxWidth: classData.maxWidth,
    minHeight: classData.minHeight,
    maxHeight: classData.maxHeight,
    display: classData.layoutMode === 'NONE' ? 'block' : 'flex',
    ...(classData.layoutMode !== 'NONE' && classData.layoutProperties
      ? {
          flexDirection: classData.layoutMode === 'HORIZONTAL' ? 'row' : 'column',
          flexWrap: classData.layoutProperties.layoutWrap === 'WRAP' ? 'wrap' : 'nowrap',
          justifyContent: classData.layoutProperties.primaryAxisAlignItems
            .toLowerCase()
            .replace('_', '-'),
          alignItems: classData.layoutProperties.counterAxisAlignItems.toLowerCase(),
          gap: classData.layoutProperties.itemSpacing,
          rowGap: classData.layoutProperties.counterAxisSpacing,
          paddingTop: classData.layoutProperties.padding.top,
          paddingRight: classData.layoutProperties.padding.right,
          paddingBottom: classData.layoutProperties.padding.bottom,
          paddingLeft: classData.layoutProperties.padding.left,
          position: classData.layoutProperties.layoutPositioning.toLowerCase(),
        }
      : {}),

    // Appearance properties
    ...(classData.appearance
      ? {
          opacity: classData.appearance.opacity,
          mixBlendMode: classData.appearance.blendMode.toLowerCase(),
          borderRadius: classData.appearance.cornerRadius,
          borderWidth: classData.appearance.strokeWeight,
          borderStyle: classData.appearance.dashPattern.length > 0 ? 'dashed' : 'solid',
          borderPosition: classData.appearance.strokeAlign.toLowerCase(),
        }
      : {}),

    // Style properties
    ...(() => {
      const styleProps: { [key: string]: unknown } = {};

      // Gestione del background-color
      if (
        classData.styles?.fills &&
        Array.isArray(classData.styles.fills) &&
        classData.styles.fills.length > 0
      ) {
        styleProps.backgroundColor = classData.styles.fills[0];
      } else if (classData.styleReferences?.fillStyleId) {
        const fillStyleId = String(classData.styleReferences.fillStyleId);
        styleProps.backgroundColor = resolvedColors.backgroundColor || `[style-id: ${fillStyleId}]`;
      }

      // Gestione del border-color
      if (
        classData.styles?.strokes &&
        Array.isArray(classData.styles.strokes) &&
        classData.styles.strokes.length > 0
      ) {
        styleProps.borderColor = classData.styles.strokes[0];
      } else if (classData.styleReferences?.strokeStyleId) {
        const strokeStyleId = String(classData.styleReferences.strokeStyleId);
        styleProps.borderColor = resolvedColors.borderColor || `[style-id: ${strokeStyleId}]`;
      }

      // Gestione del box-shadow
      if (
        classData.styles?.effects &&
        Array.isArray(classData.styles.effects) &&
        classData.styles.effects.length > 0
      ) {
        styleProps.boxShadow = classData.styles.effects[0];
      } else if (classData.styleReferences?.effectStyleId) {
        const effectStyleId = String(classData.styleReferences.effectStyleId);
        styleProps.boxShadow = `[style-id: ${effectStyleId}]`;
      }

      return styleProps;
    })(),
  };

  const CodeBlock = ({ properties }: { properties: Record<string, unknown> }) => {
    // Filter out undefined properties
    const definedProperties = Object.entries(properties).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    );

    if (definedProperties.length === 0) return null;

    // Converti il nome della classe in un formato CSS valido
    const cssClassName = toCssClassName(classData.name);

    // Genera il codice CSS
    const cssCode = `
.${cssClassName} {
${definedProperties.map(([key, value]) => `  ${toKebabCase(key)}: ${formatCSSValue(value)};`).join('\n')}
}`;

    return (
      <div className="mb-4">
        <div className="bg-[var(--figma-color-bg-secondary)] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--figma-color-border)]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--figma-color-text-brand)] text-xs uppercase">css</span>
              <span className="text-[var(--figma-color-text-secondary)] text-xs">Styles</span>
            </div>
            <Button onClick={() => copyToClipboard(cssCode)} variant="secondary" size="small">
              COPY
            </Button>
          </div>

          {/* Code content */}
          <div className="p-4 font-mono text-xs">
            <div className="text-[var(--figma-color-text)]">
              <span className="text-[var(--figma-color-text-secondary)]">.</span>
              <span className="text-[var(--figma-color-text-brand)]">{cssClassName}</span>
              <span className="text-[var(--figma-color-text-secondary)]"> {`{`}</span>
            </div>
            {definedProperties.map(([key, value]) => (
              <div key={key} className="ml-4">
                <span className="text-[var(--figma-color-text-component)]">{toKebabCase(key)}</span>
                <span className="text-[var(--figma-color-text-secondary)]">:</span>
                <span className="text-[var(--figma-color-text-brand)]">
                  {' '}
                  {formatCSSValue(value)}
                </span>
                <span className="text-[var(--figma-color-text-secondary)]">;</span>
              </div>
            ))}
            <div className="text-[var(--figma-color-text-secondary)]">{`}`}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Info"
      secondaryButton={{
        label: 'Close',
        onClick: onClose,
      }}
    >
      <div>
        {/* Aggiungiamo informazioni sul tipo di nodo di origine */}
        {classData.sourceNodeType && (
          <div className="mb-4 p-3 bg-[var(--figma-color-bg-secondary)] rounded-lg">
            <div className="text-sm font-medium mb-1">Source Node Type</div>
            <div className="text-xs text-[var(--figma-color-text-secondary)]">
              {classData.sourceNodeType}
            </div>
          </div>
        )}

        {/* Aggiungiamo informazioni sui Variable Modes se presenti */}
        {classData.variableModes && Object.keys(classData.variableModes).length > 0 && (
          <div className="mb-4 p-3 bg-[var(--figma-color-bg-secondary)] rounded-lg">
            <div className="text-sm font-medium mb-1">Variable Modes</div>
            <div className="text-xs">
              {Object.entries(classData.variableModes).map(([collectionId, modeId]) => (
                <div key={collectionId} className="flex justify-between mb-1">
                  <span className="text-[var(--figma-color-text-secondary)]">
                    Collection: {collectionId.substring(0, 8)}...
                  </span>
                  <span className="text-[var(--figma-color-text-brand)]">
                    Mode: {modeId.substring(0, 8)}...
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <CodeBlock properties={allProperties} />
      </div>
    </Modal>
  );
}
