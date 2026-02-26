// p5.prototype.VERSION 2.1.1

const playBtn = document.querySelectorAll('playBtn');
const pauseBtn = document.querySelectorAll('pauseBtn');
const goForwardBtn = document.querySelectorAll('goForwardBtn');
const resetBtn = document.querySelectorAll('resetBtn');

const nucleiNo = querySelectorAll('nuclei-no');
const nucleiNoBox = querySelectorAll('nuclei-no-box');
const neutronSpeed = querySelectorAll('neutron-speed');
const neutronSpeedBox = querySelectorAll('neutron-speed-box');


function setup() {
    const canvas = createCanvas(750, 600, WEBGL);
    canvas.parent('sim-container');
    angleMode(DEGREES);
}

function draw() {
    background('#9CAFB7');
    orbitControl();
    fill(255);

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

playBtn.addEventListener('click', play = () => {});
pauseBtn.addEventListener('click', pause = () => {});
goForwardBtn.addEventListener('click', goForward = () => {});
resetBtn.addEventListener('click', reset = () => {});


nucleiNo.addEventListener('onchange', reset = () => {});
neutronSpeed.addEventListener('onchange', reset = () => {});


