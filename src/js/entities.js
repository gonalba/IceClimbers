'use strict';

//OBJETO-----------------------------------------------------
function Objeto (game,x,y,graphic){
	Phaser.Sprite.call(this, game, x, y, graphic);
};

Objeto.prototype = Object.create(Phaser.Sprite.prototype);
Objeto.prototype.constructor = Objeto;

//MOVIBLE---------------------------------------------------------------
// MOVABLE TIENE VELOCIDAD, DIRECCION Y UN METODO QUE HACE QUE SE MUEVA EL PERSONAJE
function Movable (game, x, y, graphic){
 	this._velocity = 1;
 	this._direction = 1;
 	Objeto.call(this, game, x, y, graphic);
  
};
Movable.prototype = Object.create(Objeto.prototype);
Movable.prototype.constructor = Movable;
// METODO QUE HACE QUE SE MUEVA EL OBJETO
Movable.prototype.move = function(){
	//USO this.x EN VEZ DE this.body.velocity.x PORQUE CON EL SEGUNDO SE MUEVE CON ACELERACION
	this.x += this._velocity * this._direction;
//Toroide	
	/*if(this.x > this.game.width - this.width-30)
		this.x = 2;
	else if(this.x < 1)
		this.x = this.game.width - this.width-30;
/*lado a lado*/
	if(this.x > this.game.width - this.width -30)
		this._direction = -1;
	else if(this.x < 1)
		this._direction = 1;
};


//MARTILLO-------------------------------------------------------------------------------
//PREGUNTAR A CARLOS COMO IMPLEMENTAR EL ATAQUE DEL MARTILLO
function Martillo (game, x, y, graphic){
 	Objeto.call(this, game, x, y, graphic);
 	this.xInit = x;
 	this.yInit = y;
};
Martillo.prototype = Object.create(Objeto.prototype);
Martillo.prototype.constructor = Martillo;
Martillo.prototype.setPosInit = function(){
	this.x = this.xInit;
	this.y = this.yInit;
};
Martillo.prototype.setPosIzq = function(){
	this.x = -10;
	this.y = 10;
}
Martillo.prototype.setPosDer = function(){
	this.x = 25;
	this.y = 10;
}
Martillo.prototype.setPosJump = function(){
	this.x = 7;
	this.y = -10;
}

//POPO-----------------------------------------------------------------------------------
// EN EL MÉTODO UPDATE SE IMPLEMENTA LA LÓGICA DEL MOVIMIENTO
// EN FUNCION DE LAS TECLAS QUE SE PULSEN
function Popo (game, x, y, martillo, graphic){
	Movable.call(this, game, x, y, graphic);
	this._cursors = game.input.keyboard.createCursorKeys();
	this._jumpPower = -500;
 	this.atacando = false;
 	this.tiempo;
 	this.vivo = true;
 	this.vidas = 4;
 	this._velocity = 5;
 	this.martillo = martillo;
	
	this.MoveLeftPopo = this.animations.add('MoveLeftPopo',[0,1,2,3]);
	this.MoveRightPopo = this.animations.add('MoveRightPopo',[4,5,6,7]);
	this.JumpLeftPopo = this.animations.add('JumpLeftPopo',[10,8,9]);
	this.JumpRightPopo = this.animations.add('JumpRightPopo',[13,15,14]);
};
Popo.prototype = Object.create(Movable.prototype);
Popo.prototype.constructor = Popo;

Popo.prototype.update = function(){
	if(this.vivo){
		this.keyboardInput();
	}
	else{
		if(this.vidas > 0){
			this.resetPopo();
		}
	}
	this.game.debug.text('Vidas: ' + this.vidas, 0, 600);
};

//EN ESTE METODO SE CAPTURAN LAS TECLAS QUE SE PULSAN Y SE REALIZA LA FUNCION CORRESPONDIENTE
Popo.prototype.keyboardInput = function(){
	
	if(this._cursors.down.isDown&&this.body.onFloor()){
		this.atacando = true;
		if(this._direction === -1){
			this.play('JumpLeftPopo', 10);					
			this.martillo.setPosIzq();
  			this.JumpLeftPopo.onComplete.add(this.martillo.setPosInit,this.martillo);
  			this.JumpLeftPopo.onComplete.add(this.atacandoOff,this);
		}
		else if(this._direction === 1){
			this.play('JumpRightPopo', 10);
			this.martillo.setPosDer();
  			this.JumpRightPopo.onComplete.add(this.martillo.setPosInit,this.martillo);
  			this.JumpRightPopo.onComplete.add(this.atacandoOff,this);
		}
	}
	//SALTO-------------------------------------
  	else if (this._cursors.up.isDown&&this.body.onFloor()){
  		if(!this.atacando){
	 		this.jump();
			this.martillo.setPosJump();
			if(this._direction === -1){
				this.play('JumpLeftPopo', 10);
  				this.JumpLeftPopo.onComplete.add(this.martillo.setPosInit,this.martillo);
			}
			else if(this._direction === 1){
				this.play('JumpRightPopo', 10);
  				this.JumpRightPopo.onComplete.add(this.martillo.setPosInit,this.martillo);			
			}
		}
  	}
	//TECLAS MOVIMIENTO-------------------------
	else if (this._cursors.left.isDown){
		if(!this.atacando){
			//this.martillo.setPosInit();
			this._direction = -1;
			this.move();
			if(this.body.onFloor()){
				this.play('MoveLeftPopo',20);					
			}
		}
	}
	else if (this._cursors.right.isDown){
  		if(!this.atacando){
  			//this.martillo.setPosInit();
  			this._direction = 1
	 			this.move();
	 			if(this.body.onFloor()){
					this.play('MoveRightPopo',20);
			}
  		}
	}else{
		if(this._direction === 1&&this.body.onFloor()&&!this.atacando)
			this.frame = 4;
		else if(this._direction === -1&&this.body.onFloor()&&!this.atacando)
			this.frame = 3;
	}
	
};
//METODO DE SALTO
Popo.prototype.jump = function(){
	this.body.velocity.y = this._jumpPower;
};
//metodo morir
Popo.prototype.morir = function (){
	if (this.vivo){
		this.vivo = false;
		this.vidas--;
		this.kill();
		//this.body.enable = false;
		this.tiempo =  this.game.time.totalElapsedSeconds();
	}
	
};
//método para volver a crear a popo
Popo.prototype.resetPopo = function(){
	if(!this.vivo){
		if( this.game.time.totalElapsedSeconds() >= this.tiempo + 2)
		{
			this.reset(50, 50);
			this.vivo = true;

		}
	}
};
Popo.prototype.killMartillo = function(){
	this.martillo.kill();
};
Popo.prototype.atacandoOff = function(){
	this.atacando = false;
};

//YETI--------------------------------------------------------------------------------------
function Yeti(game, x, y,  graphic,muerto){
	Movable.call(this, game, x, y, graphic);
	this.MoveLeftYeti = this.animations.add('MoveRightYeti',[0,1,2]);
	this.MoveRightYeti = this.animations.add('MoveLeftYeti',[3,4,5]);
	this.muerto = game.add.sprite(0,0,muerto);
	this.MuertoYeti = this.muerto.animations.add('MuertoYeti',[0,1]);
};
Yeti.prototype = Object.create(Movable.prototype);
Yeti.prototype.constructor = Yeti;

Yeti.prototype.update = function(){
	this.move();
	if(this._direction == 1)
		this.play('MoveRightYeti',15);
	else if (this._direction == -1)
		this.play('MoveLeftYeti',15);
};

Yeti.prototype.morir = function (){
	this.play('MuertoYeti',15);
};


//OSO--------------------------------------------------------------------------------------
function Oso(game, x, y, graphic){
	Movable.call(this, game, x, y, graphic);
	this.MoveLeftOso = this.animations.add('MoveRightOso',[0,1,2]);
	this.MoveRightOso = this.animations.add('MoveLeftOso',[3,4,5]);
};
Oso.prototype = Object.create(Movable.prototype);
Oso.prototype.constructor = Yeti;

Oso.prototype.update = function(){
	this.move();
	if(this._direction == 1)
		this.play('MoveRightOso',15);
	else if (this._direction == -1)
		this.play('MoveLeftOso',15);
};

Oso.prototype.morir = function (){};

module.exports = {
	Popo: Popo,
	Yeti: Yeti,
	Oso: Oso,
	Martillo: Martillo
};