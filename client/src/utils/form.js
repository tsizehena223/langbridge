const loginRules = {
  email: {
    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
    message: "Invalid email address",
  },
  password: {
    minLength: 6,
    message: "Invalid password",
  },
};

const signupRules = {
  email: {
    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
    message: "Invalid email address",
  },
  country: {
    message: "No country selected",
  },
  language: {
    message: "No language selected",
  },
  username: {
    minLength: 4,
    message: "Invalid username",
  },
  password: {
    minLength: 6,
    message: "Password must contain at least 6 characters",
  },
  passwordConfirm: {
    match: "password",
    message: "Mismatched password",
  },
};

const editRules = {
  username: {
    minLength: 4,
    message: "Invalid username",
  },
  language: {
    message: "No language selected",
  },
  password: {
    optional: true,
    minLength: 6,
    message: "Password must contain at least 6 characters",
  },
  passwordConfirm: {
    optional: true,
    match: "password",
    message: "Mismatched password",
  },
};

const validateForm = (formData, validationRules) => {
  const errors = {};

  for (const field in validationRules) {
    const fieldValue = formData[field];
    const rules = validationRules[field];

    if (!rules.optional && !fieldValue) {
      errors[field] = rules.message;
    }

    if (
      (fieldValue || !rules.optional) &&
      rules.minLength &&
      fieldValue.length < rules.minLength
    ) {
      errors[field] = rules.message;
    }

    if (rules.match && fieldValue != formData[rules.match]) {
      errors[field] = rules.message;
    }

    if (rules.pattern && !rules.pattern.test(fieldValue)) {
      errors[field] = rules.message;
    }
  }

  return errors;
};

export { loginRules, signupRules, editRules, validateForm };
