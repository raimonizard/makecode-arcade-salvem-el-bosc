namespace SpriteKind {
    export const button = SpriteKind.create()
    export const monkey_type = SpriteKind.create()
}

controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    if (setting_level != 1) {
        fire_plane.sayText("Som-hi!!", 500, true)
    }
    
})
function choose_level() {
    
    tiles.setTilemap(tilemap`
        level1
    `)
    music.play(music.stringPlayable("F G F A - F A G ", 130), music.PlaybackMode.LoopingInBackground)
    if (setting_level == 1 && chosen_level == 0) {
        game.splash("Benvingut/da pilot!")
        game.splash("Escull el bosc petit", "o el bosc gran")
        game.showLongText("Mou l'avió amb el cursor", DialogLayout.Bottom)
        forest_a = sprites.create(assets.image`
            forestA
        `, SpriteKind.button)
        forest_b = sprites.create(assets.image`
            forestB
        `, SpriteKind.button)
        forest_a.setPosition(30, 75)
        forest_b.setPosition(130, 70)
        fire_plane.setPosition(85, 70)
        fire_plane.setBounceOnWall(true)
        fire_plane.setStayInScreen(true)
        controller.moveSprite(fire_plane)
    }
    
    if (chosen_level > 0) {
        setting_level = 0
        sprites.destroy(forest_a)
        sprites.destroy(forest_b)
        music.stopAllSounds()
        start_game()
    }
    
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (setting_level != 1) {
        sprites.spray(fire_plane, assets.image`
            water
        `)
        music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    
})
//  ################INIT-CONFIG################################
function init_config() {
    if (chosen_level == 1) {
        game.splash("Bosc petit")
        tiles.setTilemap(tilemap`
            level1
        `)
        game.set_dryness_of_grass(randint(2, 4))
        game.set_strength_of_wind(randint(2, 4))
        game.set_health_of_trees(randint(5, 9))
    } else if (chosen_level == 2) {
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
    if (setting_plane == 1) {
        animation.runImageAnimation(monkey, assets.animation`
                monkey_left
            `, 300, true)
    } else if (chosen_plane == 1) {
        animation.runImageAnimation(fire_plane, assets.animation`
                    red_plane_left
                `, 300, true)
    } else if (chosen_plane == 2) {
        animation.runImageAnimation(fire_plane, assets.animation`
                    ryanair_left
                `, 300, true)
    } else if (chosen_plane == 3) {
        animation.runImageAnimation(fire_plane, assets.animation`
                    vueling_left
                `, 300, true)
    } else if (chosen_plane == 4) {
        animation.runImageAnimation(fire_plane, assets.animation`
                    aalines_left
                `, 300, true)
    }
    
})
function start_game() {
    
    fire_plane.setBounceOnWall(false)
    controller.moveSprite(fire_plane)
    scene.cameraFollowSprite(fire_plane)
    init_config()
    music.play(music.stringPlayable("B G B G B G B G ", 120), music.PlaybackMode.LoopingInBackground)
    game.showLongText("Prem A per tirar aigua", DialogLayout.Top)
    for (let index = 0; index < randint(4, 10); index++) {
        if (chosen_level == 1 && index % 2 == 0) {
            continue
        } else {
            sprites.create_spreading_fire(assets.tile`
                tree
            `, assets.tile`
                tree fire
            `)
        }
        
    }
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    if (setting_plane == 1) {
        animation.runImageAnimation(monkey, assets.animation`
                monkey_right
            `, 300, true)
    } else if (chosen_plane == 1) {
        animation.runImageAnimation(fire_plane, assets.animation`
                    red_plane_right
                `, 300, true)
    } else if (chosen_plane == 2) {
        animation.runImageAnimation(fire_plane, assets.animation`
                    ryanair_right
                `, 300, true)
    } else if (chosen_plane == 3) {
        animation.runImageAnimation(fire_plane, assets.animation`
                    vueling_right
                `, 300, true)
    } else if (chosen_plane == 4) {
        animation.runImageAnimation(fire_plane, assets.animation`
                    aalines_right
                `, 300, true)
    }
    
})
sprites.onOverlap(SpriteKind.monkey_type, SpriteKind.button, function on_on_overlap(sprite3: Sprite, otherSprite2: Sprite) {
    
    otherSprite2.startEffect(effects.confetti, 500)
    monkey.sayText("Prem A per confirmar", 800, false)
    if (otherSprite2 == red_plane && controller.A.isPressed()) {
        fire_plane = sprites.create(assets.image`Fire Plane 2 Right`, SpriteKind.Player)
        fire_plane.setPosition(50, 20)
        effects.clearParticles(otherSprite2)
        chosen_plane = 1
        //  red_plane
        setting_plane = 0
        choose_plane()
    } else if (otherSprite2 == ryanair_plane && controller.A.isPressed()) {
        fire_plane = sprites.create(assets.image`ryanair`, SpriteKind.Player)
        fire_plane.setPosition(75, 52)
        effects.clearParticles(otherSprite2)
        chosen_plane = 2
        //  ryanair
        setting_plane = 0
        choose_plane()
    } else if (otherSprite2 == vueling_plane && controller.A.isPressed()) {
        fire_plane = sprites.create(assets.image`vuelingair`, SpriteKind.Player)
        fire_plane.setPosition(120, 85)
        effects.clearParticles(otherSprite2)
        chosen_plane = 3
        //  vueling
        setting_plane = 0
        choose_plane()
    } else if (otherSprite2 == aalines_plane && controller.A.isPressed()) {
        fire_plane = sprites.create(assets.image`aalines`, SpriteKind.Player)
        fire_plane.setPosition(85, 112)
        effects.clearParticles(otherSprite2)
        chosen_plane = 4
        //  aalines
        setting_plane = 0
        choose_plane()
    }
    
})
function choose_plane() {
    
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`airport`)
    if (setting_plane == 1) {
        game.splash("Benvingut/da", "bomber/a!")
        music.play(music.stringPlayable("G F F A B C D E F E D D D D C B A G B A A G F A G D ", 110), music.PlaybackMode.LoopingInBackground)
        game.splash("Escull un avió")
        red_plane = sprites.create(assets.image`
                Fire Plane 2 Right
            `, SpriteKind.button)
        red_plane.setPosition(50, 20)
        ryanair_plane = sprites.create(assets.image`
            ryanair
        `, SpriteKind.button)
        ryanair_plane.setPosition(75, 52)
        vueling_plane = sprites.create(assets.image`
            vuelingair
        `, SpriteKind.button)
        vueling_plane.setPosition(120, 85)
        aalines_plane = sprites.create(assets.image`
            aalines
        `, SpriteKind.button)
        aalines_plane.setPosition(85, 112)
        monkey = sprites.create(assets.image`
            monkey-player
        `, SpriteKind.monkey_type)
        monkey.setPosition(9, 62)
        monkey.setStayInScreen(true)
        controller.moveSprite(monkey)
    } else {
        setting_plane = 0
        sprites.destroy(red_plane)
        sprites.destroy(ryanair_plane)
        sprites.destroy(vueling_plane)
        sprites.destroy(aalines_plane)
        sprites.destroy(monkey)
        fire_plane.sayText("Yuhuu!!")
        fire_plane.setVelocity(50, 0)
        basic.pause(2000)
        fire_plane.setPosition(50, 50)
        fire_plane.setVelocity(0, 0)
        music.stopAllSounds()
        effects.blizzard.startScreenEffect()
        choose_level()
    }
    
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
    if (setting_level != 1) {
        sprites.spray(fire_plane, assets.image`
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
    
    if (setting_level == 1) {
        otherSprite.startEffect(effects.halo, 1000)
        fire_plane.sayText("Prem A per confirmar", 1000, false)
        if (otherSprite == forest_a && controller.A.isPressed()) {
            chosen_level = 1
            effects.clearParticles(otherSprite)
            choose_level()
        } else if (otherSprite == forest_b && controller.A.isPressed()) {
            chosen_level = 2
            effects.clearParticles(otherSprite)
            choose_level()
        }
        
    }
    
})
let red_plane : Sprite = null
let ryanair_plane : Sprite = null
let vueling_plane : Sprite = null
let aalines_plane : Sprite = null
let chosen_plane = 0
let monkey : Sprite = null
let forest_a : Sprite = null
let forest_b : Sprite = null
let chosen_level = 0
let fire_plane : Sprite = null
let setting_plane = 1
let setting_level = 1
choose_plane()
game.onUpdate(function on_on_update() {
    sprites.random_spread()
})
