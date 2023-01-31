@namespace
class SpriteKind:
    button = SpriteKind.create()
    cursor = SpriteKind.create()

def on_b_pressed():
    if settingLevel != 1:
        mySprite.say_text("Som-hi!!", 500, True)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_fire_created(location):
    scene.create_particle_effect_at_location(location, effects.fire)
    sprites.set_flame_strength(location, randint(15, 25))
    music.knock.play()
sprites.on_fire_created(on_fire_created)

def chooseDifficulty1():
    global difficulty
    tiles.set_tilemap(tilemap("""
        level1
    """))
    game.splash("Benvingut/da bomber/a!")
    difficulty = game.ask_for_number("Escull la dificultat del bosc (1 o 2)", 1)
    while difficulty != 1 and difficulty != 2:
        game.splash("Tria 1 o 2")
        difficulty = game.ask_for_number("Escull dificultat (1 o 2)", 1)

def on_left_pressed():
    animation.run_image_animation(mySprite,
        assets.animation("""
            Fire Plane 2 Left Animation 1
        """),
        300,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_on_overlap(sprite, otherSprite):
    global difficulty
    if settingLevel == 1:
        if otherSprite == bforestA and controller.A.is_pressed():
            difficulty = 1
            chooseDifficulty2()
        if otherSprite == bforestB and controller.A.is_pressed():
            difficulty = 1
            chooseDifficulty2()
sprites.on_overlap(SpriteKind.cursor, SpriteKind.button, on_on_overlap)

def on_right_pressed():
    animation.run_image_animation(mySprite,
        assets.animation("""
            Fire Plane 2 Right Animation
        """),
        300,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def choosePlane():
    game.splash("hola")

def chooseDifficulty0():
    global level2
    level2 = 0
    game.show_long_text("Escull la dificultat", DialogLayout.FULL)
    game.show_long_text("Puja o baixa amb les flextes", DialogLayout.BOTTOM)
    game.show_long_text("B per acabar", DialogLayout.BOTTOM)
    while not (controller.B.is_pressed()):
        if controller.up.is_pressed():
            level2 += 1
        elif controller.down.is_pressed():
            level2 += 1
        else:
            game.show_long_text("Puja o baixa amb les flextes", DialogLayout.BOTTOM)
        pause(2000)
def init():
    game.set_dryness_of_grass(randint(2, 4))
    game.set_strength_of_wind(randint(2, 4))
    game.set_health_of_trees(randint(4, 9))
    hud.forest_hud_healthy(7)
    hud.forest_hud_burned(2)
    hud.danger_hud_label("Risc d'incendi")
    hud.fire_hud_label("Focs:")
    hud.forest_hud_label("Salut del bosc")
    hud.fire_hud(True)
    hud.danger_hud(True)
    hud.forest_hud(True)

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
        sprites.spray(mySprite, assets.image("""
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

def on_overlap_tile(sprite2, location3):
    sprite2.destroy(effects.ashes, 500)
    sprites.change_flame_strength_by(location3, -1)
scene.on_overlap_tile(SpriteKind.water,
    assets.tile("""
        tree fire
    """),
    on_overlap_tile)

def chooseDifficulty2():
    global bforestA, bforestB, cursor2, settingLevel
    tiles.set_tilemap(tilemap("""
        level1
    """))
    if settingLevel == 1:
        game.splash("Benvingut/da bomber/a!", "Escull el bosc A o el bosc B")
        bforestA = sprites.create(assets.image("""
            buttonA
        """), SpriteKind.button)
        bforestB = sprites.create(assets.image("""
            buttonB
        """), SpriteKind.button)
        bforestA.set_position(25, 80)
        bforestB.set_position(125, 80)
        cursor2 = sprites.create(assets.image("""
                Fire Plane 2 Left
            """),
            SpriteKind.cursor)
        cursor2.set_position(70, 80)
        controller.move_sprite(cursor2)
    if difficulty > 0:
        settingLevel = 0
        sprites.destroy(bforestA)
        sprites.destroy(bforestB)
        sprites.destroy(cursor2)
        start_game()

def start_game():
    game.splash(difficulty)
    if difficulty == 1:
        tiles.set_tilemap(tilemap("""
            level1
        """))
    else:
        tiles.set_tilemap(tilemap("""
            level2
        """))
    mySprite = sprites.create(assets.image("""
            Fire Plane 2 Right
        """),
        SpriteKind.player)
    controller.move_sprite(mySprite)
    scene.camera_follow_sprite(mySprite)
    game.show_long_text("Mou l'avió amb el cursor", DialogLayout.BOTTOM)
    music.play(music.string_playable("B G B G B G B G ", 120),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    game.show_long_text("Prem A per tirar aigua", DialogLayout.TOP)
    init()
    for index in range(randint(5, 20)):
        sprites.create_spreading_fire(assets.tile("""
                tree
            """),
            assets.tile("""
                tree fire
            """))

def on_on_update():
    sprites.random_spread()
game.on_update(on_on_update)

cursor2: Sprite = None
level2 = 0
bforestB: Sprite = None
bforestA: Sprite = None
mySprite: Sprite = None
settingLevel = 1
difficulty = 0
chooseDifficulty2()