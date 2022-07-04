import P5 from 'p5';

const Test = (p5: p5) => {
    console.log('Oh, look at this. It works fine this way, too!');
    console.log('Automated build/bundle process setup, esbuild explored, great night!');
};

new P5(Test, document.getElementById('canvas-1'));