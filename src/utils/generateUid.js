export function generateUID(length = 24) {
  const bytes = crypto.getRandomValues(new Uint8Array(Math.ceil(length / 2)));


  let uid = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  // Si la cadena es más larga que la longitud deseada, la recortamos
  if (uid.length > length) {
    uid = uid.substring(0, length);
  }

  return uid;
}
