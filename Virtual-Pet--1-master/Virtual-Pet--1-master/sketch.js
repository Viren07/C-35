var dogImg,dog,dogImg2 
var database 
var foodS,foodStock 
var feed,addFood  
var foodObj

function preload()
{
	dogImg = loadImage("images/dogImg.png") 
  dogImg2 = loadImage("images/dogImg1.png") 

}

function setup() {

	createCanvas(800, 700);
  database=firebase.database() 
  dog=createSprite(600,350,150,150); 
  dog.addImage(dogImg); 
  dog.scale=0.15;
  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock); 
  textSize(20); 
  feed=createButton("Feed the dog"); 
  feed.position(700,95); 
  feed.mousePressed(feedDog); 
  addFood=createButton("Add Food"); 
  addFood.position(800,95); 
  addFood.mousePressed(addFoods);
  foodObj=new Food()
}


function draw() {  
  
  background("blue");

  drawSprites();
  
  if(keyWentDown(UP_ARROW))
  { 
    writeStock(foodS); 
    dog.addImage(dogImg2); 
  }

  foodObj.display()
}

  

function readStock(data)
  { 
    foodS=data.val(); 
    foodObj.updateFoodStock(foodS) 
  }



  function writeStock(x)
  { 
    if(x<=0)
    { 
      x=0; 
    }
    else { 
      x=x-1; 
    } 
    database.ref('/').update({ Food:x }) 
  }


    function addFoods()
    { 
      foodS++; 
      database.ref('/').update({ Food:foodS }) 
    }

    function feedDog()
    { 
      dog.addImage(dogImg2); 
      if(foodObj.getFoodStock()<= 0)
      { 
        foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
      }
        else{ 
          foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
        } 
        database.ref('/').update(
          { 
          Food:foodObj.getFoodStock(), 
          FeedTime:hour() 
          }
        ) 
      }



