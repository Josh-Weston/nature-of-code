import P5 from 'p5';

const Baton = (p5:p5) => {

    p5.setup = () => {
        p5.createCanvas(500, 500);
    };

    let rotate: number = 0;

    p5.draw = () => {
        p5.background(0);
        p5.translate(p5.width/2, p5.height/2); // determines the origin of the drawing and rotation
        p5.stroke(255);
        
        // draw the stick
        p5.rotate(p5.radians(rotate));
        p5.line(0, 0, 50, 50);
        
        // draw the end circle
        p5.fill(100);
        p5.ellipse(50, 50, 20, 20); // draw a circle that is over 50 and down 50 (after accounting for the rotation)

        // draw the center circle
        p5.ellipse(0, 0, 20, 20);
        
        rotate++;


    };

};

// new P5(Baton, document.getElementById("canvas-1"));

const Baton31 = (p5:p5) => {
    let angle = 0;
    let aVel = 0;
    let aAcc = 0.001;

    p5.setup = () => {
        p5.createCanvas(500, 500);
    };

    p5.draw = () => {
        p5.background(255);
        p5.fill(175);
        p5.stroke(0);
        p5.rectMode(p5.CENTER);
        p5.translate(p5.width/2, p5.height/2);
        p5.rotate(angle);
        p5.line(-50, 0, 50, 0);
        p5.ellipse(50, 0, 8, 8);
        p5.ellipse(-50, 0, 8, 8);

        aVel += aAcc;
        angle += aVel;


    };
};

// new P5(Baton31, document.getElementById('canvas-1'));

const AngularMover = (p5:p5) => {
    class Mover {
        pos: P5.Vector;
        vel: P5.Vector;
        acc: P5.Vector;
        r: number = 16;
        mass: number = 1;

        // direction and speed of rotatin
        angle: number = 0;
        aVelocity: number = 0;
        aAcceleration: number = 0;

        constructor(x: number, y: number) {
            this.pos = p5.createVector(p5.width/2, 0);
            this.vel = p5.createVector(0, 0.5);
            this.acc = p5.createVector(0, 0);
        }

        // applies a force from the environment
        applyForce(force: P5.Vector) {
            let f: P5.Vector = p5.createVector();
            P5.Vector.div(force, this.mass, f);
            this.acc.add(f);
        }
        
        update() {
            this.vel.add(this.acc)
            this.pos.add(this.vel);
            
            this.aAcceleration = this.acc.x / 10; // set the acceleration to the direction the acceleration is moving in
            this.aVelocity += this.aAcceleration // make it spin faster on each frame
            this.aVelocity = p5.constrain(this.aVelocity, -0.1, 0.1);
            this.angle += this.aVelocity;
        
            this.acc.set(0, 0);
        }

        show() {
            p5.stroke(255);
            p5.strokeWeight(2);
            p5.fill(255, 100);
            p5.rectMode(p5.CENTER);
            p5.push(); // save the current drawing state so rotation won't impact everything

            p5.translate(this.pos.x, this.pos.y);
            p5.rotate(this.angle);
            p5.rect(0, 0, this.mass*32, this.mass*32);
            p5.pop();
        }

        // this creates a bouncing ball
        edge() {
            if (this.pos.y >= p5.height - this.r) {
                this.pos.y = p5.height - this.r;
                this.vel.y *= -1;
            }
            if (this.pos.x >= p5.width - this.r) {
                this.pos.x = p5.width - this.r;
                this.vel.x *= -1;
            }
            if (this.pos.x <= this.r ) {
                this.pos.x = this.r;
                this.vel.x *= -1;
            }
        }
    }

    let mover: Mover;

    p5.setup = () => {
        const canvas = p5.createCanvas(400, 400);
        canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault())
        mover = new Mover(200, 200);
    };
    
    p5.draw = () => {
        p5.background(0);
        
        if (p5.mouseIsPressed) {
            let wind;
            // left mouse blows wind from the left
            if (p5.mouseButton == p5.LEFT) {
                wind = p5.createVector(0.1, 0);
            // right mouse blows wind from the right
            } else {
                wind = p5.createVector(-0.1, 0);
            }
            mover.applyForce(wind);
        }
        
        let gravity = p5.createVector(0, 0.3);
        let weight = p5.createVector();
        P5.Vector.mult(gravity, mover.mass, weight); // scale gravity accorinding to mass
        mover.applyForce(weight);

        mover.update();
        mover.edge();
        mover.show();
    };

};

// new P5(AngularMover, document.getElementById('canvas-1'));

// 3.3 Trigonometry
// sohcahtoa


//3.4 Pointing in the Direction of Movement
// "point in the direction of movement" = "rotate according to the velocity vector"
const DirectionalMover = (p5:p5) => {
    class Mover {
        pos: P5.Vector;
        vel: P5.Vector;
        acc: P5.Vector;
        r: number = 16;
        mass: number = 1;

        // direction and speed of rotatin
        angle: number = 0;
        aVelocity: number = 0;
        aAcceleration: number = 0;

        constructor(x: number, y: number) {
            this.pos = p5.createVector(p5.width/2, 0);
            this.vel = p5.createVector(0, 0.5);
            this.acc = p5.createVector(0, 0);
        }

        // applies a force from the environment
        applyForce(force: P5.Vector) {
            let f: P5.Vector = p5.createVector();
            P5.Vector.div(force, this.mass, f);
            this.acc.add(f);
        }
        
        update() {
            this.vel.add(this.acc)
            this.pos.add(this.vel);
            
            this.aAcceleration = this.acc.x / 10; // set the acceleration to the direction the acceleration is moving in
            this.aVelocity += this.aAcceleration // make it spin faster on each frame
            this.aVelocity = p5.constrain(this.aVelocity, -0.1, 0.1);
            this.angle += this.aVelocity;
        
            this.acc.set(0, 0);
        }

        show() {

            // const angle = p5.atan2(this.vel.y, this.vel.x); // unlike atan, this will automatically handle negative angles
            const angle = this.vel.heading();
            p5.stroke(255);
            p5.strokeWeight(2);
            p5.fill(255, 100);
            p5.rectMode(p5.CENTER);
            p5.push(); // save the current drawing state so rotation won't impact everything

            p5.translate(this.pos.x, this.pos.y);
            p5.rotate(angle);
            p5.rect(0, 0, this.mass*32, this.mass*32);
            p5.pop();
        }

        // this creates a bouncing ball
        edge() {
            if (this.pos.y >= p5.height - this.r) {
                this.pos.y = p5.height - this.r;
                this.vel.y *= -1;
            }
            if (this.pos.x >= p5.width - this.r) {
                this.pos.x = p5.width - this.r;
                this.vel.x *= -1;
            }
            if (this.pos.x <= this.r ) {
                this.pos.x = this.r;
                this.vel.x *= -1;
            }
        }
    }

    let mover: Mover;

    p5.setup = () => {
        const canvas = p5.createCanvas(400, 400);
        canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault())
        mover = new Mover(200, 200);
    };
    
    p5.draw = () => {
        p5.background(0);
        
        if (p5.mouseIsPressed) {
            let wind;
            // left mouse blows wind from the left
            if (p5.mouseButton == p5.LEFT) {
                wind = p5.createVector(0.1, 0);
            // right mouse blows wind from the right
            } else {
                wind = p5.createVector(-0.1, 0);
            }
            mover.applyForce(wind);
        }
        
        let gravity = p5.createVector(0, 0.3);
        let weight = p5.createVector();
        P5.Vector.mult(gravity, mover.mass, weight); // scale gravity accorinding to mass
        mover.applyForce(weight);

        mover.update();
        mover.edge();
        mover.show();
    };
};

// new P5(DirectionalMover, document.getElementById('canvas-1'));

// using sin and cos to draw a circle by changing the angle
const PolarToCartesian = (p5: p5) => {

    // sin(0) = 0;
    // cos(0) = 1;

    let r = 75,
        theta = 0;

    p5.setup = () => {
        p5.createCanvas(640, 360);
        p5.background(255);
    };

    p5.draw = () => {
        const x = r * p5.cos(theta); // on start, x = 75
        const y = r * p5.sin(theta); // on start, y = 0

        // draws a circle
        p5.noStroke();
        p5.fill(0);
        p5.ellipse(x + p5.width/2, y + p5.height/2, 16, 16);
        theta += 0.01;
    };
};

// new P5(PolarToCartesian, document.getElementById('canvas-1'));

// this is very cool!
const Spiral = (p5: p5) => {

    // sin(0) = 0;
    // cos(0) = 1;

    let r = 0,
        theta = 0;

    p5.setup = () => {
        p5.createCanvas(640, 360);
        p5.background(0);
    };

    p5.draw = () => {
        const x = r * p5.cos(theta); // on start, x = 75
        const y = r * p5.sin(theta); // on start, y = 0

        // draws a circle
        p5.noStroke();
        p5.fill(255);
        p5.ellipse(x + p5.width/2, y + p5.height/2, 8, 8);
        theta += 0.01;
        r += 0.05;
    };
};

// new P5(Spiral, document.getElementById('canvas-1'));

// 3.6 Oscillation
// oscillate between -100 and 100 x
const Oscillation36 = (p5:p5) => {

    p5.setup = () => {
        p5.createCanvas(640, 360);
    };

    p5.draw = () => {
        p5.background(255);
        const period = 120;
        const amplitude = 100;

        const x = amplitude * p5.cos(p5.TWO_PI * p5.frameCount / period);
        p5.stroke(0);
        p5.fill(175);
        p5.translate(p5.width/2, p5.height/2);
        p5.line(0, 0, x, 0); // just draw a flat line
        p5.ellipse(x, 0, 20, 20); // attach a ball to the end of it
    };
};

new P5(Oscillation36, document.getElementById('canvas-1'));
