@namespace
class SpriteKind:
    button = SpriteKind.create()

def on_b_pressed():
    if settingLevel != 1:
        firePlane.say_text("Som-hi!!", 500, True)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

# ################################################
def init_config():
    if difficulty == 1:
        game.splash("Bosc petit")
        tiles.set_tilemap(tilemap("""
            level1
        """))
        game.set_dryness_of_grass(randint(1, 3))
        game.set_strength_of_wind(randint(1, 3))
        game.set_health_of_trees(randint(5, 9))
    elif difficulty == 2:
        game.splash("Bosc gran")
        tiles.set_tilemap(tilemap("""
            level2
        """))
        game.set_dryness_of_grass(randint(2, 4))
        game.set_strength_of_wind(randint(2, 4))
        game.set_health_of_trees(randint(4, 9))
    hud.danger_hud_label("Risc d'incendi")
    hud.danger_hud(True)
    hud.fire_hud_label("Focs:")
    hud.fire_hud(True)
    hud.forest_hud_label("Salut del bosc")
    hud.forest_hud_healthy(7)
    hud.forest_hud_burned(2)
    hud.forest_hud(True)

def on_fire_created(location):
    scene.create_particle_effect_at_location(location, effects.fire)
    sprites.set_flame_strength(location, randint(15, 25))
    music.knock.play()
sprites.on_fire_created(on_fire_created)

def on_left_pressed():
    animation.run_image_animation(firePlane,
        assets.animation("""
            Fire Plane 2 Left Animation 1
        """),
        300,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def start_game():
    global firePlane
    firePlane = sprites.create(assets.image("""
            Fire Plane 2 Right
        """),
        SpriteKind.player)
    firePlane.set_bounce_on_wall(False)
    controller.move_sprite(firePlane)
    scene.camera_follow_sprite(firePlane)
    init_config()
    music.play(music.string_playable("B G B G B G B G ", 120),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    game.show_long_text("Prem A per tirar aigua", DialogLayout.TOP)
    for index in range(randint(4, 10)):
        sprites.create_spreading_fire(assets.tile("""
                tree
            """),
            assets.tile("""
                tree fire
            """))

def on_right_pressed():
    animation.run_image_animation(firePlane,
        assets.animation("""
            Fire Plane 2 Right Animation
        """),
        300,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_fire_destroyed(location2):
    scene.clear_particle_effects_at_location(location2)
    tiles.set_tile_at(location2, assets.tile("""
        burnt tree
    """))
    music.thump.play()
sprites.on_fire_destroyed(on_fire_destroyed)

def on_life_zero():
    game.game_over(False)
    game.set_game_over_message(False, "S'ha cremat tot!!!")
info.on_life_zero(on_life_zero)

def on_a_repeated():
    if settingLevel != 1:
        sprites.spray(firePlane, assets.image("""
            water
        """))
        music.play(music.create_sound_effect(WaveShape.SINE,
                200,
                600,
                255,
                0,
                150,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
controller.A.on_event(ControllerButtonEvent.REPEATED, on_a_repeated)

def chooseDifficulty():
    global bforestA, bforestB, firePlane, settingLevel
    tiles.set_tilemap(tilemap("""
        level1
    """))
    music.play(music.string_playable("F G F A - F A G ", 130),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    if settingLevel == 1 and difficulty == 0:
        game.splash("Benvingut/da bomber/a!")
        game.splash("Escull el bosc petit", "o el bosc gran")
        game.show_long_text("Mou l'avió amb el cursor", DialogLayout.BOTTOM)
        bforestA = sprites.create(assets.image("""
            buttonA
        """), SpriteKind.button)
        bforestB = sprites.create(assets.image("""
            buttonB
        """), SpriteKind.button)
        bforestA.set_position(30, 75)
        bforestB.set_position(130, 70)
        firePlane = sprites.create(assets.image("""
                Fire Plane 2 Left
            """),
            SpriteKind.player)
        firePlane.set_position(85, 70)
        firePlane.set_bounce_on_wall(True)
        firePlane.set_stay_in_screen(True)
        controller.move_sprite(firePlane)
    if difficulty > 0:
        settingLevel = 0
        sprites.destroy(bforestA)
        sprites.destroy(bforestB)
        sprites.destroy(firePlane)
        music.stop_all_sounds()
        start_game()

def on_overlap_tile(sprite2, location3):
    sprite2.destroy(effects.ashes, 500)
    sprites.change_flame_strength_by(location3, -1)
scene.on_overlap_tile(SpriteKind.water,
    assets.tile("""
        tree fire
    """),
    on_overlap_tile)

def on_on_overlap(sprite, otherSprite):
    global difficulty
    if settingLevel == 1:
        if otherSprite == bforestA:
            difficulty = 1
            chooseDifficulty()
        elif otherSprite == bforestB:
            difficulty = 2
            chooseDifficulty()
sprites.on_overlap(SpriteKind.player, SpriteKind.button, on_on_overlap)

bforestB: Sprite = None
bforestA: Sprite = None
difficulty = 0
firePlane: Sprite = None
settingLevel = 0
level2 = 0
settingLevel = 1
chooseDifficulty()

def on_on_update():
    sprites.random_spread()
game.on_update(on_on_update)
