module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  response.setHeader('Access-Control-Allow-Methods', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  response.setHeader('Access-Control-Max-Age', '10') // o valor -1 sempre vai fazer a requisição de Preflight, se colocar valor positivo será contado em segundos de quanto em quanto tempo deverá fazer. Preflight faz uma requisição de verificação se os headers estão altorizados.
  next()
}
