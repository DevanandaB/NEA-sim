let neutron1;
let vesselRadius;

function setup() {
    const canvas = createCanvas(750, 600, WEBGL);
    canvas.parent('sim-container');
    angleMode(DEGREES);
    let position1 = createVector(-120, 0, 0);
    neutron1 = new Neutron(position1, 5, 'red');
}

function draw() {
    background('#9CAFB7');
    orbitControl();

    //particles move within the boundary 
    push();
    noFill();
    translate(100, 0, 0);
    sphere(220);
    pop();
    
    push();
    neutron1.display();
    neutron1.fire();
    neutron1.checkEdges();
    pop();
    
}

class Particle {
  constructor(pos, radius, color) {
    this.pos = pos;
    // this.vel = new createVector(random(0, 0.5), 0);
    // this.acc = new createVector(random(0,1), 0);
    this.radius = radius;
    this.color = color;
  }

  display() {
    //fill color
    fill(this.color);
    translate(this.pos.x, this.pos.y);
    sphere(this.radius);
  }
   
  checkEdges() {
    if(this.pos.x > 325) {
      this.vel = new createVector(random(-0, -0.5), 0);
      this.acc =  new createVector(random(-0, -0.5), 0);
    }
    if(this.pos.x < -120) {
      this.vel = new createVector(random(0, 0.5), 0);
      this.acc =  new createVector(random(0, 0.5), 0);
    }
  }

}

class Neutron extends Particle {
  constructor(pos, radius, color) {
    super(pos, radius, color);
    this.vel = new createVector(random(0, 0.5), 0);
    this.acc = new createVector(random(0,1), 0);
  }

  fire() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

}

Neutron.prototype = Object.create(Particle.prototype);

