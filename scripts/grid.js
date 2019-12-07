let BOARD_WIDTH = 25;
let BOARD_HEIGHT = 25;
let scale_factor = BOARD_WIDTH;
let width = Math.pow(BOARD_WIDTH,2);
let height = Math.pow(BOARD_HEIGHT,2);

let merge = document.getElementById("merge");
let quick = document.getElementById("quick");
let insert = document.getElementById("insert");

let merge_context = contextGenerator(merge)
let quick_context = contextGenerator(quick)
let insert_context = contextGenerator(insert)

console.log(merge);
console.log(merge_context);

setDimensions(merge);
setDimensions(quick);
setDimensions(insert);

function setDimensions(element){
  element.width = width;
  element.height = height;
}

function contextGenerator(canvas){
  return canvas.getContext("2d");
}


const MAX_SUM = 16;

const random_mode = false;

let grid = [];
let matrix = [];

let visited = [];

//OBJECTS

//Booleans to keep record of the state of whether or not one comparison has
//been made
let mergeStep = false;
let quickStep = false;
let insertStep = false;

//Main classes for the sorting algos
class Mergesort(){

  //Step func will make a singular comparison within 
  step(){}
}

class Quicksort(){
  step(){}
}

class Insertionsort(){
  step(){}
}

//This will call each sorting algo's step function
//Wait for all 3 to return 0 to update the GUI
//Pause for 1/2 after each step call
function RaceManager(){

}

class Coord{
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Node{
  constructor(position){
    this.position = position;
    this.random_pos = null;
    this.width = BOARD_WIDTH;
    this.height = BOARD_HEIGHT;
    this.adj_list = [];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hasBeenVisited(context, node){
  for(var i = 0; i < visited.length; i++){
    if(visited[i] == node)
      return true;
  }
  return false;
}

//DRAWING FUNCTIONS

function drawBoard(context, index){
  console.log(":D");
  index = index + 1;
  context.beginPath();
  context.strokeStyle = "gray";
  context.fillStyle=  "black";

  for(var i = 0; i < 12; i++){
    grid[i] = [];
    for(var j = 0; j < 20; j++){
      grid[i][j] = new Node(i, j, index)
      context.rect(i*BOARD_HEIGHT, j*BOARD_WIDTH, BOARD_WIDTH, BOARD_HEIGHT);
      context.fillRect(i*BOARD_HEIGHT, j*BOARD_WIDTH, BOARD_WIDTH, BOARD_HEIGHT);
    }
  }
  context.stroke();
}

function drawNode(context, node, isBotNode){
  context.beginPath();
  context.strokeStyle = "gray";
  if(isBotNode){
    node.random_pos = node.position;
    context.fillStyle = "red";
  } else {
    context.fillStyle=  "yellow";
  }
  if(random_mode){
    context.rect(node.random_pos.x*index*scale_factor, node.random_pos.y*index*scale_factor, node.width, node.height);
    context.fillRect(node.random_pos.x*index*scale_factor, node.random_pos.y*index*scale_factor, node.width, node.height);
  } else {
    context.rect(node.position.x*scale_factor, node.position.y*scale_factor, node.width, node.height);
    context.fillRect(node.position.x*scale_factor, node.position.y*scale_factor, node.width, node.height);
  }
  context.stroke();
}

//UNIT TESTING
class Tester {
}


//RUNNING UNIT TESTS

let tester = new Tester();

//MAIN RUNNING

let bot = new Node(new Coord(16, 0, 0));

drawBoard(merge_context, 0);
drawBoard(quick_context, 1);
drawBoard(insert_context, 2);
// let interval = setInterval(() => { moveAnt(myBot); }, 20
