import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();

  /*
sighUp.addEventListener('click',(e) => {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var username = document.getElementById('username').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     // Signed in 
      const user = userCredential.user;

      set(ref(database, 'users/' + user.uid),{
          username: username,
          email: email
      })

      alert('user created!');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    // ..
    });

});*/

 document.getElementById('login').addEventListener('click',(e)=>{
   var email = document.getElementById('email').value;
   var password = document.getElementById('password').value;

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        const dt = new Date();
         update(ref(database, 'users/' + user.uid),{
          last_login: dt,
        })

         alert('User loged in!');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
  });

 });

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    //bla bla bla
    // ...
  } else {
    // User is signed out
    // ...
    //bla bla bla
  }
});
/*
logout.addEventListener('click',(e)=>{

   signOut(auth).then(() => {
     // Sign-out successful.
     alert('user loged out');
   }).catch((error) => {
     // An error happened.
     const errorCode = error.code;
     const errorMessage = error.message;

        alert(errorMessage);
   });

});
*/
