const url = 'https://www.dnd5eapi.co/api/'; 
let classes = {};
let races= {};
let alignment= {};
let scores;

document.addEventListener("DOMContentLoaded",function () {
    getCategory("/classes/", classes);
    getCategory("/races/",races);
    getCategory("/alignments/",alignment);    
    console.log(classes);
})
function getCategory(suffix, obj){
  let request = new XMLHttpRequest();
  request.open("GET", url+suffix, true);
  request.send();  

  request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(response.results);
        obj.values = response.results;
        return response.results;
      }
    };
}
function clicked(){
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    let seed = getRandomSeed(value)+"";
    let myClass = getClass(seed);
    let myRace = getRace(seed);
    let myAlignment = getAlignment(seed);
    makeName();
    let classbox = document.getElementById('classBox');
    classbox.innerHTML=myClass;
    let racebox = document.getElementById('raceBox');
    racebox.innerHTML=myRace;
    let alignmentbox = document.getElementById('alignBox');
    alignmentbox.innerHTML=myAlignment;  
    getStats(seed);
    return false;
}

function getStats(seed){
  let stats = [6];
  for(let i = 0; i < 6 ; i++){
    let num = 8 + Number.parseInt(seed.substring(i,i+2))%13;
    stats[i] = num;
  }
  document.getElementById('strBox').innerHTML = "Strengeth: " +stats[0];
  document.getElementById('dexBox').innerHTML = "Dexterity: " +stats[1];
  document.getElementById('conBox').innerHTML = "Constitution: " +stats[2];
  document.getElementById('intBox').innerHTML = "Intelligence: " +stats[3];
  document.getElementById('wisBox').innerHTML = "Wisdom: " +stats[4];
  document.getElementById('chaBox').innerHTML = "Charisma: " +stats[5];

}

function getClass(seed){
  let baseNum = seed.substring(0,4);
  let allClasses = classes.values;
  let myClass = allClasses[baseNum%allClasses.length];
  let className = myClass.name;
  return className;
}

 function getRace(seed){
  let baseNum = seed.substring(2,Math.min(6,seed.length));
  let allRaces = races.values;
  let myRace = allRaces[baseNum%allRaces.length];
  let raceName = myRace.name;
  return raceName;
}

function getAlignment(seed){
  let baseNum = seed.substring(4,Math.min(8,seed.length));
  let allAlignments = alignment.values;
  let myAlignment = allAlignments[baseNum%allAlignments.length];
  let alignmentName = myAlignment.name;
  return alignmentName;
}

async function makeName(myName){
  let names = await fetch("https://random-data-api.com/api/name/random_name");
  names = await names.json();
  myName = names.name;
  let namebox = document.getElementById('nameBox');
    namebox.innerHTML="Name: "+myName;

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
        num %= 100;
        if(num % 3 ===0){
          seed += num;
        }else if(num % 3 ===1){
          seed *= num;
        }else if(num % 3 ===2){
          seed -= num;
        }
        seed %= 100000000000;
      }
    }else{
      v = Number.parseInt(v);
      seed *= Math.pow(v+1 , 2);
      seed %= 100000000000;
    }
    
  }
  seed = Math.abs(seed%Number.MAX_VALUE);
  console.log(seed);
  return seed;
}