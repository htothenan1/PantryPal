import {ingredients} from '../../screens/data/ingredients';

export const lvlToXp = lvl => {
  if (lvl === 1) {
    return 1000;
  }
  if (lvl === 2) {
    return 2000;
  }
  if (lvl === 3) {
    return 3000;
  }
  if (lvl === 4) {
    return 4000;
  }
};

export const getBackgroundColor = daysRemaining => {
  if (daysRemaining >= 5) {
    return 'black';
  } else if (daysRemaining >= 2 && daysRemaining <= 4) {
    return 'black';
  } else {
    return '#d90429';
  }
};

export const capitalizeWords = str => {
  if (!str) {
    return '';
  }
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

export const findIngredient = itemName => {
  if (typeof itemName !== 'string') {
    return null;
  }

  let ingredient = ingredients.find(
    ing => ing.name && ing.name.toLowerCase() === itemName.toLowerCase(),
  );

  return ingredient;
};

export const calculateDaysUntilExpiration = expDate => {
  const currentDate = new Date();
  const expirationDate = new Date(expDate);
  const timeDiff = expirationDate.getTime() - currentDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
