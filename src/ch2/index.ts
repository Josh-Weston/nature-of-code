import P5 from 'p5';

// 2.1 Helium Balloon
const HeliumBalloon = (p5: p5) => {

    class Balloon {
        location: P5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        size: number;
        helium: p5.Vector = p5.createVector(0, -0.2); // helium makes it rise, so we decrement the y-axis
        gravity: p5.Vector = p5.createVector(0, 0.009) // the helium fights the gravity
        bounce: p5.Vector = p5.createVector(0, 0.5);
        debounce: p5.Vector = p5.createVector(0, -0.005); // rate of decay
        debouncing = false;

        constructor(x: number, y: number, size: number) {
            this.location = p5.createVector(x, y);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(0, 0);
            this.size = size;
        }

        // we want to apply gravity
        // we want to apply wind
        // we want to apply the negative effect of helium

        applyForce(force: p5.Vector) {
            this.acceleration.add(force);
        }

        update() {
            this.velocity.add(this.acceleration); // the velocity DOES accumulate, it is by how many pixels to change my location on each update
            this.location.add(this.velocity);
            this.acceleration.mult(0); // reset our forces
        }

        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.size, this.size);
        }

        checkTop() {

            if (this.debouncing) {
                if (this.velocity.y <= (this.helium.y + this.gravity.y)) {
                    this.debouncing = false;
                    this.velocity.y = this.helium.y + this.gravity.y;
                } else {
                    this.applyForce(this.debounce);
                }
            }

            if (this.location.y < 12 && !this.debouncing) {
                this.applyForce(this.bounce); // add the bounce
                this.debouncing = true;
            }
        }
    }

    let b: Balloon;

    p5.setup = () => {
        p5.createCanvas(500, 500);
        b = new Balloon(p5.width / 2, p5.height - 10, 16);
        b.applyForce(b.helium);
        b.applyForce(b.gravity); // we only want to apply these forces once, or else they will accumulate
    }

    p5.draw = () => {
        p5.background(255);
        b.update();
        b.checkTop();
        b.display();
    }
};

// new P5(HeliumBalloon, document.getElementById('canvas-1'));

// 2.5 Creating Forces
const CreatingForces = (p5: p5) => {
    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        mass: number;

        constructor(mass: number, x: number, y: number) {
            this.location = p5.createVector(x, y);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(0, 0);
            this.mass = mass;
        }

        applyForce(force: P5.Vector) {
            let f = p5.createVector(0, 0);
            P5.Vector.div(force, this.mass, f); // the smaller the mass, the faster the acceleration
            this.acceleration.add(f);
        }

        update() {
            this.velocity.add(this.acceleration); // acceleration is cumulative
            this.location.add(this.velocity);
            this.acceleration.mult(0); // prevent the forces from accumulating
        }

        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16); // scaling according to mass
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = p5.width;
                this.velocity.x *= -1;
            } else if (this.location.x < 0) {
                this.location.x = 0;
                this.velocity.x *= -1;
            }

            if (this.location.y > p5.height) {
                this.location.y = p5.height;
                this.velocity.y *= -1;
            }
        }
    }

    const movers: Mover[] = new Array(100);
    const wind = p5.createVector(0.01, 0); // this wind pushes everything to the right
    const gravityPull = 0.01;

    p5.setup = () => {
        p5.createCanvas(640, 360);
        for (let i = 0; i < 100; i++) {
            movers[i] = new Mover(p5.random(0.1, 5), 0, 0);
        }
    }

    p5.draw = () => {
        p5.background(255);
        for (let i = 0, len = movers.length; i < len; i++) {
            movers[i].applyForce(wind);
            movers[i].applyForce(p5.createVector(0, gravityPull * movers[i].mass));
            movers[i].update();
            movers[i].checkEdges();
            movers[i].display();
        }
    }
};

// new P5(CreatingForces, document.getElementById('canvas-1'));


/*
    Instead of objects bouncing off the edge of the wall, create an example in which an invisible force
    pushes back on the objects to keep them in the window. Can you weight the force according to how far the object is
    from the edge (e.g., the closer it is, the stronger the force?)
*/


const InvisibleForce = (p5: p5) => {
    class Ball {
        location: P5.Vector;
        velocity: P5.Vector;
        acceleration: P5.Vector;
        mass: number;
        constructor(mass: number, x: number, y: number) {
            this.location = p5.createVector(x, y);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(0, 0);
            this.mass = mass;
        }

        applyForce(force: P5.Vector) {
            let f = p5.createVector(0, 0);
            P5.Vector.div(force, this.mass, f); // the smaller the mass, the faster the acceleration
            this.acceleration.add(f);
        }

        drawGrid() {
            p5.stroke(0);
            p5.line(0, p5.height/2, p5.width, p5.height/2);
            p5.line(p5.width/2, 0, p5.width/2, p5.height);
        }

        display() {
            this.drawGrid();
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16); // scaling according to mass
        }

        update() {
            this.velocity.add(this.acceleration); // velocity is cumulative
            this.location.add(this.velocity);
            this.acceleration.mult(0); // prevent the forces from accumulating
        }

        checkEdges() {
            // instead of bouncing we want to apply a force that pushes them back
            // the force is stronger the closer they get to a wall

            // problem is this does reverse their direction, but it still acts like a bounce, and increasing
            // the numbers just increases the speed
            // this also only allows the balls to move diagonally
            // shouldn't this eventually get to a point where the ball stays in the center?
            
            // I am not sure why this doesn't slow down as it approaches the center...
            // it's because the acceleration doesn't accumulate, but the velocity does! So you are
            // fighting to overcome the velocity it has accumulated up to the point when it reaches
            // center, so once it reaches center it starts to slow down in the opposite direction, but
            // it doesn't slow down as it reaches center, only when it crosses the threshold
            // So, as it approaches center, it's acceleration is slowing, but its velocity isn't until
            // it passes threshold and acceleration moves in the opposite direction
            // const xForce = p5.map(this.location.x, 0, p5.width, 0.1, -0.1);
            //------------------------|---------------------------
            //0.1+0.1+0.09+...........0..................-0.09-0.1 // when it reaches here, its velocity has been fully reversed
            // accelerating ---------> decelerating ------------->
            // <-----------decelerating<--------------accelerating

            // this is the part I am struggling with is that it is accelerating/decelerating until it reaches the mid point

            let xForce: number;
            if (this.location.x < p5.width / 2) {
                xForce = p5.map(this.location.x, 0, (p5.width/2)+40, 0.1, -0.1);
            } else {
                xForce = p5.map(this.location.x, (p5.width/2)-40, p5.width, 0.1, -0.1);
                
            }

            // const yForce = p5.map(this.location.y, 0, p5.height, 0.01, -0.01);
            // you would need to time its oscillations with the x position?
            // const yForce = p5.map(this.location.x, 0, p5.width/2, 0.01, -0.01);
            const yForce = p5.map(this.location.y, p5.height/2, p5.height/2 + 50, 0.1, -0.1); // makes it oscillate
            this.applyForce(p5.createVector(xForce, yForce));

            // const xForce2 = p5.map(this.location.x, 0, p5.width/4, 0.1, -0.1)

            // if (xForce === 0) {
            //     console.log(xForce);
            // }
            // const yForce = p5.map(this.location.y, 0, p5.height, 0.01, -0.01);
            // this.applyForce(p5.createVector(xForce, 0)); // this essentially creates a pendulum
            // if (this.location.x > p5.width) {
            //     this.location.x = p5.width;
            //     this.velocity.x *= -1;
            // } else if (this.location.x < 0) {
            //     this.location.x = 0;
            //     this.velocity.x *= -1;
            // }

            // if (this.location.y > p5.height) {
            //     this.location.y = p5.height;
            //     this.velocity.y *= -1;
            // }
        }
    }

    const balls: Ball[] = new Array(1);
    const wind = p5.createVector(0.01, 0); // this wind pushes everything to the right
    const gravity = p5.createVector(0, 0.01); // the gravity pulls everything down
    p5.setup = () => {
        p5.createCanvas(600, 600);
        for (let i = 0; i < 1; i++) {
            balls[i] = new Ball(p5.random(0.1, 5), 0, p5.height / 2);
        }
    }

    p5.draw = () => {
        p5.background(255);
        for (let i = 0, len = balls.length; i < len; i++) {


            // balls[i].applyForce(wind);
            // balls[i].applyForce(gravity);
            balls[i].checkEdges();
            balls[i].update();
            balls[i].display();
        }

    }

};

// new P5(InvisibleForce, document.getElementById('canvas-1'));

// For fun
const shootingStarClick = (p5: p5) => {

    p5.setup = () => {
        p5.createCanvas(600, 600);
        p5.background(0);
        p5.stroke(255, 50);
    };


    type Star = {
        x: number;
        y: number;
        n: number;
        maxRadius: number;
    }

    const stars: Star[] = [];

    p5.mouseClicked = (e: PointerEvent) => {
        stars.push({ x: e.clientX, y: e.clientY, n: 300, maxRadius: p5.random(100, 300)});
    };

    p5.draw = () => {
        for (let i = 0, len = stars.length; i < len; len = stars.length, i++) {
            const s = stars[i];
            // create unit vector for direction
            const u = P5.Vector.random2D();
            const v = u.mult(p5.random(s.maxRadius));
            p5.line(s.x, s.y, v.x, v.y);
            s.n--;
            if (s.n === 0) {
                stars.splice(i, 1); // remove it from our array once we are done drawing it
            }
        }
    }

};

// new P5(shootingStarClick, document.getElementById('canvas-1'));

const starClick = (p5: p5) => {

    p5.setup = () => {
        p5.createCanvas(600, 600);
        p5.background(0);
        p5.stroke(255, 50);
    };


    type Star = {
        x: number;
        y: number;
        n: number;
        maxRadius: number;
    }

    const stars: Star[] = [];

    p5.mouseClicked = (e: PointerEvent) => {
        stars.push({ x: e.clientX, y: e.clientY, n: 500, maxRadius: p5.random(20, 100)});
    };

    p5.draw = () => {
        for (let i = 0, len = stars.length; i < len; len = stars.length, i++) {
            const s = stars[i];
            const u = P5.Vector.random2D(); // create unit vector for random direction
            const v = u.mult(p5.random(s.maxRadius)); // create magnitude randomized to max radius. If we want a perfect circle, simply remove the random.
            p5.line(s.x, s.y, s.x + v.x, s.y + v.y);
            s.n--;
            if (s.n === 0) {
                // splicing creates problems for our loop
                stars.splice(i, 1); // remove it from our array once we are done drawing it
            }
        }
    }

};

// new P5(starClick, document.getElementById('canvas-1'));







// 2.7 Friction

const friction = (p5: p5) => {

    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        mass: number;

        constructor(mass: number, x: number, y: number) {
            this.location = p5.createVector(x, y);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(0, 0);
            this.mass = mass;
        }

        applyForce(force: P5.Vector) {
            let f = p5.createVector(0, 0);
            P5.Vector.div(force, this.mass, f); // the smaller the mass, the faster the acceleration
            this.acceleration.add(f);
        }

        update() {
            this.velocity.add(this.acceleration); // acceleration is cumulative
            this.location.add(this.velocity);
            this.acceleration.mult(0); // prevent the forces from accumulating
        }

        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16); // scaling according to mass
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = p5.width;
                this.velocity.x *= -1;
            } else if (this.location.x < 0) {
                this.location.x = 0;
                this.velocity.x *= -1;
            }

            if (this.location.y > p5.height) {
                this.location.y = p5.height;
                this.velocity.y *= -1;
            }
        }
    }

    const movers: Mover[] = new Array(100);
    const wind = p5.createVector(0.01, 0); // this wind pushes everything to the right
    const gravityPull = 0.01;
    const frictionMagnitude = 0.01;

    p5.setup = () => {
        p5.createCanvas(1000, 500);
        for (let i = 0; i < 100; i++) {
            movers[i] = new Mover(p5.random(0.1, 5), 0, 0);
        }
    }

    p5.draw = () => {
        p5.background(255);
        for (let i = 0, len = movers.length; i < len; i++) {
            
            // add friction to our model
            const friction = movers[i].velocity.copy();
            friction.normalize();
            friction.mult(-1);
            friction.mult(frictionMagnitude);

            movers[i].applyForce(friction);
            movers[i].applyForce(wind);
            movers[i].applyForce(p5.createVector(0, gravityPull * movers[i].mass));
            movers[i].update();
            movers[i].checkEdges();
            movers[i].display();
        }
    }
};

// new P5(friction, document.getElementById('canvas-1'));

// Exercise: friction pockets
const frictionPockets = (p5: p5) => {

    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        mass: number;

        constructor(mass: number, x: number, y: number) {
            this.location = p5.createVector(x, y);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(0, 0);
            this.mass = mass;
        }

        applyForce(force: P5.Vector) {
            let f = p5.createVector(0, 0);
            P5.Vector.div(force, this.mass, f); // the smaller the mass, the faster the acceleration
            this.acceleration.add(f);
        }

        update() {
            this.velocity.add(this.acceleration); // acceleration is cumulative
            this.location.add(this.velocity);
            this.acceleration.mult(0); // prevent the forces from accumulating
        }

        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16); // scaling according to mass
        }

        checkPocket() {

            if (this.location.x >= 200 && this.location.x < 300 && this.location.y >= 200 && this.location.y < 300) {
                // add friction
                const friction = this.velocity.copy();
                friction.normalize();
                friction.mult(-1);
                friction.mult(frictionMagnitude);
                this.applyForce(friction);
            }

            if (this.location.x >= 400 && this.location.x < 600 && this.location.y >= 200 && this.location.y < 400) {
                // add friction
                const friction = this.velocity.copy();
                friction.normalize();
                friction.mult(-1);
                friction.mult(frictionMagnitude);
                this.applyForce(friction);
            }

            if (this.location.x > 400 && this.location.x < 600 && this.location.y > 400 && this.location.y < 600) {
                // add acceleration
                const accelerate = this.velocity.copy();
                accelerate.normalize();
                accelerate.mult(0.05);
                this.applyForce(accelerate);
            }


        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = p5.width;
                this.velocity.x *= -1;
            } else if (this.location.x < 0) {
                this.location.x = 0;
                this.velocity.x *= -1;
            }

            if (this.location.y > p5.height) {
                this.location.y = p5.height;
                this.velocity.y *= -1;
            }
        }
    }

    const movers: Mover[] = new Array(100);
    const wind = p5.createVector(0.01, 0); // this wind pushes everything to the right
    const gravityPull = 0.01;
    const frictionMagnitude = 0.03;

    p5.setup = () => {
        p5.createCanvas(1000, 800);
        for (let i = 0; i < 100; i++) {
            movers[i] = new Mover(p5.random(0.1, 5), 0, 0);
        }
    }

    p5.draw = () => {
        p5.background(255);


        // draw our friction pockets
        p5.stroke('red');
        p5.fill(255);
        p5.rect(200, 200, 100, 100);

        p5.stroke('red');
        p5.fill(255);
        p5.rect(400, 200, 200, 200);

        // draw our friction pockets
        p5.stroke('green');
        p5.fill(255);
        p5.rect(400, 400, 200, 200);


        for (let i = 0, len = movers.length; i < len; i++) {
            movers[i].applyForce(wind);
            movers[i].applyForce(p5.createVector(0, gravityPull * movers[i].mass));
            movers[i].checkPocket();
            movers[i].update();
            movers[i].checkEdges();
            movers[i].display();
        }
    }
};

// new P5(frictionPockets,   document.getElementById('canvas-1'));

// 2.8 Air and Fluid Resistance
// This sketch simulates balls falling into a body of water
const Drag = (p5: p5) => {

    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        mass: number;

        constructor(mass: number, x: number, y: number) {
            this.location = p5.createVector(x, y);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(0, 0);
            this.mass = mass;
        }

        applyForce(force: P5.Vector) {
            let f = p5.createVector(0, 0);
            P5.Vector.div(force, this.mass, f); // the smaller the mass, the faster the acceleration
            this.acceleration.add(f);
        }

        update() {
            this.velocity.add(this.acceleration); // acceleration is cumulative
            this.location.add(this.velocity);
            this.acceleration.mult(0); // prevent the forces from accumulating
        }

        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16); // scaling according to mass
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = p5.width;
                this.velocity.x *= -1;
            } else if (this.location.x < 0) {
                this.location.x = 0;
                this.velocity.x *= -1;
            }

            if (this.location.y > p5.height) {
                this.location.y = p5.height;
                this.velocity.y *= -1;
            }
        }

        isInside(l: Liquid): boolean {
            return this.location.x > l.x && this.location.x < l.x + l.w && this.location.y > l.y && this.location.y < l.y + l.h;
        }

        drag(l: Liquid) {
            const speed = this.velocity.mag();
            const dragMagnitude = l.c * speed**2;
            const drag = this.velocity.copy();
            drag.normalize();
            drag.mult(-1);
            drag.mult(dragMagnitude);
            this.applyForce(drag);
        }

    }

    class Liquid {
        x: number;
        y: number;
        w: number;
        h: number;
        c: number;

        constructor(x: number, y: number, w: number, h: number, c: number) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.c = c;
        }

        display() {
            p5.noStroke();
            p5.fill(175);
            p5.rect(this.x, this.y, this.w, this.h);
        }
    }

    let liquid: Liquid;
    const movers: Mover[] = new Array(100);
    const wind = p5.createVector(0.01, 0); // this wind pushes everything to the right
    const gravityPull = 0.01;
    const frictionMagnitude = 0.03;

    p5.setup = () => {
        p5.createCanvas(1000, 800);
        liquid = new Liquid(0, p5.height/2, p5.width, p5.height/2, 0.1);
        for (let i = 0; i < 100; i++) {
            movers[i] = new Mover(p5.random(0.1, 5), p5.random(p5.width), 0);
        }
    }

    p5.draw = () => {
        p5.background(255);
        liquid.display();

        for (let i = 0, len = movers.length; i < len; i++) {
            if (movers[i].isInside(liquid)) {
                movers[i].drag(liquid);
            }
            movers[i].applyForce(p5.createVector(0, gravityPull * movers[i].mass)); // gravity scaled by mass
            movers[i].update();
            movers[i].display();
            movers[i].checkEdges();
        }
    }
};

// new P5(Drag, document.getElementById('canvas-1'));

// 2.9 Gravitational Attraction
// Note: this isn't the intended effect, but it can easily create an "orbiting around effect"
const GravityAttraction = (p5:p5) => {
    class Attractor {
        mass: number;
        location: P5.Vector;
        G: number;

        constructor() {
            this.location = p5.createVector(p5.width/2, p5.height/2);
            this.mass = 10;
            this.G = 0.4;
        }

        attract(m: Mover): P5.Vector {
            const force = P5.Vector.sub(this.location, m.location);
            const distance = p5.constrain(force.mag(), 5.0, 25.0);
            force.normalize();
            const strength = (this.G * this.mass * m.mass) / (distance**2);
            force.mult(strength);
            return force;
        }

        display() {
            p5.stroke(0);
            p5.fill(175, 200);
            p5.ellipse(this.location.x, this.location.y, this.mass**2, this.mass**2);
        }
    }

    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        mass: number;

        constructor(mass: number, x: number, y: number) {
            this.location = p5.createVector(x, y);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(0, 0);
            this.mass = mass;
        }

        applyForce(force: P5.Vector) {
            let f = p5.createVector(0, 0);
            P5.Vector.div(force, this.mass, f); // the smaller the mass, the faster the acceleration
            this.acceleration.add(f);
        }

        update() {
            this.velocity.add(this.acceleration); // acceleration is cumulative
            this.location.add(this.velocity);
            this.acceleration.mult(0); // prevent the forces from accumulating
        }

        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16); // scaling according to mass
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = p5.width;
                this.velocity.x *= -1;
            } else if (this.location.x < 0) {
                this.location.x = 0;
                this.velocity.x *= -1;
            }

            if (this.location.y > p5.height) {
                this.location.y = p5.height;
                this.velocity.y *= -1;
            }
        }
    }

    let movers: Mover[] = new Array(10);
    let a: Attractor;
    p5.setup = () => {
        p5.createCanvas(640, 360);
        for (let i = 0; i < 10; i++) {
            movers[i] = new Mover(p5.random(0.1, 2), p5.random(p5.width), p5.random(p5.height));
        }
        a = new Attractor();
    };

    p5.draw = () => {
        p5.background(255);
        a.display();

        for (let i = 0, len = movers.length; i < len; i++) {
            const m = movers[i];
            const f = a.attract(m);
            m.applyForce(f);
            m.update();
            m.display();
        }
    };
}

// new P5(GravityAttraction, document.getElementById('canvas-1'));


// 2.10 Everything attracts (or repels)
// This creates some really need effects!
const AttractEverything = (p5:p5) => {
    const G = 0.4;
    class Mover {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        mass: number;

        constructor(mass: number, x: number, y: number) {
            this.location = p5.createVector(x, y);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(0, 0);
            this.mass = mass;
        }

        applyForce(force: P5.Vector) {
            let f = p5.createVector(0, 0);
            P5.Vector.div(force, this.mass, f); // the smaller the mass, the faster the acceleration
            this.acceleration.add(f);
        }

        update() {
            this.velocity.add(this.acceleration); // acceleration is cumulative
            this.location.add(this.velocity);
            this.acceleration.mult(0); // prevent the forces from accumulating
        }

        display() {
            p5.stroke(0);
            p5.fill(175);
            p5.ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16); // scaling according to mass
        }

        checkEdges() {
            if (this.location.x > p5.width) {
                this.location.x = p5.width;
                this.velocity.x *= -1;
            } else if (this.location.x < 0) {
                this.location.x = 0;
                this.velocity.x *= -1;
            }

            if (this.location.y > p5.height) {
                this.location.y = p5.height;
                this.velocity.y *= -1;
            }
        }

        attract(m: Mover): P5.Vector {
            const force = P5.Vector.sub(this.location, m.location);
            const distance = p5.constrain(force.mag(), 5.0, 25.0);
            force.normalize();
            const strength = (G * this.mass * m.mass) / (distance**2);
            force.mult(strength);
            return force;
        }
    }

    let movers: Mover[] = new Array(10);
    p5.setup = () => {
        p5.createCanvas(640, 360);
        for (let i = 0; i < 10; i++) {
            movers[i] = new Mover(p5.random(0.1, 2), p5.random(p5.width), p5.random(p5.height));
        }
    };

    p5.draw = () => {
        p5.background(255);
        for (let i = 0, len = movers.length; i < len; i++) {
            for (let j = 0, len = movers.length; j < len; j++) {
                if (i != j) {
                    const attraction = movers[j].attract(movers[i]);
                    movers[i].applyForce(attraction);
                }
            }
            movers[i].update();
            movers[i].display();
        }
    };
}

// new P5(AttractEverything, document.getElementById('canvas-1'));
