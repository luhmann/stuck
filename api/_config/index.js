const getDelay = () => 250

const createResponse = (statusCode, response) => resObject =>
  resObject.status(statusCode).send(response)

module.exports = { getDelay, createResponse }
