let socket = io();

let identifiant = document.getElementById("identifiant");
let password = document.getElementById("password");
let log = document.getElementById("log");
let sign = document.getElementById("sign");

sign.addEventListener("click", () => {
    alert("nouveau compte");
})

log.addEventListener("click", () => {
    if (identifiant.value) {
        if (password.value) {
            socket.emit('chat message', [identifiant.value, password.value]);
            console.log("envoyer");
            identifiant.value = "";
            password.value = "";
        }
        else {
            alert("passeword");
        }
    }
    else {
        alert("id and passeword");
    }

});


/*let plus = document.getElementById("plus");
plus.addEventListener("click", () => {
    socket.emit('chat message', "hello");
});*/



socket.on('chat message', function (msg) {
    if (msg == "success") {
        window.open("prof.html");
    }
    if (msg == "journey") {
        window.open("learn.html");
    }
    //alert(msg);
});