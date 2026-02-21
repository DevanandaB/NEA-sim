let neutron;
let vesselRadius;
let detail;
let r = 200;

function setup() {
    const canvas = createCanvas(750, 600, WEBGL);
    canvas.parent('sim-container');
    angleMode(DEGREES);
    let position = createVector(-130, 0, 0);
    neutron = new Particle(position, red);
}

function draw() {
    background('#9CAFB7');
    orbitControl();
    // (fill(255, 200, 100, 0.5))
    // translate(100, 0, 0);
    // sphere(220);
    stroke('red');
    strokeWeight(4);
    beginShape(POINTS);
    for (let j = 0; j < 30; j++) {
      for (let i = 0; i < 180; i += 2) {
        let x = r * cos(i);
        let y = r * sin(i);
        let z = 0;
        vertex(x, y, z);
    }
    }
    endShape();

    // neutron.checkEdges();
    // neutron.display();
    // neutron.update();
}

class Particle {
  constructor(pos, color) {
    this.pos = pos;
    this.vel = new createVector(random(0, 0.5), 0);
    this.acc = new createVector(random(0,1), 0);
    this.radius = 10;
    this.color = color;
    }
  
  display() {
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.radius);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
   
  checkEdges() {
    if(this.pos.x > 335) {
      this.vel = new createVector(random(-0, -0.5), 0);
      this.acc =  new createVector(random(-0, -0.5), 0);
    }
    if(this.pos.x < -135) {
      this.vel = new createVector(random(0, 0.5), 0);
      this.acc =  new createVector(random(0, 0.5), 0);
    }
  }
  
}