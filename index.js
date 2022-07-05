const express = require('express');
const methodOverride = require('method-override');
const app = express();
const homeRouter = require('./src/routers/homeRouter');
const produtoRouter = require('./src/routers/produtoRouter');
const authRouter = require('./src/routers/authRouter');
const carrinhoRouter = require('./src/routers/carrinhoRouter');
const session = require('express-session');

app.use(methodOverride('_method'));
app.use(express.static('./src/public'));
app.set('view engine', 'ejs'); 
app.set('views', './src/views');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: "meu primeiro ecommerce",
    resave: false,
    saveUninitialized: false,
}));

app.use(homeRouter);
app.use("/adm/produtos",produtoRouter);
app.use(authRouter);
app.use(carrinhoRouter);

app.use((req, res, next) => {
    return res.status(404).render('home/not-found', { error: 'Página não encontrada' });
})  

app.listen(5000, () => console.log('Rodando...'))