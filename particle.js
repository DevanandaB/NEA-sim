function setup() {
    const canvas = createCanvas(750, 600, WEBGL);
    canvas.parent('sim-container');
    angleMode(DEGREES);
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

    uranium();
}

class Particle {
  constructor(pos, radius, color) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;
  }

  display() {
    //fill color
    ambientLight(100);
    directionalLight(255, 255, 255, -1, 1, -1);
    ambientMaterial(52, 58, 235);
    fill(this.color);
    specularMaterial(255);
    shininess(150);
    shininess(150);
    noStroke();


    //translate back inside display?
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

function uranium() {
  let position1 = createVector(100, 10, 0);
  let centreParticle = new Particle(position1, 5, 'red');
  push();
  centreParticle.display();
  pop();

  for (let i = 0; i <= 360; i += 20) {
    let position1 = createVector(100, 10, 0);
    push();
    position1.x += 20 * cos(i);
    position1.y += 20 * sin(i);
    let neutron1 = new Neutron(position1, 5, 'red');
    neutron1.display();
    pop();
  }

  for (let i = 0; i <= 360; i += 30) {
    let position2 = createVector(100, 10, 0);
    push();
    position2.x += 15 * sin(i);
    position2.y += 15 * cos(i);
    position2.z += translate(0, 0, 3);
    let protron1 = new Neutron(position2, 5, 'blue');
    protron1.display();
    pop();
  }

  for (let i = 0; i <= 360; i += 60) {
    let position2 = createVector(100, 10, 0);
    push();
    position2.x += 10 * sin(i);
    position2.y += 10 * cos(i);
    position2.z += translate(0, 0, 5);
    let protron1 = new Neutron(position2, 5, 'red');
    protron1.display();
    pop();
  }
}

// for (let i = 0; i < 20; i++) {
  // let position1 = createVector(100, 10, 0);
  //   push();
  //   position1.x = random(100, 120);
  //   position1.y = random(10, 20);
  //   neutron1 = new Neutron(position1, 5, 'red');
  //   neutron1.display();
  //   pop();
  // }


