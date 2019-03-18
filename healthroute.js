import { WebApp } from 'meteor/webapp'

WebApp.connectHandlers.use(`/__health`, (req, res) => {
  res.writeHead(200)
  res.end('healthy')
})
