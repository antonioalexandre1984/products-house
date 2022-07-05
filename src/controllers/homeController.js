const ProdutoModel = require('../models/ProdutoModel');

const homeController = {
    showIndex: (req, res) => {
        const produtos = ProdutoModel.findAll();

        if (req.session.usuario) { 
           return res.render("home/landingpage", {produtos, usuario:req.session.usuario});
        }
        return res.render("home/landingpage", {produtos});
        },

    showOneProduct: (req, res) => {
        let { usuario } = req.session;
        const {id}  = req.params;
   
            const produto = ProdutoModel.findById(id);
            if (!produto) {
                return res.render("home/not-found", { error: "Produto não encontrado" });
            }
        
        return res.render("produtos/detalhes", {produto,usuario});
    }
    
}


module.exports = homeController;
