namespace SpriteKind {
    export const button = SpriteKind.create()
    export const monkey = SpriteKind.create()
}

controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    if (settingLevel != 1) {
        firePlane.sayText("Som-hi!!", 500, true)
    }
    
})
function chooseLevel() {
    
    tiles.setTilemap(tilemap`
        level1
    `)
    music.play(music.stringPlayable("F G F A - F A G ", 130), music.PlaybackMode.LoopingInBackground)
    if (settingLevel == 1 && difficulty == 0) {
        game.splash("Benvingut/da bomber/a!")
        game.splash("Escull el bosc petit", "o el bosc gran")
        game.showLongText("Mou l'avió amb el cursor", DialogLayout.Bottom)
        bforestA = sprites.create(assets.image`
            forestA
        `, SpriteKind.button)
        bforestB = sprites.create(assets.image`
            forestB
        `, SpriteKind.button)
        bforestA.setPosition(30, 75)
        bforestB.setPosition(130, 70)
        firePlane = sprites.create(assets.image`
                Fire Plane 2 Left
            `, SpriteKind.Player)
        firePlane.setPosition(85, 70)
        firePlane.setBounceOnWall(true)
        firePlane.setStayInScreen(true)
        controller.moveSprite(firePlane)
    }
    
    if (difficulty > 0) {
        settingLevel = 0
        sprites.destroy(bforestA)
        sprites.destroy(bforestB)
        music.stopAllSounds()
        start_game()
    }
    
}

sprites.onOverlap(SpriteKind.monkey, SpriteKind.button, function on_on_overlap(sprite3: Sprite, otherSprite2: Sprite) {
    
    let red_plane : Sprite = null
    let monkey3 : Sprite = null
    otherSprite2.startEffect(effects.halo, 1000)
    monkey3.sayText("A per confirmar", 1000, false)
    if (otherSprite2 == red_plane && controller.A.isPressed()) {
        firePlane.setImage(assets.image`
            Fire Plane 2 Right
        `)
        effects.clearParticles(otherSprite2)
        choosePlane()
    } else if (otherSprite2 == bforestB && controller.A.isPressed()) {
        difficulty = 2
        effects.clearParticles(otherSprite2)
        choosePlane()
    }
    
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (settingLevel != 1) {
        sprites.spray(firePlane, assets.image`
            water
        `)
        music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    
})
//  ################################################
function init_config() {
    if (difficulty == 1) {
        game.splash("Bosc petit")
        tiles.setTilemap(tilemap`
            level1
        `)
        game.set_dryness_of_grass(randint(1, 3))
        game.set_strength_of_wind(randint(1, 3))
        game.set_health_of_trees(randint(5, 9))
    } else if (difficulty == 2) {
        game.splash("Bosc gran")
        tiles.setTilemap(tilemap`
            level2
        `)
        game.set_dryness_of_grass(randint(2, 4))
        game.set_strength_of_wind(randint(2, 4))
        game.set_health_of_trees(randint(4, 9))
    }
    
    hud.danger_hud_label("Risc d'incendi")
    hud.danger_hud(true)
    hud.fire_hud_label("Focs:")
    hud.fire_hud(true)
    hud.forest_hud_label("Salut del bosc")
    hud.forest_hud_healthy(7)
    hud.forest_hud_burned(2)
    hud.forest_hud(true)
}

sprites.on_fire_created(function on_fire_created(location: tiles.Location) {
    scene.createParticleEffectAtLocation(location, effects.fire)
    sprites.set_flame_strength(location, randint(15, 25))
    music.knock.play()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    if (settingLevel != 1) {
        animation.runImageAnimation(firePlane, assets.animation`
                Fire Plane 2 Left Animation 1
            `, 300, true)
    }
    
})
function start_game() {
    
    firePlane = sprites.create(assets.image`
            Fire Plane 2 Right
        `, SpriteKind.Player)
    firePlane.setBounceOnWall(false)
    controller.moveSprite(firePlane)
    scene.cameraFollowSprite(firePlane)
    init_config()
    music.play(music.stringPlayable("B G B G B G B G ", 120), music.PlaybackMode.LoopingInBackground)
    game.showLongText("Prem A per tirar aigua", DialogLayout.Top)
    for (let index = 0; index < randint(4, 10); index++) {
        sprites.create_spreading_fire(assets.tile`
                tree
            `, assets.tile`
                tree fire
            `)
    }
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    if (settingLevel != 1) {
        animation.runImageAnimation(firePlane, assets.animation`
                Fire Plane 2 Right Animation
            `, 300, true)
    }
    
})
function choosePlane() {
    
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`
        airport
    `)
    music.play(music.stringPlayable("B A A B B C5 C5 B ", 130), music.PlaybackMode.LoopingInBackground)
    game.splash("Escull avió")
    let redplane = sprites.create(assets.image`
            Fire Plane 2 Right
        `, SpriteKind.button)
    redplane.setPosition(50, 20)
    let ryanairplane = sprites.create(assets.image`
        ryanair
    `, SpriteKind.button)
    ryanairplane.setPosition(75, 52)
    let vuelingplane = sprites.create(assets.image`
        vuelingair
    `, SpriteKind.button)
    vuelingplane.setPosition(120, 85)
    let aalinesplane = sprites.create(assets.image`
        aalines
    `, SpriteKind.button)
    aalinesplane.setPosition(85, 112)
    let monkey2 = sprites.create(assets.image`
        monkey-player
    `, SpriteKind.monkey)
    monkey2.setPosition(9, 62)
    monkey2.setStayInScreen(true)
    controller.moveSprite(monkey2)
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
        sprites.spray(firePlane, assets.image`
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.button, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    
    if (settingLevel == 1) {
        otherSprite.startEffect(effects.halo, 1000)
        firePlane.sayText("A per confirmar", 1000, false)
        if (otherSprite == bforestA && controller.A.isPressed()) {
            difficulty = 1
            effects.clearParticles(otherSprite)
            chooseLevel()
        } else if (otherSprite == bforestB && controller.A.isPressed()) {
            difficulty = 2
            effects.clearParticles(otherSprite)
            chooseLevel()
        }
        
    }
    
})
let bforestB : Sprite = null
let bforestA : Sprite = null
let difficulty = 0
let firePlane : Sprite = null
let settingLevel = 0
let red_plane : Sprite = null
let ryanair_plane : Sprite = null
let vueling_plane : Sprite = null
let aalines_plane : Sprite = null
let monkey : Sprite = null
settingLevel = 1
choosePlane()
game.onUpdate(function on_on_update() {
    sprites.random_spread()
})
