const url = 'https://www.dnd5eapi.co/api/'; 
let classes =[];
let races = [];
let alignment = [];
let scores = [];

document.addEventListener("DOMContentLoaded",function () {
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          console.log(response);
          classes = response.results;
        }
      };
  
      request.open("GET", url+"/classes/", true);
      request.send();  
})

function clicked(){
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    console.log(value);

    return false;
}