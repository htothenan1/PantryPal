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
