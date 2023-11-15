title = "GOLFME";

description = `
[Hold]    Change angle
[Release] Jump
`;

characters = [];

options = {
  viewSize: { x: 400, y: 400 },
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 2,
};

let p, v;
let isJumping;
let angle;
let width;
let scr;
let playerCollision;
let damp = 1;
let enemySpeed = 2;

let enemies = [];
let blueBoxes = [];
let blueBoxSpawnTimer = 0;


function update() {
  if (!ticks) {
    p = vec(80, 85);
    isJumping = angle = width  = 0;
  }

  if (rnd() < 0.02) {
    let spawnSide = rndi(4); // Randomly select a side (0: top, 1: right, 2: bottom, 3: left)
    let spawnX, spawnY;

    switch (spawnSide) {
      case 0: // Top
        spawnX = rnd(400);
        spawnY = -10;
        break;
      case 1: // Right
        spawnX = 410;
        spawnY = rnd(400);
        break;
      case 2: // Bottom
        spawnX = rnd(400);
        spawnY = 410;
        break;
      case 3: // Left
        spawnX = -10;
        spawnY = rnd(400);
        break;
    }
    let angleToPlayer = vec(spawnX, spawnY).angleTo(p);
    
    enemies.push({
      pos: vec(spawnX, spawnY),
      vel: vec(enemySpeed).rotate(angleToPlayer * rnd(-1,1)),
      size: 9,
      isInMap: false,
    });
  }

  // Update enemies
  enemies.forEach((enemy) => {
    if (!enemy.isInMap) {
      if (
        enemy.pos.x >= 15 &&
        enemy.pos.x <= 385 &&
        enemy.pos.y >= 15 &&
        enemy.pos.y <= 385
      ) {
        enemy.isInMap = true;
        
      }
    }

    enemy.pos.add(vec(enemy.vel.x * damp, enemy.vel.y * damp));
    color("red");
    box(enemy.pos, enemy.size);
    if(enemy.isInMap){
      // Apply bouncing logic only to enemies in the map
      // enemy.pos.add(vec(enemy.vel.x * damp, enemy.vel.y * damp));

      // Bounce against walls

      if(enemy.pos.x < 9 || enemy.pos.x > 391 ){
        if(enemy.pos.y < 200){
          enemy.vel.x = -enemy.vel.x 
        }
        else{
          enemy.vel.y = -enemy.vel.y ;
          enemy.vel.x = -enemy.vel.x 
        }

      }
      if ( enemy.pos.y < 15 ||enemy.pos.y > 391) 
      {
        enemy.vel.y = -enemy.vel.y ;
        enemy.vel.x = -enemy.vel.x ; // Bounce off the walls
    
      }
    }

    if (playerCollision.isColliding.rect.red ) {
      // isJumping = angle = 0;
      // p.y = 85;
      end();
    }

  
  });

  
 

  


  color("yellow");
  
   rect(0, 0, 9, 400);
   rect(400, 400, -400, -9);
   rect(0, 0, 400, 9);
   rect(400, 400, -9, -400);
  
  color("green");
  playerCollision = box(p, 9, 9);
  // if (p.x < 0 || p.y > 99) {
  //   play("lucky");
  //   end();
  // }
  if (playerCollision.isColliding.rect.yellow ) {
    // isJumping = angle = 0;
    // p.y = 85;
    v.y = -v.y ;
    v.x = -v.x ;
  }


  

  if (isJumping) {
    p.add(vec(v.x * damp, v.y * damp));
    // if (playerCollision.isColliding.rect.yellow) {
    //   // isJumping = angle = 0;
    //   // p.y = 85;
    //   v.y = -v.y;
    //   v.x = -v.x;
    // }
    if (input.isPressed) {
      damp = 0.2;
      enemySpeed = 1;
    }
  } 
    
  if (input.isPressed) {
    bar(p, 20, 3, (angle -= 0.1), 0);
     
  }
  if (input.isJustReleased) {
    play("jump");
    isJumping = 1;
    v = vec(4).rotate(angle);
    damp = 1;
    
  }
  
  // p.x -= scr = clamp(p.x - 50, 0, 99) * 0.1 + difficulty;
  // width -= scr;
  score += scr;




  blueBoxes.forEach((blueBox) => {
    color("black");
    box(blueBox.pos, blueBox.size);

    if (p.pos == blueBox.pos) {
 
      // enemies.splice(0, Math.ceil(enemies.length / 2));
      // Remove the blue box
      // v.y = -v.y ;
      // v.x = -v.x ;
      end();
  
    }

  });




 if (blueBoxSpawnTimer >= 100) {
    let blueBoxSpawnX = rnd(50, 350);
    let blueBoxSpawnY = rnd(50, 350);
    
    blueBoxes.push({
      pos: vec(blueBoxSpawnX, blueBoxSpawnY),
      size: 15,
    });

    blueBoxSpawnTimer = 0; // Reset the timer
  } else {
    blueBoxSpawnTimer++;
  }

  



 
 




}
