export function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

export function getLayerFromId(id) {
    const layerElements = {
        "tile": [].concat(Object.keys(tiles)),
        "path": [].concat(Object.keys(path)),
        "leaf": [].concat(Object.keys(leaflayer)),
        "normal": [].concat(Object.keys(colors), Object.keys(coloredCandy), Object.keys(candy), Object.keys(blockers), Object.keys(ingredients), Object.keys(bonbon)),
        "sugarcoat": [].concat(Object.keys(sugarCoats)),
        "lock": [].concat(Object.keys(locks)),
        "glass": [].concat(Object.keys(glass)),
        "indicators": [].concat(Object.keys(indicators)),
        "wallup": [].concat(Object.keys(wallup)),
        "walldown": [].concat(Object.keys(walldown)),
        "wallleft": [].concat(Object.keys(wallleft)),
        "wallright": [].concat(Object.keys(wallright)),
        "rainbow_cannon_top": [].concat(Object.keys(rainbowcannontop)),
        "rainbow_cannon_bottom": [].concat(Object.keys(rainbowcannonbottom)),
        "rainbow_cannon_left": [].concat(Object.keys(rainbowcannonleft)),
        "rainbow_cannon_right": [].concat(Object.keys(rainbowcannonright)),
        "ingredients_exit": ["010"],
        "candy_entrance": ["026"],
        "notes": [].concat(Object.keys(notes)),
        "entry_note": [].concat(Object.keys(entry_note)),
        "exit_note": [].concat(Object.keys(exit_note)),
        "candy_cannon": ["005"].concat(Object.keys(cannons)),
        "portal_entrance": [].concat(Object.keys(portalentrance)),
        "portal_exit": [].concat(Object.keys(portalexit))
    };
    
    let layer = undefined;
    let keys = Object.keys(layerElements);
    for (var i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (layerElements[key].includes(id)) {
            layer = key;
            break;
        }
    }
    return layer;
}