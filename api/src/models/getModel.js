const { createConnection } = require('mongoose')

async function getModel(databaseName, modelName, Schema) {
  const connection = await createConnection(
    `${process.env.MONGODB_URL}/${databaseName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )

  return connection.model(modelName, Schema)
}

module.exports = getModel
