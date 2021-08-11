/* 1. Grab the input value */
function inClear(){
    var input = document.querySelector("input").value;
    input.innerHTML=" ";
    var container = document.querySelector(".js-container");
    container.innerHTML=" ";
  }
function loadBar(){
  var cont = document.querySelector(".load");
  if (cont.innerHTML === "Loaded") {
    cont.innerHTML = "";
  } else {
    cont.innerHTML= "Wait, still loading";
  }
}
function loadFn(){
  var cont = document.querySelector(".load");
  if (cont.style.display === "none") {
    cont.style.display = "inline";
  } else {
    cont.style.display = "none";
  }
  //setTimeout(function(){ cont.innerHTML = "Results Loading" }, 2000);
  setTimeout(function(){ cont.innerHTML = "Loaded" }, 2000);
  loadBar();

}
document.querySelector(".js-go").addEventListener('click',function(){

    var input = document.querySelector("input").value;
    var sk=input;
    var skey=sk.split(' ');
    input=skey[0]+"+"+skey[1];
    loadFn();
    goToDOM(input);
    inClear();
    loadBar();
  });
  
  document.querySelector(".js-userinput").addEventListener('keyup',function(e){
    

    var input = document.querySelector("input").value;
  
    // if the key ENTER is pressed...
    if(e.which === 13) {
        var sk=input;
        var skey=sk.split(' ');
        input=skey[0]+"+"+skey[1];
        loadFn();
        goToDOM(input);
        inClear();
        loadBar();
    }

  });
  
  /* 2. do the data stuff with the API */
  function goToDOM(input){
    var url = "http://api.giphy.com/v1/gifs/search?q="+input+"&api_key=dc6zaTOxFJmzC";
  
    // AJAX Request
    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open( 'GET', url );
    GiphyAJAXCall.send();
    
    GiphyAJAXCall.addEventListener('load',function(e){
    
      var data = e.target.response;
      pushToDOM(data);
      loadBar();
    });
  }
  
  

  /* 3. Show me the GIFs */
  
  
  function pushToDOM(input) {
  
    var response = JSON.parse(input);
  
    var imageUrls = response.data;
  
    imageUrls.forEach(function(image){
  
      var src = image.images.fixed_height.url;
      console.log(src);
  
      var container = document.querySelector(".js-container");
      container.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">";
      loadBar();
    });
  
  }
  