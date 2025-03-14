/** @jsx h */
import { h } from 'preact';
import { ComponentChildren } from 'preact';
import { Text } from './Text';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationCardProps {
  /**
   * Tipo di notifica che determina i colori
   */
  type: NotificationType;

  /**
   * Titolo della notifica
   */
  title: string;

  /**
   * Contenuto della notifica
   */
  children?: ComponentChildren;

  /**
   * Azioni/bottoni da mostrare nella notifica (verranno posizionati su una linea separata)
   */
  actions?: ComponentChildren;

  /**
   * Classi CSS aggiuntive
   */
  className?: string;
}

/**
 * Componente per visualizzare notifiche e messaggi all'utente con uno stile uniforme
 */
export const NotificationCard = ({
  type,
  title,
  children,
  actions,
  className = '',
}: NotificationCardProps) => {
  // Mappa dei colori di background in base al tipo
  const bgColorMap = {
    success: 'var(--figma-color-bg-success-tertiary)',
    error: 'var(--figma-color-bg-danger)',
    warning: 'var(--figma-color-bg-warning-tertiary)',
    info: 'var(--figma-color-bg-info-tertiary)',
  };

  // Mappa dei colori del testo in base al tipo
  const textColorMap = {
    success: 'var(--figma-color-text-success)',
    error: 'var(--figma-color-text-onbrand)',
    warning: 'var(--figma-color-text-warning)',
    info: 'var(--figma-color-text-info)',
  };

  return (
    <div
      className={`p-3 rounded-md mt-2 ${className}`}
      style={{ backgroundColor: bgColorMap[type] }}
    >
      <div className="flex flex-col gap-2">
        <Text size="sm" weight="bold" className={`text-[${textColorMap[type]}]`}>
          {title}
        </Text>
        {children && (
          <div className={type === 'error' ? `text-[${textColorMap[type]}]` : ''}>{children}</div>
        )}
        {actions && <div className="mt-1">{actions}</div>}
      </div>
    </div>
  );
};
