let input = document.querySelector("input");
let enter = document.querySelector("#enter1");
let truth = document.querySelector("#select1");
let dare = document.querySelector("#select2");
let para1 = document.querySelector("#para1");
let para2 = document.querySelector("#para2");
let next = document.querySelector("#next");
let player = document.querySelector("h5");

let players = [];
let currentPlayerIndex = 0;
let scores = {};

enter.addEventListener("click", () => {
    let val = input.value;
    if (val == 0 || val == 1) {
        para1.innerText = "kyu akele khel raha hai?";
        input.value = "";
    } else {
        players = [];
        scores = {};
        for (let i = 1; i <= val; i++) {
            players.push(`PLAYER ${i}`);
            scores[`PLAYER ${i}`] = 0;
        }
        para1.innerText = "chalo game start karen!";
        input.value = "";
        player.innerText = players[currentPlayerIndex];
    }
});

let url1 = "https://api.truthordarebot.xyz/v1/truth";
let url2 = "https://api.truthordarebot.xyz/api/dare";

let getTruth = async () => {
    let response = await fetch(url1);
    let data = await response.json();
    para2.innerText = data.question;
    scores[players[currentPlayerIndex]] += 1;
}

let getDare = async () => {
    let response = await fetch(url2);
    let data = await response.json();
    para2.innerText = data.question;
    scores[players[currentPlayerIndex]] += 1;
}

truth.addEventListener("click", () => {
    getTruth();
    dare.style.opacity = "0";
});

dare.addEventListener("click", () => {
    getDare();
    truth.style.opacity = "0";
});

next.addEventListener("click", () => {
    truth.style.opacity = "1";
    dare.style.opacity = "1";
    para2.innerText = "Choose Truth or Dare...";
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    player.innerText = players[currentPlayerIndex];
    console.log(scores); // To check scores in console
});
