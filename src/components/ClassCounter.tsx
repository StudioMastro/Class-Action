/** @jsx h */
import { h } from 'preact'
import { Text } from './common/Text'
import { Button } from './common/Button'

interface ClassCounterProps {
  currentClasses: number;
  maxClasses: number;
  isPremium: boolean;
  onUpgradeClick: () => void;
  onActivateClick: () => void;
}

export const ClassCounter = ({
  currentClasses,
  maxClasses,
  isPremium,
  onUpgradeClick,
  onActivateClick
}: ClassCounterProps) => {
  // Calcola la percentuale di utilizzo
  const usagePercentage = (currentClasses / maxClasses) * 100;
  
  // Determina lo stato di utilizzo
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = currentClasses === maxClasses;

  // Determina il colore della barra di progresso
  const getProgressBarColor = () => {
    if (isPremium) return 'var(--figma-color-bg-brand)';
    if (isAtLimit) return 'var(--figma-color-bg-danger)';
    if (isNearLimit) return 'var(--figma-color-bg-warning)';
    return 'var(--figma-color-bg-success)';
  };

  if (isPremium) {
    return (
      <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-[var(--figma-color-bg-secondary)] rounded">
        <Text size="xs">
          Premium Plan - Unlimited Classes
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 mt-2">
      {/* Barra di progresso e contatore */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-[var(--figma-color-bg-disabled)] rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${usagePercentage}%`,
              backgroundColor: getProgressBarColor()
            }}
          />
        </div>
        <Text size="xs" className="whitespace-nowrap">
          {currentClasses}/{maxClasses} classes
        </Text>
      </div>

      {/* Messaggio di stato e pulsanti */}
      <div className="flex flex-col gap-2">
        <Text 
          size="xs"
          className={isAtLimit ? 'text-[var(--figma-color-text-danger)]' : undefined}
        >
          {isAtLimit ? 'Class limit reached' : 
           isNearLimit ? `Only ${maxClasses - currentClasses} classes remaining` :
           'Free Plan'}
        </Text>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={onUpgradeClick}
            variant="primary"
            size="small"
            fullWidth
          >
            Upgrade to Premium
          </Button>
          <Button
            onClick={onActivateClick}
            variant="secondary"
            size="small"
            fullWidth
          >
            Have a License?
          </Button>
        </div>
      </div>
    </div>
  );
}; 