// Registration errors
module.exports.signUpErrors = (err) => {
  let errors = { pseudo: '', email: '', password: '' };
  if (err.message.includes('email')) {
    errors.email = 'Invalid email';
  }
  if (err.message.includes('password')) {
    errors.password = 'Password must be at least 6 characters long';
  }

  // Pseudo and email must be unique
  // Error code 11000 indicates an existing entry in the database
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
    errors.pseudo = "This username is already taken";
  }

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
    errors.email = "This email is already registered";
  }

  return errors;
};

// Login Errors
module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) {
    errors.email = "Unknown email";
  }
  if (err.message.includes("password")) {
    errors.password = "Incorrect password";
  }
  return errors;
};

// Upload errors
module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes('Invalid file format. Only PNG, JPG, and JPEG files are allowed.')) {
    errors.format = "Incompatible format";
  }

  if (err.message.includes('File size exceeds the maximum limit (500 KB).')) {
    errors.maxSize = "The file exceeds 500 KB";
  }
  return errors;
};
