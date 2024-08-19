function formatDate(inputDate) {
  const [year, month, day] = inputDate.split("-");
  const shortYear = year.slice(-2);
  return `${day}/${month}/${shortYear}`;
}
 export function getYear(inputDate) {
  
  const [year, month, day] = inputDate.split("-");

  return `${year}`;
}
function formatHour(inputDate) {
  const [hora, min] = inputDate.split(":");

  return `${hora}:${min}`;
}
function resetData(inputdata) {
  const [fecha, hora] = inputdata.split(" ");
  const formatoFecha = fecha.slice(2);

  return `${formatDate(formatoFecha)} a las ${hora} `;
}
export default { formatDate, formatHour, resetData };
