/** @jsx h */
import { h, Fragment, VNode } from 'preact';
import { Text } from '../common/Text';
import { IconButton } from '../common';
import { Button } from '../common/Button';
import { Icon, Close } from '../common/icons';

// Tipo per i bottoni del footer
export type ModalFooterButton = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

// Props per il Modal base
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: VNode | VNode[] | string | null;
  // Nuove props per il footer
  primaryButton?: ModalFooterButton;
  secondaryButton?: ModalFooterButton;
  dangerButton?: ModalFooterButton;
  hideFooter?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  primaryButton,
  secondaryButton,
  dangerButton,
  hideFooter = false,
}: ModalProps) {
  if (!isOpen) return null;

  // Determina se mostrare il footer
  const showFooter = !hideFooter && (primaryButton || secondaryButton || dangerButton);

  return (
    <Fragment>
      <style>
        {`
          :root {
            overflow: hidden !important;
          }
        `}
      </style>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div
          className="scrollable-container relative z-10 w-full max-w-[300px] max-h-[90vh] bg-[var(--figma-color-bg)] rounded-lg shadow-lg"
          style={{ marginTop: '2vh', marginBottom: '2vh' }}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between py-2 px-4 border-b border-[var(--figma-color-border)] bg-[var(--figma-color-bg)]">
            <div>
              <Text size="base" weight="bold">
                {title}
              </Text>
            </div>
            <IconButton onClick={onClose} variant="secondary" size="small">
              <Icon icon={Close} size="sm" />
            </IconButton>
          </div>
          <div
            className="scrollable-content modal-scrollbar-compensation"
            style={{
              maxHeight: 'calc(90vh - 120px)',
              '--padding-x': '16px' /* Padding orizzontale */,
              '--padding-y': '16px' /* Padding verticale */,
            }}
          >
            {children}
          </div>

          {/* Footer standardizzato */}
          {showFooter && (
            <div className="sticky bottom-0 z-20 flex justify-end gap-2 px-4 py-3 border-t border-[var(--figma-color-border)] bg-[var(--figma-color-bg)]">
              {secondaryButton && (
                <Button
                  onClick={secondaryButton.onClick}
                  variant={secondaryButton.variant || 'secondary'}
                  size={secondaryButton.size || 'medium'}
                  disabled={secondaryButton.disabled}
                >
                  {secondaryButton.label}
                </Button>
              )}
              {dangerButton && (
                <Button
                  onClick={dangerButton.onClick}
                  variant={dangerButton.variant || 'danger'}
                  size={dangerButton.size || 'medium'}
                  disabled={dangerButton.disabled}
                >
                  {dangerButton.label}
                </Button>
              )}
              {primaryButton && (
                <Button
                  onClick={primaryButton.onClick}
                  variant={primaryButton.variant || 'primary'}
                  size={primaryButton.size || 'medium'}
                  disabled={primaryButton.disabled}
                >
                  {primaryButton.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
