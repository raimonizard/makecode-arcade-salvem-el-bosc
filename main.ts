controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.sayText("Som-hi!!", 500, true)
})
sprites.on_fire_created(function (location) {
    scene.createParticleEffectAtLocation(location, effects.fire)
    sprites.set_flame_strength(location, 20)
    music.knock.play()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`Fire Plane 2 Left Animation`,
    700,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`Fire Plane 2 Right Animation`,
    700,
    true
    )
})
function init () {
    hud.forest_hud_healthy(7)
    hud.forest_hud_burned(2)
    hud.danger_hud_label("Risc d'incendi")
    hud.fire_hud_label("Focs:")
    hud.forest_hud_label("Salut del bosc")
    hud.fire_hud(true)
    hud.danger_hud(true)
    hud.forest_hud(true)
}
sprites.on_fire_destroyed(function (location2) {
    scene.clearParticleEffectsAtLocation(location2)
    tiles.setTileAt(location2, assets.tile`burnt tree`)
    music.thump.play()
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    sprites.spray(mySprite, assets.image`water`)
    music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
scene.onOverlapTile(SpriteKind.Water, assets.tile`tree fire`, function (sprite, location3) {
    sprite.destroy(effects.ashes, 500)
    sprites.change_flame_strength_by(location3, -1)
})
function selectDifficulty () {
    level2 = 0
    game.showLongText("Escull la dificultat", DialogLayout.Full)
    game.showLongText("Puja o baixa amb les flextes", DialogLayout.Bottom)
    game.showLongText("B per acabar", DialogLayout.Bottom)
    while (!(controller.B.isPressed())) {
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
let mySprite: Sprite = null
game.set_dryness_of_grass(randint(1, 4))
game.set_strength_of_wind(randint(1, 4))
game.set_health_of_trees(randint(5, 8))
tiles.setTilemap(tilemap`level1`)
mySprite = sprites.create(assets.image`Fire Plane 2 Right`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
for (let index = 0; index < 4; index++) {
    sprites.create_spreading_fire(assets.tile`tree`, assets.tile`tree fire`)
}
init()
music.play(music.stringPlayable("B G B G B G B G ", 120), music.PlaybackMode.LoopingInBackground)
game.onUpdate(function () {
    sprites.random_spread()
})
