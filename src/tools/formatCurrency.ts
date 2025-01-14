export function formatCurrency(
  value?: number,
  category?: string,
  isView?: true,
): string {
  if (!value) return "TBA";

  const units = ["", "K", "M", "B", "T"];
  let number = parseFloat(String(value));

  if (number === 0) return "";

  let unitIndex = 0;
  while (number >= 1000 && unitIndex < units.length - 1) {
    number /= 1000;
    unitIndex += 1;
  }

  const formattedNumber = Number.isInteger(number)
    ? number.toString()
    : parseFloat(number.toFixed(3)).toString().replace(".", ",");

  if (category === "NFT Artes" && isView) {
    return `${formattedNumber}${units[unitIndex]} - NFTs`;
  }

  return `US$ ${formattedNumber}${units[unitIndex]}`;
}
