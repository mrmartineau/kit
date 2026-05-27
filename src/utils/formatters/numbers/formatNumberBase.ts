export const formatNumberBase = (
  value: string | number,
  options?: Intl.NumberFormatOptions,
): string => {
  if (value == undefined || value === "" || value === null) {
    throw TypeError("formatNumber: Value is not defined");
  }
  if (typeof value === "boolean" || typeof value === "object") {
    throw Error("formatNumber: Invalid number format");
  }

  if (typeof value === "string") {
    value = parseFloat(value);
    if (isNaN(value)) {
      throw new Error("formatNumber: Invalid number format");
    }
  }

  return new Intl.NumberFormat("en-GB", options).format(value);
};
