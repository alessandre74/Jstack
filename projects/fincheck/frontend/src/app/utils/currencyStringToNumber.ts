export function currencyStringToNumber(value: string | number) {
  return typeof value === 'number' ? value : Number(value.replace(/\./g, '').replace(',', '.'))
}
