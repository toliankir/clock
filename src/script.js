const CLOCK_SIZE = 256;
const CLOCK_INNER_SIZE = 222;
const CENTER = CLOCK_SIZE / 2;
const BORDER_SIZE = 2;

const MINOR_TICK_HEIGHT = 1;
const MINOR_TICK_WIDTH = 5;
const MAJOR_TICK_HEIGHT = 3;
const MAJOR_TICK_WIDTH = 12;

const SECOND_HAND_WIDTH = 102;
const SECOND_HAND_HEIGHT = 3;

const BORDER_COLOR = '#1F272A';
// const draw = SVG().addTo('body');

const clockDraw = SVG('clock').size(CLOCK_SIZE, CLOCK_SIZE);

clockDraw
    .circle(CLOCK_SIZE - BORDER_SIZE * 2)
    .center(CENTER, CENTER)
    .fill('#757575')
    .stroke({width: BORDER_SIZE, color: BORDER_COLOR});

clockDraw
    .circle(CLOCK_INNER_SIZE)
    .center(CENTER, CENTER)
    .stroke({width: BORDER_SIZE, color: BORDER_COLOR})
    .fill('#FFF');


drawTicks(103);
drawDigits(81);
const date = new Date();
let currentSeconds = 0;

const secondHand = clockDraw.rect(SECOND_HAND_WIDTH, SECOND_HAND_HEIGHT)
    .center(CENTER + 36, CENTER)
    .fill('#E9343F')
    .rotate(getAngelFromSeconds((new Date).getSeconds()), CENTER, CENTER);


function setSeconds(seconds) {

        let angel = 6 * seconds - 90;
        if (angel > 100 ) angel -= 360;
    secondHand.animate(500).rotate(angel, CENTER, CENTER);
}

function mainLoop() {
    const date = new Date();
    if (currentSeconds !== date.getSeconds()) {
            currentSeconds = date.getSeconds();
            setSeconds(currentSeconds)
    }
    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);


function drawDigits(radius) {
    let hour = 1;
    for (let calcDegree = -60; calcDegree < 300; calcDegree += 30) {
        const x = CENTER + Math.cos(toRadians(calcDegree)) * radius;
        const y = CENTER + Math.sin(toRadians(calcDegree)) * radius;
        clockDraw
            .text(String(hour++))
            .font({size: 20, fill: '#0E0E0C', family: 'Helvetica Neue', weight: 'bold'})
            .center(x, y);
    }
}

function drawTicks(radius) {
    for (let calcDegree = 0; calcDegree < 360; calcDegree += 6) {

        const tickHeightDiff = MAJOR_TICK_HEIGHT - MINOR_TICK_HEIGHT / 2;
        const x = CENTER + Math.cos(toRadians(calcDegree))
            * (calcDegree % 5 !== 0 ? radius : radius - tickHeightDiff);
        const y = CENTER + Math.sin(toRadians(calcDegree))
            * (calcDegree % 5 !== 0 ? radius : radius - tickHeightDiff);

        clockDraw
            .rect(calcDegree % 5 !== 0 ? MINOR_TICK_WIDTH : MAJOR_TICK_WIDTH
                , calcDegree % 5 !== 0 ? MINOR_TICK_HEIGHT : MAJOR_TICK_HEIGHT)
            .fill('#000')
            .rotate(calcDegree, x, y)
            .center(x, y);
    }
}

function drawSecondHand() {

}


function toRadians(angle) {
    return angle * Math.PI / 180;
}

function getAngelFromSeconds(seconds){
    const angel = 6 * seconds - 90;
    return angel > 100 ? angel - 360 : angel;
}