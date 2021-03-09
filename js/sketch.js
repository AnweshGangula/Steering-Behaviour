// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4
// Blog: https://thecodingtrain.com/CodingChallenges/059-steering-text-paths.html

let font;
let A_Points = [];
let G_Points = [];

function preload() {
  font = loadFont('./Resources/Poppins-Bold.ttf');
}

function setup() {
  var Text = { first: "Anwesh", last: "Gangula" }
  var Abbox = font.textBounds(Text.first, 0, 0, 192)
  var Gbbox = font.textBounds(Text.last, 0, 0, 192)

  createCanvas(windowWidth - 20, Abbox.h + Gbbox.h + 360);
  background(51);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  var APoints = font.textToPoints(Text.first, (windowWidth / 2 - Abbox.w / 2), Abbox.h + 150, 192, {
    sampleFactor: 0.25
  });


  var GPoints = font.textToPoints(Text.last, (windowWidth / 2 - Gbbox.w / 2), Abbox.h + Gbbox.h + 150, 192, {
    sampleFactor: 0.25
  });

  for (let i = 0; i < APoints.length; i++) {
    let pt = APoints[i];
    let A_pt = new Vehicle(pt.x, pt.y);
    A_Points.push(A_pt);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }


  for (let i = 0; i < GPoints.length; i++) {
    let pt = GPoints[i];
    let G_pt = new Vehicle(pt.x, pt.y);
    G_Points.push(G_pt);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  clear()
  // background(51); //Color of Background
  for (let i = 0; i < A_Points.length; i++) {
    var Anwesh = A_Points[i];
    Anwesh.behaviors();
    Anwesh.update();
    Anwesh.show();

  }
  for (let i = 0; i < G_Points.length; i++) {
    var Gangula = G_Points[i];
    Gangula.behaviors();
    Gangula.update();
    Gangula.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 20, windowHeight);
}