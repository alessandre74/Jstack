const apiCall = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('Sucesso')
    reject('erro!')
  }, 2000)
})

// 1º Exemple de obter resultado de uma Promise
apiCall
  .then((resposta) => {
    console.log(resposta)
  })
  .catch((erro) => console.log(erro))

// 2º Exemple de obter resultado de uma Promise

async function run() {
  try {
    const resposta = await apiCall
    console.log(resposta)
  } catch (error) {
    console.log(error)
  }
}

run()
