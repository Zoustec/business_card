const setEventListener = () => {
    console.log("fff");
    const webButton = document.querySelector("#web-button");
    webButton.addEventListener("click", function (evt) {
        window.location.href = "https://zoustec.com/";
    });

    const emailButton = document.querySelector("#email-button");
    emailButton.addEventListener("click", function (evt) {
        window.location.href = "mailto:zoustec.tw@gmail.com";
    });

    const phontButton = document.querySelector("#phone-button");
    phontButton.addEventListener("click", function (evt) {
        window.location.href = "tel:+886229650060";
    });

    const portfolioLeftButton = document.querySelector("#portfolio-left-button");
    portfolioLeftButton.addEventListener("click", () => {
        console.log("portfolioLeftButton");
        turnCylinder(1);
    });

    const portfolioRightButton = document.querySelector("#portfolio-right-button");
    portfolioRightButton.addEventListener("click", () => {
        console.log("portfolioRightButton");
        turnCylinder(-1);
    });

    const playVideoButtons = [document.querySelector("#play-video-button0"), document.querySelector("#play-video-button1"), document.querySelector("#play-video-button2")];
    playVideoButtons[0].addEventListener("click", () => {
        showVideo("Videos/vr_game.mp4");
    });

    playVideoButtons[1].addEventListener("click", () => {
        showVideo("Videos/ar_game.mp4");
    });

    playVideoButtons[2].addEventListener("click", () => {
        showVideo("Videos/panorama.mp4");
    });
};

const showInfo = () => {
    const webButton = document.querySelector("#web-button");
    const emailButton = document.querySelector("#email-button");
    const phontButton = document.querySelector("#phone-button");

    setTimeout(() => {
        webButton.setAttribute("visible", true);
    }, 300);
    setTimeout(() => {
        emailButton.setAttribute("visible", true);
    }, 600);
    setTimeout(() => {
        phontButton.setAttribute("visible", true);
    }, 900);
};

let autoTurn = null;
let currentItem = 0;

const showPortfolio = (done) => {
    const portfolio = document.querySelector("#portfolio-panel");
    portfolio.setAttribute("visible", true);
    doAutoTurn();
    done();
};

const doAutoTurn = () => {

    if (!!autoTurn) {
        clearTimeout(autoTurn);
        autoTurn = null;
    }

    autoTurn = setTimeout(() => {
        console.log("autoturn");
        turnCylinder(1);
    }, 5000);
};

const turnCylinder = (value) => {
    const portlolioCylinder = document.querySelector("#portfolio-cylinder");
    const playVideoButtons = [document.querySelector("#play-video-button0"), document.querySelector("#play-video-button1"), document.querySelector("#play-video-button2")];
    const portfolioLeftButton = document.querySelector("#portfolio-left-button");
    const portfolioRightButton = document.querySelector("#portfolio-right-button");

    if (!!autoTurn) {
        clearTimeout(autoTurn);
        autoTurn = null;
    }

    for (let i = 0; i <= 2; i++) {
        playVideoButtons[i].classList.remove("clickable");
    }

    portfolioLeftButton.setAttribute("visible", false);
    portfolioLeftButton.classList.remove("clickable");
    portfolioRightButton.setAttribute("visible", false);
    portfolioRightButton.classList.remove("clickable");
    const startRotation = currentItem * 120;
    currentItem = currentItem + value;
    const endRotation = currentItem * 120;
    currentItem = (currentItem + 3) % 3;
    console.log(currentItem);
    let alpha = 0;

    const id = setInterval(() => {

        if (alpha < 1) {
            alpha += 0.01;
        }
        else {
            alpha = 1;
            clearInterval(id);
            portfolioLeftButton.setAttribute("visible", true);
            portfolioLeftButton.classList.add("clickable");
            portfolioRightButton.setAttribute("visible", true);
            portfolioRightButton.classList.add("clickable");

            playVideoButtons[currentItem].classList.add("clickable");

            doAutoTurn();
        }

        portlolioCylinder.setAttribute("rotation", "0 " + (startRotation + ((endRotation - startRotation) * alpha)) + " 0");
    }, 10);
};

const showAvatar = (onDone) => {
    const avatar = document.querySelector("#avatar");
    avatar.setAttribute("visible", true);
    onDone();
};

const showVideo = (src) => {
    const videoDialog = document.querySelector("#videoDialog");
    const video = videoDialog.querySelector("video");
    videoDialog.style.display = "block";
    video.src = src;
    video.play();
};

const hideVideo = () => {
    const videoDialog = document.querySelector("#videoDialog");
    const video = videoDialog.querySelector("video");
    if (video.played)
        video.pause();

    videoDialog.style.display = "none";
};

AFRAME.registerComponent("mytarget", {
    init: function () {
        this.el.addEventListener("targetFound", (event) => {
            //console.log("target found");
            showAvatar(() => {
                setTimeout(() => {
                    showPortfolio(() => {
                        setTimeout(() => {
                            showInfo();
                        }, 300);
                    });
                }, 300);
            });
        });
        this.el.addEventListener("targetLost", (event) => {
            // console.log("target lost");
        });
    }
});

window.addEventListener("load", (event) => {
    setEventListener();
});
/*
setTimeout(() => {
    showAvatar(() => {
        setTimeout(() => {
            showPortfolio(() => {
                setTimeout(() => {
                    showInfo();
                }, 300);
            });
        }, 300);
    });
}, 2000)
*/