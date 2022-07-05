const Bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const AuthController = {
    showLogin: (req, res) => {
        return res.render("home/login");
    },

    showCadastrar: (req, res) => {
        return res.render("home/cadastro");
    },
       
    store: (req, res) => {	
         const { nome, email,senha} = req.body;
         const hash = Bcrypt.hashSync(senha, 10);
         const verificaSeCadastrado = Usuario.findOne(email);
        
         if (verificaSeCadastrado) {
             return res.render('home/cadastro', { error: "Não foi possível cadastrar o usuário" });
            }
         const usuario = {
            nome,
            email,
            senha:hash
        };
            Usuario.create(usuario)
                console.log(usuario);
         return res.redirect('/login'); 
    },

    login: (req, res) => {  
        const { email, senha } = req.body;
        const usuario = Usuario.findOne(email);
        if (!usuario  || !Bcrypt.compareSync(senha, usuario.senha)) {
            return res.render('home/login', { error: "E-mail ou senha estão incorretos ou não existe" });
        }
        req.session.usuario = usuario;
        return res.redirect('/');
    },
     
    logout: (req, res) => { 
        req.session.destroy(function(err) {
        // cannot access session here
        return res.redirect('/login');
        })
    }
     
}


module.exports = AuthController;