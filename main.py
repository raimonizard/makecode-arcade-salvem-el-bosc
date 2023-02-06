@namespace
class SpriteKind:
    button = SpriteKind.create()
    monkey_type = SpriteKind.create()

def on_b_repeated():
    if setting_level != 1:
        fire_plane.say_text("Som-hi!!", 500, True)
        controller.move_sprite(fire_plane, 150, 150)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_repeated)

def on_b_released():
    if setting_level != 1:
        controller.move_sprite(fire_plane, 100, 100)
controller.B.on_event(ControllerButtonEvent.RELEASED, on_b_released)

def choose_level():
    global forest_a, forest_b, fire_plane, setting_level
    tiles.set_tilemap(tilemap("""
        level1
    """))
    music.play(music.string_playable("F G F A - F A G ", 130),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    if setting_level == 1 and chosen_level == 0:
        game.splash("Benvingut/da pilot!")
        game.splash("Escull el bosc petit", "o el bosc gran")
        game.show_long_text("Mou l'avió amb el cursor", DialogLayout.BOTTOM)
        forest_a = sprites.create(assets.image("""
            forestA
        """), SpriteKind.button)
        forest_b = sprites.create(assets.image("""
            forestB
        """), SpriteKind.button)
        forest_a.set_position(30, 75)
        forest_b.set_position(130, 70)
        fire_plane.set_position(85, 70)
        fire_plane.set_bounce_on_wall(True)
        fire_plane.set_stay_in_screen(True)
        controller.move_sprite(fire_plane)
    if chosen_level > 0:
        setting_level = 0
        sprites.destroy(forest_a)
        sprites.destroy(forest_b)
        music.stop_all_sounds()
        start_game()

def on_a_pressed():
    if setting_level != 1:
        sprites.spray(fire_plane, assets.image("""
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
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

# ################INIT-CONFIG################################
def init_config():
    if chosen_level == 1:
        game.splash("Bosc petit")
        tiles.set_tilemap(tilemap("""
            level1
        """))
        game.set_dryness_of_grass(randint(2, 4))
        game.set_strength_of_wind(randint(2, 4))
        game.set_health_of_trees(randint(5, 9))
    elif chosen_level == 2:
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
    if setting_plane == 1:
        animation.run_image_animation(monkey,
            assets.animation("""
                monkey_left
            """),
            300,
            True)
    else:
        if chosen_plane == 1:
            animation.run_image_animation(fire_plane,
                assets.animation("""
                    red_plane_left
                """),
                300,
                True)
        elif chosen_plane == 2:
            animation.run_image_animation(fire_plane,
                assets.animation("""
                    ryanair_left
                """),
                300,
                True)
        elif chosen_plane == 3:
            animation.run_image_animation(fire_plane,
                assets.animation("""
                    vueling_left
                """),
                300,
                True)
        elif chosen_plane == 4:
            animation.run_image_animation(fire_plane,
                assets.animation("""
                    aalines_left
                """),
                300,
                True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def start_game():
    global fire_plane
    fire_plane.set_bounce_on_wall(False)
    controller.move_sprite(fire_plane)
    scene.camera_follow_sprite(fire_plane)
    init_config()
    music.play(music.string_playable("B G B G B G B G ", 120),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    game.show_long_text("Prem A per tirar aigua", DialogLayout.TOP)
    game.show_long_text("Prem B per activar el turbo", DialogLayout.BOTTOM)
    for index in range(randint(4, 10)):
        if chosen_level == 1 and (index % 2) == 0:
            continue
        else:
            sprites.create_spreading_fire(assets.tile("""
                tree
            """),
            assets.tile("""
                tree fire
            """))

def on_right_pressed():
    if setting_plane == 1:
        animation.run_image_animation(monkey,
            assets.animation("""
                monkey_right
            """),
            300,
            True)
    else:
        if chosen_plane == 1:
            animation.run_image_animation(fire_plane,
                assets.animation("""
                    red_plane_right
                """),
                300,
                True)
        elif chosen_plane == 2:
            animation.run_image_animation(fire_plane,
                assets.animation("""
                    ryanair_right
                """),
                300,
                True)
        elif chosen_plane == 3:
            animation.run_image_animation(fire_plane,
                assets.animation("""
                    vueling_right
                """),
                300,
                True)
        elif chosen_plane == 4:
            animation.run_image_animation(fire_plane,
                assets.animation("""
                    aalines_right
                """),
                300,
                True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_on_overlap(sprite3, otherSprite2):
    global fire_plane, setting_plane, chosen_plane
    otherSprite2.start_effect(effects.confetti, 500)
    monkey.say_text("Prem A per confirmar", 800, False)
    if otherSprite2 == red_plane and controller.A.is_pressed():
        fire_plane = sprites.create(assets.image("Fire Plane 2 Right"), SpriteKind.player)
        fire_plane.set_position(50, 20)
        effects.clear_particles(otherSprite2)
        chosen_plane = 1 # red_plane
        setting_plane = 0
        choose_plane()
    elif otherSprite2 == ryanair_plane and controller.A.is_pressed():
        fire_plane = sprites.create(assets.image("ryanair"), SpriteKind.player)
        fire_plane.set_position(75, 52)
        effects.clear_particles(otherSprite2)
        chosen_plane = 2 # ryanair
        setting_plane = 0
        choose_plane()
    elif otherSprite2 == vueling_plane and controller.A.is_pressed():
        fire_plane = sprites.create(assets.image("vuelingair"), SpriteKind.player)
        fire_plane.set_position(120, 85)
        effects.clear_particles(otherSprite2)
        chosen_plane = 3 # vueling
        setting_plane = 0
        choose_plane()
    elif otherSprite2 == aalines_plane and controller.A.is_pressed():
        fire_plane = sprites.create(assets.image("aalines"), SpriteKind.player)
        fire_plane.set_position(85, 112)
        effects.clear_particles(otherSprite2)
        chosen_plane = 4 # aalines
        setting_plane = 0
        choose_plane()
sprites.on_overlap(SpriteKind.monkey_type, SpriteKind.button, on_on_overlap)

def choose_plane():
    global red_plane, ryanair_plane, vueling_plane, aalines_plane, monkey, setting_plane
    scene.set_background_color(9)
    tiles.set_tilemap(tilemap("""airport"""))
    if setting_plane == 1:
        game.splash("Benvingut/da", "bomber/a!")
        music.play(music.string_playable("G F F A B C D E F E D D D D C B A G B A A G F A G D ", 110),
                music.PlaybackMode.LOOPING_IN_BACKGROUND)        
        game.splash("Escull un avió")
        red_plane = sprites.create(assets.image("""
                Fire Plane 2 Right
            """),
            SpriteKind.button)
        red_plane.set_position(50, 20)
        ryanair_plane = sprites.create(assets.image("""
            ryanair
        """), SpriteKind.button)
        ryanair_plane.set_position(75, 52)
        vueling_plane = sprites.create(assets.image("""
            vuelingair
        """), SpriteKind.button)
        vueling_plane.set_position(120, 85)
        aalines_plane = sprites.create(assets.image("""
            aalines
        """), SpriteKind.button)
        aalines_plane.set_position(85, 112)
        monkey = sprites.create(assets.image("""
            monkey-player
        """), SpriteKind.monkey_type)
        monkey.set_position(9, 62)
        monkey.set_stay_in_screen(True)
        controller.move_sprite(monkey)
    else:
        setting_plane = 0
        sprites.destroy(red_plane)
        sprites.destroy(ryanair_plane)
        sprites.destroy(vueling_plane)
        sprites.destroy(aalines_plane)
        sprites.destroy(monkey)
        fire_plane.z = 1
        fire_plane.say_text("Yuhuu!!")
        fire_plane.set_velocity(50, 0)
        basic.pause(2000)        
        fire_plane.set_position(50, 50)
        fire_plane.set_velocity(0, 0)
        music.stop_all_sounds()
        effects.blizzard.start_screen_effect()
        choose_level()

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
    if setting_level != 1:
        sprites.spray(fire_plane, assets.image("""
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

def on_on_overlap2(sprite, otherSprite):
    global chosen_level
    if setting_level == 1:
        otherSprite.start_effect(effects.halo, 1000)
        fire_plane.say_text("Prem A per confirmar", 1000, False)
        if otherSprite == forest_a and controller.A.is_pressed():
            chosen_level = 1
            effects.clear_particles(otherSprite)
            choose_level()
        elif otherSprite == forest_b and controller.A.is_pressed():
            chosen_level = 2
            effects.clear_particles(otherSprite)
            choose_level()
sprites.on_overlap(SpriteKind.player, SpriteKind.button, on_on_overlap2)

red_plane: Sprite = None
ryanair_plane: Sprite = None
vueling_plane: Sprite = None
aalines_plane: Sprite = None
chosen_plane = 0
monkey: Sprite = None
forest_a: Sprite = None
forest_b: Sprite = None
chosen_level = 0
fire_plane: Sprite = None
setting_plane = 1
setting_level = 1
choose_plane()

def on_on_update():
    sprites.random_spread()
game.on_update(on_on_update)
