//let particles = [];
let neutron1;
let nucleus = [];
let neutrons = [];
let nucleus1;

class Particle {
  constructor(pos, radius, color) {
    this.pos = pos;
    this.vel = new createVector(0.5, 0, 0);
    this.acc = new createVector(1, 0, 0);
    this.radius = radius;
    this.color = color;
  }

  display() {
    if(this.pos.x > 330) {return}
    //fill color
    //look more into later
    
    push();
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
    pop();
  }
   
  fire() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  collide(nucleus) {
    let distance = this.pos.dist(nucleus.pos);
    if(distance < (this.radius + nucleus.radius)) {
      console.log('Collision detected');
    }
  }

}


class Nucleus {
  constructor(pos, neutron, proton) {
    this.pos = pos;
    this.radius = 20;
    this.neutron = neutron;
    this.proton = proton;
    this.particles = [];
    //bit confused on how to get on with this
    this.state = 'stable';
  }

  createNucleus() {
    //protons
    for (let i = 0; i < (this.proton); i++) {
      let position = this.pos;
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      push();
      position.x += this.radius * sin(azimuthalAng) * cos(inclinationAng);
      position.y += this.radius * sin(azimuthalAng) * sin(inclinationAng);
      position.z += this.radius * cos(azimuthalAng);
      let proton = new Particle(position, 3, 'red');
      this.particles.push(proton);
      pop();
    }

    //neutrons
    for (let i = 0; i < this.neutron; i++) {
      let position = this.pos;
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      push();
      position.x += this.radius * sin(azimuthalAng) * cos(inclinationAng);
      position.y += this.radius * sin(azimuthalAng) * sin(inclinationAng);
      position.z += this.radius * cos(azimuthalAng);
      let neutron = new Particle(position, 3, 'blue');
      this.particles.push(neutron);
      pop();
  }
  return nucleus;
}



}

