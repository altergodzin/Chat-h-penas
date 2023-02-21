
const firebaseConfig = {
  apiKey: "AIzaSyA7Kv3ZCcOpMCkkupDvru2FjsicF6NMuk0",
  authDomain: "stonebird-fed91.firebaseapp.com",
  databaseURL: "https://stonebird-fed91-default-rtdb.firebaseio.com",
  projectId: "stonebird-fed91",
  storageBucket: "stonebird-fed91.appspot.com",
  messagingSenderId: "635014979416",
  appId: "1:635014979416:web:49152684e37165da738f2d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() {
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose: "adicionar nome de sala"
  });

  localStorage.setItem("roomName", roomName);

  window.location = "kwitterPage.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("roomName", name);
  window.location = "kwitterPage.html";
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}
