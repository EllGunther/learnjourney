let socket = io();


socket.on('chat message', function (msg) {
    if (msg[0] == "tableau") {
        let images = document.getElementById("images");
        console.log(msg[1]);
        for (let i = 0; i < 4; i++) {
            //let img = new Image();
            let img = document.createElement("img");
            img.src = msg[1][i];

            images.appendChild(img);
        }
    }
});

let text = document.querySelectorAll(".text");
let test = document.getElementById("test");
window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;
    // Do stuff...
    text[0].textContent = event.alpha;
}

function onClick() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Handle iOS 13+ devices.
        DeviceMotionEvent.requestPermission()
            .then((state) => {
                if (state === 'granted') {
                    window.addEventListener('devicemotion', handleOrientation);
                } else {
                    console.error('Request to access the orientation was rejected');
                }
            })
            .catch(console.error);
    } else {
        // Handle regular non iOS 13+ devices.
        window.addEventListener('devicemotion', handleOrientation);
    }
}
test.addEventListener("click", () => {
    onClick();
});