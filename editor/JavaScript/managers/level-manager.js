import { createNewTable } from '../utils/level-grid.js';
import { updateTile } from './tile-operations.js';
import { setSelectedColor, setElementLayer, setSelectedElement, setPreferredColors, getCurrentMode, getPreferredColors } from './state-manager.js';
import { colors, coloredCandy, candy, blockers, tiles } from '../core/constants-test.js';
import { gameState } from './state-manager.js';

function getLayerFromId(id) {
    const layers = [
    "tile",
    "path",
    "leaf",
    "portal_entrance",
    "portal_exit",
    "normal",
    "bonbonoverlay",
    "sugarcoat",
    "lock",
    "glass",
    "indicators",
    "wallup",
    "walldown",
    "wallleft",
    "wallright",
    'rainbow_cannon_top',
    "rainbow_cannon_bottom",
    "rainbow_cannon_left",
    "rainbow_cannon_right",
    "ingredients_exit",
    "candy_cannon",
    "candy_entrance",
    "exit_note",
    "entry_note",
    "notes",
    "selectimg"
   ]

    const layerElements = {
    "tile": [].concat(Object.keys(tiles)),
    "path": [].concat(Object.keys(path)),
    "leaf":[].concat(Object.keys(leaflayer)),
    "normal": [].concat(Object.keys(colors), Object.keys(coloredCandy), Object.keys(candy), Object.keys(blockers), Object.keys(ingredients), Object.keys(bonbon)),
    "sugarcoat": [].concat(Object.keys(sugarCoats)),
    "lock": [].concat(Object.keys(locks)),
    "glass": [].concat(Object.keys(glass)),
    "indicators": [].concat(Object.keys(indicators)),
    "wallup": [].concat(Object.keys(wallup)),
    "walldown": [].concat(Object.keys(walldown)),
    "wallleft": [].concat(Object.keys(wallleft)),
    "wallright": [].concat(Object.keys(wallright)),
    "rainbow_cannon_top":[].concat(Object.keys(rainbowcannontop)),
    "rainbow_cannon_bottom":[].concat(Object.keys(rainbowcannonbottom)),
    "rainbow_cannon_left":[].concat(Object.keys(rainbowcannonleft)),
    "rainbow_cannon_right":[].concat(Object.keys(rainbowcannonright)),
    "ingredients_exit": ["010"],
    "candy_entrance": ["026"],
    "notes":[].concat(Object.keys(notes)),
    "entry_note":[].concat(Object.keys(entry_note)),
    "exit_note":[].concat(Object.keys(exit_note)),
    "candy_cannon": ["005"].concat(Object.keys(cannons)),
    "portal_entrance":[].concat(Object.keys(portalentrance)),
    "portal_exit":[].concat(Object.keys(portalexit))
   }
    
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

var preferredColors = [0,1,2,3,4]

var isDown = false

export function importLevel(levelData) {
    let originalLevel = document.getElementById("level");
    let levelParent = originalLevel.parentElement;
    originalLevel.id = "levelold";
    originalLevel.style.display = "none";

    let origColor = selectedColor;
    let origLayer = elementLayer;
    let origElement = selectedElement;

    let newLevel = levelParent.appendChild(document.createElement("table"));
    newLevel.id = "level";
    newLevel.setAttribute("cellspacing", "0");
    createNewTable(true);

    let levelArray = levelData['tileMap'];

    try {
        let levelObject = newLevel;
        let childrenRows = [].slice.call(levelObject.children);
        let blacklistedCake = [];
        
        childrenRows.forEach(function(row, rIndex) {
            let objects = [].slice.call(row.children);
            let color = "002";

            objects.forEach(function(object, cIndex) {
                try {
                    let textObject = levelArray[rIndex][cIndex].match(/.{1,3}/g);
                } catch {
                    throw "This level has a grid bigger than 9x9";
                }

                textObject.forEach(function(objectId, index) {
                    if (objectId in colors) {
                        color = objectId;
                        if (objectId != "002")
                            textObject.splice(index, 1);
                    }
                });

                textObject.forEach(function(objectId) {
                    if (objectId.length !== 3) {
                        throw "An object ID is not 3 characters long.";
                    }

                    if (objectId == "002" && object.getAttribute("normal") != undefined) {
                        return;
                    }

                    // Skip portals - handled later
                    if (objectId === '011' || objectId === '990' || objectId === '991' || objectId === '014' || objectId === '015') {
                        return;
                    }

                    if (objectId == "035") {
                        if (blacklistedCake.includes(String(rIndex) + String(cIndex))) {
                            return;
                        } else {
                            if (cIndex == 8 || rIndex == 8) {
                                return;
                            } else {
                                blacklistedCake.push(String(rIndex) + String(cIndex + 1));
                                blacklistedCake.push(String(rIndex + 1) + String(cIndex));
                                blacklistedCake.push(String(rIndex + 1) + String(cIndex + 1));
                            }
                        }
                    }

                    let layer = getLayerFromId(objectId);
                    setSelectedColor(color);
                    setElementLayer(layer);
                    setSelectedElement(objectId);
                    
                    try {
                        updateTile(object);
                    } catch {
                        setElementLayer("tile");
                        setSelectedElement("none");
                    }
                });
            });
        });

        // Handle portals
        if (levelData.portals) {
            for (let portal of levelData.portals) {
                setElementLayer('portal_entrance');
                setSelectedElement(portal[0][2] == 14 ? '990' : '014');
                
                try {
                    updateTile([].slice.call(childrenRows[portal[0][1]].children)[portal[0][0]]);
                    gameState.isPortalTimeout = false;
                } catch (err) {
                    console.warn(err);
                    setElementLayer("tile");
                    setSelectedElement("none");
                }

                setElementLayer('portal_exit');
                setSelectedElement(portal[1][2] == 14 ? '991' : '015');
                
                try {
                    updateTile([].slice.call(childrenRows[portal[1][1]].children)[portal[1][0]]);
                    gameState.isPortalTimeout = false;
                } catch (err) {
                    console.warn(err);
                    setElementLayer("tile");
                    setSelectedElement("none");
                }
            }
        }

        originalLevel.remove();
        newLevel.style.display = "block";
    } catch (err) {
        console.log(err);
        newLevel.remove();
        originalLevel.id = "level";
        originalLevel.style.display = "block";
        throw(err);
    }
    
    // Set game mode
    let wantedMode = levelData['gameModeName'];
    let wantedModeInput = document.getElementById("modeselection").querySelector('input[value="' + String(wantedMode) + '"]');
    if (wantedModeInput != null) {
        wantedModeInput.click();
    }

    // Set moves & time
    document.getElementById("moves").value = levelData.moveLimit || "";
    document.getElementById("time").value = levelData.timeLimit || "";
    document.getElementById("frogStomachSize").value = levelData.frogStomachSize || "";

    // Set preferred colors
    let colorspref = document.getElementById("colorspref-section");
    let preferredColors = levelData.preferredColors || [0,1,2,3,4];
    setPreferredColors(preferredColors);
    
    for (let i = 0; i < 6; i++) {
        let prefbutton = colorspref.querySelector('button[value="' + String(i) + '"]');
        if (preferredColors.includes(i)) {
            if (!prefbutton.classList.contains("preferredselected")) {
                prefbutton.classList.add("preferredselected");
            }
        } else {
            if (prefbutton.classList.contains("preferredselected")) {
                prefbutton.classList.remove("preferredselected");
            }
        }
    }

    // Clear existing requirements
    let requirementsContainer = document.getElementById("requirements");
    Array.from(requirementsContainer.children).forEach(function(child) {
        child.remove();
    });

    // Set other level properties...
    // (Include all the other import logic from the original function)

    // Restore original selection
    setSelectedColor(origColor);
    setElementLayer(origLayer);
    setSelectedElement(origElement);
    gameState.lastPortalObject = undefined;
}

export function exportLevel() {
    let levelArray = [];
    let levelObject = document.getElementById("level");
    let level = {};
    level['portals'] = [];
    
    if (getCurrentMode().includes("Rainbow Rapids")) {
        level.rainbowRapidsTargets = 0;
    }

    levelObject.childNodes.forEach(function(row) {
        let rowArray = [];
        for (var i = 0; i < row.childNodes.length; i++) {
            let object = row.childNodes[i];

            if (object.getAttribute("tile") == "000") {
                rowArray.push("000");
                continue;
            }

            let candyCannon = JSON.parse(object.getAttribute("candy_cannon") || '[]');
            let totalCode = [].concat(candyCannon);

            let toLoopThrough = [].concat(layers, ["color"]);
            toLoopThrough.splice(toLoopThrough.indexOf("candy_cannon"), 1);
            
            toLoopThrough.forEach(function(layer) {
                let element = "";
                if (object.hasAttribute(layer)) {
                    element = object.getAttribute(layer);
                } else {
                    return;
                }

                if (getCurrentMode().includes("Rainbow Rapids") && element == "156") {
                    level.rainbowRapidsTargets++;
                }

                // Handle portal exports
                if (element == "990" || element == "014") {
                    let row2 = parseInt(object.getAttribute('portalexitrow'));
                    let col2 = parseInt(object.getAttribute('portalexitcol'));
                    let portal = [[i, levelArray.length], [col2, row2]];
                    if (element == '990') {
                        portal[0][2] = 14;
                        portal[1][2] = 14;
                    }
                    level.portals.push(portal);
                }

                if (!totalCode.includes(element) && element != "") {
                    totalCode.push(element);
                }
            });

            // Clean up codes
            if (object.getAttribute("normal") !== "002" && object.getAttribute("color") == "002") {
                totalCode.splice(totalCode.indexOf("002"), 1);
            }
            
            if (totalCode.includes("001") && totalCode.length != 1) {
                totalCode.splice(totalCode.indexOf("001"), 1);
            }

            rowArray.push(totalCode.join(""));
        }
        levelArray.push(rowArray);
    });

    level['tileMap'] = levelArray;
    level['numberOfColours'] = getPreferredColors().length;
    level['enableSugarTrack'] = document.getElementById("enablesugardrops").checked;
    level['preferredColors'] = getPreferredColors();
    level['colorWeightAdjustments'] = [0];

    // Set score targets
    let star1 = Number(document.getElementById("star1").value) || 1000;
    let star2 = Number(document.getElementById("star2").value) || 2000;
    let star3 = Number(document.getElementById("star3").value) || 3000;
    level['scoreTargets'] = [star1, star2, star3];

    level['protocolVersion'] = "0.3";
    level['randomSeed'] = 0;
    level['gates'] = [];
    level['orlocks'] = [];
    level['skulls'] = [];

    // Set time/moves based on mode
    if (getCurrentMode() === "Classic" || getCurrentMode() === "Jelly Time" || getCurrentMode() === "Order Time" || getCurrentMode() === "Drop Time" || getCurrentMode() === "Jelly Color Time") {
        let time = document.getElementById("time").value;
        level['timeLimit'] = time === '' ? 30 : Number(time);
    } else {
        let moves = document.getElementById("moves").value;
        level['moveLimit'] = moves === '' ? 15 : Number(moves);
    }

    let frogstomachsize = document.getElementById("frogstomachsize").value;
    level['frogStomachSize'] = frogstomachsize === '' ? 13 : Number(frogstomachsize);

    // Handle requirements and other level data...
    // (Include all the other export logic)

    level['gameModeName'] = getCurrentMode();
    level['episodeId'] = 0;

    return level;
}

export function displayImportLevelUI() {
    document.getElementById("importmenu").style.display = "block";
}

export function importLevelUI() {
    try {
        let importField = document.getElementById("importfield");
        importLevel(JSON.parse(importField.value));
        document.getElementById("importerror").style.display = "none";
        importField.value = "";
        document.getElementById("importmenu").style.display = "none";
    } catch (err) {
        let errorPara = document.getElementById("importerror");
        errorPara.style.display = "block";
        errorPara.innerHTML = err;
    }
}

export function exportLevelUI() {
    let level = exportLevel();
    document.getElementById("exportfield").value = JSON.stringify(level);
    document.getElementById("exportmenu").style.display = "block";
}