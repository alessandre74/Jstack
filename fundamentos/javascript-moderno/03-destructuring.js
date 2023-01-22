const user = {
  fisrtName: 'Alessandre',
  lastName: 'Livramento',
  full_name: 'Nome completo',
  age: 48,
  instagram: 'alessandre_',
  skills: ['back-end', 'front-end', 'mobile', 'UI/UX']
}

// Destructuring
const { fisrtName, age, skills, full_name: fullname } = user
const [primary, sencodary, tertiary, quartenary] = skills
console.log(fullname)
