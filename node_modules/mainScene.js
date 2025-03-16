export default class mainScene extends Phaser.Scene {
    constructor(){
        super('mainScene')
        this.ground;
        this.platform;
        this.door;
        this.cursor;
        this.player;
        this.enemyDirection = 'right';
        this.enemy2Direction = 'right';
        this.enemy3Direction = 'right';
        this.enemy4Direction = 'right';
        this.entDirection = 'right'
        this.mushroomDirection = 'right'
        this.playerHealth = 100;
        this.key;
        this.inventory = [];
        this.inventoryText;

        this.weapon;
        this.poison;
        this.superpoison
        this.havePoition = false;
        this.havesuperPoition = false;
        this.haveweapon = false;
        this.haveKey = false;
    }
    createHealthBar() {
        this.HealthBar = this.add.graphics();
        this.updateHealthBar();
    }
    updateHealthBar() {
        if (this.playerHealth <= 0) {
            this.playerHealth = 0;
        }

        const x = 10;
        const y = 10;
        const width = 200;
        const height = 20;

        this.HealthBar.clear();
        this.HealthBar.fillStyle(0x177245);
        this.HealthBar.fillRect(x, y, width * (this.playerHealth / 100), height);
        this.HealthBar.lineStyle(2, 0x000000);
        this.HealthBar.strokeRect(x, y, width, height);
    }
    handleCollision() {
        this.playerHealth -= 0.01;

        if (this.playerHealth <= 0) {
            this.restartgame();
        }
        this.updateHealthBar();
    }
    brokekey() {
        this.key.clear(true, true)
    }
    restartgame() {
        this.playerHealth = 100;
        this.backgroundMusic.stop();
        this.scene.restart();
    }
    preload(){
        this.load.image('sky', '../../assets/sky.png')
        this.load.image('ground', '../../assets/ground.png')
        this.load.image('poison', '../../assets/poison.png')
        this.load.image('superpoison', '../../assets/superpoison.png')
        this.load.image('key', '../../assets/key.png')
        this.load.image('platform', '../../assets/platform.png')
        this.load.image('door', '../../assets/door.png')
        this.load.image('weapon', '../../assets/weapon.png', {frameWidth: 20, frameHeight: 40} )

        this.load.spritesheet('player', '../../assets/player/player.png', {frameWidth: 32, frameHeight: 34} )
        this.load.spritesheet('enemy', '../../assets/enemy/enemy.png', {frameWidth: 66, frameHeight: 67} )
        this.load.spritesheet('ent', '../../assets/ent/ent.png', {frameWidth: 64, frameHeight: 68} )
        this.load.spritesheet('mushroom', '../../assets/mushroom/mushroom.png', {frameWidth: 128, frameHeight: 134} )
        this.load.audio('backgroundMusic', '../../assets/music.mp3');
        this.load.audio('deadMusic', '../../assets/dead.mp3');
       
    }
    attackEnemy(player, enemy) {
        console.log('attack')

        if (this.cursor.space.isDown) {
            enemy.disableBody(true, true);
            this.deadMusic = this.sound.add('deadMusic');
            this.deadMusic.play({loop: false});
        }
    }
    attackMushroom(player, enemy) {
        if (this.havesuperPoition = true){
        if (this.cursor.space.isDown) {
            enemy.disableBody(true, true);
            this.deadMusic = this.sound.add('deadMusic');
            this.deadMusic.play({loop: false});
        }}
    }
    create(){
        this.backgroundMusic = this.sound.add('backgroundMusic');
        this.backgroundMusic.play({ loop: true});
        this.ground = this.physics.add.staticGroup() //
        this.add.image(400, 300, 'sky')
        this.platform = this.physics.add.staticGroup() //
        this.ground.create(400, 900, 'ground')
        this.platform.create(400, 630, 'platform')
        this.platform.create(700, 530, 'platform')
        this.platform.create(800, 180, 'platform')
        this.platform.create(1050, 180, 'platform')
        this.platform.create(1300, 180, 'platform')
        this.platform.create(1550, 180, 'platform')
        this.platform.create(1800, 180, 'platform')
        this.platform.create(550, 400, 'platform')
        this.door = this.physics.add.staticGroup()
        this.door.create(675, 105, 'door')
        
        this.player = this.physics.add.sprite(100, 450, 'player')
        this.player.setCollideWorldBounds(true)
        this.player.setBounce(0.2)
        this.cursor = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platform)
        this.physics.add.collider(this.player, this.ground)
        this.physics.add.collider(this.player, this.door)
        
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('player', {
                start: 1,
                end:3
            }),
            frameRate: 10,
            repeat: 0 
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
           
        });
        this.anims.create({
            key: 'runent',
            frames: this.anims.generateFrameNumbers('ent', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
           
        });
        this.anims.create({
            key: 'runmushroom',
            frames: this.anims.generateFrameNumbers('mushroom', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
           
        });
        
        this.weapon = this.add.sprite(0,0, 'weapon');
        this.weapon.setVisible(false);

        this.player.weapon = this.weapon;
        this.weapon.setOrigin(0.5, 1);
        this.weapon.setRotation(Phaser.Math.DegToRad(0));

    this.enemy = this.physics.add.sprite(100, 300, 'enemy');
        this.enemy.setCollideWorldBounds(true);
        this.enemy.setBounce(0.2);
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.ground);
        this.anims.create({
            key: 'runEnemy',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 7 }),
            freameRate: 10,
            repeat: -1
    });
    this.ent = this.physics.add.sprite(600, 200, 'ent');
        this.ent.setCollideWorldBounds(true);
        this.ent.setBounce(0.2);
        this.physics.add.collider(this.ent, this.platform);
        this.physics.add.collider(this.ent, this.ground);
    this.mushroom = this.physics.add.sprite(1600, 100, 'mushroom');
        this.mushroom.setCollideWorldBounds(true);
        this.mushroom.setBounce(0.2);
        this.physics.add.collider(this.mushroom, this.platform);
        this.physics.add.collider(this.mushroom, this.door);
        this.physics.add.collider(this.mushroom, this.ground);

    this.enemy2 = this.physics.add.sprite(200, 300, 'enemy');
        this.enemy2.setCollideWorldBounds(true);
        this.enemy2.setBounce(0.2);
        this.physics.add.collider(this.enemy2, this.platform);
        this.physics.add.collider(this.enemy2, this.ground);
       
    this.enemy3 = this.physics.add.sprite(300, 300, 'enemy');
        this.enemy3.setCollideWorldBounds(true);
        this.enemy3.setBounce(0.2);
        this.physics.add.collider(this.enemy3, this.platform);
        this.physics.add.collider(this.enemy3, this.ground);
        
    this.enemy4 = this.physics.add.sprite(400, 300, 'enemy');
        this.enemy4.setCollideWorldBounds(true);
        this.enemy4.setBounce(0.2);
        this.physics.add.collider(this.enemy4, this.platform);
        this.physics.add.collider(this.enemy4, this.ground);
         
    this.createHealthBar()
    this.physics.add.overlap(this.player, this.enemy, this.attackEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemy1, this.attackEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemy2, this.attackEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemy3, this.attackEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemy4, this.attackEnemy, null, this);
    this.physics.add.overlap(this.player, this.mushroom, this.attackMushroom, null, this);
    this.physics.add.overlap(this.player, this.ent, this.attackEnemy, null, this);
    this.poison = this.physics.add.sprite(550, 275, 'poison')
    this.physics.add.collider(this.poison, this.platform);

        this.physics.add.overlap(this.player, this.poison, this.collectItem, null, this);
    this.superpoison = this.physics.add.sprite(1750, 100, 'superpoison')
    this.physics.add.collider(this.superpoison, this.platform);

        this.physics.add.overlap(this.player, this.superpoison, this.collectItem, null, this);
    this.inventoryText = this.add.text(10, 50, 'Inventory:', {
        font: '16px Arial',
        fill: '#ffffff'
    });  
    this.key = this.physics.add.staticGroup()
    this.key.create(1800, 755, 'key')

    this.physics.add.collider(this.key, this.platform);
    this.physics.add.collider(this.key, this.ground);

        this.physics.add.overlap(this.player, this.key, this.collectItem, null, this);
    
    this.scene_weapon = this.physics.add.sprite(350, 275, 'weapon')
    this.physics.add.collider(this.scene_weapon, this.platform);
    
        this.physics.add.overlap(this.player, this.scene_weapon, this.collectItem, null, this);
}
    collectItem(player, item) {
        item.disableBody(true, true);
        this.inventory.push(item.texture.key);
        this.updateInventoryDisplay();
    }
    updateInventoryDisplay() {
        this.inventoryText.setText('Inventory:');
        this.inventory.forEach((item, index) => {
            if (item === 'poison') {
                const itemImage = this.add.image(100+ index * 70, 60, item);
                itemImage.setScale(1);
                this.havePoition = true;
            };
            if (item === 'key'){
                const itemImage = this.add.image(100+ index * 70, 60, item);
                itemImage.setScale(1);
                this.haveKey = true;
                if (this.haveKey == true){
                    this.door.clear(true, true)
                }
            };
            if (item === 'weapon') {
                const itemImage = this.add.image(100+ index * 70, 60, item);
                itemImage.setScale(1);
                this.haveweapon = true;
            };
            if (item === 'superpoison') {
                const itemImage = this.add.image(100+ index * 70, 60, item);
                itemImage.setScale(1);
                this.havesuperPoition = true;
        }})
    }
    update(){
         
        
        if (this.player.flipX === false){
            this.weapon.setPosition(this.player.x+10, this.player.y+8);
            this.weapon.flipX = false
        }
        else{
            this.weapon.setPosition(this.player.x+10, this.player.y+8);
            this.weapon.flipX = true
        }
        this.physics.add.overlap(this.player, this.enemy, this.handleCollision, null, this);
        this.physics.add.overlap(this.player, this.enemy2, this.handleCollision, null, this);
        this.physics.add.overlap(this.player, this.enemy3, this.handleCollision, null, this);
        this.physics.add.overlap(this.player, this.enemy4, this.handleCollision, null, this);
        this.physics.add.overlap(this.player, this.ent, this.handleCollision, null, this);
        if (this.havesuperPoition = false){
            this.physics.add.overlap(this.player, this.mushroom, this.handleCollision, null, this);
        }
        this.physics.add.overlap(this.key, this.enemy, this.brokekey, null, this);
        this.physics.add.overlap(this.key, this.enemy2, this.brokekey, null, this);
        this.physics.add.overlap(this.key, this.enemy3, this.brokekey, null, this);
        this.physics.add.overlap(this.key, this.enemy4, this.brokekey, null, this);
        this.physics.add.overlap(this.key, this.ent, this.brokekey, null, this);
        this.physics.add.overlap(this.key, this.mushroom, this.brokekey, null, this);

        if (this.cursor.left.isDown){
            this.player.setVelocityX(-160)
            this.player.anims.play('run', true);
            this.player.flipX = true;
        }
        else if (this.cursor.right.isDown){
            this.player.setVelocityX(160)
            this.player.anims.play('run', true);
            this.player.flipX = false;
        }
        else {
            this.player.setVelocityX(0)
            this.player.anims.stop('run');
            this.player.setTexture('player', 0);
        }
        if (this.cursor.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-330)
            if (this.havePoition){
                this.player.setVelocityY(-430)
            }
        }
    

    if (this.enemyDirection === 'right') {
        this.enemy.setVelocityX(80);
        this.enemy.flipX = false;
        this.enemy.anims.play('runEnemy', true);
    }else if (this.enemyDirection === 'left') {
        this.enemy.setVelocityX(-80);
        this.enemy.flipX = true;
        this.enemy.anims.play('runEnemy', true)
    }

    if (this.enemy.body.blocked.right) {
        this.enemyDirection = 'left';
    }else if (this.enemy.body.blocked.left) {
        this.enemyDirection = "right";
    }

    if (this.entDirection === 'right') {
        this.ent.setVelocityX(60);
        this.ent.flipX = false;
        this.ent.anims.play('runent', true);
    }else if (this.entDirection === 'left') {
        this.ent.setVelocityX(-60); 
        this.ent.flipX = true;
        this.ent.anims.play('runent', true)
    }

    if (this.ent.body.blocked.right) {
        this.entDirection = 'left';
    }else if (this.ent.body.blocked.left) {
        this.entDirection = "right";
    }

    if (this.mushroomDirection === 'right') {
        this.mushroom.setVelocityX(60);
        this.mushroom.flipX = false;
        this.mushroom.anims.play('runmushroom', true);
    }else if (this.mushroomDirection === 'left') {
        this.mushroom.setVelocityX(-60); 
        this.mushroom.flipX = true;
        this.mushroom.anims.play('runmushroom', true)
    }

    if (this.mushroom.body.blocked.right) {
        this.mushroomDirection = 'left';
    }else if (this.mushroom.body.blocked.left) {
        this.mushroomDirection = "right";
    }



    if (this.enemy2Direction === 'right') {
        this.enemy2.setVelocityX(80);
        this.enemy2.flipX = false;
        this.enemy2.anims.play('runEnemy', true);
    }else if (this.enemy2Direction === 'left') {
        this.enemy2.setVelocityX(-80);
        this.enemy2.flipX = true;
        this.enemy2.anims.play('runEnemy', true)
    }
    if (this.enemy2.body.blocked.right) {
        this.enemy2Direction = 'left';
    }else if (this.enemy2.body.blocked.left) {
        this.enemy2Direction = "right";
    }


    if (this.enemy3Direction === 'right') {
        this.enemy3.setVelocityX(80);
        this.enemy3.flipX = false;
        this.enemy3.anims.play('runEnemy', true);
    }else if (this.enemy3Direction === 'left') {
        this.enemy3.setVelocityX(-80);
        this.enemy3.flipX = true;
        this.enemy3.anims.play('runEnemy', true)
    }

    if (this.enemy3.body.blocked.right) {
        this.enemy3Direction = 'left';
    }else if (this.enemy3.body.blocked.left) {
        this.enemy3Direction = "right";
    }
 

 
    if (this.enemy4Direction === 'right') {
        this.enemy4.setVelocityX(80);
        this.enemy4.flipX = false;
        this.enemy4.anims.play('runEnemy', true);
    }else if (this.enemy4Direction === 'left') {
        this.enemy4.setVelocityX(-80);
        this.enemy4.flipX = true;
        this.enemy4.anims.play('runEnemy', true)
    }

    if (this.enemy4.body.blocked.right) {
        this.enemy4Direction = 'left';
    }else if (this.enemy4.body.blocked.left) {
        this.enemy4Direction = "right";
    }
    if (this.cursor.space.isDown && this.haveweapon == true) {
        this.player.anims.play('attack',true);
        this.weapon.setVisible(true);
        if (this.weapon.flipX == true){
            this.weapon.setRotation(this.weapon.rotation - 0.1);
            const angle = this.weapon.rotation;
 
            if ( angle > 2){
                this.weapon.setRotation(Phaser.Math.DegToRad(0));
            }
        }
        else{
            this.weapon.setRotation(this.weapon.rotation +0.1);
            const angle=this.weapon.rotation;

            if (angle> 2){
                this.weapon.setRotation(Phaser.Math.DegToRad(0));
            }
        }
    }else {
        this.weapon.setVisible(false);
        this.weapon.setRotation(Phaser.Math.DegToRad(0));
    }
}}
