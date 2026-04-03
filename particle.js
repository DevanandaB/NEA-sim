let timer = 0;
let nuclei = [];
let neutrons = [];

let particles = [];

let neutron1;
let nucleus1;

let isFiring = false;
let isPlaying = false;



class Particle {
  constructor(pos, color) {
    this.pos = pos.copy();
    this.vel = new createVector(3, 0, 0);
    this.acc = new createVector(1, 0, 0);
    this.radius = 3;
    this.color = color;
  }

  display() {
    if(this.pos.x > 330 || this.pos.x < -120 || 
      this.pos.y > 150 || this.pos.y < -160) {return}
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
    //this.vel.add(this.acc);
    this.pos.add(this.vel);
    isFiring = true;
  }


   

  //collision detection and resolution
  //check if a neutron collides with the nucleus
  collide(nucleus) {

    //calculates distance between neutron and nucleus
    let distance = this.pos.dist(nucleus.pos);

    //distance compared against the sum of radius of both objects
    if(distance < (this.radius + nucleus.radius)) {

      //stops the neutron
      this.vel = createVector(0, 0, 0);
      this.acc = createVector(0, 0, 0);

      //neutron is absorbed by the nucleus
      nucleus.state = 'unstable';
      nucleus.particles.push(this);
    }
  }

}

class Nucleus {
  constructor(pos, neutronNo, protonNo) {
    this.pos = pos.copy();
    this.radius = 20;
    this.neutronNo = neutronNo;
    this.protonNo = protonNo;
    this.particles = [];
    this.state = 'stable';
    this.vel = new createVector(0, 0, 0);
    //this.acc = new createVector(0, 0, 0);
    this.isSplit = false;
    this.isRelease = false;
    this.isShuffled = false;
  }

  createNucleus() {
    //protons
    for (let i = 0; i < this.protonNo; i++) {
      
      //to generate random angles within x y and z directions within nucleus rangle  
      let polarAng = random(0, 360);
      let azimuthalAng = random(0, 180);

      //random radius within nucleus range 
      let randomRadius = random(10, 20);
      let x = this.pos.x + randomRadius * sin(azimuthalAng) * cos(polarAng);
      let y = this.pos.y + randomRadius * sin(azimuthalAng) * sin(polarAng);
      let z = this.pos.z + randomRadius * cos(azimuthalAng);
      let position = createVector(x, y, z);

      //creates protons and adds that to the particle array
      let proton = new Particle(position, 'red');
      this.particles.push(proton);
    }

    //neutrons
    for (let i = 0; i < this.neutronNo; i++) {
      let polarAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      let randomRadius = random(10, 20);
      let x = this.pos.x + randomRadius * sin(azimuthalAng) * cos(polarAng);
      let y = this.pos.y + randomRadius * sin(azimuthalAng) * sin(polarAng);
      let z = this.pos.z + randomRadius * cos(azimuthalAng);
      let position = createVector(x, y, z);

      //creates protons and adds that to the particle array
      let neutron = new Particle(position, 'blue');
      this.particles.push(neutron);
  }
}


  displayNucleus() {
    for(let i = 0; i < this.particles.length; i++) {
    this.particles[i].display();
    }
  }


  //Fisher–Yates (aka Knuth) Shuffle
  shuffleParticles() {
    for (let i = this.particles.length - 1; i > 0; i--) {
      let j = Math.floor(random(0, i));
      [this.particles[i], this.particles[j]] = [this.particles[j], this.particles[i]];
    }
  }

  vibrate() {
    //vibrate only unstable nucleus
    if(this.state == 'unstable') {
      //timer starts from 0
      timer++; 

      //each particle in nucleus change offset by a small amount
      for(let i = 0; i < this.particles.length; i++) {
        let current = this.particles[i];
        current.pos.x += random(-1, 1);
        current.pos.y += random(-1, 1);
        current.pos.z += random(-1, 1);
      }
      
      //when timer reaches 30 the nucleus can split
      if(timer >= 30) {
        this.state = 'fission';
      } 
  }
  }





  split() {
    
    if (this.isShuffled == false) {
        this.shuffleParticles();
        this.isShuffled = true;
    }

    if (this.isSplit == false) {
        this.isSplit = true;
        //first prototype
     const half = floor(this.particles.length / 2);    
    let firstHalf = this.particles.slice(0, half);
    let secHalf =  this.particles.slice(half, this.particles.length);

    for(let i = 0; i < firstHalf.length; i++) {
      let current = firstHalf[i];
      current.vel = createVector(-4, 4, 0);
      current.fire();
    }

    for(let i = 0; i < secHalf.length; i++) {
      let current = secHalf[i];
      current.vel = createVector(4, -4, 0);
      current.fire();
      
    }
}
    

    
    

    ////adding a floor will make sure that the number will be rounded to an int
    // const half = floor(this.particles.length / 2);  
    
    // //the daughter nuclei
    // let firstHalf = this.particles.slice(0, half);
    // let secHalf =  this.particles.slice(half, this.particles.length);

    // //random angle generation pasted from the createNucleus() function but this.pos and randomRadius is removed
    // //fixed velocity 4 is multiplyed with the angles instead of radius
    // let fixedVel = 4;
    // let polarAng = random(0, 180);
    // let azimuthalAng = random(0, 360);
    // let x = fixedVel * sin(azimuthalAng) * cos(polarAng);
    // let y = fixedVel * sin(azimuthalAng) * sin(polarAng);
    // let z = fixedVel * cos(azimuthalAng);

    // //firing the first nuclei from the centre
    // for(let i = 0; i < firstHalf.length; i++) {
    //   let current = firstHalf[i];

    // //gives nuclei fixed velocity but fires in a different direction
    //   //current.acc = createVector(0, 0, 0);
    //  current.vel = createVector(x, y , z);
    //  current.fire();
    
    // }

    // //firing the second nuclei from the centre
    // for(let i = 0; i < secHalf.length; i++) {
    //   let current = secHalf[i];

    //   //gives nuclei equal velocity to the first one but in opposite direction
    //   current.acc = createVector(0, 0, 0);
    //   current.vel = createVector(-x, -y , -z);

      
    // //   current.pos.add(current.vel);

    //   current.fire();
      

    //}
  }



  release() {
    //neutrons are created on the centre of nucleus  so that it fires away from the centre
    if (this.isRelease == false) {
        let nucleusCentre = this.pos.copy();
    for(let i = 0; i < 3; i++) {
      let neutron = new Particle(nucleusCentre, 'blue');
      let fixedVel = 3;
      let polarAng = random(0, 360);
      let azimuthalAng = random(0, 180);
      let x = fixedVel * sin(azimuthalAng) * cos(polarAng);
      let y = fixedVel * sin(azimuthalAng) * sin(polarAng);
      let z = fixedVel * cos(azimuthalAng);
      neutron.acc = createVector(0, 0, 0);
      neutron.vel =  createVector(x, y, z);
      neutrons.push(neutron);
    }
    this.isRelease = true;
}
    
    
  }

  fission() {
    this.vibrate();
    if(this.state == 'fission') {
      //this.split();
      this.release();
      this.state = 'fissioned';
    }

      
      
  }


  chainReaction() {
    if(this.state == 'chain') {
      for (let i = 0; i < neutrons.length; i++) {
        neutrons[i].collide(nuclei);
      }
    }
  }
  }