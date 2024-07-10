import {ingredients} from '../data/ingredients';

const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

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
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

export const findIngredient = itemName => {
  let ingredient = ingredients.find(
    ing => ing.name.toLowerCase() === itemName.toLowerCase(),
  );

  return ingredient;
};

export const findCompatibleUserItems = (item, ingredient, userItems) => {
  const compatibleIngredients =
    item?.compatibles || ingredient?.compatibles || [];

  return compatibleIngredients.filter(compatibleItemName =>
    userItems.some(
      userItem =>
        userItem.name.toLowerCase() === compatibleItemName.toLowerCase(),
    ),
  );
};
