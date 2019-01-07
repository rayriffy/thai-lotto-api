import axios from 'axios'
import bodyParser from 'body-parser'
import cheerio from 'cheerio'
import express from 'express'

const server = express()

server.get('/check', (req, res) => {
  let data = []
  res.send(data)
})

server.listen(process.env.PORT).use(bodyParser.json())
