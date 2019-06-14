let userDao = require('../libs/database');
var express = require('express');
var router = express.Router();

module.exports = router=>{
    
    router.get('/', (req, res,next)=>{
        var admin = "admin"
        if(req.cookies && req.cookies.login === admin){
            res.render('home', {
                user: req.cookies.login
            });
            return;
        }else{
            res.render('home',{});
        }
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
        res.render('home', {});
    });

    router.post('/login', (req,res,next)=>{
        let login = req.body.login,
            psw   = req.body.psw;
        if(login === 'admin' && psw === '1234'){
            res.cookie('login', 'admin');
            res.redirect('/');
            return;
        }else{
            res.status(403);
            res.redirect('register');
            res.end();
        }
    });


}