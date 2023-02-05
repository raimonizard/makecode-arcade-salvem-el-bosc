// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`12001200030303030303030303030303030303030303030101010101010101010101010101010103030101010101010101010101010101010103030102010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030101010101010101010101010101010103030303030303030303030303030303030303`, img`
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3], TileScale.Sixteen);
            case "level2":
            case "level14":return tiles.createTilemap(hex`1e001e001010101010101010101010101010101010101010101010101010101010101001010101010101010101010101010101010101010101010101010101101001010101010101010101010101010101010101010101010101010101101001020101010101010101010101010101010101010f0f0f01010101011010010101010f0f010101010101010101010101010f0f0101010101010110100101010f0f01010101010101010e0e0101010101010101010101010110100101010f01010101010e0e0e0e0101010101040b0b0b0b0b0b0b0a0110100101010f010101010e010101010101010101050d0d0d0d0d0d0d090110100101010f0101010101010101010101010101050d0d0c0c0c0c0d09011010010101010101010101010f01010101010101050d0d0c01010c0d0901101001010101010101010101010f010101010101050d0d0c0c0c0c0d0901101001010101010101010d01010f010101010101050d0d0d0d0d0d0d090110100101010101010101010101010f01010101010607070707070707080110100101010101010e0101010101010f010101010101010101010101010110100101010101010e0101010d010d01010101010101010101010101010110100101010101010e0101010d01010d0d01010101010101010101010101101001010f010101010e01010101010d0d0101010101010f0f0101010101101001010f010101010e0e0101010d0101010f0f0f0f0f0f010f0f01010110100101010f010101010e0101010101010101010101010f01010101010110100101010f01010101010e01010101010101010101010101010101010110100101010f01010101010101010101010101010101010101010101010110100101010f0d01010101010101010101010101010101010101010101011010010101010d01010101010101010101010101010101010101010101011010010101010d0d0101010101010101010f0f0101010101030301010101101001010f01010d0d0d0d0d0d0101010101010f0f0f01010103030101011010010101010101010101010d0d010101010101010f0f01030301010101101001010101010101010101010101010101010101010f0f010101010101101001010f0101010101010101010101010101010101010f0f010101010110101010100101010101010101010101010101010101011010101010100110101010101010101010101010101010101010101010101010101010101010`, img`
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile8,sprites.castle.tilePath1,sprites.castle.tilePath4,sprites.castle.tilePath7,sprites.castle.tilePath8,sprites.castle.tilePath9,sprites.castle.tilePath6,sprites.castle.tilePath3,sprites.castle.tilePath2,sprites.castle.tileGrass2,sprites.castle.tileDarkGrass2,sprites.castle.tileDarkGrass3,sprites.castle.tileDarkGrass1,myTiles.tile3], TileScale.Sixteen);
            case "airport":
            case "airport1":return tiles.createTilemap(hex`100009000b0c0b0c0b0c0b0c0b0c0b0c0b0c0b0c08020202020202020202020202020207080909090909010909010909090909070802020202020202020202020202020708010a0a010a0a01010a09010a010a070802020202020202020202020202020708060a01060a010a0101060a060601070802020202020202020202020202020705040404040404040404040404040403`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tileGrass2,sprites.vehicle.roadHorizontal,sprites.skillmap.islandTile8,sprites.skillmap.islandTile7,sprites.skillmap.islandTile6,sprites.skillmap.islandTile4,sprites.skillmap.islandTile5,sprites.skillmap.islandTile3,sprites.castle.tileGrass1,sprites.castle.tileGrass3,sprites.castle.saplingOak,sprites.castle.saplingPine], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "wall":
            case "tile3":return tile3;
            case "firePit":
            case "tile2":return tile2;
            case "burnt tree":
            case "tile8":return tile8;
            case "tree fire":
            case "tile4":return tile4;
            case "tree":
            case "tile1":return tile1;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
