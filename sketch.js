const tileSize = 16;
const noiseScale = 0.1;
const speed = 15;
const buffer = 10;
const images = [];

var x = 0;
var y = 0;
var w = 0;
var h = 0;
var xRO = 0; 
var yRO = 0;
var xTO = 0;
var yTO = 0;
var obj;
var canvas;
var zoom = 1.00;
var zMin = 0.05;
var zMax = 9.00;
var sensativity = 0.005;
// var mX = mouseX;
// var mY = mouseY
var drgn;
var x1;
var y1;
var x1A = [];
var y1A = [];
var x2 = 0;
var y2;
var rng;
var rngy;
var dtctn = false;
var drgnGroup;


const tiles = [];

function preload() {
  images.push(loadImage('water.png'));
  images.push(loadImage('sand.png'));
  images.push(loadImage('grass.png'));
  images.push(loadImage('forest.png'));
}

function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
  w = width / tileSize + buffer;
  h = height / tileSize + buffer;
  // fill("red");
   obj = createSprite(displayWidth/2,displayHeight/2,50,50);
   obj.debug = true;  

  drgnGroup = new Group();

  noStroke();
  //colorMode(HSB);
  drawTerrain();
  //scale(1);
  //fill("red");
  
  //obj.debug = true;
  
  //obj.depth = 10;
  console.log(obj.depth);
  // console.log(obj.x);
  // console.log(obj.y);

  /*for(var i = 0; i<x1A.length; i++){
    x1A[5] = x2
  }
  for(var i = 0; i<y1A.length; i++){
    y2 = y1A[i]
  }*/

}

function checkKey() {

  if (keyDown("W")) {
    y -= speed;
  }
  if (keyDown("S")) {
    y += speed;
  }
  if (keyDown("A")) {
    x -= speed;
  }
  if (keyDown("D")) {
    x += speed;
  }
}

function drawTerrain() {
  xRO = x % tileSize;
  yRO = y % tileSize;
  xTO = parseInt(x / tileSize);
  yTO = parseInt(y / tileSize);
  for (var i = 0; i < w; i++) {
    for (var j = 0; j < h; j++) {
      tiles[i + j * w] = getTile(i, j);
    }
  }
  
  for (var i = 0; i < w; i++) {
    for (var j = 0; j < h; j++) {
      image(tiles[i + j * w], (i - buffer / 2) * tileSize - xRO, (j - buffer / 2) * tileSize - yRO, tileSize, tileSize);
    }
  }
  
}

function getTile(x, y, terrainScales) {
  var v = noise((xTO + x) * noiseScale, (yTO + y) * noiseScale);
  var scales = [0.4, 0.5, 0.7, 1];
  for (var i = 0; i < scales.length; i++) {
    var terrainScale = scales[i];
    if (v <= terrainScale) {
      return images[i];
    }
  }
}

function draw() {

  /*translate(mouseX, mouseY);
  translate(-mouseX, -mouseY);
  scale(zoom);*/
  clear();
  update();
  drawTerrain();
  drawSprites();
  /*console.log(mouseY);
  console.log(mouseX)*/

  if(keyDown("X")){
    spawnDragons();
    nonRepeat();
  }

rng = Math.round(random(displayWidth, displayWidth/4));
rngy = Math.round(random(displayHeight, displayHeight/4));

  obj.x = mouseX;
  obj.y = mouseY;

  // plrDetection();

  if(drgnGroup.isTouching(obj)){
    drgn.attractionPoint(0.2,obj.x,obj.y);
    console.log("works");
  }
}

function update() {
  if (keyIsPressed) {
    checkKey(key);
  }
}

function mouseWheel(event) {
  zoom -= sensativity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  //uncomment to block page scrolling
  return false;
}

function nonRepeat(){
  y1 = Math.round(random(displayHeight, displayHeight/4));
  x1 = Math.round(random(displayWidth, displayWidth/4));
  // return x
  // console.log(x);
  x1A.push(x1);
  y1A.push(y1);
  
  
}

function spawnDragons(){
  if(frameCount % 10 === 0){
    for(i = 0; i<x1A.length; i++){
      if(x1A[i] !== x1 && y1A[i] !== y1){
        drgn = createSprite(x1,y1,50,50);
        drgn.setCollider("circle",0,0,150);
        drgn.debug = true;
        drgn.shapeColor = "black"
        drgnGroup.add(drgn);
        drgn.rotateToDirection = true;
        drgn.friction = 0.1;
        console.log("tst");
        console.log("x1,y1 "+x1, y1);
        console.log("x2val "+x2,y2);
        console.log("array "+x1A, y1A);
      }
      /*else{
        drgn = createSprite(x1 + rng, y1 + rngy,50,50);
        drgn.shapeColor = "red"
        drgn.setCollider("circle",0,0,150);
        drgn.debug = true;
        console.log("touching");
      }*/
    }
  }
}

/*function plrDetection(){
  if(dtctn === true){
    
   }
}*/