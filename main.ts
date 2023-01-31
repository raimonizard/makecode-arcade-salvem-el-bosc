controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    mySprite.sayText("Som-hi!!", 500, true)
})
sprites.on_fire_created(function on_fire_created(location: tiles.Location) {
    scene.createParticleEffectAtLocation(location, effects.fire)
    sprites.set_flame_strength(location, randint(15, 25))
    music.knock.play()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(mySprite, assets.animation`
            Fire Plane 2 Left Animation 1
        `, 300, true)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(mySprite, assets.animation`
            Fire Plane 2 Right Animation
        `, 300, true)
})
function init() {
    game.set_dryness_of_grass(randint(2, 4))
    game.set_strength_of_wind(randint(2, 4))
    game.set_health_of_trees(randint(4, 9))
    hud.forest_hud_healthy(7)
    hud.forest_hud_burned(2)
    hud.danger_hud_label("Risc d'incendi")
    hud.fire_hud_label("Focs:")
    hud.forest_hud_label("Salut del bosc")
    hud.fire_hud(true)
    hud.danger_hud(true)
    hud.forest_hud(true)
}

sprites.on_fire_destroyed(function on_fire_destroyed(location2: tiles.Location) {
    scene.clearParticleEffectsAtLocation(location2)
    tiles.setTileAt(location2, assets.tile`
        burnt tree
    `)
    music.thump.play()
})
info.onLifeZero(function on_life_zero() {
    game.gameOver(false)
    game.setGameOverMessage(false, "S'ha cremat tot!!!")
})
game.onGameOver(function on_game_over(win: boolean) {
    game.gameOver(false)
    game.setGameOverMessage(false, "S'ha cremat tot!!!")
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function on_a_repeated() {
    sprites.spray(mySprite, assets.image`
        water
    `)
    music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
scene.onOverlapTile(SpriteKind.Water, assets.tile`
        tree fire
    `, function on_overlap_tile(sprite: Sprite, location3: tiles.Location) {
    sprite.destroy(effects.ashes, 500)
    sprites.change_flame_strength_by(location3, -1)
})
function chooseDifficulty() {
    tiles.setTilemap(tilemap`
                level1
            `)
    game.splash("Benvingut/da bomber/a!")
    
    difficulty = game.askForNumber("Escull la dificultat del bosc (1 o 2)", 1)
    while (difficulty != 1 && difficulty != 2) {
        game.splash("Tria 1 o 2")
        difficulty = game.askForNumber("Escull dificultat (1 o 2)", 1)
    }
}

function choosePlane() {
    game.splash("hola")
}

function selectDifficulty() {
    
    level2 = 0
    game.showLongText("Escull la dificultat", DialogLayout.Full)
    game.showLongText("Puja o baixa amb les flextes", DialogLayout.Bottom)
    game.showLongText("B per acabar", DialogLayout.Bottom)
    while (!controller.B.isPressed()) {
        if (controller.up.isPressed()) {
            level2 += 1
        } else if (controller.down.isPressed()) {
            level2 += 1
        } else {
            game.showLongText("Puja o baixa amb les flextes", DialogLayout.Bottom)
        }
        
        pause(2000)
    }
}

let level2 = 0
let difficulty = 1
let mySprite : Sprite = null
chooseDifficulty()
if (difficulty == 1) {
    tiles.setTilemap(tilemap`
            level1
        `)
} else {
    tiles.setTilemap(tilemap`
            level2
        `)
}

mySprite = sprites.create(assets.image`
        Fire Plane 2 Right
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
game.showLongText("Mou l'avió amb el cursor", DialogLayout.Bottom)
music.play(music.stringPlayable("B G B G B G B G ", 120), music.PlaybackMode.LoopingInBackground)
game.showLongText("Prem A per tirar aigua", DialogLayout.Top)
init()
for (let index = 0; index < randint(5, 20); index++) {
    sprites.create_spreading_fire(assets.tile`
            tree
        `, assets.tile`
            tree fire
        `)
}
game.onUpdate(function on_on_update() {
    sprites.random_spread()
})
forever(function on_forever() {
    if (info.life() < 3) {
        mySprite.sayText("Afanya't!!", 500, true)
    }
    
})
statusbars.onZero(StatusBarKind.Health, function on_zero(status: StatusBarSprite) {
    
})
statusbars.onDisplayUpdated(StatusBarKind.Health, function on_display_updated(status: StatusBarSprite, image: Image) {
    
})
