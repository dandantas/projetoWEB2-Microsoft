let userDao = require("../libs/database");
var express = require("express");
var router = express.Router();
let articleModel = require("../models/articles"),
  bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var mongo = require("mongodb");

module.exports = router => {
  router.get("/", (req, res, next) => {
      console.log('requisicao para home');
    //if (req.cookies && req.cookies.login) {
      articleModel.find((err, articles) => {
        if (err) throw err;
        res.render("home", {
          user: req.cookies.login,
          //article: articles,
          user: req.cookies.login,
          show: false
        });
      });
      return;
    //}
    //res.redirect("/login");
    res.end();
  });

  router.get("/register", (req, res) => {
    res.render("register");
    res.end();
  });

  router.post("/register", (req, res) => {
    console.log(req.body);
    userDao.insert(req.body);
    res.redirect("/");
    res.end();
  });

  router.get("/login", (req, res, next) => {
    articleModel.find((err, articles) => {
      if (err) throw err;
      res.render("home", {
        article: articles
      });
    });
    res.end();
  });

  router.post("/login", (req, res, next) => {
    let login = req.body.login,
      psw = req.body.psw;
    if (login === "admin" && psw === "1234") {
      res.cookie("login", "admin");
      res.redirect("/");
      return;
    } else if (userDao.findUser(login)) {
      console.log("user succefully logged!");
      res.redirect("/");
      return;
    } else {
      res.status(403);
      console.log("not admin");
      res.redirect("/");
      res.end();
    }
  });

  router.post("/insert", (req, res) => {
    let newArticle = new articleModel({
      title: req.body.title,
      description: req.body.description
    });
    userDao.insertArticle(newArticle);
    console.log(req.body);
    res.redirect("/");
    res.end();
  });

  router.get("/search", (req, res) => {
    var artigo = req.query.article;
    
    userDao.findArticle(artigo)
    .then(result=>{
      console.log(result);
      if(result.length > 0 ){
          res.render('search', {encontrou: true, resultado: result});    
      }
      else {
        res.render('search', {encontrou: false, resultado: result});      }  
    })
    .catch(err=>{
        console.log(err);
    });
  });


  router.get('/articles', (req, res)=>{
    articleModel.find((err, articles) => {
      if (err) throw err;
      res.end(articles.map((article)=>{
        return '<h3 class="content-heading">' + article.title + '</h3>\<p>' + article.description + '</p>' + '                <a href="">\<span>ASSINE AGORA</span>>\</a>\
        ' }).join(""));
    });
  });

  router.get('/articles', (req,res) => {
    articleModel.find((err, articles) => {
        if (err) throw err;
        res.send(articles);
        });
  });
  
};

