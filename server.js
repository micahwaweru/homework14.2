const express =require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001

const sequelize = require('./config/connection')
const routes=require('./controllers')
const helpers = require('./utils/helpers');



const SequelizeStore=require('connect-session-sequelize')(session.Store);
const sess={
    secret:'My secret of secrets',
    cookie:{},
    resave:false,
    saveUninitialized: false,
};

//app build from activity 15 - Sessions
app.use(session(sess));
const hbs=exphbs.create({helpers});
app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use(routes)

//init sequelize here 
sequelize.sync({ force: false }).then(()=>{
    app.listen(PORT,()=> console.log('Now Listening'));
});