'use strict';
var entities = require('./entities.js');


var PlayScene = {
	//no se si funciona asi	
	create: function () {

		//MARTILLO-------
		this.martillo = new entities.Martillo(this.game, 400, 100,'logo');
		this.martillo.height *= 0.1;
		this.martillo.width *= 0.1;
		this.martillo.body;
		this.game.world.addChild(this.martillo);
		//POPO--------------------------------------
		this._popo = new entities.Popo(this.game, 400, 100,this.martillo, 'spritesGame');
		this._popo.height *= 3;
		this._popo.width *= 3;
		this.game.world.addChild(this._popo);

		//YETI-------------------------------------
		this._yeti = new entities.Yeti(this.game,20,100,'yeti');
		this._yeti.height *= 0.5;
		this._yeti.width *= 0.5;
		this.game.world.addChild(this._yeti);

		//OSO---------------------------------------
		this._oso = new entities.Oso(this.game,10,100,'oso');
		this._oso.height *= 0.5;
		this._oso.width *= 0.5;
		this.game.world.addChild(this._oso);

		this.enemiesGroup = this.game.add.group();
		this.enemiesGroup.add(this._yeti);
		this.enemiesGroup.add(this._oso);

		this.configure();	       
	},
	update: function(){
		this.game.physics.arcade.collide(this._popo, this.groundLayer);
		//this.game.physics.arcade.collide(this._oso, this.groundLayer);
		this.game.physics.arcade.collide(this.enemiesGroup, this.groundLayer);
		this._popo.update();
		this.collision();
		//this.game.physics.arcade.collide(this.martillo, this.mapa, this.hitTile, null, this)
		//this.mapa.setTileIndexCallback(0, this.hitTile, this.groundLayer);
		//this.mapa.setTileLocationCallback(2, 0, 1, 1, this.hitTile, this);


	},
	render : function(){
		this.game.debug.bodyInfo(this._popo, 32, 32);

		this.game.debug.body(this._popo);
		this.game.debug.body(this.martillo);
		this.game.debug.body(this._oso);
		this.game.debug.body(this._yeti);


	},
	collision: function(){
		if (this.game.physics.arcade.collide(this.martillo, this.enemiesGroup)){
			this.mataEnemigo();
		}
		/*if (this.game.physics.arcade.collide(this.martillo, this._oso)){
			this.mataEnemigo();
		}*/
		if (this.game.physics.arcade.collide(this._popo, this.enemiesGroup))//} || this.game.physics.arcade.collide(this._popo, this._oso))
		{
			this._popo.morir();
		}
	},
	configure: function(){
		//Start the Arcade Physics system
		//this.game.world.setBounds(0,0, 2560 , 800);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 600;  
		this.cursors = this.game.input.keyboard.createCursorKeys();
		//MARTILLO------------------------
		this.game.physics.arcade.enable(this.martillo);
		this.martillo.body.allowGravity = false;
		//POPO----------------------------
		this.game.physics.arcade.enable(this._popo);        
		this._popo.body.collideWorldBounds = true;
		this.game.camera.follow(this._popo);

		//YETI----------------------------
		this.game.physics.arcade.enable(this._yeti);        
		this._yeti.body.collideWorldBounds = true;

		//OSO----------------------------
		this.game.physics.arcade.enable(this._oso);        
		this._oso.body.collideWorldBounds = true;

		this.map = this.game.add.tilemap('mapa');
		this.map.addTilesetImage('ice-suelo','patron');
		this.groundLayer = this.map.createLayer('Capa de Patrones 1');
		this.map.setCollisionBetween(0,1);// true, 'Capa de Patrones 1');
 		this.groundLayer.resizeWorld();
 		this.martillo.kill();
	},

	mataEnemigo: function(){
		this.self = this;
		this.enemiesGroup.forEach(function(obj)
		{
      if(self.game.physics.arcade.collide(self._popo, this.obj)){
          	self.obj.destroy();
          //self._keys++;}
      }
    })
	}
};

module.exports = PlayScene;


