/** @jsx h */
import { h } from 'preact';
import { Text, Button, NotificationCard } from './common';

interface ExcessClassesNotificationProps {
  totalClasses: number;
  maxClasses: number;
  onUpgradeClick: () => void;
}

export const ExcessClassesNotification = ({
  totalClasses,
  maxClasses,
  onUpgradeClick,
}: ExcessClassesNotificationProps) => {
  const excessClasses = totalClasses - maxClasses;

  return (
    <NotificationCard
      type="error"
      title="Free plan limit exceeded"
      actions={
        <Button onClick={onUpgradeClick} variant="secondary" size="small">
          Upgrade to Premium
        </Button>
      }
    >
      <Text size="sm" className="text-[var(--figma-color-text-onbrand)]">
        You have {totalClasses} classes but the free plan only allows {maxClasses} active classes.
        The first {maxClasses} classes are active, while {excessClasses}{' '}
        {excessClasses === 1 ? 'class is' : 'classes are'} disabled.
      </Text>
    </NotificationCard>
  );
};
