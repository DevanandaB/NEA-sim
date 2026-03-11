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

  //working
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
   
  //working
  fire() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  //made a collidion resolution - now have to add that particle to the nucleus
  collide(nucleus) {
    let distance = this.pos.dist(nucleus.pos);
    if(distance < (this.radius + nucleus.radius)) {
      this.vel = new createVector(0, 0, 0);
      this.acc = new createVector(0, 0, 0);
      //this.particles.push(this);
    }
  }

}


class Nucleus extends Particle {
  constructor(pos, neutron, proton) {
    super(color);
    //global array is not used as particles will be repeatedly called during 
    //each draw loop in processing lang like p5js
    this.pos = pos;
    this.radius = 20;
    this.neutron = neutron;
    this.proton = proton;
    this.particles = [];
    this.state = 'stable';
    //vel and acc
    this.vel = new createVector(1, 0, 0);
    this.acc = new createVector(0.5, 0, 0);

  }

  //working
  createNucleus() {
    //protons
    //changed this.pos.x = let x
    for (let i = 0; i < this.proton; i++) {
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      let x = this.pos.x + this.radius * sin(azimuthalAng) * cos(inclinationAng);
      let y = this.pos.y + this.radius * sin(azimuthalAng) * sin(inclinationAng);
      let z = this.pos.z + this.radius * cos(azimuthalAng);
      let pos = createVector(x, y, z);
      let proton = new Particle(pos, 3, 'red');
      this.particles.push(proton);
    }

    //neutrons
    for (let i = 0; i < this.neutron; i++) {
      let inclinationAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      let x = this.pos.x + this.radius * sin(azimuthalAng) * cos(inclinationAng);
      let y = this.pos.y + this.radius * sin(azimuthalAng) * sin(inclinationAng);
      let z = this.pos.z + this.radius * cos(azimuthalAng);
      let pos = createVector(x, y, z);
      let neutron = new Particle(pos, 3, 'blue');
      this.particles.push(neutron);
  }
  return this.particles;
}

//working
  displayNucleus() {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].display();
    }
  }

  split() {
    // for(let i = 0; i < this.particles.length; i++) {
    //   let current = this.particles[i];
    //   let centerPosX = current.pos.x / 2;
    //   console.log(centerPosX);
    //   //console.log(centerPosX);
    // }

    let current = this.displayNucleus();
    //for the particles that go above the position move to one array
    //calculate highest particle position
    let half = 0;

    //   //center of the nucleus and divide it by two
    

    
  }

  fission() {
    //if neutron collided with nucleus, vibrate nucleus
    for(let i = 0; i < this.particles.length; i++) {
      let current = this.particles[i];
      current.pos.x += random(-1, 1);
      current.pos.y += random(-1, 1);
      current.pos.z += random(-1, 1);
  }


    }


    //explosion 
    //splits into two
    //releases three neutrons
    //all the contents absorb within the vessel boundary
    


  chainReaction() {};


  }

Nucleus.prototype = Object.create(Particle.prototype);



