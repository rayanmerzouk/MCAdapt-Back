export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
