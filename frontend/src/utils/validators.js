export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => password.length >= 8;

export const validatePhone = (phone) => /^\d{10,}$/.test(phone.replace(/\D/g, ''));

export const validateZip = (zip) => /^\d{5,}$/.test(zip);
