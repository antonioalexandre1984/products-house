const ProdutoModel = require('../models/ProdutoModel');

const produtoController = {
    showAllProducts: (req, res) => {
        const produtos = ProdutoModel.findAll();
            return res.render('adm/produtos/lista',{produtos});
    },
      showCreatePage: (req, res) => {	
         return res.render('adm/produtos/cadastro'); 
    },
      store: (req, res) => {
          const { nome, imagem, preco, ativo, descricao } = req.body;
          const produto = {
              nome,
              imagem,
              preco,
              ativo: ativo == 'on' ? true : false,
                descricao
          }

          ProdutoModel.save(produto);
          
        return res.redirect('/adm/produtos');
  },
         showOneProduct: (req, res) => {
        const { id } = req.params;
        const produto = ProdutoModel.findById(id);
        return res.render('adm/produtos/detalhes',{produto})
  },
         
        showEditProduct: (req, res) => {
        const {id} = req.params;
        const produto = ProdutoModel.findById(id);
        return res.render("adm/produtos/editar", {produto});
    },
         
  edit: (req, res) => {
    const { nome, imagem, preco, ativo, descricao } = req.body;
    const produto = {
      nome,
      imagem,
      preco,
      ativo: ativo == 'on' ? true : false,
      descricao
    }
      ProdutoModel.update(id,produto)
    return res.redirect('adm/produtos');
  },
        
    delete: (req, res) => {
        const { id } = req.params;
        ProdutoModel.delete(id);
        return res.redirect('/adm/produtos');
    },
}

module.exports = produtoController;