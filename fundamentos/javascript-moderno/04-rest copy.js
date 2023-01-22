const user = {
  fisrtName: 'Alessandre',
  lastName: 'Livramento',
  full_name: 'Nome completo',
  age: 48,
  instagram: 'alessandre_',
  skills: ['back-end', 'front-end', 'mobile', 'UI/UX']
}

// Rest operator -> sempre tem que ser a última variável
const { fisrtName, skills, ...restoUser } = user
const [primary, secondary, ...restoSkills] = skills
console.log(restoUser)
console.log(restoSkills)
