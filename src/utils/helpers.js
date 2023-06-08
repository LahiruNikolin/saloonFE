export function isDefined(value) {
  return typeof value !== "undefined" && value !== null;
}

export function isFunction(value) {
  return typeof value === "function";
}

export function convertTo12HourFormat(num) {
  if (num === 0) {
    return "12:00 am";
  } else if (num === 12) {
    return "12:00 pm";
  } else if (num > 12) {
    return (num - 12) + ":00 pm";
  } else {
    return num + ":00 am";
  }
}
