import express from 'express'
const app = express()
const port = 3000

console.log('Starting the Express server...')
alert(app)

app.get('/', (req, res) => {
  res.send(app)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})