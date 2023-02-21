const firebaseConfig = {
      apiKey: "AIzaSyA7Kv3ZCcOpMCkkupDvru2FjsicF6NMuk0",
      authDomain: "stonebird-fed91.firebaseapp.com",
      databaseURL: "https://stonebird-fed91-default-rtdb.firebaseio.com",
      projectId: "stonebird-fed91",
      storageBucket: "stonebird-fed91.appspot.com",
      messagingSenderId: "635014979416",
      appId: "1:635014979416:web:49152684e37165da738f2d"
};

firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");

function getData() {
      document.getElementById("nomesala").innerHTML = roomName;
      firebase.database().ref("/" + roomName).on('value', function (snapshot) {
            document.getElementById("saida").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebaseMessageId = childKey;
                        messageData = childData;
                        //Início do código
                        nome = messageData["nomeValor"];
                        like = messageData["likes"];
                        mensag = messageData["mensagemV"];
                        tagN = "<h4 class='nomeBranco'>" + nome + "<img src='tick.png' class='user_tick'></h4>";
                        tagM = "<h4 class = 'message_h4'>" + mensag + "</h4>";
                        btnlike = "<button class='btn btn-warning' id = '" + firebaseMessageId + "' value='" + like + "' onclick='newlike(this.id)'>";
                        tagSpn = "<span class='glyphicon glyphicon-thumbs-up'> likes :" + like + "</span> </button> <hr>";
                        tagAll = tagN + tagM + btnlike + tagSpn;
                        document.getElementById("saida").innerHTML += tagAll;
                        //Fim do código
                  }
            });
      });
}
getData();

function Voltar() {

      window.location = "kwitterRoom.html";
}
function logout() {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location = "index.html";
}
function Enviar() {
      mensagem = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            nomeValor: userName,
            mensagemV: mensagem,
            likes: 0
      });
      document.getElementById("msg").value = ""
}
function newlike(idMSG) {
      idedo = idMSG;
      likes = document.getElementById(idedo).value;
      likemais = Number(likes)+1;
      console.log(likemais);
      firebase.database().ref(roomName).child(idedo).update({likes: likemais});
}
