const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.showIndex);
router.get('/produtos/:id',homeController.showOneProduct);




module.exports = router;