const containsUpperCaseLetter = (str) => {
  if (!str) return false;
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let counter = 0;
  while (counter < str.length) {
    let ch = str.charAt(counter);

    if (isNaN(Number(ch)) && ch === ch.toUpperCase() && !format.test(ch)) {
      return true;
    }
    counter++;
  }
  return false;
};

const containsLowerCaseLetter = (str) => {
  if (!str) return false;
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let counter = 0;
  while (counter < str.length) {
    let ch = str.charAt(counter);

    if (isNaN(Number(ch)) && ch === ch.toLowerCase() && !format.test(ch)) {
      return true;
    }
    counter += 1;
  }
  return false;
};

export const containsNumber = (str) => {
  if (!str) return false;
  let counter = 0;
  while (counter < str.length) {
    let ch = str.charAt(counter);

    if (!isNaN(Number(ch))) {
      return true;
    }
    counter++;
  }
  return false;
};

export const isValidPassword = (pass) => {
  return !!(
    pass &&
    pass.length >= 8 &&
    containsUpperCaseLetter(pass) &&
    containsLowerCaseLetter(pass) &&
    containsNumber(pass)
  );
};

export const checkMaxLengthPassword = (pass) => {
  return pass?.length <= 32;
};

const setPasswordError = (form, messageError) => {
  form.setFields([
    {
      name: "password",
      errors: [messageError],
    },
    {
      name: "confirmPassword",
      errors: [messageError],
    },
  ]);
};

export const checkPassword = (form, formData, errors) => {
  const { notMach, maxLength, passwordRule } = errors;

  if (formData.password !== formData.confirmPassword) {
    setPasswordError(form, notMach);

    return false;
  } else {
    const isMaxLengthPasswordValid = checkMaxLengthPassword(formData.password);

    if (!isValidPassword(formData.password) || !isMaxLengthPasswordValid) {
      const messageError = isMaxLengthPasswordValid ? passwordRule : maxLength;

      setPasswordError(form, messageError);

      return false;
    }
  }

  return true;
};
