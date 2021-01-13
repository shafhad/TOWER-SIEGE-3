const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg,polygonImg;
var bg = "backgrounds/morning.png";
var gameState = "onSling";

var score = 0;

function preload() {
  polygonImg = loadImage("polygon.png");
  
  getBackgroundimage(); 
}

function setup(){
 createCanvas(1200,400);


    engine = Engine.create();
    world = engine.world;

    // polygon holder with strings.
    poly = Bodies.circle(50,200,20);
    World.add(world, poly);

    slingShot = new SlingShot(this.poly,{x:100,y:200});
   

//----------------------------------------------------------

    //ground class.
    ground = new Ground(width/2, 390, width, 10);

    //base1,2 means blocks holding base to hold blocks.
    base1 = new Base(width/2,300,200,20);
    base2 = new Base(1000,150,200,20);

    // line 27 to 44 block Section 1

    //level one
    block1 = new Block(519, 270, 30, 40);
    block2 = new Block(550, 270, 30, 40);
    block3 = new Block(580, 270, 30, 40);
    block4 = new Block(610, 270, 30, 40);
    block5 = new Block(640, 270, 30, 40);
    block6 = new Block(670, 270, 30, 40);
    //level two
    block7 = new Block(550, 230, 30, 40);
    block8 = new Block(580, 230, 30, 40);
    block9 = new Block(610, 230, 30, 40);
    block10 = new Block(640, 230, 30, 40);
    //level three
    block11 = new Block(580, 190, 30, 40);
    block12 = new Block(610, 190, 30, 40);
    //top
    block13 = new Block(595, 150, 30, 40);

 // ----------------------------------------------------------------
  
    // line 50 to 66block Section 2

    //level one
    block14 = new Block(930, 125, 20, 30);
    block15 = new Block(950, 125, 20, 30);
    block16 = new Block(970, 125, 20, 30);
    block17 = new Block(990, 125, 20, 30);
    block18 = new Block(1010, 125, 20, 30);
    block19 = new Block(1030, 125, 20, 30);
   //level 2
   block20 = new Block(950, 95, 20, 30);
   block21 = new Block(970, 95, 20, 30);
   block22 = new Block(990, 95, 20, 30);
   block23 = new Block(1010, 95, 20, 30);
   //level 3
   block24 = new Block(970, 65, 20, 30);
   block25 = new Block(990, 65, 20, 30);
   //top
   block26 = new Block(980, 35, 20, 30  );

// -------------------------------------------------------------------
  
}

function draw(){
  if(backgroundImg)
  {
    background(backgroundImg);
  }
  text("Score:"+score , 750,40);

    imageMode(CENTER);
    image(polygonImg,poly.position.x,poly.position.y,40,40);

    Engine.update(engine);
    
    base1.display();
    base2.display();
    
    ground.display();
  //--------------------------
  // score section for all blocks.
    block1.score();
    block2.score();
    block3.score();
    block4.score();
    block5.score();
    block6.score();
    block7.score();
    block8.score();
    block9.score();
    
  //-------------------------
    //block section 1
    fill(125, 196, 231);
    block1.display();
    block2.display();
    block3.display();
    block4.display();
    block5.display();
    block6.display();
    fill(255, 200, 20);
    block7.display();
    block8.display();
    block9.display();
    block10.display();
    fill(53, 209, 211);
    block11.display();
    block12.display();
    fill("grey");
    block13.display();

    //block section 2
    fill(125, 196, 231);
    block14.display();
    block15.display();
    block16.display();
    block17.display();
    block18.display();
    block19.display();
    fill(255, 200, 20);
    block20.display();
    block21.display();
    block22.display();
    block23.display();
    fill(125, 196, 231);
    block24.display();
    block25.display();
    fill("grey");
    block26.display();

    slingShot.display();

    fill(255,255,255);
    textSize(20);
    text("Press space bar for second chain😃!!!" ,850,360);
    

    drawSprites();
}
function mouseDragged() {
  if (gameState!=="launched"){
  Matter.Body.setPosition(this.poly,{x:mouseX,y:mouseY});
  } 
}
function mouseReleased(){
  slingShot.fly();
  gameState = "launched";
}
function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(this.poly);
      gameState = "onSling";
  }
}
async function getBackgroundimage()
{
   var response = await fetch("https://worldtimeapi.org/api/ip");
   var responseJSON = await response.json();
   var dateTime = responseJSON.datetime;
   var hour = dateTime.slice(11,13);
   if(hour >= 05 && hour <= 20){
     bg = "backgrounds/morning.png";
     console.log("morning");
   } else {
    bg = "backgrounds/night.png.png";
   }

   backgroundImg = loadImage(bg);

   console.log(hour);
   
}
