//let particles = [];
let nucleus = [];
let neutrons = [];

let particles = [];

let neutron1;
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
    let flag = false;
    let distance = this.pos.dist(nucleus.pos);
    if(distance < (this.radius + nucleus.radius)) {
      console.log('Collision detected');
    }
  }

}


class Nucleus extends Particle {
  constructor(pos, neutron, proton) {
    super();
    this.pos = pos;
    this.radius = 20;
    this.neutron = neutron;
    this.proton = proton;
    //global array is not used as particles will be repeatedly called during 
    //each draw loop in processing lang like p5js
    this.particles = [];
    this.state = 'stable';
  }

  createNucleus() {
    //protons
    for (let i = 0; i < this.proton; i++) {
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      this.pos.x += this.radius * sin(azimuthalAng) * cos(inclinationAng);
      this.pos.y += this.radius * sin(azimuthalAng) * sin(inclinationAng);
      this.pos.z += this.radius * cos(azimuthalAng);
      let proton = new Particle(this.pos, 3, 'red');
      this.particles.push(proton);
    }

    //neutrons
    for (let i = 0; i < this.neutron; i++) {
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      this.pos.x += this.radius * sin(azimuthalAng) * cos(inclinationAng);
      this.pos.y += this.radius * sin(azimuthalAng) * sin(inclinationAng);
      this.pos.z += this.radius * cos(azimuthalAng);
      let neutron = new Particle(this.pos, 3, 'blue');
      this.particles.push(neutron);
  }
  return this.particles;
}

  //display() for particle displays particle
  //displayNucleus() displays nucleus which is multiple particles
  displayNucleus() {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].super.display();
    }
  }

}

Nucleus.prototype = Object.create(Particle.prototype);

//Nucleus class holds instances of Particle class and pushes them into 
//an array called particle array
//A Nucleus class method should loop through the particle array and display
//the each item in the array 

function uranium() {
    //protons
    for (let i = 0; i < 92; i++) {
      let pos = createVector(100, 10, 0);
      let radius = 20;
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      pos.x += radius * sin(azimuthalAng) * cos(inclinationAng);
      pos.y += radius * sin(azimuthalAng) * sin(inclinationAng);
      pos.z += radius * cos(azimuthalAng);
      let proton = new Particle(pos, 3, 'red');
      particles.push(proton);
    }

    //neutrons
    for (let i = 0; i < 143; i++) {
      let pos = createVector(100, 10, 0);
      let radius = 20;
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      pos.x += radius * sin(azimuthalAng) * cos(inclinationAng);
      pos.y += radius * sin(azimuthalAng) * sin(inclinationAng);
      pos.z += radius * cos(azimuthalAng);
      let neutron = new Particle(pos, 3, 'blue');
      particles.push(neutron);
  }
  console.log(particles);
}

