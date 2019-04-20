class Clock {
    CLOCK_SIZE = 256;
    CENTER = this.CLOCK_SIZE / 2;
    CLOCK_INNER_SIZE = 222;

    BORDER_SIZE = 2;
    BORDER_COLOR = '#1F272A';

    constructor(rootObj) {
        this.mainSvg = SVG(rootObj).size(this.CLOCK_SIZE, this.CLOCK_SIZE);
    }

    drawClock() {
        this.mainSvg
            .circle(this.CLOCK_SIZE - this.BORDER_SIZE * 2)
            .center(this.CENTER, this.CENTER)
            .fill('#757575')
            .stroke({width: this.BORDER_SIZE, color: this.BORDER_COLOR});

        this.mainSvg
            .circle(this.CLOCK_INNER_SIZE)
            .center(this.CENTER, this.CENTER)
            .stroke({width: this.BORDER_SIZE, color: this.BORDER_COLOR})
            .fill('#FFF');
    }
}

const clock = new Clock('clock');
clock.drawClock();