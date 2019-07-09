/* var articles = document.querySelector("#articles");
setInterval(function() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "http://localhost:3000/search?article=", true);
  xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
    //const data = jSON.parse(xmlhttp.responseText);
    articles.innerHTML = xmlhttp.responseText;
  };
    xmlhttp.send();

}, 5000); //5s update */


 

 
document.querySelector("#insertArticle").addEventListener("click", function() {
  var xmlhttp = new XMLHttpRequest();
  let article = document.getElementById('articles');
  xmlhttp.open("GET", "", true);
    xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      articles.innerHTML = xmlhttp.responseText;
    }
  };

 
});
