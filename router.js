var express = require('express')
var bodyParser = require('body-parser')
var registry = require('etcd-registry')

var etcd_nodes = process.env['ETCD_NODES'] || '127.0.0.1:4001'
var services = registry(etcd_nodes)

var router = express.Router()

router.use(bodyParser.json())

var handleError = function (err, req, res, result) {
  if (err) {
    res.send(err.message)
  } else {
    res.send(result)
  }
}

router.get('/', function (req, res) {
  var name = req.query.name || null
  services.list(name, function (err, services) {
    handleError(err, req, res, services)
  })
})

// router.post('/', function (req, res) {
//   var name = req.body.name
//   var service = req.body
//   services.join(name, service, function (err, service) {
//     handleError(err, req, res, service)
//   })
// })

router.delete('/', function (req, res) {
  var name = req.body.name
  services.leave(name, function (err, service) {
    handleError(err, req, res, service)
  })
})

module.exports = router
