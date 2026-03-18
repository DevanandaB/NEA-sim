// p5.prototype.VERSION 2.1.1

const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const goForwardBtn = document.querySelector('.forward-btn');
const resetBtn = document.querySelector('.reset-btn');

const nucleiRange = document.querySelector('#nuclei-range');
const nucleiInput = document.querySelector('#nuclei-input');

const neutronSpeedRange = document.querySelector('#speed-range');
const neutronSpeedInput = document.querySelector('#speed-input');


function setup() {
    const canvas = createCanvas(750, 600, WEBGL);
    canvas.parent('sim-container');
    angleMode(DEGREES);

    //to fire neutrons
//    let position1 = createVector(-160, 10, 0);
//     neutron1 = new Particle(position1, 3, "blue", 'neutron');

    let position2 = createVector(100, 0, 0);
    nucleus1 = new Nucleus(position2, 143, 92);

    let position3 = createVector(140, -130, 0);
    nucleus2 = new Nucleus(position3, 143, 92);

    // let position4 = createVector(180, 120, 0);
    // nucleus3 = new Nucleus(position4, 143, 92);

    // let position5 = createVector(50, 130, 0);
    // nucleus4 = new Nucleus(position5, 143, 92);

    // let position6 = createVector(245, -10, 0);
    // nucleus5 = new Nucleus(position6, 143, 92);

    // let position7 = createVector(-10, -100, 0);
    // nucleus6 = new Nucleus(position7, 143, 92);

    //nucleus
    push();
    nucleus1.createNucleus();
    pop();
    
}

function draw() {
    background('#9CAFB7');
    orbitControl();
    fill(255);
    //play();

    //particles move within the boundary 
    push();
    noFill();
    translate(100, 0, 0);
    sphere(220);
    pop();
    
    //neutron source
    push();
    scale(0.3);
    translate(-800, 110, 0);
    neutronSourceDraw();
    pop();

    // push();
    // neutron1.display();
    // neutron1.fire();
    // neutron1.collide(nucleus1);
    // pop();

    nucleus1.displayNucleus();
    // nucleus2.displayNucleus();
    // nucleus3.displayNucleus();
    // nucleus4.displayNucleus();
    // nucleus5.displayNucleus();
    // nucleus6.displayNucleus();

    nucleus1.fission();



}

function neutronSourceDraw() {
    push();
    beginShape(LINES);
    vertex(220, -20, 30);
    vertex(-180, 10, 30);
    vertex(-180, -160, 30);
    vertex(220, -150, 30);
    endShape();
    noFill();
    bezier(220, -20, 30,
        240, -28, 30,
        240, -142, 30,
        220, -150, 30);
    push();
    translate(0, 0, 30);
    ellipse(-185, -75, 100, 170); 
    translate(0, 0, 70);
    ellipse(-185, -75, 100, 170); 
    pop();
    beginShape(LINES);
    vertex(-185, -160, 30);
    vertex(-185, -160, 100);
    endShape();
    pop();

    push();
    beginShape(LINES);
    vertex(220, -20, 100);
    vertex(-180, 10, 100);
    vertex(-180, -160, 100);
    vertex(220, -150, 100);
    endShape();
    noFill();
    bezier(220, -20, 100,
        240, -28, 100,
        240, -142, 100,
        220, -150, 100);
    pop();

    push();
    beginShape(LINES);
    vertex(-180, 10, 30);
    vertex(-180, 10, 100);
    vertex(220, -20, 30);
    vertex(220, -20, 100);
    vertex(-180, -160, 30);
    vertex(-180, -160, 100);
    vertex(220, -150, 30);
    vertex(220, -150, 100);
    endShape();
    pop();

    push();
    beginShape(LINES);
    vertex(300, -55, 30);
    vertex(230, -40, 30);
    vertex(230, -135, 30);
    vertex(300, -120, 30);
    endShape(); 
    noFill();
    bezier(300, -55, 30,
         320, -50, 30,
         320, -115, 30,
         300, -120, 30);
    pop();

    push();
    beginShape(LINES);
    vertex(300, -55, 100);
    vertex(230, -40, 100);
    vertex(230, -135, 100);
    vertex(300, -120, 100);
    endShape(); 
    noFill();
    bezier(300, -55, 100,
         320, -50, 100,
         320, -115, 100,
         300, -120, 100);
    pop();
    
    push();
    beginShape(LINES);
    vertex(300, -55, 30);
    vertex(300, -55, 100);
    vertex(300, -120, 30);
    vertex(300, -120, 100);
    endShape();
    pop();

    push();
    noFill();
    bezier(-70, 200, 30,
         -120, 150, 30,
         -30, 50, 30, 
         100, -10, 30);
    bezier(-195, 200, 30,
        -165, 140, 30,
         -125, 90, 30,
         -175, 10, 30);
    beginShape(LINES);
    vertex(-195, 200, 30);
    vertex(-70, 200, 30);
    // temp
    vertex(100, -10, 30);
    vertex(-175, 10, 30);
    // temp
    endShape();
    pop();

    push();
    noFill();
    bezier(-70, 200, 100,
         -120, 150, 100, 
         -30, 50, 100, 
         100, -10, 100);
    bezier(-195, 200, 100,
         -165, 140, 100,
         -125, 90, 100,
          -175, 10, 100);
    beginShape(LINES);
    vertex(-195, 200, 100);
    vertex(-70, 200, 100);
    // temp
    vertex(100, -10, 100);
    vertex(-175, 10, 100);
    // temp
    endShape();
    pop();

    push();
    beginShape(LINES);
    vertex(100, -10, 30);
    vertex(100, -10, 100);
    vertex(-70, 200, 30);
    vertex(-70, 200, 100);
    vertex(-195, 200, 30);
    vertex(-195, 200, 100);
    vertex(-175, 10, 30);
    vertex(-175, 10, 100);
    endShape();
    pop();
}

//make it work in draw(), push and pop does not work 
const play = async() => {
    push();
    neutron1.display();
    neutron1.fire();
    neutron1.collide(nucleus1);
    pop();
}

function reset() {};

playBtn.addEventListener('click', play());
pauseBtn.addEventListener('click', pause = () => {});
goForwardBtn.addEventListener('click', forward = () => {});
resetBtn.addEventListener('click', reset());


nucleiRange.addEventListener('input', update = (e) => {
    //when the slider is changed, add/remove nucleus
    const inputValue = nucleiRange.value;
    nucleiInput.value = inputValue;
    for(let i = 0; i < inputValue; i++) {
        let randomX = random(-65, 330);
        let randomY = random(-220, 220);
        let position3 = createVector(randomX, randomY, 0);
        nucleus2 = new Nucleus(position3, 143, 92);
        nucleus2.createNucleus();
        nucleus2.display();
    }
});