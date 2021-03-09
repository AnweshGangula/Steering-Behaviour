// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 10;
    this.maxforce = 1;
  }

  behaviors() {
    var arrive = this.arrive(this.target);
    var trigger = createVector(mouseX, mouseY);
    var flee = this.flee(trigger);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    // stroke(150); //Color of Circle - Ex: Blue = (0, 100, 200)
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  }


  arrive(target) {
    colorMode(HSB, 360);
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    
        
    var colorValue = 0
    var transparency = 0
    if (d < 100) {
      colorValue = map (d, 0, 100, 250, 100); //HSL Color mode
      transparency  = map (d, 0, 100, 360, 0);
    }
    
    var stokeColor = color(colorValue, 360, 320) //HSL Color mode
    stokeColor.setAlpha(transparency)
    stroke(stokeColor);
    
    return steer;
  }

  flee(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
}