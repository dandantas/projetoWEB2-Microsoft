var articles = document.querySelector("#articles");
var busca = document.querySelector("#busca");
var progressBar = document.getElementById("progress");
setInterval(function() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "articles", true);
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
      //const data = jSON.parse(xmlhttp.responseText);
      articles.innerHTML = xmlhttp.responseText;
  };

  xmlhttp.onprogress = function(e) {
    if (e.lengthComputable) {
      progressBar.max = e.total;
      progressBar.value = e.loaded;
      document.getElementById("display").innerText =
        Math.floor((e.loaded / e.total) * 100) + "%";
    }
  };
  xmlhttp.onloadstart = function(e) {
    document.getElementById("progress").value = 0;
    document.getElementById("display").innerText = "0%";
  };
  xmlhttp.onloadend = function(e) {
    document.getElementById("progress").value = e.loaded;
    articles.removeChild(document.getElementById("progresso"));
  };

  xmlhttp.send();
}, 5000); //5s update */

document.querySelector("#insertArticle").addEventListener("click", function() {
  var xmlhttp = new XMLHttpRequest();
  let article = document.getElementById("articles");
  xmlhttp.open("POST", "", true);

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      alert("Deu certo!");
      articles.innerHTML = xmlhttp.responseText;
    }
  };

  xmlhttp.send();
});

var artigos = document.querySelector("#artigos");
busca.addEventListener("keyup", function live_search() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "search", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      artigos.innerHTML = xmlhttp.responseText;
    }
  };
  xmlhttp.send("search =" + busca.value);
});
