const images = ["img/pedra.png", "img/papel.png", "img/tesoura.png"];

let playerChoise = 0;

let playerPoints = 0;
let cpuPoints = 0;

function choosePlay(option) {
    playerChoise = option;

    $("#playerImg").attr("src", images[option]);

    const buttons = $(".optionButtons button");
    buttons.removeClass("selected");

    $(".optionButtons button").eq(option).addClass("selected");
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

function setMessageValue(message) {
    const $msg = $("#message");

    const classMap = {
        "Você venceu!": "win",
        "Você perdeu :(": "lose",
        "Empate": "draw"
    };

    const className = classMap[message] || "";

    $msg.text(message);

    $msg.removeClass("win lose draw");
    if (className) $msg.addClass(className);

    return $msg;
}

function play() {
    const cpuImage = $("#cpuImg");
    const playButton = $("#btnPlay");

    const selectedMode = $('input[name="gameMode"]:checked').val();
    const limit = Math.ceil(selectedMode / 2);

    playButton.prop("disabled", true);

    let time = 100;
    let totalTime = 0;
    const duration = 2000;

    function changeImage() {
        const index = Math.floor(Math.random() * images.length);
        cpuImage.attr("src", images[index]);

        totalTime += time;

        if (totalTime < duration) {
            time += 20;
            setTimeout(changeImage, time);
        } else {
            const finalIndex = Math.floor(Math.random() * images.length);
            cpuImage.attr("src", images[finalIndex]);

            const res = result(playerChoise, finalIndex);

            $("#playerPoints").text(playerPoints);
            $("#cpuPoints").text(cpuPoints);

            const $msg = setMessageValue(res);

            setTimeout(() => {
                $msg.removeClass("win lose draw").text("Escolha sua jogada");
            }, 1500);

            if (playerPoints === limit || cpuPoints === limit) {
                if (playerPoints === limit) {
                    $("#message").text("🎉 Você ganhou o jogo!");
                } else {
                    $("#message").text("😢 CPU ganhou o jogo!");
                }

                playButton.prop("disabled", true);

                $("#btnPlay").hide();
                $("#btnReset").show();
            } else {
                playButton.prop("disabled", false);
            }
        }
    }

    changeImage();
}

function resetGame() {
    playerPoints = 0;
    cpuPoints = 0;

    $("#playerPoints").text(0);
    $("#cpuPoints").text(0);

    $("#btnPlay").show().prop("disabled", false);
    $("#btnReset").hide();
}

$(".optionButtons button").on("click", function () {
    const option = $(this).data("option");
    choosePlay(option);
});