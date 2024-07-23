const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Funciones de validación

function validateString(string, explain = "string") {
  if (typeof string !== "string")
    return new TypeError(`${explain} is not a string`);
}

function validateStringNotEmptyOrBlank(string, explain = "string") {
  validateString(string, explain);

  if (!string.length) return new Error(`${explain} is empty`);

  if (!string.trim().length) return new Error(`${explain} is blank`);
}

function validateStringNotEmptyNoSpaces(string, explain = "string") {
  validateString(string, explain);

  if (!string.length) return new Error(`${explain} is empty`);

  if (string.includes(" ")) return new Error(`${explain} has spaces`);
}

function validateJwt(token) {
  validateString(token, "token");

  const parts = token.split(".");

  if (parts.length !== 3 || !parts.every((part) => part.length > 0))
    return new Error("invalid token format");

  const [, b64Payload] = parts;

  const jsonPayload = atob(b64Payload);

  const payload = JSON.parse(jsonPayload);

  const { exp } = payload;

  const now = Math.round(Date.now() / 1000);

  if (now > exp) return new Error("token expired");
}

function isJwtValid(token) {
  try {
    validateJwt(token);
    return true;
  } catch (error) {
    return false;
  }
}

function validatePassword(password, explain = "password") {
  validateStringNotEmptyNoSpaces(password, explain);

  if (password.length < 4)
    return new Error(`${explain} length is lower than 4`);
}

function validateUsername(username) {
  validateStringNotEmptyNoSpaces(username, "username");

  if (username.length < 4)
    return new Error("username length is lower than 4");
}

function validateFunction(func, explain = "function") {
  if (typeof func !== "function")
    return new TypeError(`${explain} is not a function`);
}

function validateDate(date, explain = "date") {
  if (!(date instanceof Date)) return new TypeError(`${explain} is not Date`);
}

function validateNumber(number, explain = "number") {
  if (typeof number !== "number")
    return new TypeError(`${explain} is not a number`);
}

function validatePositiveInteger(number, explain = "number") {
  validateNumber(number, explain);

  if (!Number.isInteger(number))
    return new Error(`${explain} is not an integer`);

  if (number < 0 || number > 150)
    return new RangeError(`${explain} is lower than 0 or greater than 150`);
}

function validateEmail(email, explain = "email") {
  if (!EMAIL_REGEX.test(email))
    return new Error(`${explain} is not an email`);
}

function validateId(id, explain = "id") {
  validateString(id, explain);

  if (id.length !== 24) return new Error("id length is not 24 characters");
}

export default {
  validateString,
  validateStringNotEmptyOrBlank,
  validateStringNotEmptyNoSpaces,
  validateJwt,
  isJwtValid,
  validatePassword,
  validateUsername,
  validateFunction,
  validateDate,
  validateNumber,
  validatePositiveInteger,
  validateEmail,
  validateId,
};
