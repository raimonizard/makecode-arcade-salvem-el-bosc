namespace SpriteKind {
    export const button = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (settingLevel != 1) {
        firePlane.sayText("Som-hi!!", 500, true)
    }
})
function chooseLevel () {
    tiles.setTilemap(tilemap`level1`)
    music.play(music.stringPlayable("F G F A - F A G ", 130), music.PlaybackMode.LoopingInBackground)
    if (settingLevel == 1 && difficulty == 0) {
        game.splash("Benvingut/da bomber/a!")
        game.splash("Escull el bosc petit", "o el bosc gran")
        game.showLongText("Mou l'avió amb el cursor", DialogLayout.Bottom)
        bforestA = sprites.create(assets.image`buttonA`, SpriteKind.button)
        bforestB = sprites.create(assets.image`buttonB`, SpriteKind.button)
        bforestA.setPosition(30, 75)
        bforestB.setPosition(130, 70)
        firePlane = sprites.create(assets.image`Fire Plane 2 Left`, SpriteKind.Player)
        firePlane.setPosition(85, 70)
        firePlane.setBounceOnWall(true)
        firePlane.setStayInScreen(true)
        controller.moveSprite(firePlane)
    }
    if (difficulty > 0) {
        settingLevel = 0
        sprites.destroy(bforestA)
        sprites.destroy(bforestB)
        sprites.destroy(firePlane)
        music.stopAllSounds()
        start_game()
    }
}
// ################################################
function init_config () {
    if (difficulty == 1) {
        game.splash("Bosc petit")
        tiles.setTilemap(tilemap`level1`)
        game.set_dryness_of_grass(randint(1, 3))
        game.set_strength_of_wind(randint(1, 3))
        game.set_health_of_trees(randint(5, 9))
    } else if (difficulty == 2) {
        game.splash("Bosc gran")
        tiles.setTilemap(tilemap`level2`)
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
sprites.on_fire_created(function (location) {
    scene.createParticleEffectAtLocation(location, effects.fire)
    sprites.set_flame_strength(location, randint(15, 25))
    music.knock.play()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    firePlane,
    assets.animation`Fire Plane 2 Left Animation 1`,
    300,
    true
    )
})
function start_game () {
    firePlane = sprites.create(assets.image`Fire Plane 2 Right`, SpriteKind.Player)
    firePlane.setBounceOnWall(false)
    controller.moveSprite(firePlane)
    scene.cameraFollowSprite(firePlane)
    init_config()
    music.play(music.stringPlayable("B G B G B G B G ", 120), music.PlaybackMode.LoopingInBackground)
    game.showLongText("Prem A per tirar aigua", DialogLayout.Top)
    for (let index = 0; index < randint(4, 10); index++) {
        sprites.create_spreading_fire(assets.tile`tree`, assets.tile`tree fire`)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    firePlane,
    assets.animation`Fire Plane 2 Right Animation`,
    300,
    true
    )
})
sprites.on_fire_destroyed(function (location2) {
    scene.clearParticleEffectsAtLocation(location2)
    tiles.setTileAt(location2, assets.tile`burnt tree`)
    music.thump.play()
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverMessage(false, "S'ha cremat tot!!!")
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    if (settingLevel != 1) {
        sprites.spray(firePlane, assets.image`water`)
        music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
})
scene.onOverlapTile(SpriteKind.Water, assets.tile`tree fire`, function (sprite2, location3) {
    sprite2.destroy(effects.ashes, 500)
    sprites.change_flame_strength_by(location3, -1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.button, function (sprite, otherSprite) {
    if (settingLevel == 1) {
        otherSprite.startEffect(effects.halo, 1000)
        firePlane.sayText("A per confirmar")
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
let bforestB: Sprite = null
let bforestA: Sprite = null
let difficulty = 0
let firePlane: Sprite = null
let settingLevel = 0
let level2 = 0
settingLevel = 1
chooseLevel()
game.onUpdate(function () {
    sprites.random_spread()
})
