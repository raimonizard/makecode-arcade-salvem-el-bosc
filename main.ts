namespace SpriteKind {
    export const button = SpriteKind.create()
    export const cursor = SpriteKind.create()
}

controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    if (settingLevel != 1) {
        mySprite.sayText("Som-hi!!", 500, true)
    }
    
})
sprites.on_fire_created(function on_fire_created(location: tiles.Location) {
    scene.createParticleEffectAtLocation(location, effects.fire)
    sprites.set_flame_strength(location, randint(15, 25))
    music.knock.play()
})
function chooseDifficulty1() {
    
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

controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(mySprite, assets.animation`
            Fire Plane 2 Left Animation 1
        `, 300, true)
})
sprites.onOverlap(SpriteKind.cursor, SpriteKind.button, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    
    if (settingLevel == 1) {
        if (otherSprite == bforestA && controller.A.isPressed()) {
            difficulty = 1
            chooseDifficulty2()
        }
        
        if (otherSprite == bforestB && controller.A.isPressed()) {
            difficulty = 1
            chooseDifficulty2()
        }
        
    }
    
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(mySprite, assets.animation`
            Fire Plane 2 Right Animation
        `, 300, true)
})
function choosePlane() {
    game.splash("hola")
}

function chooseDifficulty0() {
    
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
controller.A.onEvent(ControllerButtonEvent.Repeated, function on_a_repeated() {
    if (settingLevel != 1) {
        sprites.spray(mySprite, assets.image`
            water
        `)
        music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    
})
scene.onOverlapTile(SpriteKind.Water, assets.tile`
        tree fire
    `, function on_overlap_tile(sprite2: Sprite, location3: tiles.Location) {
    sprite2.destroy(effects.ashes, 500)
    sprites.change_flame_strength_by(location3, -1)
})
function chooseDifficulty2() {
    
    tiles.setTilemap(tilemap`
        level1
    `)
    if (settingLevel == 1) {
        game.splash("Benvingut/da bomber/a!", "Escull el bosc A o el bosc B")
        bforestA = sprites.create(assets.image`
            buttonA
        `, SpriteKind.button)
        bforestB = sprites.create(assets.image`
            buttonB
        `, SpriteKind.button)
        bforestA.setPosition(25, 80)
        bforestB.setPosition(125, 80)
        cursor2 = sprites.create(assets.image`
                Fire Plane 2 Left
            `, SpriteKind.cursor)
        cursor2.setPosition(70, 80)
        controller.moveSprite(cursor2)
    }
    
    if (difficulty > 0) {
        settingLevel = 0
        sprites.destroy(bforestA)
        sprites.destroy(bforestB)
        sprites.destroy(cursor2)
        start_game()
    }
    
}

function start_game() {
    game.splash(difficulty)
    if (difficulty == 1) {
        tiles.setTilemap(tilemap`
            level1
        `)
    } else {
        tiles.setTilemap(tilemap`
            level2
        `)
    }
    
    let mySprite = sprites.create(assets.image`
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
}

game.onUpdate(function on_on_update() {
    sprites.random_spread()
})
let cursor2 : Sprite = null
let level2 = 0
let bforestB : Sprite = null
let bforestA : Sprite = null
let mySprite : Sprite = null
let settingLevel = 1
let difficulty = 0
chooseDifficulty2()
