module.exports = (error, request, response, next) => {
  console.log()
  console.log('#### Error Handler ==>', error)
  response.sendStatus(500)
}
