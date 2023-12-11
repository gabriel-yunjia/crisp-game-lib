title = "GRAVES";

description = `
[Slide] Move
`;

characters = [];

options = {
  viewSize: { x: 400, y: 400 },
  theme: "dark",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 6,
};





/** @type {{pos: Vector, type: "spike" | "grave", isMoving: Boolean, Endp: Number}[]} */
let objs;
let nextSpikeDist;
let nextCoinDist;
let isMoving;
let End;

/** @type {{pos: Vector, angle: number, range: number}} */
let player;
let pressedTicks;
const angleWidth = PI / 6;

let enemies = [];
let nextEnemyDist = 200;


function update() {
  if (!ticks) {
    objs = [];
    nextSpikeDist = 90;
    nextCoinDist = 100;
    pressedTicks = 0;
    player = { pos: vec(50, 290), angle: 0, range: 40 };
  }
  const scr = difficulty * (1 + player.range * 0.01) ;
 console.log("scr" + scr);

  nextCoinDist -= scr;
  if (nextCoinDist < 0) {
    objs.push({ pos: vec(rnd(10, 390)), type: "grave", isMoving: true, Endp: rndi(100)});
    nextCoinDist = 300;
  }
  const pp = player.pos.x;
  player.pos.x = clamp(input.pos.x, 3, 397);
  player.pos.y = clamp(input.pos.y, 3, 397);
  // const vx = clamp(player.pos.x - pp, -0.1, 0.1);
  // player.angle = clamp(player.angle + vx * sqrt(difficulty), -PI / 8, PI / 8);
  // player.range *= 1 - 0.001 * sqrt(difficulty);
  color("black");
  let p = box(player.pos, 4);

  remove(objs, (o) => {0

    if(o.isMoving){
    o.pos.y += 1;
    }
    if(o.pos.y > o.Endp){
      
      o.isMoving = false;
      
    }
   
    if(o.isMoving == false){
      let angleToPlayer = vec(o.pos.x, o.pos.y).angleTo(player.pos.x, player.pos.y);
      nextEnemyDist -= scr;
      console.log("enem" + nextEnemyDist);
      if(nextEnemyDist < 2){
        
        enemies.push({
        pos: vec(o.pos.x, o.pos.y),
        vel: vec(1).rotate(angleToPlayer),
        size: 5,
        isInMap: false,
        
      });
      nextEnemyDist = 200;
    }
     
    }
    const d = player.pos.distanceTo(o.pos);


      
      if (d < player.range) {
        color(o.type === "grave" ? "light_black" : "red");
        text(o.type === "grave" ? "O" : "*", o.pos);
      } else {
        particle(o.pos, 0.05);
      }
    
    color("transparent");
    const c = text(o.type === "grave" ? "O" : "*", o.pos).isColliding;
    if(rndi(3) >= 1){
    color("green");
    particle(o.pos, 0.05);
    }

    if (c.rect.black) {
      if (o.type === "grave") {
        play("powerUp");
        addScore(floor(player.range), o.pos);
        
        player.range = clamp(player.range + 9, 9, 99);
      } else {
        play("explosion");
        color("red");
        text("*", o.pos);
        particle(o.pos);
         player.range /= 3;
      }
      return true;
    }
  });

  remove(enemies, (enemy) =>{
    // Create a vector from enemy to player
    const direction = vec(player.pos.x - enemy.pos.x, player.pos.y - enemy.pos.y);

    // Normalize the direction vector to have a length of 1
    direction.normalize();


    const speed = 1;


    enemy.pos.add(vec(direction.x * speed, direction.y * speed));

    color("white");
 


    if (player.pos.distanceTo(enemy.pos) < player.range) {

        play("explosion");
        color("red");
        box(enemy.pos, enemy.size);
        text("*", enemy.pos);
        particle(enemy.pos);
        

    }
  
    const c = text("*", enemy.pos).isColliding;
    
    if (c.rect.black){
      player.range *= 0.8;
      return true;
     

    }

    
});

  
  color("black");
  arc(player.pos, player.range);
   if (player.range < 5) {
    play("lucky");
     end();
  }
}
