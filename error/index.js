const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Funciones de validación

function validateString(string, explain = "string") {
  if (typeof string !== "string")
    throw new TypeError(`${explain} is not a string`);
}

function validateStringNotEmptyOrBlank(string, explain = "Campo") {
  validateString(string, explain);

  if (!string.length) throw new Error(`${explain} vació`);

  if (!string.trim().length) throw new Error(`${explain} is blank`);
}

function validateStringNotEmptyNoSpaces(string, explain = "campo") {
  validateString(string, explain);

  if (!string.length) throw new Error(`${explain} sin rellenar `);

  if (string.includes(" ")) throw new Error(`${explain} has spaces`);
}

function validateJwt(token) {
  validateString(token, "token");

  const parts = token.split(".");

  if (parts.length !== 3 || !parts.every((part) => part.length > 0))
    throw new Error("invalid token format");

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

function validatePassword(password, explain = "Contraseña") {
  validateStringNotEmptyNoSpaces(password, explain);

  if (password.length < 4)
    throw new Error(`la ${explain} debe tener al menos 4 caracteres`);
}

function validateUsername(username) {
  validateStringNotEmptyNoSpaces(username, "username");

  if (username.length < 4)
    throw new Error("username debe tener al menos 4 caracteres");
}

function validateFunction(func, explain = "function") {
  if (typeof func !== "function")
    throw new TypeError(`${explain} is not a function`);
}

function validateDate(date, explain = "date") {
  if (!(date instanceof Date)) throw new TypeError(`${explain} is not Date`);
}

function validateNumber(number, explain = "number") {
  if (typeof number !== "number")
    throw new TypeError(`${explain} is not a number`);
}

function validatePositiveInteger(number, explain = "number") {
  validateNumber(number, explain);

  if (!Number.isInteger(number))
    throw new Error(`${explain} is not an integer`);

  if (number < 0 || number > 150)
    throw new RangeError(`${explain} is lower than 0 or greater than 150`);
}

function validateEmail(email, explain = "email") {
  if (!EMAIL_REGEX.test(email)) throw new Error(`${explain} no es un email`);
}

function validateId(id, explain = "id") {
  validateString(id, explain);

  if (id.length !== 31 && id.length !== 24) throw new Error("id length is not 24 characters");
}
function validateTel(phone) {
  const phoneRegex = /^\+?[1-9]\d{8,14}$/; // Ejemplo de regex para formato E.164 internacional
  if (!phoneRegex.test(phone)) {
    throw new Error("El número de teléfono no es válido");
  }
}
function validateDNI(dni) {
  const dniRegex = /^\d{8}[A-Z]$/; // Ejemplo de regex para DNI español
  if (!dniRegex.test(dni)) {
    throw new Error("El DNI no es válido");
  }
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
  validateTel,
  validateDNI,
};
