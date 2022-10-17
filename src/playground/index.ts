import P5 from 'p5';

const Angles = (p5:p5) => {


    let angle = 0;
    let text = 'Starting text';
    let debounce: number = 0;
    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.angleMode('degrees'); // means we don't need to convert to radians
    };

    p5.draw = () => {
        // draw border and fill the background based on the angle
        p5.fill(255);
        p5.stroke(0);
        p5.fill(angle, angle, angle);
        p5.rect(0, 0, p5.width, p5.height);

        p5.push();
        p5.translate(p5.width/2, p5.height/2);

        // draw flat horizon
        p5.stroke(200);
        p5.line(-100, 0, 100, 0);

        // draw vertical reference
        p5.line(0, -100, 0, 100);
        
        // draw the angle indicator
        p5.stroke(p5.map(angle, 0, 359, 255, 0));
        p5.rotate(angle);
        p5.line(0, 0, 0, -50);
        p5.pop();

        p5.push();
        p5.translate(p5.width/2, p5.height/2);

        // draw the angle 
        // for arc, 0 degrees = EAST
        p5.stroke(200);
        p5.noFill();

        // we want our arc system to start as 0 degrees = north, instead of the 0 degrees = east,
        // so we "rotate" it 90 degrees. You can rotate the shape, or do the calculation
        // p5.rotate(-90);
        p5.arc(0, 0, 100, 100, -90, -90 + angle);
        p5.pop();


        // draw text
        // p5.textFont('Roboto');
        p5.fill(0);
        p5.textAlign('right');
        p5.text(`${angle} \u00B0`, p5.width - 20, p5.height - 20);



        // how we can slow down the push button push
        if (p5.keyIsDown(37)) {
            const now = Date.now();
            if (now - debounce > 50) {
                // move in increments of 15 when holding down shift key
                if (p5.keyIsDown(16)) { 
                    let newAngle = angle - 15;
                    if (newAngle < 0) {
                        newAngle += 360;
                    }
                    angle = newAngle - (newAngle % 15);
                } else {
                    if (angle === 0) {
                        angle = 359;
                    } else {
                        angle -=1;
                    }
                }
                debounce = now;
            }
        }
        if (p5.keyIsDown(39)) {
            const now = Date.now();
            if (now - debounce > 50) {
                // move in increments of 15 when holding down shift key
                if (p5.keyIsDown(16)) { 
                    let newAngle = angle + 15;
                    if (newAngle > 360) {
                        newAngle -= 360;
                    }
                    angle = newAngle + (newAngle % 15);
                } else {
                    if (angle === 359) { // keycode 39
                        angle = 0;
                    } else {
                        angle += 1;
                    }
                }
                debounce = now;
            }
        }

    };

};

new P5(Angles, document.getElementById('canvas-1'));