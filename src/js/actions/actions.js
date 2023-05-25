// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinha
// Project for Introduction of Computer Graphics
// ************************** //

// Constants
const newGameButton = document.getElementById('newgame');
const timer = document.getElementById('timer');

// functions
export function newGame() {
    newGameButton.addEventListener('click', function () {
        location.reload();
    });
}


export function startTimer() {
    let startTime = new Date().getTime();

    // update the timer every second
    setInterval(() => {
        // calculate the elapsed time
        let elapsedTime = new Date().getTime() - startTime;

        // format the elapsed time as MM:SS
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // update the timer element
        timer.innerText = timeString;
    }, 1000);
}

export function centerCamera(camera) {
    const center = document.getElementById('center');
    center.addEventListener('click', function () {
        camera.position.set(20, 70, 70);
    });

}