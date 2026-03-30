// // p5.prototype.VERSION 2.1.1
// // let particle1;
// // let nucleus1;

// function setup() {
//     const canvas = createCanvas(750, 600, WEBGL);
//     canvas.parent('sim-container');
//     angleMode(DEGREES);

//     let pos1 = createVector(200, 10, 0);
//     particle1 = new Particle(pos1, "blue");

//     // let pos2 = createVector(100, 0, 0);
//     // nucleus1 = new Nucleus(pos2, 92, 143);
//     // nucleus1.createNucleus();
    
// }

// function draw() {
//     background('#9CAFB7');
//     fill(255);
//     //change camera orientation
//     orbitControl();

//     push();
//     neutronSourceDraw();
//     pop();

//     push();
//     translate(0, 0, 60);
//     neutronSourceDraw();
//     pop();



//     //containment vessel
//     // push();
//     // noFill();
//     // translate(100, 0, 0);
//     // sphere(220);
//     // pop();

//     // particle1.display();
//     // nucleus1.displayNucleus();
    
// }























const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const goForwardBtn = document.querySelector('.forward-btn');
const resetBtn = document.querySelector('.reset-btn');

const nucleiRange = document.querySelector('#nuclei-range');
const nucleiInput = document.querySelector('#nuclei-input');

const neutronSpeedRange = document.querySelector('#speed-range');
const neutronSpeedInput = document.querySelector('#speed-input');

const isotopeRange = document.querySelector('#isotope-range');
const isotopeInput = document.querySelector('#isotope-input');

// const myChart = new Chart("myChart", {
//     type: "area",
//     data: {},
//     options: {}
//   });

function setup() {
    const canvas = createCanvas(750, 600, WEBGL);
    canvas.parent('sim-container');
    angleMode(DEGREES);

    //to fire neutrons
    let position1 = createVector(-160, 10, 0);
    neutron1 = new Particle(position1, "blue");
    

    let position2 = createVector(100, 0, 0);
    nucleus1 = new Nucleus(position2, 143, 92);

    push();
    nucleus1.createNucleus();
    pop();
    neutron1.collide(nucleus1);

    //creates nucleus
    updateNucleiNo();
    
}

function draw() {
    background('#9CAFB7');
    orbitControl();
    fill(255);

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
    neutronSourceDraw(0, 60);
    pop();

    if(isPlaying & isFiring) {
        push();
        neutron1.display();
        neutron1.fire();
        neutron1.collide(nucleus1);
        pop();
    }

    nucleus1.displayNucleus();
    nucleus1.fission();

    for(let i = 0; i < nuclei.length; i++) {
      push();
      nuclei[i].displayNucleus();
      pop();
    }

    for(let i = 0; i < neutrons.length; i++) {
        neutrons[i].display();
        neutrons[i].fire();
    }
    
}



function neutronSourceDraw(z1, z2) {
    noFill();

    //main trapezium outline
    push();
    beginShape();
    vertex(220, -20, z1);
    vertex(-180, 10, z1);
    vertex(-180, -160, z1);
    vertex(220, -150, z1);
    endShape(CLOSE);

    //main trapezium outline with diff depth
    push();
    beginShape();
    vertex(220, -20, z2);
    vertex(-180, 10, z2);
    vertex(-180, -160, z2);
    vertex(220, -150, z2);
    endShape(CLOSE);


    //ellipse to the left of the main trapezium
    push();
    translate(0, 0, z1);
    ellipse(-185, -75, 100, 170);
    pop();

    //ellipse to the left of the main trapezium with diff depth
    push();
    translate(0, 0, z2);
    ellipse(-185, -75, 100, 170);
    pop();

    //small trapezium outline
    beginShape();
    vertex(300, -55, z1);
    vertex(230, -40, z1);
    vertex(230, -135, z1);
    vertex(300, -120, z1);
    endShape(CLOSE);
    pop();

    //small trapezium outline with diff depth
    beginShape();
    vertex(300, -55, z2);
    vertex(230, -40, z2);
    vertex(230, -135, z2);
    vertex(300, -120, z2);
    endShape(CLOSE);
    pop();

    //bottom curved shape
    push();
      noFill();
      bezier(-70, 200, z1,
           -120, 150, z1, 
           -30, 50, z1, 
           100, -10, z1);
      bezier(-195, 200, z1,
           -165, 140, z1,
           -125, 90, z1,
            -175, 10, z1);
      beginShape(LINES);
      vertex(-195, 200, z1);
      vertex(-70, 200, z1);
      vertex(100, -10, z1);
      vertex(-175, 10, z1);
      endShape();
    pop();

    //bottom curved shape with diff depth
    push();
      noFill();
      bezier(-70, 200, z2,
           -120, 150, z2, 
           -30, 50, z2, 
           100, -10, z2);
      bezier(-195, 200, z2,
           -165, 140, z2,
           -125, 90, z2,
            -175, 10, z2);
      beginShape(LINES);
      vertex(-195, 200, z2);
      vertex(-70, 200, z2);
      vertex(100, -10, z2);
      vertex(-175, 10, z2);
      endShape();
    pop();
    
    //depth extrusion
    //bottom curved shape 
    push();
    beginShape(LINES);
    vertex(100, -10, z1);
    vertex(100, -10, z2);
    vertex(-70, 200, z1);
    vertex(-70, 200, z2);
    vertex(-195, 200, z1);
    vertex(-195, 200, z2);
    vertex(-175, 10, z1);
    vertex(-175, 10, z2);
    endShape();
    pop();

    //main trapezium 
    push();
    beginShape(LINES);
    vertex(-180, 10, z1);
    vertex(-180, 10, z2);
    vertex(220, -20, z1);
    vertex(220, -20, z2);
    vertex(-180, -160, z1);
    vertex(-180, -160, z2);
    vertex(220, -150, z1);
    vertex(220, -150, z2);
    endShape();
    pop();

    // small trapezium depth extrusion
    push();
    beginShape(LINES);
    vertex(300, -55, z1);   vertex(300, -55, z2);
    vertex(230, -40, z1);   vertex(230, -40, z2);
    vertex(230, -135, z1);  vertex(230, -135, z2);
    vertex(300, -120, z1);  vertex(300, -120, z2);
    endShape();
    pop();


}






let isPlaying = false;
const play = () => {isPlaying = true; isFiring = true}
playBtn.addEventListener('click', play);


const reset = () => {
    //slider moves to 1
    //remove all nucleus except the main nucelus
    nucleiRange.value = 1;
    nucleiInput.value = 1;

    //setting the nucleus to empty so if fission is happening it removes so fission stops
    nucleus1 = null;
    nuclei = [];
    neutrons = [];
    neutron1 = null;
    
    let position1 = createVector(-160, 10, 0);
    neutron1 = new Particle(position1, "blue");

    let position2 = createVector(100, 0, 0);
    nucleus1 = new Nucleus(position2, 143, 92);
    nucleus1.createNucleus();

    isFiring = false;
    isPlaying = true;
};
resetBtn.addEventListener('click', reset);



pauseBtn.addEventListener('click', pause = () => {});

//leave go forward last
goForwardBtn.addEventListener('click', forward = () => {});



const updateNucleiNo = (e) => {
    //when the slider is changed, add/remove nucleus
    const inputValue = nucleiRange.value;
    nucleiInput.value = inputValue;
    //clears array 
    nuclei = [];
    //create nucleus upto input value only
    for(let i = 0; i < inputValue - 1; i++) {
        let randomX = random(-120, 330);
        let randomY = random(-220, 220);
        let randomZ = random(-110, 110);
        let position = createVector(randomX, randomY, randomZ);
        let nucleus = new Nucleus(position, 143, 92);
        nucleus.createNucleus();
        nuclei.push(nucleus);
    } 
    return nuclei;
}
nucleiRange.addEventListener('input', updateNucleiNo);


neutronSpeedRange.addEventListener('input', update = (e) => {
    const value = neutronSpeedRange.value;
    neutronSpeedInput.value = value;


});

isotopeRange.addEventListener('input', update = (e) => {
    const value = isotopeRange.value;
    isotopeInput.value = value;
});