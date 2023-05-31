// 1º Exemplo
function minhaFunction() {
  this.name = 'Alessandre'

  const minhaArrowFuntion = () => {
    this.lastname = 'Livramento'
  }

  minhaArrowFuntion()
}

console.log(new minhaFunction())
console.log(this)

// 2º Exemplo
function soma1(primeiroParametro, ...argumentos) {
  console.log(arguments) // Exibe como objeto
  console.log(Object.values(arguments)) // Exibe como array utilizando Object.values()
  console.log(argumentos) // Exibe como array pois utilizamos o parâmetro da função com spread operator
  // Podemos também pegar o primeiro parâmetro separado do restante, só definir na função uma variável separada do spred operator.
  console.log({ primeiroParametro })
  console.log({ arguments })
}

const soma2 = () => {
  console.log(arguments) // Com arrow function o contexto é do node
}

soma1(1, 2, 3, 4, 5, 6, 7, 'Mike')
soma2(1, 2, 3, 4, 5, 6, 7, 'Mike')

//3º Exemplo - Diferença de retornar arrow functions com chaves ou parenteses.

// sintaxe onde pode ter um corpo com varias instruções.
const soma3 = () => {
  return 'Hello world!'
}

// Short sintaxe, onde só à uma instrução.

const soma4 = () => 'Hello world!'

// Com parenteses onde poemos quebrar em várias linhas
const algumNumero = 10
const soma5 = () => (algumNumero >= 10 ? 'Maior igual a 10' : 'Menor que 10')

// Retornando um objeto com parenteses sem o return
const getUser = () => ({ id: '123', name: 'Mike' })

console.log(soma3())
console.log(soma4())
console.log(soma5())
console.log(getUser())
