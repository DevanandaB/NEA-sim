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

// // class Particle {
// //   constructor(pos, color) {
// //     this.pos = pos;
// //     this.vel = new createVector(0.25, 0, 0);
// //     this.acc = new createVector(0.15, 0, 0);
// //     this.radius = 5;
// //     this.color = color;
// //   }

// //   display() {
// //     //boundary checking
// //     if(this.pos.x > 330 || this.pos.x < -120 || 
// //       this.pos.y > 220 || this.pos.y < -220) {return}
// //     push();
// //     fill(this.color);
// //     noStroke();
// //     translate(this.pos.x, this.pos.y, this.pos.z);
// //     sphere(this.radius);
// //     pop();
// //   }


// //   fire() {
// //     this.vel.add(this.acc);
// //     this.pos.add(this.vel);
// //   }


// //   //made a collision resolution - now have to add that particle to the nucleus
// //   collide(nucleus) {
// //     let distance = this.pos.dist(nucleus.pos);
// //     if(distance < (this.radius + nucleus.radius)) {
// //       this.vel = new createVector(0, 0, 0);
// //       this.acc = new createVector(0, 0, 0);
// //       //to change state
// //       nucleus.state = 'unstable';
// //       nucleus.particles.push(this);
// //     }
// //   }

// // }


// // class Nucleus {
// //   constructor(pos, neutronNo, protonNo) {
// //     this.pos = pos;
// //     this.radius = 20;
// //     this.neutronNo = neutronNo;
// //     this.protonNo = protonNo;
// //     this.particles = [];
// //     this.state = 'stable';
// //     this.vel = new createVector(0, 0, 0);
// //     this.acc = new createVector(0, 0, 0);
// //   }

// //   createNucleus() {
// //     for (let i = 0; i < 360; i++) {
// //       let randomX = this.radius * cos(i);
// //       let randomY = this.radius * sin(i);
// //       let randomPos = new createVector(randomX, randomY, 0);
// //       for (let j = 0; j < this.protonNo; j++) {
// //         push();
// //         let proton = new Particle(randomPos, 'red');
// //         this.particles.push(proton);
// //         pop();
// //       }
// //     }

// //     for (let i = 0; i < 360; i++) {
// //       let randomX = this.radius * cos(i);
// //       let randomY = this.radius * sin(i);
// //       let randomPos = new createVector(randomX, randomY, 0);
// //       for (let j = 0; j < this.protonNo; j++) {
// //         push();
// //         let neutron = new Particle(randomPos, 'blue');
// //         this.particles.push(neutron);
// //         pop();
// //       }
// //     }
// //     return this.particles;

// //   }

// //   displayNucleus() {
// //     for(let i = 0; i < this.particles.length; i++) {
// //       this.particles[i].display();
// //     }
// //   }

// // }

// function neutronSourceDraw() {
//   noFill();
//   //main trapezium outline
//   push();
//   beginShape();
//   vertex(220, -20);
//   vertex(-180, 10);
//   vertex(-180, -160);
//   vertex(220, -150);
//   endShape(CLOSE);

//   //ellipse to the left of the main trapezium
//   ellipse(-185, -75, 100, 170);

//   //small trapezium outline
//   beginShape();
//   vertex(300, -55);
//   vertex(230, -40);
//   vertex(230, -135);
//   vertex(300, -120);
//   endShape(CLOSE);
//   pop();

//   //bottom curved shape
//   push();
//     noFill();
//     bezier(-70, 200,
//          -120, 150,  
//          -30, 50, 
//          100, -10);
//     bezier(-195, 200,
//          -165, 140,
//          -125, 90, 
//           -175, 10,);
//     beginShape(LINES);
//     vertex(-195, 200);
//     vertex(-70, 200);
//     // temp
//     vertex(100, -10);
//     vertex(-175, 10);
//     // temp
//     endShape();
//   pop();

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
    neutronSourceDraw();
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