var trex,trexCorrendo
var chao,chaoImagem,chaoInvisivel
var nuvem,nuvemImagem

function criaNuvens (){

  nuvem = createSprite(500,10,20,10)
  nuvem.velocityX = -10
  nuvem.addImage(nuvemImagem)
}

// serve para precarregar imagens/animacoes/sons
function preload(){
  trexCorrendo=loadAnimation("trex1.png","trex2.png","trex3.png")
  chaoImagem = loadImage("ground2.png")
  nuvemImagem = loadImage("cloud.png")
}

// serve pra fazer a configuracao inicial (só é executada 1 vez quando o jogo começar)
function setup() {
  createCanvas(600,200)

  trex=createSprite(50,160,20,40)
  trex.addAnimation("correndo",trexCorrendo)

  chao = createSprite(300,190,600,20)
  chao.addImage(chaoImagem)

  chaoInvisivel = createSprite(300,200,600,13)
  chaoInvisivel.visible = false

 
}

// serve para fazer o jogo funcionar o tempo todo (é executada o tempo todo, infinitamente até eu parar o jogo)
function draw() {
  background("white")
  console.log("jombra")
  if (keyDown("space") && trex.y > 100) {
    trex.velocityY=-10     
  }  
  trex.velocityY=trex.velocityY+0.5

  trex.collide(chaoInvisivel)
  chao.velocityX = -2

  if (chao.x<0) {
    chao.x = chao.width/2
  }

  criaNuvens()

  drawSprites() 
}