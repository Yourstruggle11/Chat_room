var database = firebase.database();

console.log(database);

autosize(document.getElementById("msg"));
autosize(document.getElementById("passcode"));


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
    x.setAttribute("id", `m-${snapshot.key}`);
    var t = document.createTextNode(` ${msgtoshow.message}`);
    x.appendChild(t);
    //x.appendChild(figure) 
    document.getElementById('showmsg').appendChild(figure)
    figure.appendChild(x)
    //set msg time
    let time = new Date();
    let hrs = time.getHours();
    let min = time.getMinutes();
    //console.log(`${hrs}${min}`)
    var pForTime = document.createElement("p");
    var messageTime = document.createTextNode(`${hrs}:${min}`)
    pForTime.appendChild(messageTime);
    pForTime.setAttribute("class", "timeParaRight")
    document.getElementById('showmsg').appendChild(pForTime);
    //

    // document.getElementById('showmsg').appendChild(x);

    //make del button
    var delBtn = document.createElement("button");
    delBtn.setAttribute("onclick", "deleteMsg(this)");
    delBtn.setAttribute("data-id", snapshot.key);
    delBtn.setAttribute("id", `message-${snapshot.key}`);
    delBtn.setAttribute("class", "delBtn");
    x.appendChild(delBtn);

    document.getElementById(`message-${snapshot.key}`).innerHTML = "del";


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
    x.setAttribute("id", `m-${snapshot.key}`);
    var t = document.createTextNode(`${msgtoshow.name}: ${msgtoshow.message}`);
    x.appendChild(t);
    //x.appendChild(figure) 
    document.getElementById('showmsg').appendChild(figure)
    figure.appendChild(x)
    //set msg time
    let time = new Date();
    let hrs = time.getHours();
    let min = time.getMinutes();
    // console.log(`${hrs}${min}`)
    var pForTime = document.createElement("p");
    var messageTime = document.createTextNode(`${hrs}:${min}`)
    pForTime.appendChild(messageTime);
    pForTime.setAttribute("class", "timeParaLeft")
    document.getElementById('showmsg').appendChild(pForTime);
    //
    // document.getElementById('showmsg').appendChild(x);
  }
  //document.querySelectorAll(".delBtn").innerText = "Del";




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
/*document.getElementById("del").addEventListener("click", function () {
  database.ref('messages/').remove()
})*/

firebase.database().ref("messages/").on("child_removed", function (snapshot) {
  document.getElementById(`m-${snapshot.key}`).innerHTML = "This message has been deleted";
});



//create a function to del the msg

function deleteMsg(self) {
  var messageId = self.getAttribute("data-id");
  console.log(messageId);
  database.ref('messages/').child(messageId).remove()
}



//this section is for admin to set access code

function passcode() {
  let passcode = document.getElementById("passcode").value;


  database.ref("userpasscode/").set({
    password: passcode
  })


}

//make a authentication
function user_access() {
  var user_input = document.getElementById("user_input").value;

  database.ref('userpasscode/').on('child_added', (snapshot) => {
    let userCode = snapshot.val();

    console.log(userCode);

      if (user_input == userCode) {
        document.querySelector(".login_page").style.display = "none";
      }
       else if(user_input == ""){
        alert("Please Enter A Passcode")
       }
      else{
        alert("You Have Enter A Wrong Passcode")
      }

  })

}
