var database = firebase.database();

console.log(database);


//write data to data base
let Name = prompt("Please enter your name", "")

function writeUserData() {
  let msg = document.querySelector("#msg").value
  database.ref('messages/').push().set({
    message: msg,
    name: Name
  });
  document.getElementById("msg").value = "";

}


//read data and give the input to the ui

database.ref('messages').on('child_added', (snapshot) => {
  let msgtoshow = snapshot.val();
  console.log(snapshot.key)

  /*for(let key in msgtoshow){
      var showthemsg = msgtoshow[key];
      
  }*/

  if (Name == msgtoshow.name) {
    var figure = document.createElement("figure");
    figure.setAttribute("class", "right");
    var image = document.createElement("img");
    image.id = "Id";
    image.className = "class";
    image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g";
    figure.appendChild(image)
    var x = document.createElement("P");
    var t = document.createTextNode(` ${msgtoshow.message}`);
    x.appendChild(t);
    //x.appendChild(figure) 
    document.getElementById('showmsg').appendChild(figure)
    figure.appendChild(x)
    // document.getElementById('showmsg').appendChild(x);

  }
  else {
    var figure = document.createElement("figure");
    figure.setAttribute("class", "left");
    var image = document.createElement("img");
    image.id = "Id";
    image.className = "class";
    image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g";
    figure.appendChild(image)
    var x = document.createElement("P");
    var t = document.createTextNode(`${msgtoshow.message}`);
    x.appendChild(t);
    //x.appendChild(figure) 
    document.getElementById('showmsg').appendChild(figure)
    figure.appendChild(x)
    // document.getElementById('showmsg').appendChild(x);
  }




  var msgscroll = document.querySelector("#showmsg");


  autoscrool();
  function autoscrool() {
    msgscroll.scrollTop = msgscroll.scrollHeight;
  }
  // console.log(t);
});
//use enter key to send msg

document.addEventListener("keypress", function (e) {
  //console.log(e.key);
  if (e.key === "Enter") {
    writeUserData();
    document.getElementById("msg").value = "";
  }
})
//delete msg 

/*database.ref("messages/").on("child_removed", function (snapshot) {
    document.getElementById("showmsg-" + snapshot.key).innerHTML = "This message has been deleted";
  });

  function deleteMessage(self) {
    var messageId = self.getAttribute("data-id");
    database.ref("messages").child(messageId).remove();
  }*/
document.getElementById("del").addEventListener("click", function () {
  database.ref('messages/').remove()
})



  //


