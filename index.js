const express = require('express')
const https = require('https')
const querystring = require('querystring')
const cors = require('cors')

const app = express()
app.use(cors())

const port = 3000
const baseURL = 'https://jsonplaceholder.typicode.com' // Add API base URL here
const version = '' // Add version here, if needed

app.get('*', (req, res) => {
  const { _parsedUrl: { pathname } } = req // Get endpoint path from request
  const query = querystring.stringify(req.query) // Encode an query string parameters
  const url = `${baseURL}${version}${pathname}?${query}` // Construct the request URL
  https.get(url, (resp) => {
    let data = ''
    resp.on('data', (chunk) => data += chunk)
    resp.on('end', () => res.send(data)) // Return the response
  }).on('error', (err) => {
    console.log(`Error: ${err.message}`)
    res.status(500)
    res.render('error', { error: err })
  })
})

app.listen(port, () => console.log(`API wrapper listening on port ${port}!`))
