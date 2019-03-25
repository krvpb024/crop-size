const fastify = require('fastify')({ logger: true })
const fastifyStatic = require('fastify-static')
const path = require('path')
// const opn = require('opn')

fastify.register(fastifyStatic, { root: path.join(__dirname, 'dist') })
fastify.get('/', async (request, reply) => reply.sendFile('index.html'))

const start = async () => {
  try {
    await fastify.listen(3000)
    // fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
