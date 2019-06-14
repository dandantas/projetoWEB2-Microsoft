let userDao = require('../libs/database');
var express = require('express');
var router = express.Router();
let articleModel= require('../models/articles'),
    bodyParser = require('body-parser');    
var jsonParser = bodyParser.json();

var mongo = require('mongodb');

module.exports = router=>{
    
    router.get('/', (req, res,next)=>{
        if(req.cookies && req.cookies.login){
            articleModel.find((err, articles)=>{
                if(err) throw err;
                res.render('home',{
                    article : articles,
                    user: req.cookies.login
                });
            });
            return;
        }
        res.redirect('/login');
    });


    router.get('/register', (req,res)=>{
        
            res.render('register');
            
    });
    

    router.post('/register', (req,res)=>{
        console.log(req.body);
        userDao.insert(req.body);
        res.redirect('/');
        res.end();
    });

    router.get('/login', (req,res,next)=>{
        articleModel.find((err, articles)=>{
            if(err) throw err;
            res.render('home',{
                article : articles
            });
        });
    });

    router.post('/login', (req,res,next)=>{
        let login = req.body.login,
            psw   = req.body.psw;
            if(login === 'admin' && psw === '1234'){
                res.cookie('login', 'admin');
                res.redirect('/');
                return;
            }else if(userDao.findUser(login)){
                console.log('user succefully logged!');
                res.redirect('/');
                return;
            
            }else{
                res.status(403);
                console.log('not admin');
                res.redirect('/');
                res.end();
                
            }
            
        
    });

    router.post('/insert' ,(req,res)=>{
        let newArticle = new articleModel({
            title: req.body.title,
            description : req.body.description
        });
        userDao.insertArticle(newArticle);
        console.log(req.body);  
        res.redirect('/');
        res.end();
    });

    router.post('/search', jsonParser ,(req,res)=>{
        var title = req.body.search;
        var aux = userDao.findArticle(title);
        console.log(aux);
        /* if(obj != null){
            res.render('search',{
                article: obj
            });
        } */
         res.render('search');

         
    

    });


}