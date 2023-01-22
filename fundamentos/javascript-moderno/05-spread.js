const user = {
  fisrtName: 'Alessandre',
  lastName: 'Livramento',
  age: 48,
  instagram: 'alessandre_',
  skills: ['back-end', 'front-end', 'mobile', 'UI/UX'],
  active: false
}

// Spread operator

// 1º Forma de alterar a propriedade active
// user.active = true // Altera a propriedade active do objeto user

// 2º Forma de alterar a propriedade active
// Object.assign(user, { active: true }) // assign faz o merge de dois objetos

// 3º Forma de alterar a propriedade active, assim respeitamos a imutabilidade de como o react trabalha.

const updateUser = {
  skills: [...user.skills, 'Marketing'],
  ...user,
  active: true
}
console.log(updateUser)

const technologies = ['React', 'Node.js', 'TypeScript', 'React Native']

const [mostUsed] = technologies

console.log(mostUsed)
