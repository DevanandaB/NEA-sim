let neutronSource;
let r;

function setup() {
    const canvas = createCanvas(1000, 700, WEBGL);
    canvas.parent('sim-container');
    describe('neutron source');
    angleMode(DEGREES);
    stroke('white');
    strokeWeight(4);
}

function draw() {
    background(235, 20, 100, 128);
    orbitControl();
    //draw the vertex counter clockwise starting from the bottom
    beginShape();
    vertex(220, -20);
    vertex(-180, 10);
    vertex(-180, -160);
    vertex(220, -150);

    // curveVertex(220, -150);
    // curveVertex(140, -130);
    // curveVertex(180, -110);
    // curveVertex(220, -20);

    endShape(CLOSE);

    // translate(160, 0, 0);
    // beginShape(POINTS);
    // for(let i = 0; i < 360; i += 1) {
    //     let x = cos(i) * r;
    //     let y = sin(i) * r;
    //     vertex(x, y);
    // }
    // endShape();

}

    
    
   


    
    

