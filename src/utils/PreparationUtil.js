const removeSpecialSymbols = (string) => {
  const lower = string.toString().toLowerCase();
  const upper = string.toString().toUpperCase();

  let result = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < lower.length; ++i) {
    if (lower[i] !== upper[i] || lower[i].match(/[.,0-9 ]/)) {
      result += string[i];
    }
  }
  return result;
};

module.exports = {
  removeSpecialSymbols,
};
