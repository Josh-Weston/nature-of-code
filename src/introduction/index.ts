import P5 from 'p5';
import SimplexNoise from 'simplex-noise';

// Note: I have disabled inlay parameter hints because of the noise it introduces
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
            const num = p5.random(1);
            switch (true) {
                case num < 0.4:
                    this.x++;
                    break;
                case num < 0.6:
                    this.x--;
                    break;
                case num < 0.8:
                    this.y++;
                    break;
                default:
                    this.y--;
            }
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

// new p5(randomWalkerRightLean, document.getElementById('canvas-1'));

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
// Arduino sketch!

const drawProbability = (p5:p5) => {
    const randomCounts = Array(3).fill(0);
    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background(255);
    }

    // we force the 0's and 2's to be selected more often by making them occur more often in our pool
    p5.draw = () => {
        const dist = [0, 0, 1, 2, 2];
        const index = p5.int(p5.random(dist.length));
        randomCounts[dist[index]]++
        p5.stroke(0);
        p5.fill(175);
        const w = p5.width/randomCounts.length;
        randomCounts.forEach((d, i) => p5.rect(i*w, p5.height - randomCounts[i], w-1, randomCounts[i]));
    }
}

// new p5(drawProbability, document.getElementById("canvas-2"));

// Create random walker with a tendency to move down and to the right
const randomWalkerMousePosition = (p5: p5) => {
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
            const prob = p5.random(1);
            if (prob < 0.5) {
                this.x += p5.mouseX > this.x ? p5.random(1) : p5.random(-1);
                this.y += p5.mouseY > this.y ? p5.random(1) : p5.random(-1);
            } else {
                this.x += p5.random(-1, 1);
                this.y += p5.random(-1, 1);
            }
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

// new p5(randomWalkerMousePosition, document.getElementById('canvas-2'));

// I.4 A normal distribution of random numbers
const normalDistribution = (p5:p5) => {

    let numIterations = 10;

    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background('black');
    }

    p5.draw = () => {
        const num = p5.randomGaussian(250, 100);
        const color1 = p5.randomGaussian(200, 25);
        const color2 = p5.randomGaussian(100, 25);
        const color3 = p5.randomGaussian(100, 50);
        p5.noStroke();
        p5.fill(color1, color2, color3, 10);
        p5.ellipse(num, p5.width/2, 20, 20);
        if (numIterations-- < 0) {  
            stop()
        }
    }

    // function stop() {
    //     p5.noLoop();
    //     setTimeout(start, 5000);
    // }

    // function start() {
    //     numIterations = 10;
    //     p5.loop();
    // }

};

// new p5(normalDistribution, document.getElementById('canvas-2'));

const gaussianPaintSplatter = (p5: p5) => {
    
    let numIterations = 500;
    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background('black');
    }

    p5.draw = () => {
        const numX = p5.randomGaussian(250, 50);
        const numY = p5.randomGaussian(250, 50);
        const color1 = p5.randomGaussian(200, 25);
        const color2 = p5.randomGaussian(100, 25);
        const color3 = p5.randomGaussian(100, 50);
        p5.noStroke();
        p5.fill(color1, color2, color3, 10);
        p5.ellipse(numX, numY, 20, 20);
        if (numIterations-- === 0) {
            stop();
        }
    }

    function stop() {
        p5.noLoop();
    }

};

// new p5(gaussianPaintSplatter, document.getElementById('canvas-2'));

const gaussianRandomWalk = (p5:p5) => {

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
    
        // this is like spray painting
        step() {
            const x = p5.randomGaussian(0, 5); // allows for floating point
            const y = p5.randomGaussian(0, 5); // allows for floating point
            this.x += x;
            this.y += y;
        }
    }
    
    let w: Walker;

    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background('black');
        w = new Walker(p5.width / 2, p5.height / 2); // width and height are global variables
    }

    p5.draw = () => {
        w.step();
        w.display();
    }
};

// new p5(gaussianRandomWalk, document.getElementById('canvas-2'));

// I.5 A Custom Distribution of Random Numbers

const LevyFlightRandomWalk = (p5:p5) => {

    class Walker {

        location: p5.Vector = p5.createVector(0, 0);
        constructor(startX: number, startY: number) {
            this.location.x = startX;
            this.location.x = startY;
        }

        display() {
            p5.stroke(255);
            // p5.strokeWeight(5);
            p5.point(this.location.x, this.location.y);
        }
    
        // this is like spray painting
        step() {

            const probabilityValue = p5.random(); // between (0, 1] // qualifying random number
            const probability = probabilityValue**10;
            // const probability = probabilityValue;
            const value = p5.random();

            const stepSize = value > probability ? probabilityValue : 100;

            this.location.x += p5.random(-stepSize, stepSize);
            this.location.y += p5.random(-stepSize, stepSize);
        }
    }
    
    let w: Walker;

    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background('black');
        w = new Walker(p5.width / 2, p5.height / 2); // width and height are global variables
    }

    p5.draw = () => {
        w.step();
        w.display();
    }
};

// new p5(gaussianRandomWalk, document.getElementById('canvas-2'));

// I.6 Perlin Noise (A Smoother Approach)
const perlinNoise = (p5:p5) => {
    let t = 0; // if we don't increment t, we will always receive the same value back
    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background('black');
        const x = p5.random(0, p5.width);
    }
    
    p5.draw = () => {
        const n = p5.noise(t);
        const x = p5.map(n, 0, 1, 0, p5.width);
        p5.ellipse(x, p5.width/2, 16, 16);
        t += 0.01; // the larger the stepsize, the more random the values (e.g., we are skipping further ahead in time)
    }

}

// new p5(perlinNoise, document.getElementById('canvas-2'));

// This one looks way cooler!
const perlinNoiseWalker = (p5:p5) => {
    class Walker {
        x: number = 0;
        y: number = 0;
        tx: number = 0;
        ty: number = 10_000;

        constructor(startX: number, startY: number) {
            this.x = startX; 
            this.y = startY;
        }
        
        step() {
            this.x = p5.map(p5.noise(this.tx), 0, 1, 0, p5.width);
            this.y = p5.map(p5.noise(this.ty), 0, 1, 0, p5.height);
            this.tx += 0.01;
            this.ty += 0.01;
        }

        display() {
            p5.stroke(255);
            p5.point(this.x, this.y);
        }
    }

    let w: Walker;
    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background('black');
        w = new Walker(p5.width / 2, p5.height / 2); // width and height are global variables
    }

    p5.draw = () => {
        w.step();
        w.display();
    }
}

// new p5(perlinNoiseWalker, document.getElementById('canvas-2'));

// This one is pretty cool, too!
const perlinNoiseWalkerStepSize = (p5:p5) => {
    class Walker {
        x: number = 0;
        y: number = 0;
        tx: number = 0;
        ty: number = 10_000;

        constructor(startX: number, startY: number) {
            this.x = startX; 
            this.y = startY;
        }
        
        step() {
            const stepX = p5.map(p5.noise(this.tx), 0, 1, -1, 1);
            const stepY = p5.map(p5.noise(this.ty), 0, 1, -1, 1);

            this.x += stepX;
            this.y += stepY;
            this.tx += 0.01;
            this.ty += 0.01;
        }

        display() {
            p5.stroke(255);
            p5.point(this.x, this.y);
        }
    }

    let w: Walker;
    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background('black');
        w = new Walker(p5.width / 2, p5.height / 2); // width and height are global variables
    }

    p5.draw = () => {
        w.step();
        w.display();
    }
}

// new p5(perlinNoiseWalkerStepSize, document.getElementById('canvas-2'));

const clouds = (p5:p5) => {

    let zoff = 0;
    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.loadPixels() // remember, pixels are a continguous Uint8ClampedArray
    }

    // this will animate it, but it's very slow
    p5.draw = () => {
        zoff += 0.2;
        p5.noiseDetail(8, 0.01);
        const d = p5.pixelDensity();
        let xoff = 0;
        for (let x = 0; x < p5.width; x++) {
            let yoff = 0;
            for (let y = 0; y < p5.height; y++) {
                // Update each pixel
                // Note: this is the behaviour that DOD talks about that should just be an array of arrays
                const a = p5.map(p5.noise(xoff, yoff, zoff), 0, 1, 0, 255);
                for (let i = 0; i < d; i++) {
                    for (let j = 0; j < d; j++) {
                        const index = 4 * ((y * d + j) * p5.width * d + (x * d + i));
                        p5.pixels[index + 2] = a;
                        p5.pixels[index + 3] = a;

                    }
                }
                yoff += 0.005;
            }
            xoff += 0.1;
        }
        p5.updatePixels();
    }
};

let inc = 0.01;
let start = 0;
const videoPerlinNoiseAnimation = (p5: p5) => {
    // let xoff1 = 0,
        // xoff2 = 10_000;
    p5.setup = () => {
        p5.createCanvas(500, 500);
    };
    
    p5.draw = () => {
        p5.background(51);
        // const x = p5.map(p5.noise(xoff1), 0, 1, 0, p5.width);
        // const y = p5.map(p5.noise(xoff2), 0, 1, 0, p5.height);
        // p5.ellipse(x, y, 24, 24);
        // xoff1 += 0.01; // the smaller, the number the "smoother" the animation becomes (e.g., the steps are less severe)
        // xoff2 += 0.01; // the smaller, the number the "smoother" the animation becomes (e.g., the steps are less severe)
        
        p5.stroke(255);
        p5.noFill();
        p5.beginShape(); // allows drawing of a contiguous shape
        let xoff = start;

        for (let x = 0; x < p5.width; x++) {

            p5.stroke(255);
            // p5.point(x, p5.random(p5.height));
            // const y = p5.random(p5.height);
            // const y = p5.noise(xoff) * p5.height; // perlin noise
            // const y = p5.height/2 + p5.sin(xoff) * p5.height/2; // sin wave
            // const y = p5.noise(xoff) * 100 + p5.height/2 + p5.sin(xoff) * p5.height/2; // sin wave with perlin noise
            const n = p5.map(p5.noise(xoff), 0, 1, -50, 50);
            const s = p5.map(p5.sin(xoff), -1, 1, 0, p5.height);
            const y = s + n; // you could use this approach to create "handwritten" letters
            
            p5.vertex(x, y);
            xoff += inc;
        }
        p5.endShape();
        start += inc;
        // p5.noLoop();
    
    
    };
};

// new p5(videoPerlinNoiseAnimation, document.getElementById('canvas-2'));

const videoOpenSimplex = (p5:p5) => {

    let zoff = 0;
    const simplex = new SimplexNoise('seed');
    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.loadPixels() // remember, pixels are a continguous Uint8ClampedArray
        p5.frameRate(30);
    }

    // the simplex method is much smoother and fluid
    // this will animate it, but it's very slow
    p5.draw = () => {
        zoff += 0.01; // the lower this number, the more "fluid" the changes are. This can create a "water type"
        const d = p5.pixelDensity();
        let xoff = 0;
        for (let x = 0; x < p5.width; x++) {
            let yoff = 0;
            for (let y = 0; y < p5.height; y++) {
                // Update each pixel
                // Note: this is the behaviour that DOD talks about that should just be an array of arrays
                const a = p5.map(simplex.noise3D(xoff, yoff, zoff), 0, 1, 0, 255);
                const bright = p5.map(a, -1, 1, 0, 255);
                for (let i = 0; i < d; i++) {
                    for (let j = 0; j < d; j++) {
                        const index = 4 * ((y * d + j) * p5.width * d + (x * d + i));
                        p5.pixels[index + 2] = a;
                        p5.pixels[index + 3] = a;

                    }
                }
                yoff += 0.5;
            }
            xoff += 0.5;
        }
        p5.updatePixels();
    }
};

// new P5(videoOpenSimplex, document.getElementById('canvas-1'));

const videoRandomWalk = (p5: p5) => {

    let x: number, y: number;

    p5.setup = () => {
        p5.createCanvas(500, 500);
        x = p5.width / 2;
        y = p5.height / 2;
        p5.background(51);
    }

    p5.draw = () => {
        p5.stroke(255);
        p5.strokeWeight(1);
        p5.point(x, y);

        // find its next location
        const r = p5.floor(p5.random(4));

        switch (r) {
            case 0:
                x += 1;
                break;
            case 1:
                x -= 1;
                break;
            case 2:
                y += 1;
                break;
            case 3:
                y -= 1;
        }

        p5.noLoop();
    }
};

new P5(videoRandomWalk, document.getElementById('canvas-1'));