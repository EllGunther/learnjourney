let socket = io();

let plus = document.getElementById("plus");

plus.addEventListener("click", () => {
    let space = document.createElement("div");
    space.setAttribute("id", "space");
    document.body.appendChild(space);
    let bott = document.createElement("div");
    bott.setAttribute("class", "bottom");
    space.appendChild(bott);

    for (let i = 0; i < 4; i++) {
        let btn = document.createElement("div");
        btn.setAttribute("class", "btn");
        btn.textContent = i;
        let canvas = document.createElement("canvas");
        canvas.setAttribute("class", "cane");

        ////

        canvas.width = window.innerWidth - 60;
        canvas.height = window.innerHeight * 0.6;
        let context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        let restore_array = [];
        let start_index = -1;
        let stroke_color = 'black';
        let stroke_width = "2";
        let is_drawing = false;

        function change_color(element) {
            stroke_color = element.style.background;
        }

        function change_width(element) {
            stroke_width = element.innerHTML
        }

        function start(event) {
            is_drawing = true;
            context.beginPath();
            context.moveTo(getX(event), getY(event));
            event.preventDefault();
        }

        function draw(event) {
            if (is_drawing) {
                context.lineTo(getX(event), getY(event));
                context.strokeStyle = stroke_color;
                context.lineWidth = stroke_width;
                context.lineCap = "round";
                context.lineJoin = "round";
                context.stroke();
            }
            event.preventDefault();
        }

        function stop(event) {
            if (is_drawing) {
                context.stroke();
                context.closePath();
                is_drawing = false;
            }
            event.preventDefault();
            restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
            start_index += 1;
        }

        function getX(event) {
            if (event.pageX == undefined) { return event.targetTouches[0].pageX - canvas.offsetLeft }
            else { return event.pageX - canvas.offsetLeft }
        }


        function getY(event) {
            if (event.pageY == undefined) { return event.targetTouches[0].pageY - canvas.offsetTop }
            else { return event.pageY - canvas.offsetTop }
        }

        canvas.addEventListener("touchstart", start, false);
        canvas.addEventListener("touchmove", draw, false);
        canvas.addEventListener("touchend", stop, false);
        canvas.addEventListener("mousedown", start, false);
        canvas.addEventListener("mousemove", draw, false);
        canvas.addEventListener("mouseup", stop, false);
        canvas.addEventListener("mouseout", stop, false);

        function Restore() {
            if (start_index <= 0) {
                Clear()
            } else {
                start_index += -1;
                restore_array.pop();
                if (event.type != 'mouseout') {
                    context.putImageData(restore_array[start_index], 0, 0);
                }
            }
        }

        function Clear() {
            context.fillStyle = "white";
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillRect(0, 0, canvas.width, canvas.height);
            restore_array = [];
            start_index = -1;
        }
        ///////

        space.appendChild(canvas);
        bott.appendChild(btn);
        let can = document.querySelectorAll(".cane");
        can[0].style.zIndex = 100;
        btn.addEventListener("click", (e) => {
            //console.log(e.srcElement.textContent);
            let cane = document.querySelectorAll(".cane");
            let canevasNbr = cane.length;
            for (let j = 0; j < canevasNbr; j++) {
                cane[j].style.zIndex = 0;
            }
            cane[e.srcElement.textContent].style.zIndex = 100;
        });
    }
    let quitter = document.createElement("div");
    quitter.setAttribute("id", "quitter");
    space.appendChild(quitter)
    quitter.addEventListener("click", () => {
        space.remove();
    });
    let send = document.createElement("div");
    send.setAttribute("id", "send");
    space.appendChild(send);
    let tableau = [];
    send.addEventListener("click", () => {
        for (let x = 0; x < 4; x++) {
            let data = document.querySelectorAll(".cane")[x].toDataURL("image/png");
            tableau.splice(-1, 0, data);

        }
        console.log(tableau);
        socket.emit('chat message', ["tableau", tableau]);
    });
});