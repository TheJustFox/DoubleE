import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
  import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDJmlUJWpDj5lxHPxmNzQQ6lp5NT4Zn8-E",
    authDomain: "doubleelogins.firebaseapp.com",
    databaseURL: "https://doubleelogins-default-rtdb.firebaseio.com",
    projectId: "doubleelogins",
    storageBucket: "doubleelogins.appspot.com",
    messagingSenderId: "642743586532",
    appId: "1:642743586532:web:a88b67169ca28c209fe6f1",
    measurementId: "G-01H43S2VEC"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const user = auth.currentUser;

var logged = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    var name = firebase.database().ref('users/'+user.uid+'/username')
    name.on('value', function(snapshot) {
        document.getElementById('user').innerHTML = "Welcome " +snapshot.val() + '!';
    });
    logged = true;

    var a = document.createElement("button");
    //<a href="portfolio.html" target="_blank">See my portfolio</a>
    
    a.className = "btn";
    a.innerHTML = "log out";
    a.addEventListener('click',(e)=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          if(logged)
            location.reload();
          else
              alert("you are not loged in");
          }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
       
               alert(errorMessage);
          });
    });
    document.getElementById('profile-container').appendChild(a);
  } else {
    document.getElementById('user').innerHTML = "Anonumys";
    logged = false

    var a = document.createElement("button");
    //<a href="portfolio.html" target="_blank">See my portfolio</a>
    
    a.className = "btn";
    a.innerHTML = "register";
    a.addEventListener('click',(e)=>{
        window.open("sign-up.html","_self");
    });
    document.getElementById('profile-container').appendChild(a);

    var a = document.createElement("button");
    //<a href="portfolio.html" target="_blank">See my portfolio</a>
    
    a.className = "btn";
    a.innerHTML = "log in";
    a.addEventListener('click',(e)=>{
        window.open("sign-in.html","_self");
    });
    document.getElementById('profile-container').appendChild(a);
  }
});


import data from './programs.json' assert { type: 'json' };


var val;

for(val in data)
{
    if(!data[val].private){
        var box = document.createElement("span");
        box.className = "dark-container";
        document.getElementById('maincon').appendChild(box);

        var element = document.createElement("h4");
        element.appendChild(document.createTextNode(data[val].name));
        box.appendChild(element);

        var element2 = document.createElement("h5");
        element2.appendChild(document.createTextNode(data[val].description));
        box.appendChild(element2);

        var a = document.createElement("button");
        //<a href="portfolio.html" target="_blank">See my portfolio</a>
        
        a.className = "btn";
        a.innerHTML = "Download";
        a.addEventListener('click',(e)=>{
            if(logged)
                window.open(data[val].link);
            else
                err("you must be loged in to download items!");

        });
        box.appendChild(a);
    }
}

//btnSearch

function err(text){
    const box = document.createElement("div");
    box.className = "alert";
    box.innerHTML = 'Error : ' + text;
    document.body.appendChild(box);



    const close = document.createElement("span");
    close.className = "closebtn";
    close.onclick = function(){this.parentElement.style.display='none';}
    close.innerHTML = "&times;";
    box.appendChild(close);
}

function download(text,text2,link){
    var Elem = document.getElementById('popup');
    if (Elem != null) Elem.remove(); 

    const box = document.createElement("div");
    box.className = "container";
    box.id = "popup";
    document.body.appendChild(box);

    const cur = document.createElement("p");
    cur.innerHTML = text;
    box.appendChild(cur);

    const cur2 = document.createElement("p");
    cur2.innerHTML = text2;
    box.appendChild(cur2);


    const close = document.createElement("span");
    close.className = "savebtn";
    close.onclick = function(){window.open(link, '_blank').focus(); this.parentElement.style.display='none';}
    close.innerHTML = "download";
    box.appendChild(close);
}


function FindData(code) {
    for (var i in data){
        // look for the entry with a matching `code` value
        if (data[i].id == code){
           return data[i]
        }
      }
}

document.getElementById("btnSearch").onclick = function() {find()};

function find() {
    const id = document.getElementById("search").value.replace(/ /g,'');

    if(id == "")
    {
        err("Id cannot be null");
    }
    else 
    {
        var exists = false;
        for(var val in data)
        {
            if(exists) break;
            
            if(data[val].id == id) exists = true;
        }
        if(logged)
            if(exists)
                download("Name : " + FindData(id).name,"Description : " + FindData(id).description, FindData(id).link);
            else
                err("unable to find item by id "+id + ".");
        else
            err("you must be loged in to download items!");
        
    }
}
