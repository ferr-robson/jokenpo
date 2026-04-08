const images = ["img/pedra.png", "img/papel.png", "img/tesoura.png"];

let playerChoise = 0;

let playerPoints = 0;
let cpuPoints = 0;

function choosePlay(option) {
    playerChoise = option;
    document.getElementById("playerImg").src = images[option];

    const buttons = document.querySelectorAll(".optionButtons button");
    buttons.forEach(btn => btn.classList.remove("selected"));

    buttons[option].classList.add("selected");
}

function result(player, cpu) {
    if (player === cpu) return "Empate";
    
    if (
        (player === 0 && cpu === 2) ||
        (player === 1 && cpu === 0) ||
        (player === 2 && cpu === 1)
    ) {
        playerPoints++;
        return "Você venceu!";
    } else {
        cpuPoints++;
        return "Você perdeu :(";
    }
}

function play() {
    const cpuImage = document.getElementById("cpuImg");
    const playButton = document.getElementById("btnPlay");

    const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
    const limit = Math.ceil(selectedMode / 2);

    playButton.disabled = true;

    let time = 100;
    let totalTime = 0;
    const duration = 2000;

    function changeImage() {
        const index = Math.floor(Math.random() * images.length);
        cpuImage.src = images[index];

        totalTime += time;

        if (totalTime < duration) {
            time += 20;
            setTimeout(changeImage, time);
        } else {
            const finalIndex = Math.floor(Math.random() * images.length);
            cpuImage.src = images[finalIndex];

            const res = result(playerChoise, finalIndex);
            document.getElementById("message").innerText = res;

            document.getElementById("playerPoints").innerText = playerPoints;
            document.getElementById("cpuPoints").innerText = cpuPoints;

            if (playerPoints === limit || cpuPoints === limit) {
                if (playerPoints === limit) {
                    document.getElementById("message").innerText = "🎉 Você ganhou o jogo!";
                } else {
                    document.getElementById("message").innerText = "😢 CPU ganhou o jogo!";
                }

                playButton.disabled = true;

                document.getElementById("btnPlay").style.display = "none";
                document.getElementById("btnReset").style.display = "inline-block";
            } else {
                playButton.disabled = false;
            }

            playButton.disabled = false;
        }
    }

    changeImage();
}

function resetGame() {
    playerPoints = 0;
    cpuPoints = 0;

    document.getElementById("playerPoints").innerText = 0;
    document.getElementById("cpuPoints").innerText = 0;
    document.getElementById("message").innerText = "Novo jogo!";

    document.getElementById("btnPlay").style.display = "inline-block";
    document.getElementById("btnPlay").disabled = false;

    document.getElementById("btnReset").style.display = "none";
}