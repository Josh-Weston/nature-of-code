const P5 = p5; // redeclare to make it easier to access global functions

const bouncingBall = (p5:p5) => {

    let location: p5.Vector,
        velocity: p5.Vector;
    
    p5.setup = () => {
        p5.createCanvas(500, 500);
        location = p5.createVector(100, 100);
        velocity = p5.createVector(2.5, 5);
    }

    p5.draw = () => {
        p5.background(255);
        location.add(velocity);

        if (location.x > p5.width || location.x < 0) {
            velocity.x *= -1;
        }

        if (location.y > p5.height || location.y < 0) {
            velocity.y *= -1;
        }

        p5.stroke(0);
        p5.fill(175);
        p5.ellipse(location.x, location.y, 16, 16);
    }

};

// new location = velocity applied to current location
// velocity = the rate at which an object changes its position
// a vector describes how to move from one location to another
// to add vectors we simply add their x, y coordinates

// A random walker that uses vectors instead
const LevyFlightRandomWalkVector = (p5:p5) => {
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

            const stepSize = value > probability ? probabilityValue : 10;

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

// new p5(LevyFlightRandomWalkVector, document.getElementById('canvas-1'));

const vectorSubtraction = (p5:p5) => {
    p5.setup = () => {
        p5.createCanvas(640, 360);
    }

    p5.draw = () => {
        p5.background(255);

        const mouse = p5.createVector(p5.mouseX, p5.mouseY);
        const center = p5.createVector(p5.width/2, p5.height/2);
        mouse.sub(center);
        p5.translate(p5.width/2, p5.height/2);
        p5.line(0, 0, mouse.x, mouse.y);
    }
};

// new p5(vectorSubtraction, document.getElementById('canvas-1'));

const twoDimensionalPerlinNoise = (p5:p5) => {

    let inc = 0.01;
    p5.setup = () => {
        p5.createCanvas(200, 200);
        p5.pixelDensity(1); // turn of HD
    };

    p5.draw = () => {
        let yoff = 0;
        p5.loadPixels();
        for (let x = 0; x < p5.width; x++) {
            let xoff = 0;
            for (let y = 0; y < p5.height; y++) {
                const index = (x + y * p5.width) * 4;
                const r = p5.noise(xoff, yoff) * 255;
                p5.pixels[index + 0] = r;
                p5.pixels[index + 1] = r;
                p5.pixels[index + 2] = r;
                p5.pixels[index + 3] = 255;
                xoff += inc;
            }
            yoff += inc;
        }
        p5.updatePixels();
    }
};

// new p5(twoDimensionalPerlinNoise, document.getElementById("canvas-1"));

const vectorMultiplication = (p5:p5) => {
    p5.setup = () => {
        p5.createCanvas(640, 360);
    }

    p5.draw = () => {
        p5.background(255);

        const mouse = p5.createVector(p5.mouseX, p5.mouseY);
        const center = p5.createVector(p5.width/2, p5.height/2);
        mouse.sub(center);
        mouse.mult(0.5); // scale a vector to be half the distance to the mouse
        p5.translate(p5.width/2, p5.height/2); // where to start drawing from
        p5.line(0, 0, mouse.x, mouse.y);
    }
};

// new p5(vectorMultiplication, document.getElementById("canvas-1"));

const vectorMagnitude = (p5:p5) => {
    p5.setup = () => {
        p5.createCanvas(640, 360);
    }

    p5.draw = () => {
        p5.background(255);
        const mouse = p5.createVector(p5.mouseX, p5.mouseY);
        const center = p5.createVector(p5.width/2, p5.height/2);
        mouse.sub(center);
        const m = mouse.mag();
        p5.fill(0);
        p5.rect(0, 0, m, 10); // draw a rectangle at the top of the window to demonstrate the vector's magnitude
        p5.translate(p5.width/2, p5.height/2);
        p5.line(0, 0, mouse.x, mouse.y);
    }
};

// new p5(vectorMagnitude, document.getElementById("canvas-1"));

// 1.6 Normalizing Vectors
// A unit vector describes a vector's direction without regard to its length, which is handy

const normalizeVector = (p5:p5) => {
    p5.setup = () => {
        p5.createCanvas(640, 360);
    }

    p5.draw = () => {
        p5.background(255);
        const mouse = p5.createVector(p5.mouseX, p5.mouseY);
        const center = p5.createVector(p5.width/2, p5.height/2);
        mouse.sub(center);
        mouse.normalize();
        mouse.mult(50); // after normalizing, we scale to 50 so it is the same size
        p5.translate(p5.width/2, p5.height/2);
        p5.line(0, 0, mouse.x, mouse.y);
    };
};

// new p5(normalizeVector, document.getElementById("canvas-1"));

// 1.7 Vector Motion: Velocity
// An object on screen has a location (where it is at any given moment) as well as a velocity (instructions for how it should move)
// from one moment to the next. Velocity is added to location.
// Motion 101: 1. Add velocity to location, 2. Draw object at new location

const vectorMotion = (p5:p5) => {
    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;

        constructor() {
            this.location = p5.createVector(p5.random(p5.width), p5.random(p5.height));
            this.velocity = p5.createVector(p5.random(-2, 2), p5.random(-2, 2));
        }
    
        update() {
            this.location.add(this.velocity);
        }
    
        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, 16, 16);
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = 0;
            } else if (this.location.x < 0) {
                this.location.x = p5.width;
            }

            if (this.location.y > p5.height) {
                this.location.y = 0;
            } else if (this.location.y < 0) {
                this.location.y = p5.height;
            }
        }
    }

    const m = new Mover();
    p5.setup = () => {
        p5.createCanvas(640, 360);
    }

    p5.draw = () => {
        p5.background(255);
        m.update();
        m.checkEdges();
        m.display();
    }
};

// new p5(vectorMotion, document.getElementById("canvas-1"));

// 1.8 Vector Motion: acceleration
// Velocity = the rate of change of location
// Acceleration = the rate of change of velocity
// Acceleration affects velocity which in turn affects location
// velocity.add(accleration)
// location.add(velocity)

const vectorAcceleration = (p5:p5) => {
    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        topSpeed: number = 10;

        constructor() {
            this.location = p5.createVector(p5.width/2, p5.height/2);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(-0.001, 0.01);
            this.topSpeed = 10;
        }
    
        update() {
            this.velocity.add(this.acceleration); // acceleration is cumulative
            this.velocity.limit(this.topSpeed);
            this.location.add(this.velocity);
        }
    
        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, 16, 16);
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = 0;
            } else if (this.location.x < 0) {
                this.location.x = p5.width;
            }

            if (this.location.y > p5.height) {
                this.location.y = 0;
            } else if (this.location.y < 0) {
                this.location.y = p5.height;
            }
        }
    }

    const m = new Mover();
    p5.setup = () => {
        p5.createCanvas(640, 360);
    }

    p5.draw = () => {
        p5.background(255);
        m.update();
        m.checkEdges();
        m.display();
    }
};

// new p5(vectorAcceleration, document.getElementById("canvas-1"));

const x: p5.Vector = undefined;

const vectorAccelerationControlled = (p5:p5) => {
    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        topSpeed: number = 1;

        constructor() {
            this.location = p5.createVector(p5.width/2, p5.height/2);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(-0.001, 0.01);
            this.topSpeed = 1;
        }
    
        update() {
            this.velocity.add(this.acceleration); // acceleration is cumulative
            this.velocity.limit(this.topSpeed);
            this.location.add(this.velocity);
        }
    
        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, 16, 16);
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = 0;
            } else if (this.location.x < 0) {
                this.location.x = p5.width;
            }

            if (this.location.y > p5.height) {
                this.location.y = 0;
            } else if (this.location.y < 0) {
                this.location.y = p5.height;
            }
        }

        reduceAcceleration() {
            if (this.acceleration.y > -1) {
                this.acceleration.y -= 0.01;
            }
        }

        increaseAcceleration() {
            this.acceleration.y += 0.01;
        }

        goLeft() {
            if (this.acceleration.x > 0) {
                this.acceleration.x *= -1;
            }
        }

        goRight() {
            if (this.acceleration.x < 0) {
                this.acceleration.x *= -1
            }
        }

    }

    const m = new Mover();
    p5.setup = () => {
        p5.createCanvas(640, 360);
    }

    p5.draw = () => {
        p5.background(255);
        m.update();
        m.checkEdges();
        m.display();
    }

    window.addEventListener('keydown', (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown': {
                m.reduceAcceleration()
                break;
            }
            case 'ArrowUp': {
                m.increaseAcceleration();
                break;
            }
            case 'ArrowLeft': {
                m.goLeft();
                break;
            }
            case 'ArrowRight': {
                m.goRight();
                break;
            }
        }
    });
};

// new P5(vectorAccelerationControlled, document.getElementById("canvas-1"));

const vectorAccelerationRandom = (p5:p5) => {
    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        topSpeed: number = 2;
        xoff: number = 0;
        yoff: number = 10_000;
        size: number = 16;

        constructor(size: number) {

            // Note: we could use new P5.Vector(p5.width/2, p5.height/2) as well
            this.location = p5.createVector(p5.width/2, p5.height/2);
            this.velocity = p5.createVector(0, 0);
            // this.acceleration = P5.Vector.random2D();
            this.acceleration = p5.createVector(0, 0);
            this.size = size;
        }
    
        update() {

            // how would we implement this as perlin noise? Perlin noise has values between 0 and 1, I guess we would map them to be between -1 and 1?
            this.acceleration.x = p5.map(p5.noise(this.xoff), 0, 1, -2, 2);
            this.acceleration.y = p5.map(p5.noise(this.yoff), 0, 1, -2, 2);

            // for the most part, we are seeing numbers that pushing us to the left and up

            // this.acceleration = P5.Vector.random2D(); // looks like this picks values between -1 and 1
            // this.acceleration.mult(p5.random(2));
            this.velocity.add(this.acceleration); // acceleration is cumulative
            this.velocity.limit(this.topSpeed);
            this.location.add(this.velocity);
            this.xoff += 0.01; // the higher this number, the more "aimless" the motion appears
            this.yoff += 0.01   ;

        }
    
        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.size, this.size);
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = 0;
            } else if (this.location.x < 0) {
                this.location.x = p5.width;
            }

            if (this.location.y > p5.height) {
                this.location.y = 0;
            } else if (this.location.y < 0) {
                this.location.y = p5.height;
            }
        }
    }

    const m = new Mover(48);
    p5.setup = () => {
        p5.createCanvas(640, 360);
    }

    p5.draw = () => {
        p5.background(255);
        m.update();
        m.checkEdges();
        m.display();
    }
};

// new P5(vectorAccelerationRandom, document.getElementById("canvas-1"));

// 1.10 Interactivity with acceleration'
const vectorAccelerationMouse = (p5:p5) => {
    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        // topSpeed: number = 2;
        xoff: number = 0;
        yoff: number = 10_000;
        size: number = 16;

        constructor(size: number) {

            // Note: we could use new P5.Vector(p5.width/2, p5.height/2) as well
            this.location = p5.createVector(p5.random(p5.width), p5.random(p5.height));
            this.velocity = p5.createVector(0, 0);
            // this.acceleration = P5.Vector.random2D();
            this.acceleration = p5.createVector(0, 0);
            this.size = size;
        }
    
        update() {

            // get our direction
            const mouse = p5.createVector(p5.mouseX, p5.mouseY);
            const dir = P5.Vector.sub(mouse, this.location); // the direction is implied by the x and y values of the mouse
            // make the acceleration faster the closer it gets (like a gravitational pull)
            const strength = p5.map(Math.abs(dir.x) + Math.abs(dir.y), 0, p5.width + p5.height, 10, 0.5); // Note: this has to be done before normalization

            // scatter when they get too close
            // this creates a pretty neat effect
            if (strength > 9.9) {
                this.location.x = p5.random(p5.width);
                this.location.y = p5.random(p5.height);
            }

            // normalize it so we can scale it to whatever we want
            dir.normalize();
            dir.mult(strength);

            // assign it to our accleration
            this.acceleration = dir;

            // this.velocity.add(this.acceleration); // acceleration is cumulative
            // this.velocity.limit(this.topSpeed);
            this.location.add(this.acceleration);
            // this.location.add(this.velocity);
            this.xoff += 0.01; // the higher this number, the more "aimless" the motion appears
            this.yoff += 0.01;

        }
    
        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.size, this.size);
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = 0;
            } else if (this.location.x < 0) {
                this.location.x = p5.width;
            }

            if (this.location.y > p5.height) {
                this.location.y = 0;
            } else if (this.location.y < 0) {
                this.location.y = p5.height;
            }
        }
    }

    // const movers = new Array(20).fill(new Mover(16)); // I imagine this will start it with the same one
    const movers = new Array(20).fill(0);
    // const m = new Mover(16);
    p5.setup = () => {
        p5.createCanvas(640, 360);
        for (let i = 0, len = movers.length; i < len; i++) {
            movers[i] = new Mover(16);
        }
    }

    p5.draw = () => {
        p5.background(255);
        for (let i = 0, len = movers.length; i < len; i++) {
            movers[i].update();
            movers[i].checkEdges();
            movers[i].display();
        }
        // m.update();
        // m.checkEdges();
        // m.display();
    }
};

new P5(vectorAccelerationMouse, document.getElementById("canvas-1"));


// export {};