let gameSeq = [];
let userSeq = [];

let btns = ["green", "yellow", "pink", "purple"];

let started = false;
let level = 0;
let highestScore = 0;

if (document.querySelector("highestScore")) {
    highestScore = parseInt(document.querySelector("highestScore"));
  }

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;

        levelUp();
    }

})

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randBtn);
    // console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 500);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level} </b>  <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "wheat";
        }, 150);

        // update the highest score if the current score is highest
        if (level > highestScore) {
            highestScore = level;
            document.querySelector("highestScore", highestScore);
        }
        h3.innerText = `Highest Score: ${highestScore}`;
        reset();
    }

}

function btnPress() {
    let btn = this;
    userFlash(btn);
    // console.log(this);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor)

    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
    btn.addEventListener("click", btnPress)
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}