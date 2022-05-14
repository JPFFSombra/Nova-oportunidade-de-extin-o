var trex,trexCorrendo,trexMorto
var chao,chaoImagem,chaoInvisivel
var nuvem,nuvemImagem
var cacto
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6
var estadoDeJogo = "iniciando"
var grupoCacto, grupoNuvem 
var pontua=0
var novaOportunidadeDeMorrer,novaOportunidadeDeMorrerImagem
var eleMorreu,eleMorreuImagem
var somMario,somFalecido,somDoSalvamentoEmUmLugar



function reiniciar(){
  trex.changeAnimation("correndo",trexCorrendo)
  grupoCacto.destroyEach()
  grupoNuvem.destroyEach()
  estadoDeJogo = "iniciando"
  novaOportunidadeDeMorrer.visible = false
  eleMorreu.visible = false
  pontua = 0
}

function criaCactos(){
  if(frameCount%200===0){
    cacto = createSprite(650,165,10,40)
    cacto.velocityX = -(2+pontua/100)
    cacto.scale = 0.8
    cacto.lifetime = 600

    var tipo = Math.round( random(1,6))
    console.log(tipo)
    switch (tipo){
      case 1: cacto.addImage(cacto1)
        break
      case 2: cacto.addImage(cacto2)
        break
      case 3: cacto.addImage(cacto3)
        break
      case 4: cacto.addImage(cacto4)
        break
      case 5: cacto.addImage(cacto5)
        break
      case 6: cacto.addImage(cacto6)
        break
      default:break
    }

grupoCacto.add(cacto)

  }
}

function criaNuvens (){
if(frameCount%30===0){
  nuvem = createSprite(500,10,20,10)
  nuvem.y = Math.round( random(20,100))
  nuvem.velocityX = -10
  nuvem.addImage(nuvemImagem)
  nuvem.lifetime = 50
trex.depth = nuvem.depth
trex.depth = trex.depth + 1
grupoNuvem.add(nuvem)
}
 
}

// serve para precarregar imagens/animacoes/sons
function preload(){
  trexCorrendo=loadAnimation("trex1.png","trex2.png","trex3.png")
  trexMorto = loadImage("trex_collided.png")
  chaoImagem = loadImage("ground2.png")
  nuvemImagem = loadImage("cloud.png")
  cacto1 = loadImage("obstacle1.png")
  cacto2 = loadImage("obstacle2.png")
  cacto3 = loadImage("obstacle3.png")
  cacto4 = loadImage("obstacle4.png")
  cacto5 = loadImage("obstacle5.png")
  cacto6 = loadImage("obstacle6.png")
  eleMorreuImagem = loadImage("gameOver.png")
  novaOportunidadeDeMorrerImagem = loadImage("restart.png")
somMario = loadSound("jump.mp3")
somFalecido = loadSound("die.mp3")
somDoSalvamentoEmUmLugar = loadSound("checkPoint.mp3")
}

// serve pra fazer a configuracao inicial (só é executada 1 vez quando o jogo começar)
function setup() {
  createCanvas(600,200)

  trex=createSprite(50,160,20,40)
  trex.addAnimation("correndo",trexCorrendo)
  trex.addAnimation("falecido",trexMorto)
  trex.scale = 0.9

  chao = createSprite(300,190,600,20)
  chao.addImage(chaoImagem)

  chaoInvisivel = createSprite(300,200,600,13)
  chaoInvisivel.visible = false

 grupoCacto = new Group()
 grupoNuvem = new Group()

 eleMorreu = createSprite(300,50)
 eleMorreu.addImage(eleMorreuImagem)
 eleMorreu.visible = false
 
 novaOportunidadeDeMorrer = createSprite(300,100)
 novaOportunidadeDeMorrer.addImage(novaOportunidadeDeMorrerImagem)
 novaOportunidadeDeMorrer.visible = false
}

// serve para fazer o jogo funcionar o tempo todo (é executada o tempo todo, infinitamente até eu parar o jogo)
function draw() {
  background("white")
text("Pontinhos: "+pontua,450,30)

if (estadoDeJogo==="iniciando") {
  pontua=pontua+Math.round(frameRate()/60)
  if ((keyDown("space") || touches.length>0 ) && trex.y > 100) {
    trex.velocityY=-10
    somMario.play() 
    touches=[]    
  }
  trex.velocityY=trex.velocityY+0.5
  chao.velocityX = -(2+3*pontua/100)
  criaNuvens()
  criaCactos()
if(pontua%100===0){
somDoSalvamentoEmUmLugar.play()
}

if (trex.isTouching(grupoCacto)) {
  somFalecido.play()
estadoDeJogo = "supera"
trex.changeAnimation("falecido",trexMorto)
eleMorreu.visible = true
novaOportunidadeDeMorrer.visible = true
}

} else  if(estadoDeJogo==="supera") {
  chao.velocityX = 0
  grupoCacto.setVelocityXEach(0)
  grupoNuvem.setVelocityXEach(0)
  grupoCacto.setLifetimeEach(-1)
  grupoNuvem.setLifetimeEach(-1)
  if(mousePressedOver(novaOportunidadeDeMorrer)|| touches.length>0){
  reiniciar()
  touches=[]
  }

}


    
  

  trex.collide(chaoInvisivel)
 

  if (chao.x<0) {
    chao.x = chao.width/2
  }

drawSprites() 
}