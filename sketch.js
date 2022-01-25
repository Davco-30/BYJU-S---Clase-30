const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit, rabbit_true;
var button;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
}

function setup() 
{
  //width, height
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rabbit_true = createSprite(250,630,100,100);
  rabbit_true.addImage(rabbit);

  //Si creas sprites, solo usas scale para cambiar tamaño
  rabbit_true.scale = 0.2;

  //Esta función toma a imagen como parámetro y así funciona como botón
  //Es más simple que createButton
  button = createImg("cut_button.png");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //Instrucci+on para todos los cuerpos rectangulares, circulares e imágenes y se dibujen desde el centro
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  //Instrucción para insertar imagenes: image()
  //Para dar coordenadas en x y y en el centro, usamos lo que vale width y height divididos entre 2
  image(bg_img,width/2,height/2,490,690);

  push();
  imageMode(CENTER);
  if(fruit != null){
    //Declaras la posición de la imagen food en la misma que se creo el cuerpo fruit  
    image(food,fruit.position.x,fruit.position.y,100,100);
  } 
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}