var database = firebase.database();

console.log(database);


//write data to data base
let Name = prompt("Please enter your name", "")
function writeUserData() {
    let msg = document.querySelector("#msg").value
    database.ref('messages').push().set({
      message:  msg,
      name: Name
    });
    return false;
  }


  //read data and give the input to the ui

database.ref('messages' ).on('value', (snapshot) => {
  let msgtoshow = snapshot.val();

   for(let key in msgtoshow){
       var showthemsg = msgtoshow[key];
       
   }
   var x = document.createElement("P");                        
   var t = document.createTextNode(`${showthemsg.name}: ${showthemsg.message}`);    
    x.appendChild(t);                                           
    document.getElementById('showmsg').appendChild(x)
    console.log(t);
});

//delete msg 

database.ref("messages").on("child_removed", function (snapshot) {
    document.getElementById("showmsg-" + snapshot.key).innerHTML = "This message has been deleted";
  });

  function deleteMessage(self) {
    var messageId = self.getAttribute("data-id");
    database.ref("messages").child(messageId).remove();
  }


