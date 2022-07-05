const CarrinhoController = {

     showCart: (req, res) => {
        const {carrinho} = req.session;

        let total = 0;

        if(!carrinho) {
            return res.render("home/carrinho", {carrinho: [], total})
        }

        carrinho.forEach(produto => {
            total += Number(produto.preco);
        });

        return res.render('home/carrinho', {carrinho, total});
    },
    
    addCart: (req, res) => {
        const { produtoid, nome, preco, imagem } = req.body;
        const produto = { id:produtoid, nome, preco, imagem };

        if( req.session.carrinho ){
        req.session.carrinho.push(produto);
        } else {
        req.session.carrinho = [produto];
        }
        console.log(req.session.carrinho);
    return res.redirect('/carrinho');
    },
    removeCart: (req, res) => { 
        const { id } = req.params;
        let { carrinho } = req.session;
        const index = carrinho.findIndex(produto => produto.id == id);
        const carrinhoAtualizado = carrinho.splice(index, 1);
        carrinho = carrinhoAtualizado;
        if (carrinho.length <= 0) {
            carrinho = [];
            return res.redirect('/carrinho');
        }
        return res.redirect('/carrinho');
    }
}

module.exports = CarrinhoController;