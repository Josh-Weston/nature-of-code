import P5 from 'p5';

// 2.3 Invisible Force (closer to the edge the stronger the force)
const Exercise23 = (p5: p5) => {

    class Mover {
        position: P5.Vector;
        radius: number;
        velocity: P5.Vector;
        acceleration: P5.Vector;
        mass: number;

        constructor(startX: number, startY: number, r: number) {
            this.position = p5.createVector(startX, startY);
            this.velocity = p5.createVector();
            this.acceleration = p5.createVector();
            this.radius = r;
            this.mass = p5.sqrt(r) / p5.PI; // attempting to make the mass proportional to the size of the ellipse
        }

        // a single application of force, which is applied to the object's acceleration
        applyForce(force: P5.Vector) {
            let f = p5.createVector();
            P5.Vector.div(force, this.mass, f); // A = F/M
            this.acceleration.add(f);
        }

        // on each time step, update the mover object based on the forces being applied
        update() {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity)
            this.acceleration.set(0, 0); // reset acceleration to prevent it from accumulating
        }

        display() {
            p5.stroke(255);
            p5.strokeWeight(2);
            p5.fill(255, 100);
            p5.ellipse(this.position.x, this.position.y, this.radius, this.radius);
        }
    }

    let m: Mover;
    p5.setup = () => {
        p5.createCanvas(500, 500);
        m = new Mover(p5.width / 2, p5.height / 2, p5.random(10, 20));
    };

    p5.draw = () => {
        p5.background(0);

        // apply gravity
        const gravity = p5.createVector(0, 0.3);
        let weight = p5.createVector();
        P5.Vector.mult(gravity, m.mass, weight); // scale gravity based on the mass of the object
        m.applyForce(weight);

        // TODO: check edges to avoid falling off
        // TODO: gravity may be irrelevant in this example since we want it to be "pushed back" when it gets close to an edge

        m.update()
        m.display();
    };
}

new P5(Exercise23, document.getElementById('canvas-1'));