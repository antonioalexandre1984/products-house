const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const isLogin = require('../middlewares/isLogin');
const isAdmin = require('../middlewares/isAdmin');

router.use(isLogin);
router.use(isAdmin)
router.get('/', produtoController.showAllProducts);
router.get('/cadastro', produtoController.showCreatePage);
router.post('/cadastro', produtoController.store);
router.get('/:id', produtoController.showOneProduct);    
router.get('/:id/editar', produtoController.showEditProduct);
router.put('/:id/editar', produtoController.edit);
router.delete('/:id',produtoController.delete);



module.exports = router;