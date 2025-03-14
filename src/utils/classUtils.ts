import { SavedClass } from '../types';
import { MAX_CLASSES } from '../config/featureFlags';

/**
 * Determina se una classe è attiva in base al piano dell'utente
 * @param classData La classe da verificare
 * @param allClasses Tutte le classi salvate
 * @param isPremium Se l'utente ha un piano premium
 * @returns true se la classe è attiva, false altrimenti
 */
export const isClassActive = (
  classData: SavedClass,
  allClasses: SavedClass[],
  isPremium: boolean,
): boolean => {
  // Nel piano premium, tutte le classi sono attive
  if (isPremium) return true;

  // Nel piano free, solo le prime MAX_CLASSES.FREE classi sono attive
  const index = allClasses.findIndex(
    (c) => c.name === classData.name && c.createdAt === classData.createdAt,
  );
  return index < MAX_CLASSES.FREE;
};

/**
 * Filtra le classi attive in base al piano dell'utente
 * @param classes Tutte le classi salvate
 * @param isPremium Se l'utente ha un piano premium
 * @returns Le classi attive
 */
export const getActiveClasses = (classes: SavedClass[], isPremium: boolean): SavedClass[] => {
  if (isPremium) return classes;
  return classes.slice(0, MAX_CLASSES.FREE);
};

/**
 * Filtra le classi inattive in base al piano dell'utente
 * @param classes Tutte le classi salvate
 * @param isPremium Se l'utente ha un piano premium
 * @returns Le classi inattive
 */
export const getInactiveClasses = (classes: SavedClass[], isPremium: boolean): SavedClass[] => {
  if (isPremium) return [];
  return classes.slice(MAX_CLASSES.FREE);
};

/**
 * Verifica se ci sono classi in eccesso rispetto al piano dell'utente
 * @param classes Tutte le classi salvate
 * @param isPremium Se l'utente ha un piano premium
 * @returns true se ci sono classi in eccesso, false altrimenti
 */
export const hasExcessClasses = (classes: SavedClass[], isPremium: boolean): boolean => {
  if (isPremium) return false;
  return classes.length > MAX_CLASSES.FREE;
};
