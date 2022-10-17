import P5 from 'p5';

const MouseMover = (p5: p5) => {

    class Mover {
        pos: P5.Vector;
        vel: P5.Vector;
        acc: P5.Vector;

        constructor(x: number, y: number) {
            this.pos = p5.createVector(x, y);
            this.vel = P5.Vector.random2D();
            this.vel.mult(p5.random(3));
            // this.acc.setMag(0.01); // direction is random, but magnitude is set
        }
        
        update() {
            let mouse = p5.createVector(p5.mouseX, p5.mouseY);
            this.acc = P5.Vector.sub(mouse, this.pos);
            this.acc.setMag(1);
            this.vel.add(this.acc);
            this.vel.limit(5);
            
            // mimics a random walk
            // this.acc = P5.Vector.random2D(); // acceleration is accumulating into the velocity
            // this.vel.add(this.acc);
            // this.vel.limit(2);


            this.pos.add(this.vel);
        }

        show() {
            p5.stroke(255);
            p5.strokeWeight(2);
            p5.fill(255, 100);
            p5.ellipse(this.pos.x, this.pos.y, 32, 32);
        }
    }

    let mover: Mover;

    p5.setup = () => {
        p5.createCanvas(400, 400);
        mover = new Mover(200, 200);
    };
    
    p5.draw = () => {
        p5.background(0);
        mover.update();
        mover.show();
    };
}

// new P5(MouseMover, document.getElementById("canvas-1"));

// Chapter 2.1
// Creates a ball that bounces with gravity and adds wind
// Note: this one could be used to create a brick breaker game
const GravityMover = (p5: p5) => {

    class Mover {
        pos: P5.Vector;
        vel: P5.Vector;
        acc: P5.Vector;
        r: number = 16;

        constructor(x: number, y: number) {
            this.pos = p5.createVector(p5.width/2, 0);
            this.vel = p5.createVector(0, 0.5);
            this.acc = p5.createVector(0, 0);
            // this.vel = P5.Vector.random2D();
            // this.vel.mult(p5.random(5)); // how we can create a dropping effect
            // this.acc.setMag(0.01); // direction is random, but magnitude is set
        }

        // applies a force from the environment
        applyForce(force: P5.Vector) {
            this.acc.add(force);
        }
        
        update() {
            this.vel.add(this.acc)
            this.pos.add(this.vel);
            this.acc.set(0, 0);
        }

        show() {
            p5.stroke(255);
            p5.strokeWeight(2);
            p5.fill(255, 100);
            p5.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
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
        p5.createCanvas(400, 400);
        mover = new Mover(200, 200);
    };
    
    p5.draw = () => {
        p5.background(0);

        if (p5.mouseIsPressed) {
            let wind = p5.createVector(0.1, 0)
            mover.applyForce(wind);
        }
        
        let gravity = p5.createVector(0, 0.3);
        mover.applyForce(gravity);

        
        mover.update();
        mover.edge();
        mover.show();
    };
}

// new P5(GravityMover, document.getElementById("canvas-1"));

// 2.2 Mass and Acceleration
const MassAndAcceleration = (p5: p5) => {

    class Mover {
        pos: P5.Vector;
        vel: P5.Vector;
        acc: P5.Vector;
        r: number = 16;
        mass: number = 1;

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
            this.acc.set(0, 0);
        }

        show() {
            p5.stroke(255);
            p5.strokeWeight(2);
            p5.fill(255, 100);
            p5.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
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
        p5.createCanvas(400, 400);
        mover = new Mover(200, 200);
    };
    
    p5.draw = () => {
        p5.background(0);

        if (p5.mouseIsPressed) {
            let wind = p5.createVector(0.1, 0)
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
}

// new P5(MassAndAcceleration, document.getElementById("canvas-1"));

// 2.3
const Friction = (p5:p5) => {

};

// new P5(Friction, document.getElementById('canvas-1'));

// 2.8 Drg
const Drag = (p5:p5) => {
    class Mover {
        pos: P5.Vector;
        vel: P5.Vector;
        acc: P5.Vector;
        r: number = 16;
        mass: number = 1;

        constructor(x: number, y: number, mass: number) {
            this.pos = p5.createVector(x, y);
            this.vel = p5.createVector(0, 0.5);
            this.acc = p5.createVector(0, 0);
            this.mass = mass;
            this.r = this.mass * 16;
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
            this.acc.set(0, 0);
        }

        show() {
            p5.stroke(255);
            p5.strokeWeight(2);
            p5.fill(255, 100);
            p5.ellipse(this.pos.x, this.pos.y, this.r, this.r);
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

        drag() {
            let drag = this.vel.copy();
            drag.normalize();
            drag.mult(-1);
            let c = 0.1,
                speedSq = this.vel.magSq();
            drag.setMag(c * speedSq);
            this.applyForce(drag);
        }
    }

    let movers: Mover[] = new Array(10);

    p5.setup = () => {
        p5.createCanvas(400, 400);
        for (let i = 0, len = movers.length; i < len; i++) {
            movers[i] = new Mover(p5.random(20, 380), 60, p5.random(1, 4));
        }
    };
    
    p5.draw = () => {
        p5.background(0);
        p5.fill(255, 50);
        p5.noStroke();
        p5.rect(0, p5.height/2, p5.width);

        for (let mover of movers) {
            let gravity = p5.createVector(0, 0.3);
            let weight = p5.createVector();
            P5.Vector.mult(gravity, mover.mass, weight); // scale gravity accorinding to mass
            mover.applyForce(weight);
    
            if (mover.pos.y > p5.height/2) {
                mover.drag()
            }
            mover.update();
            mover.edge();
            mover.show();
        }
    };
};

// new P5(Drag, document.getElementById('canvas-1'));