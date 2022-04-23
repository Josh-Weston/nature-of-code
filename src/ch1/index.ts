const randomWalker = (p5: p5) => {
    class Walker {
        x: number = 0;
        y: number = 0;
        constructor(startX: number, startY: number) {
            this.x = startX;
            this.y = startY;
        }

        display() {
            p5.stroke(255);
            // p5.strokeWeight(5);
            p5.point(this.x, this.y);
        }
    
        step() {
            const x = p5.random(-1, 1); // allows for floating point
            const y = p5.random(-1, 1); // allows for floating point
            this.x += x;
            this.y += y;
        }
    }
    
    let w: Walker;

    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background('black');
        w = new Walker(p5.width / 2, p5.height / 2); // width and height are global variables
    };

    p5.draw = () => {
        w.step();
        w.display();
    };
};

// new p5(randomWalker, document.getElementById('canvas-1'));

// View how random numbers are uniform over time
const randomDistribution = (p5: p5) => {
    const randomCounts = Array(20).fill(0);
    
    p5.setup = () => {
        p5.createCanvas(800, 600);
    }

    p5.draw = () => {
        p5.background(255);
        const i = p5.int(p5.random(randomCounts.length));
        randomCounts[i]++;
        p5.stroke(0);
        p5.fill(175);
        const w = p5.width/randomCounts.length;
        randomCounts.forEach((d, i) => p5.rect(i*w, p5.height - randomCounts[i], w-1, randomCounts[i]));
    }
};

// new p5(randomDistribution, document.getElementById('canvas-2'));

// Create random walker with a tendency to move down and to the right
const randomWalkerRightLean = (p5: p5) => {
    class Walker {
        x: number = 0;
        y: number = 0;
        constructor(startX: number, startY: number) {
            this.x = startX;
            this.y = startY;
        }

        display() {
            p5.stroke(255);
            // p5.strokeWeight(5);
            p5.point(this.x, this.y);
        }
    
        step() {
            const [down, right] = Array(2).fill(1.5); // increasing this values will increase the tendency for down and to the right
            const x = p5.random([-1, 0, down]);
            const y = p5.random([-1, 0, right]);
            this.x += x;
            this.y += y;
        }
    }
    
    let w: Walker;

    p5.setup = () => {
        p5.frameRate(30); // defaults to 60 for most monitors
        p5.createCanvas(500, 500);
        p5.background('black');
        w = new Walker(p5.width / 2, p5.height / 2); // width and height are global variables
    };

    // draw is used for animation
    p5.draw = () => {
        w.step();
        w.display();
    };
};

new p5(randomWalkerRightLean, document.getElementById('canvas-1'));

const drawImage = (p5: p5) => {

    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.loadImage("./new_york_times_covid.jpg", drawImage);
    }

    function drawImage(img: p5.Image) {
        p5.image(img, 0, 0)
    }

}

// new p5(drawImage, document.getElementById('canvas-1'));

// Note: notice the similarities between p5 sketch and 
// Arduino sketch.
