const url = 'https://www.dnd5eapi.co/api/'; 
let classes;
let races;
let alignment;
let scores;

document.addEventListener("DOMContentLoaded",function () {
    classes = getCategory("/classes/", classes);
    races = getCategory("/races/",races);
    alignment = getCategory("/alignments/",alignment);    
})
async function getCategory(suffix, obj){
  // let request = new XMLHttpRequest();
  // request.open("GET", url+suffix, true);
  // request.send();  

  // request.onreadystatechange = function() {
  //     if (this.readyState === 4 && this.status === 200) {
  //       const response = JSON.parse(this.responseText);
  //       console.log(response.results);
  //       return response.results;
  //     }
  //   };
  // fetch(url+suffix).then(response => response.json()).then(response => obj = response.results);
  const response = await fetch(url+suffix);
  return response.json().results;

}
function clicked(){
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    let seed = getRandomSeed(value)+"";
    let myClass = getClass(seed);
    console.log(myClass);
    return false;
}
function getClass(seed){
  let baseNum = seed.substring(0,4);
  let myClass = classes[baseNum%classes.length];
  let className = myClass.name;
  return className;
}
function getRandomSeed(values){
  let seed = 0;
  for(const key in values){
    let v = values[key];
    console.log(v);
    if(Number.isNaN(Number.parseInt(v))){
      v = v.split("");
      for(let i = 0; i < v.length; i++){
        let num = v[i].charCodeAt(0);
        if(num % 3 ===0){
          seed += num;
        }else if(num % 3 ===1){
          seed *= num;
        }else if(num % 3 ===2){
          seed -= num;
        }
      }
    }else{
      v = Number.parseInt(v);
      seed += v;
    }
    console.log(seed);
    return seed;
  }
}