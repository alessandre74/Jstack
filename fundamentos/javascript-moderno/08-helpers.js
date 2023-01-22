// Exemplo de Includes - É Casesensitive, ou seja, difrere de maiúscula e minúscula.
const tech = 'Node.js'
const array = ['Node.js', 'React', 'TypeScript']

// Em string procura por partes ou toda string.
const includesString = tech.includes('Node')

// Em array procura exatamente a string completa.
const includesArray = array.includes('Node.js')

console.log({ includesArray })

// Exemplo de startsWith - Verifica a string começa com a sequência de carcteres informada.

const startsWith = tech.startsWith('No')

console.log({ startsWith })

// Exemplo de endWith - Verifica a string termina com a sequência de carcteres informada.

const endsWith = tech.endsWith('js')
console.log({ endsWith })
