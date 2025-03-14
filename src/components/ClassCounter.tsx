/** @jsx h */
import { h } from 'preact';
import { Text } from './common/Text';
import { Button } from './common/Button';

interface ClassCounterProps {
  currentClasses: number;
  maxClasses: number;
  isPremium: boolean;
  onUpgradeClick: () => void;
  onActivateClick: () => void;
  hasExcessClasses?: boolean;
}

export const ClassCounter = ({
  currentClasses,
  maxClasses,
  isPremium,
  onUpgradeClick,
  onActivateClick,
  hasExcessClasses = false,
}: ClassCounterProps) => {
  // Calcola la percentuale di utilizzo
  // Se ci sono classi in eccesso, la barra è piena
  const usagePercentage = hasExcessClasses ? 100 : (currentClasses / maxClasses) * 100;

  // Determina lo stato di utilizzo
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = currentClasses >= maxClasses || hasExcessClasses;

  // Determina il colore della barra di progresso
  const getProgressBarColor = () => {
    if (isPremium) return 'var(--figma-color-bg-brand)';
    if (hasExcessClasses || isAtLimit) return 'var(--figma-color-bg-danger)';
    if (isNearLimit) return 'var(--figma-color-bg-warning)';
    return 'var(--figma-color-bg-success)';
  };

  if (isPremium) {
    return (
      <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-[var(--figma-color-bg-secondary)] rounded">
        <Text size="xs">Premium Plan - Unlimited Classes</Text>
      </div>
    );
  }

  // Determina il testo di stato
  const getStatusText = () => {
    if (hasExcessClasses) {
      return (
        <Text size="xs" className="text-[var(--figma-color-text-danger)]">
          Class limit exceeded
        </Text>
      );
    } else if (isAtLimit) {
      return (
        <Text size="xs" className="text-[var(--figma-color-text-danger)]">
          Class limit reached
        </Text>
      );
    } else if (isNearLimit) {
      return (
        <Text size="xs" className="text-[var(--figma-color-text-warning)]">
          Only {maxClasses - currentClasses}{' '}
          {maxClasses - currentClasses === 1 ? 'class' : 'classes'} remaining
        </Text>
      );
    }
    return null;
  };

  // Per il conteggio, mostriamo sempre massimo maxClasses/maxClasses quando ci sono classi in eccesso
  const displayClasses = hasExcessClasses ? maxClasses : Math.min(currentClasses, maxClasses);

  return (
    <div className="flex flex-col gap-1 my-2">
      {/* Titolo e stato */}
      <div className="flex justify-between items-center">
        <Text size="sm" weight="bold">
          Free plan
        </Text>
        {getStatusText()}
      </div>

      {/* Barra di progresso e contatore */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-[var(--figma-color-bg-disabled)] rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${usagePercentage}%`,
              backgroundColor: getProgressBarColor(),
            }}
          />
        </div>
        <Text size="xs" className="whitespace-nowrap">
          {displayClasses}/{maxClasses}
        </Text>
      </div>

      {/* Pulsanti */}
      <div className="flex items-center gap-2 mt-1">
        <Button onClick={onActivateClick} variant="secondary" size="small" fullWidth>
          Have a License?
        </Button>
        <Button onClick={onUpgradeClick} variant="primary" size="small" fullWidth>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
            <path d="M5 21h14" />
          </svg>
          Upgrade
        </Button>
      </div>
    </div>
  );
};
