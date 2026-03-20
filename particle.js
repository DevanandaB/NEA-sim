let nuclei = [];
let neutrons = [];

let particles = [];

let neutron1;
let nucleus1;
let isotope;

class Particle {
  constructor(pos, radius, color, type) {
    this.pos = pos;
    this.origin = pos;
    this.type = type;
    this.vel = new createVector(0.25, 0, 0);
    this.acc = new createVector(0.25, 0, 0);
    this.radius = radius;
    this.color = color;
  }

  display() {
    if(this.pos.x > 330 || this.pos.x < -120 & 
      this.pos.y > 150 || this.pos.y < -160) {return}
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

  //made a collision resolution - now have to add that particle to the nucleus
  collide(nucleus) {
    let distance = this.pos.dist(nucleus.pos);
    if(distance < (this.radius + nucleus.radius)) {
      this.vel = new createVector(0, 0, 0);
      this.acc = new createVector(0, 0, 0);
      //to change state
      nucleus.state = 'unstable';
      nucleus.particles.push(this);
    }
  }

  //boundaryCheck() {}

}


class Nucleus extends Particle {
  constructor(pos, neutron, proton) {
    super(color);
    //global array is not used as particles will be repeatedly called during 
    //each draw loop in processing lang like p5js
    this.pos = pos;
    //fixed position
    this.origin = pos;
    this.radius = 20;
    this.neutron = neutron;
    this.proton = proton;
    this.particles = [];
    this.state = 'stable';
    this.vel = new createVector(0, 0, 0);
    this.acc = new createVector(0, 0, 0);
    this.timer = 0;
  }

  createNucleus() {
    //protons
    //changed this.pos.x = let x
    for (let i = 0; i < this.proton; i++) {
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      let x = this.pos.x + this.radius * sin(azimuthalAng) * cos(inclinationAng);
      let y = this.pos.y + this.radius * sin(azimuthalAng) * sin(inclinationAng);
      let z = this.pos.z + this.radius * cos(azimuthalAng);
      let position = createVector(x, y, z);
      let proton = new Particle(position, 3, 'red', 'proton');
      this.particles.push(proton);
    }

    //neutrons
    for (let i = 0; i < this.neutron; i++) {
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      let x = this.pos.x + this.radius * sin(azimuthalAng) * cos(inclinationAng);
      let y = this.pos.y + this.radius * sin(azimuthalAng) * sin(inclinationAng);
      let z = this.pos.z + this.radius * cos(azimuthalAng);
      let position = createVector(x, y, z);
      let neutron = new Particle(position, 3, 'blue', 'neutron');
      this.particles.push(neutron);
  }
  return this.particles;
}

// shuffleArray() {
//     // Source - https://stackoverflow.com/a/46545530
// // Posted by superluminary, modified by community. See post 'Timeline' for change history
// // Retrieved 2026-03-18, License - CC BY-SA 4.0

// let shuffled = this.particles
//     .map(value => ({ value, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value);
//     return shuffled;
//   }

  displayNucleus() {
    //this.shuffleArray();
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].display();
    }
  }


  split() {
    const half = this.particles.length / 2;    
    let firstHalf = this.particles.slice(0, half);
    let secHalf =  this.particles.slice(half, this.particles.length);

    for(let i = 0; i < firstHalf.length; i++) {
      //if(this.pos.x < -120 || this.pos.y > 220) {return}
      let current = firstHalf[i];
      current.vel = createVector(4, -4, 0);
      current.acc = createVector(0, 0, 0);
      current.fire();
    }

    for(let i = 0; i < secHalf.length; i++) {
      //if(this.pos.x > 320 || this.pos.y < -220) {return}
      let current = secHalf[i];
      current.vel = createVector(-4, 4, 0);
      current.acc = createVector(0, 0, 0);
      current.fire();
      
    }

  }

  release() {
    //120 deg
    let tempPos = this.pos;
    for(let i = 0; i < 3; i++) {
      let angle = TWO_PI / 3 * (i + random(0, 1));
      let neutron = new Particle(tempPos, 3, 'blue', 'neutron');
      neutron.vel = createVector(0.2 * cos(angle), 0.2 * sin(angle), 0);
      neutron.acc = createVector(0, 0, 0);
      neutrons.push(neutron);
    }
  }

  fission() {
    //explosion (last step if u have time)
    if(this.state == 'unstable') {
      this.timer++; 
      for(let i = 0; i < this.particles.length; i++) {
        let current = this.particles[i];
        current.pos.x = current.origin.x + random(-1, 1);
        current.pos.y = current.origin.y + random(-1, 1);
        current.pos.z = current.origin.z + random(-1, 1);
      }
      
      if(this.timer >= 30) {this.state = 'fission'} 
  }

    if(this.state == 'fission') {
      this.split();
      this.release();
    }
  }


  chainReaction() {
    //check collision for released particle with other nucleus
    //add fission function to them
    if(this.state == 'fission') {

    }
    this.state = 'chainReaction'
  }
  }



  Nucleus.prototype = Object.create(Particle.prototype);


