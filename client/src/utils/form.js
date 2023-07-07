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

const validateForm = (formData, validationRules) => {
  const errors = {};

  for (const field in validationRules) {
    const fieldvValue = formData[field];
    const rules = validationRules[field];

    if (!fieldvValue) {
      errors[field] = rules.message;
    }

    if (rules.minLength && fieldvValue.length < rules.minLength) {
      errors[field] = rules.message;
    }

    if (rules.match && fieldvValue != formData[rules.match]) {
      errors[field] = rules.message;
    }

    if (rules.pattern && !rules.pattern.test(fieldvValue)) {
      errors[field] = rules.message;
    }
  }

  return errors;
};

export { loginRules, signupRules, validateForm };
