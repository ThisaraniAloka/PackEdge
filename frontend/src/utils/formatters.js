export const formatDate = (date) => new Date(date).toLocaleDateString();

export const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const truncate = (str, length = 50) =>
  str.length > length ? str.substring(0, length) + '...' : str;
