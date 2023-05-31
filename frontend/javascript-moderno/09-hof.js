const array = [
  {
    name: 'iPhone',
    price: 5000,
    quantity: 2
  },
  {
    name: 'MacBook Pto',
    price: 20000,
    quantity: 1
  },
  {
    name: 'Magic Mouse',
    price: 1000,
    quantity: 5
  }
]

// .find - retorna o primeiro elemento que a condição for truthy.
const find = array.find((product) => product.price > 1000)
console.log({ find })

// .findIndex - Retorna o indíce do primeiro elemento que a condição for truthy.
const findIndex = array.findIndex((product) => product.name === 'Magic Mouse')
console.log({ findIndex })

// .some - se pelo menos um return da iteração for truthy, ele retorna true.
const some = array.some((product) => product.price < 1000)
console.log({ some })

//.every - se todos os returns das iterações forem truthy, o método irá retornar true. Se pelo menos um for falsy, ele irá retornar false.
const every = array.every((product) => product.price > 1000)
console.log({ every })

//.map - retorna um novo array com valores atualizados de acordo com o return de cada iteração.
const map = array.map((product) => ({
  ...product,
  subtotal: product.quantity * product.price
}))
console.log({ map })

// .filter -  retorna uma array com a lista de valores que durante a sua iteração retornaram um valor truthy.

const filter = array.filter((product) => product.quantity > 1)
console.log({ filter })

// .reduce - executa a função de callback para cada item da Array. Um valor especial existe nessa função de callback, ele é chamado de acumulador, mas é na verdade apenas o retorno da iteração anterior.

const reduce = array.reduce((accumulator, product) => {
  return accumulator + product.price * product.quantity
}, 0)
console.log({ reduce })
