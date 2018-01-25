'use strict';

var PlayScene = require('./play_scene.js');
var MenuPrincipal = require('./menu_principal.js');
var Creditos = require('./creditos.js');
var GameOver = require('./game_over.js');
//var unique = require ('unique');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
//Imágenes menú pcpal
    this.game.load.image('creditosBTN', 'images/credits.png');
    this.game.load.image('playBTN', 'images/play.png'); 
    this.game.load.image('icestart', 'images/titleCompleted.png');
    this.game.load.image('martilloMenu', 'images/martilloMenu.png');
  //Imágenes pausa juego
    this.game.load.image('menuBTN', 'images/MainMenu.png');
    this.game.load.image('resumeBTN', 'images/resume.png');
    this.game.load.image('resetBTN', 'images/reset.png');

  //Imagenes personajes
    this.game.load.image('berenjena', 'images/berenjena.png');


    this.game.load.spritesheet('oso', 'images/SpritesJson/oso.png', 17.5, 31, 6);
    this.game.load.spritesheet('personajes', 'images/SpritesJson/Personajes.png', 29.571428571428, 27.076923076923, 200);
    this.game.load.image('vidasPopo', 'images/vida.png');
    
  //Mapa
    this.game.load.tilemap('mapa', 'images/Mapa1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'images/TileSet.png');

  },

  create: function () {
    this.game.state.start('menu_principal');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('menu_principal', MenuPrincipal);
  game.state.add('creditos', Creditos);
  game.state.add('gameOver', GameOver);


  game.state.start('boot');
};
