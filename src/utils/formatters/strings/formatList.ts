export function formatList(
  array: Array<string>,
  options: Intl.ListFormatOptions = {
    style: "long",
    type: "conjunction",
  },
) {
  const formatter = new Intl.ListFormat("en", options);
  return formatter.format(array);
}
