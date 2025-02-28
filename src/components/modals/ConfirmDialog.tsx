/** @jsx h */
import { h, VNode } from 'preact';
import { Text } from '../common/Text';
import { Modal, ModalFooterButton } from './Modal';

// Props per il Dialog di conferma
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  children?: VNode | VNode[] | string | null;
  confirmText?: string;
  variant?: 'danger' | 'warning' | 'success' | 'info';
  showCancelButton?: boolean;
  cancelButtonText?: string;
  confirmDisabled?: boolean;
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
  cancelButtonText = 'Cancel',
  confirmDisabled = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  // Configurazione dei bottoni per il footer
  const primaryOrDangerButton: ModalFooterButton = {
    label: confirmText,
    onClick: onConfirm,
    variant: variant === 'danger' ? 'danger' : 'primary',
    disabled: confirmDisabled,
  };

  // Configurazione del bottone secondario (opzionale)
  const secondaryButton: ModalFooterButton | undefined = showCancelButton
    ? {
        label: cancelButtonText,
        onClick: onClose,
        variant: 'secondary',
      }
    : undefined;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      primaryButton={variant !== 'danger' ? primaryOrDangerButton : undefined}
      dangerButton={variant === 'danger' ? primaryOrDangerButton : undefined}
      secondaryButton={secondaryButton}
    >
      <div className="flex flex-col gap-2">
        {message && <Text size="base">{message}</Text>}
        {children}
      </div>
    </Modal>
  );
}
