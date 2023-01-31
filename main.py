def on_b_pressed():
    mySprite.say_text("Som-hi!!", 500, True)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_fire_created(location):
    scene.create_particle_effect_at_location(location, effects.fire)
    sprites.set_flame_strength(location, 20)
    music.knock.play()
sprites.on_fire_created(on_fire_created)

def on_left_pressed():
    animation.run_image_animation(mySprite,
        assets.animation("""
            Fire Plane 2 Left Animation
        """),
        700,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    animation.run_image_animation(mySprite,
        assets.animation("""
            Fire Plane 2 Right Animation
        """),
        700,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def init():
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

def on_a_repeated():
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

def on_overlap_tile(sprite, location3):
    sprite.destroy(effects.ashes, 500)
    sprites.change_flame_strength_by(location3, -1)
scene.on_overlap_tile(SpriteKind.water,
    assets.tile("""
        tree fire
    """),
    on_overlap_tile)

def selectDifficulty():
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
level2 = 0
mySprite: Sprite = None
game.set_dryness_of_grass(randint(1, 4))
game.set_strength_of_wind(randint(1, 4))
game.set_health_of_trees(randint(5, 8))
tiles.set_tilemap(tilemap("""
    level1
"""))
mySprite = sprites.create(assets.image("""
        Fire Plane 2 Right
    """),
    SpriteKind.player)
controller.move_sprite(mySprite)
scene.camera_follow_sprite(mySprite)
game.show_long_text("A per tirar aigua", DialogLayout.TOP)
for index in range(4):
    sprites.create_spreading_fire(assets.tile("""
            tree
        """),
        assets.tile("""
            tree fire
        """))
init()
music.play(music.string_playable("B G B G B G B G ", 120),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)

def on_on_update():
    sprites.random_spread()
game.on_update(on_on_update)
