const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
    body.style = `height: 100vh;  background: url("images/${imgNumber+1}.jpg") no-repeat center/cover; background-attachment: fixed;`
    body.classList.add("bgImage");
    const bgfade = document.createElement("div");
    bgfade.className = "bg-fade";
    body.appendChild(bgfade);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}


function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();