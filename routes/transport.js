const express = require('express');
const router = express.Router();

const transportController = require('../controllers/transport');

router.get('/transports/:id', transportController.getTransport);
router.get('/transports', transportController.getTransports);



router.get('/create-transport', transportController.getCreateTransport);
router.post('/create-transport', transportController.postCreateTransport);



module.exports = router;