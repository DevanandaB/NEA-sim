let particles = [];

class Particle {
  constructor(pos, radius, color) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;
  }

  display() {
    //fill color
    //look more into later
    ambientLight(100);
    directionalLight(255, 255, 255, -1, 1, -1);
    ambientMaterial(52, 58, 235);
    fill(this.color);
    specularMaterial(255);
    shininess(150);
    shininess(150);
    noStroke();

    translate(this.pos.x, this.pos.y, this.pos.z);
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
  //inclination angle and azimuthal angle
  let radius = 20;
  //40 percent of real no of protrons and neutrons
  for (let i = 0; i < 38; i++) {
    let position1 = createVector(100, 10, 0);
    let inclinationAng = random(0, 360);
    let azimuthalAng = random(0, 180);
    push();
    position1.x += radius * sin(azimuthalAng) * cos(inclinationAng);
    position1.y += radius * sin(azimuthalAng) * sin(inclinationAng);
    position1.z += radius * cos(azimuthalAng);
    let neutron1 = new Neutron(position1, 5, 'red');
    particles.push(neutron1);
    pop();
  }
  for (let i = 0; i < 58; i++) {
    let position1 = createVector(100, 10, 0);
    let inclinationAng = random(0, 360);
    let azimuthalAng = random(0, 180);
    push();
    position1.x += radius * sin(azimuthalAng) * cos(inclinationAng);
    position1.y += radius * sin(azimuthalAng) * sin(inclinationAng);
    position1.z += radius * cos(azimuthalAng);
    let neutron1 = new Neutron(position1, 5, 'blue');
    particles.push(neutron1);
    pop();
  }
  return particles;
}

