let BOARD_WIDTH = 25;
let BOARD_HEIGHT = 25;
let scale_factor = BOARD_WIDTH;
let width = Math.pow(BOARD_WIDTH,2);
let height = Math.pow(BOARD_HEIGHT,2);

let merge = document.getElementById('merge');
let quick = document.getElementById('quick');
let insert = document.getElementById('insert');

let merge_context = contextGenerator(merge)
let quick_context = contextGenerator(quick)
let insert_context = contextGenerator(insert)

let merge_button = document.getElementById('merge_button');
let quick_button = document.getElementById('quick_button');
let insert_button = document.getElementById('insert_button');

//in ms
let sleep_time = 100;

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

let merge_grid = [];
let quick_grid = [];
let insert_grid = [];

//OBJECTS

//Booleans to keep record of the state of whether or not one comparison has
//been made
let mergeStep = false;
let quickStep = false;
let insertStep = false;

//Main classes for the sorting algos
// Kizar
class Mergesort{
    arr = []
    mergesort(arr){

    let len = arr.length;
    let mid = Math.floor(len/2);
    let left = arr.slice(0,mid);
    let right = arr.slice(mid);

    if(len < 2){
      return arr;
    }
    // break the array into left and right components
    return merge(mergesort(left),mergesort(right));
   }

    merge(left,right){

      var  result = [];
      var  lLen = left.length;
      var  rLen = right.length;
      var  l = 0;
      var  r = 0;

  while(l < lLen && r < rLen){
     if(left[l].value < right[r].value){
       result.push(left[l++].value);
     }
     else{
       result.push(right[r++].value);
    }
  }
  //remaining part needs to be added to the result
  return result.concat(left.slice(l)).concat(right.slice(r));
 }


  //Step func will make a singular comparison within
  step(){}
}

// Ean
class Quicksort{
  // step(){}
  constructor(){
    this.context = quick_context;
    this.inputArr = [];
    for(var i = 0; i < 12; i++){
      this.inputArr.push(new Node(new Coord(i, Math.floor(Math.random()*12)+1, 0), Math.floor(Math.random()*12)))
    }
  }

  //Used to swap two numbers in an array
  async swap(greater, lesser, context){
    //erase old nodes
    this.eraseNode(greater, context);
    await sleep(sleep_time);

    this.drawNode(lesser, "black", context);
    await sleep(sleep_time);

    this.eraseNode(lesser, context);
    await sleep(sleep_time);

    this.drawNode(lesser, "black", context);
    await sleep(sleep_time);

    //swap node objects
    await this.swapNode(greater, lesser);
    await sleep(sleep_time);

    //draw nodes on specific canvas
    this.drawNode(greater, "red", context);
    await sleep(sleep_time);

    this.drawNode(lesser, "red", context);
    await sleep(sleep_time);
  }

  async partition(inputArr, low, high, piv) {
     let pivot = inputArr[piv].value;
     let returnIndex = low;

   for(var i = low; i < high; i++){
    if(inputArr[i].value < pivot){
      this.swap(inputArr[i], inputArr[returnIndex], quick_context);
      // await sleep(sleep_time)
      returnIndex++;
    }
  }

  await this.swap(inputArr[high], inputArr[returnIndex], quick_context);
  return returnIndex;
    //  let i = low;
    //  let j = high;
    //
    //  //Continue moving until the two Dogs cross paths
    //  while(i <= j) {
    //    console.log("length: " + inputArr.length);
    //    console.log("i: " + i);
    //    console.log("j: " + j);
    //
    //    while(inputArr[i].value < pivot) {
    //      console.log("Loop1");
    //      i++
    //    }
    //
    //    //Right "Dog", moving while less than pivot
    //   while(inputArr[j].value > pivot) {
    //      j--;
    //      console.log("Loop2");
    //    }
    //
    //    //Left "Dog", moving while greater than pivot
    //   if(i <= j) {
    //     //swap the elements in the array
    //     console.log("swap performmed");
    //     this.swap(inputArr[i], inputArr[j], quick_context);
    //     i++;
    //     j--;
    //   }
    // }
    //return the point in which we will divide the sub array
    //return i;
}

  //The main sorting algo for Quicksort
  async quickSort(inputArr, left, right) {
    let index;
    var pivot;
    if(left < right){
    pivot = right;
    index = await this.partition(inputArr, left, right, pivot);

   //sort left and right
   await this.quickSort(inputArr, left, index - 1);
   await this.quickSort(inputArr, index + 1, right);
    }
  return inputArr;
  }

  eraseNode(node, context){
    let i = node.x;
    for(var j = 0; j < node.value; j++){
      context.clearRect(i*scale_factor, j*scale_factor, node.width, node.height);
    }
  }

 async swapNode(greater, lesser){
    for(let property in greater){
      let buffer = greater[property];
      greater[property] = lesser[property];
      lesser[property] = buffer;
    }
    let buffer_x = greater.x;
    greater.x = lesser.x;
    lesser.x = buffer_x;
  }

  drawNode(node, color, context){
    let i = node.x;
    for(var j = 0; j < node.value; j++){
      context.beginPath();
      context.strokeStyle = "gray";
      context.fillStyle = color;
      context.rect(i*scale_factor, j*scale_factor, node.width, node.height);
      context.fillRect(i*scale_factor, j*scale_factor, node.width, node.height);
      context.stroke();
    }
  }
}

// Rojan
class Insertionsort{
	inputArr = []

	insertion_Sort(inputArr)
	{
  		for (var i = 1; i < inputArr.length; i++)
  		{
    			if (inputArr[i].value < inputArr[0].value)
    			{
      				inputArr.unshift(inputArr.splice(i,1)[0]);
    			}
    			else if (inputArr[i].value > inputArr[i-1].value)
    			{
      				continue;
    			}
    			else {
      				for (var j = 1; j < i; j++) {
        				if (inputArr[i].value > inputArr[j-1].value && inputArr[i].value < inputArr[j].value)
        				{
          					inputArr.splice(j,0,inputArr.splice(i,1)[0]);
        				}
      				}
    			}
  		}
  		return inputArr;
	}
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
  constructor(position, value){
      this.x =  position.x,
      this.y =  position.y,
      this.z =  position.z,
      this.width = BOARD_WIDTH,
      this.height = BOARD_HEIGHT,
      this.value = value
  }
}

function sleep(ms) {
  return new Promise(resolve => {setTimeout(resolve, ms)});
}

function hasBeenVisited(context, node){
  for(var i = 0; i < visited.length; i++){
    if(visited[i] == node)
      return true;
  }
  return false;
}

//DRAWING FUNCTIONS

function drawBoard(context, index, grid){
  context.beginPath();
  context.strokeStyle = "gray";
  context.fillStyle=  "black";

  for(var i = 0; i < 12; i++){
    grid[i] = [];
    for(var j = 0; j < 20; j++){
      grid[i][j] = new Node(new Coord(i, j, 0),  i)
      context.rect(i*BOARD_HEIGHT, j*BOARD_WIDTH, BOARD_WIDTH, BOARD_HEIGHT);
      context.fillRect(i*BOARD_HEIGHT, j*BOARD_WIDTH, BOARD_WIDTH, BOARD_HEIGHT);
    }
  }
  context.stroke();
}

function drawNode(context, node){
  context.beginPath();
  context.strokeStyle = "gray";
  context.fillStyle=  "yellow";
  context.rect(node.x*scale_factor, node.value*scale_factor, node.width, node.height);
  context.fillRect(node.x*scale_factor, node.value*scale_factor, node.width, node.height);
  context.stroke();
}

//TESTING
class Tester {

  constructor(grid, context){
    this.unsorted_array = [];
    this.context = context;

    for(var i = 0; i < 12; i++){
      this.unsorted_array.push(new Node(new Coord(i, Math.floor(Math.random()*12)+1, 0), Math.floor(Math.random()*12)))
    }
    // console.log("Unsorted: ", this.unsorted_array)
  }

  //nodes will be Node objects
  async sort(all_nodes, context){
    for(var i = 0; i < all_nodes.length; i++){
      for(var j = 0; j < all_nodes.length-1; j++){
        if(all_nodes[j].value < all_nodes[j+1].value){
          //pause momentarily
          await sleep(sleep_time);
          // console.log("Before calling swap function ", all_nodes[j].x)
          await this.swap(all_nodes[j], all_nodes[j+1], context);
          // console.log("After calling swap function ", all_nodes[j].x)
        }
      }
    }
  }

  async swap(greater, lesser, context){
    //erase old nodes
    this.eraseNode(greater, context);
    await sleep(sleep_time);

    this.drawNode(lesser, "black", context);
    await sleep(sleep_time);

    this.eraseNode(lesser, context);
    await sleep(sleep_time);

    this.drawNode(lesser, "black", context);
    await sleep(sleep_time);

    //swap node objects
    await this.swapNode(greater, lesser);
    await sleep(sleep_time);

    //draw nodes on specific canvas
    this.drawNode(greater, "red", context);
    await sleep(sleep_time);

    this.drawNode(lesser, "red", context);
    await sleep(sleep_time);
  }
  //helpers
  eraseNode(node, context){
    let i = node.x;
    for(var j = 0; j < node.value; j++){
      context.clearRect(i*scale_factor, j*scale_factor, node.width, node.height);
    }
  }

 async swapNode(greater, lesser){
    for(let property in greater){
      let buffer = greater[property];
      greater[property] = lesser[property];
      lesser[property] = buffer;
    }
    let buffer_x = greater.x;
    greater.x = lesser.x;
    lesser.x = buffer_x;
  }

  drawNode(node, color, context){
    let i = node.x;
    for(var j = 0; j < node.value; j++){
      context.beginPath();
      context.strokeStyle = "gray";
      context.fillStyle = color;
      context.rect(i*scale_factor, j*scale_factor, node.width, node.height);
      context.fillRect(i*scale_factor, j*scale_factor, node.width, node.height);
      context.stroke();
    }
  }
  isSorted(inputArr){
    for(var i; i < inpuArr.length - 1; i++){
      if(inputArr[i] > inputArr[i + 1]){
        return false;
      }
      return true
    }
  }
}



//RUNNING UNIT TESTS

//MAIN RUNNING

drawBoard(merge_context, 0, merge_grid);
drawBoard(quick_context, 1, quick_grid);
drawBoard(insert_context, 2, insert_grid);

let tester1 = new Tester(merge_grid, merge_context);
let tester2 = new Tester(quick_grid, quick_context);
let tester3 = new Tester(insert_grid, insert_context);

let merge_class = new Mergesort();
let quick_class = new Quicksort();
let insert_class = new Insertionsort();

for(var i = 0; i < tester1.unsorted_array.length; i++){
  tester1.drawNode(tester1.unsorted_array[i], "red", merge_context);
}
for(var i = 0; i < quick_class.inputArr.length; i++){
  tester2.drawNode(quick_class.inputArr[i], "red", quick_context);
}

merge_button.onclick = async () => { await tester1.sort(tester1.unsorted_array, tester1.context) };
quick_button.onclick = async () => { await quick_class.quickSort(quick_class.inputArr, 0, quick_class.inputArr.length-1); };
insert_button.onclick = () => { tester3.sort(tester3.unsorted_array, tester3.context); };

//Ean testing the quick sort
//
// var test = new Quicksort();
// test.inputArr.push(new Node(1,9));
// test.inputArr.push(new Node(1,8));
// test.inputArr.push(new Node(1,7));
// test.inputArr.push(new Node(1,6));
// test.inputArr.push(new Node(1,5));
// test.inputArr.push(new Node(1,4));
// test.inputArr.push(new Node(1,3));
// test.inputArr.push(new Node(1,2));
// test.inputArr.push(new Node(1,1));
// console.log(test.inputArr);
// testing = test.quickSort(test.inputArr, 0, test.inputArr.length - 1);
// console.log(testing);

// tester1.sort(tester1.unsorted_array, tester1.context);
// tester2.sort(tester2.unsorted_array, tester2.context);
// tester3.sort(tester3.unsorted_array, tester3.context);
// let interval = setInterval(() => { moveAnt(myBot); }, 20
