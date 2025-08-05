import { elements_ids, coloredCandy, elementsFolder, layers } from './constants.js';
import { gameState, getElementLayer, getSelectedElement, getSelectedColor, stretched, small, sugarCoatable } from './state-manager.js';

export function removeCake(object) {
    let cake = object.getAttribute("cake");
    let tiles = [];
    let row = Number(object.getAttribute("pos-row"));
    let column = Number(object.getAttribute("pos-col"));
    let level = document.getElementById("level");

    object.setAttribute("normal", "002");
    object.setAttribute("color", "002");
    object.setAttribute("cake", "");
    object.querySelector(".normal").src = elementsFolder + "random.png";
    object.querySelector(".normal").setAttribute("class", "normal default small");

    if (cake == "1") {
        tiles = [[row, column + 1], [row + 1, column], [row + 1, column + 1]];
    } else if (cake == "2") {
        tiles = [[row, column - 1], [row + 1, column - 1], [row + 1, column]];
    } else if (cake == "3") {
        tiles = [[row - 1, column], [row - 1, column + 1], [row, column + 1]];
    } else if (cake == "4") {
        tiles = [[row - 1, column - 1], [row - 1, column], [row, column - 1]];
    }

    tiles.forEach(function(pos) {
        let otherObject = level.children[pos[0]].children[pos[1]];
        otherObject.setAttribute("normal", "002");
        otherObject.setAttribute("color", "002");
        otherObject.setAttribute("cake", "");
        otherObject.querySelector(".normal").src = elementsFolder + "random.png";
        otherObject.querySelector(".normal").setAttribute("class", "normal default small");
    });
}

export function removePortal(object, isExit) {
    let level = document.getElementById("level");
    let objToDelete;
    
    if (isExit) {
        object.setAttribute('portal_exit', '');
        object.querySelector(".portal_exit").src = '';
        object.querySelector(".portal_exit").setAttribute("class", "portal_exit default small");
        try {
            objToDelete = level.children[object.getAttribute('portalentrancerow')].children[object.getAttribute('portalentrancecol')];
            objToDelete.setAttribute('portal_entrance', '');
            objToDelete.querySelector(".portal_entrance").src = '';
            objToDelete.setAttribute('portalexitrow', '');
            objToDelete.setAttribute('portalexitcol', '');
        } catch (err) {}
        object.setAttribute('portalentrancerow', '');
        object.setAttribute('portalentrancecol', '');
    } else {
        object.setAttribute('portal_entrance', '');
        object.querySelector(".portal_entrance").src = '';
        object.querySelector(".portal_entrance").setAttribute("class", "portal_entrance default small");
        try {
            objToDelete = level.children[object.getAttribute('portalexitrow')].children[object.getAttribute('portalexitcol')];
            objToDelete.setAttribute('portal_exit', '');
            objToDelete.querySelector(".portal_exit").src = '';
            objToDelete.setAttribute('portalentrancerow', '');
            objToDelete.setAttribute('portalexitcol', '');
        } catch (err) {}
        object.setAttribute('portalexitrow', '');
        object.setAttribute('portalexitcol', '');
    }
}

export function updateTile(object) {
    const elementLayer = getElementLayer();
    const selectedElement = getSelectedElement();
    const selectedColor = getSelectedColor();
    
    if (elementLayer !== "tile" && object.getAttribute("tile") === "000") {
        return;
    }

    if (gameState.isPortalTimeout) { return; }

    let level = document.getElementById("level");
    let row = Number(object.getAttribute("pos-row"));
    let column = Number(object.getAttribute("pos-col"));

    let isCake = object.getAttribute("cake");
    if (isCake !== undefined && isCake !== "" && elementLayer === "normal") {
        removeCake(object);
    }

    let isPortalEntrance = object.getAttribute('portal_entrance');
    let isPortalExit = object.getAttribute('portal_exit');
    let image = object.querySelector("." + elementLayer);

    try {
        if (elementLayer == "portal_entrance") {
            if (isPortalEntrance) {
                removePortal(object, false);
            }
            gameState.lastPortalObject = object;
        } else if (elementLayer == "portal_exit") {
            if (isPortalExit) {
                removePortal(object, true);
            }

            object.setAttribute('portalentrancerow', gameState.lastPortalObject.getAttribute('pos-row'));
            object.setAttribute('portalentrancecol', gameState.lastPortalObject.getAttribute('pos-col'));
            gameState.lastPortalObject.setAttribute('portalexitrow', row);
            gameState.lastPortalObject.setAttribute('portalexitcol', column);
            gameState.lastPortalObject = undefined;
        } else if (elementLayer == "wallup") {
            let otherObject = level.children[row - 1].children[column];
            let hasWall = otherObject.getAttribute("walldown");
            if (hasWall !== null && hasWall !== "") {
                otherObject.setAttribute("walldown", "");
                otherObject.querySelector("img.walldown").src = "";
            }
        }
        else if (elementLayer == "walldown"){
            let otherObject = level.children[row + 1].children[column]
            let hasWall = otherObject.getAttribute("wallup")
            if (hasWall !== null && hasWall !== ""){
                otherObject.setAttribute("wallup", "")
                otherObject.querySelector("img.wallup").src = ""
            }
        }
        else if (elementLayer == "wallleft"){
            let otherObject = level.children[row].children[column - 1]
            let hasWall = otherObject.getAttribute("wallright")
            if (hasWall !== null && hasWall !== ""){
                otherObject.setAttribute("wallright", "")
                otherObject.querySelector("img.wallright").src = ""
            }
        }
        else if (elementLayer == "wallright"){
            let otherObject = level.children[row].children[column + 1]
            let hasWall = otherObject.getAttribute("wallleft")
            if (hasWall !== null && hasWall !== ""){
                otherObject.setAttribute("wallleft", "")
                otherObject.querySelector("img.wallleft").src = ""
            }
        }
    }catch{}

    if (elementLayer == "tile") {
        if (selectedElement === "empty") {
            if (isCake !== undefined && isCake !== "") {
                removeCake(object);
            }

            if (isPortalEntrance) {
                try {
                    removePortal(object, false);
                } catch (err) {}
            }
            if (isPortalExit) {
                try {
                    removePortal(object, true);
                } catch (err) {}
            }

            layers.forEach(function(layer) {
                if (object.hasAttribute(layer) && layer != "tile") {
                    object.setAttribute(layer, "");
                }
            });
            object.childNodes.forEach(function(node) {
                if (!node.classList.contains("selectimg") && !node.classList.contains("tile")) {
                    node.src = "";
                }
            });
            object.setAttribute("color", "");
            return;
        }

        object.setAttribute("tile", selectedElement);
        image.src = elementsFolder + elements_ids[selectedElement] + ".png";

        if (selectedElement === "000") {
            if (isCake !== undefined && isCake !== ""){
                removeCake(object)
            }

            if (isPortalEntrance) {
                removePortal(object,false)
            }

            if (isPortalExit) {
                removePortal(object,true)
            }

            layers.forEach(function(layer){
                if (object.hasAttribute(layer)){
                    object.setAttribute(layer, "")
                }
            })
            object.childNodes.forEach(function(node){
                if (!node.classList.contains("selectimg") && !node.classList.contains("tile")){
                    node.src = ""
                }
            })
            object.setAttribute("color", "")
        }
    }
    if (elementLayer == "sugarcoat"){
        if (object.getAttribute("normal") in coloredCandy || sugarCoatable.includes(object.getAttribute("normal"))){
            object.setAttribute(elementLayer, selectedElement)
            image.src = elementsFolder + elements_ids[selectedElement] + ".png"
        }
        else{
            return
        }
    }
    else if (selectedElement == "035"){
        let level = document.getElementById("level")
    
        if (row >= 8 || column >= 8){
            return
        }
    
        let isCake = object.getAttribute("cake")
        if (isCake !== undefined && isCake !== ""){
            removeCake(object)
        }
        image.src = elementsFolder + "cake_top_left" + ".png"
        image.setAttribute("class", "normal default stretch")
        object.setAttribute("normal", selectedElement)
        object.setAttribute("color", "")
        object.setAttribute("cake", "1")

        let tileList = [[row, column + 1, "cake_top_right", "2"], [row + 1, column, "cake_bottom_left", "3"], [row + 1, column + 1, "cake_bottom_right", "4"]]

        tileList.forEach(function(info){
            try{
                let otherObject = level.children[info[0]].children[info[1]]
                let otherImage = otherObject.querySelector("img.normal")
        
                isCake = otherObject.getAttribute("cake")
                if (isCake !== undefined && isCake !== ""){
                    removeCake(otherObject)
                }
            
                otherImage.src = elementsFolder + info[2] + ".png"
                otherImage.setAttribute("class", "normal default stretch")
                otherObject.setAttribute("normal", selectedElement)
                otherObject.setAttribute("sugarcoat", "")
                otherObject.querySelector("img.sugarcoat").src = ""
                otherObject.setAttribute("color", "")
                otherObject.setAttribute("cake", info[3])
                if (otherObject.getAttribute("tile") === "000"){
                    otherObject.setAttribute("tile", "001")
                    otherObject.querySelector("img.tile").src = elementsFolder + "grid.png"
                }
            }catch{}
        })
    }
    else if (selectedElement == "036"){
        try{
            let prevElm = document.querySelector(".frog")
            prevElm.classList.remove("frog")

            if (prevElm.getAttribute("normal") === "036" || prevElm.getAttribute("normal") === "053"){
               prevElm.setAttribute("normal", "002")
               prevElm.setAttribute("color", selectedColor)
               prevElm.querySelector(".normal").src = elementsFolder + "random.png"
               prevElm.querySelector(".normal").setAttribute("class", "normal default small")
            }
        }catch{}

        let colorName = elements_ids[selectedColor]
        let elementName = ""
        let name = ""
    
        if (selectedColor === "002" && selectedElement === "002"){
            name = "random"
        }
        else if (selectedColor !== "002" && selectedElement === "002"){
            name = colorName
        }
        else{
            elementName = elements_ids[selectedElement] + "_"
            name = elementName + colorName
        }
        
        object.setAttribute(elementLayer, selectedElement)
        object.classList.add("frog")
        image.src = elementsFolder + name + ".png"
    }
    else if (selectedElement == "053"){
        try{
            let prevElm = document.querySelector(".frog")
            console.log(prevElm)
            prevElm.classList.remove("frog")
    
            if (prevElm.getAttribute("normal") === "036" || prevElm.getAttribute("normal") === "053"){
                prevElm.setAttribute("normal", "002")
                prevElm.setAttribute("color", selectedColor)
                prevElm.querySelector(".normal").src = elementsFolder + "random.png"
                prevElm.querySelector(".normal").setAttribute("class", "normal default small")
            }
        }catch{}

        object.classList.add("frog")
        image.src = elementsFolder + elements_ids[selectedElement] + ".png"
        object.setAttribute("normal", selectedElement)
        object.setAttribute("color", "")
    }
    else if (elementLayer == "candy_cannon" && selectedElement != "005"){
        let cannonElements = JSON.parse(object.getAttribute("candy_cannon") || '[]')

        if (!cannonElements.includes(selectedElement)){
            if (!cannonElements.includes("005")){
                cannonElements.push("005")
            }
    
            cannonElements.push(selectedElement)

            object.setAttribute("candy_cannon", JSON.stringify(cannonElements))

            let ammocontainer = object.querySelector(".ammocontainer")

            Array.from(ammocontainer.children).forEach(function(element){
                if (!cannonElements.includes(element.getAttribute("element"))){
                    element.remove()
                }
            })
    
            ammoimage = ammocontainer.appendChild(document.createElement("img"))

            ammoimage.setAttribute("element", selectedElement)

            ammoimage.src = elementsFolder + elements_ids[selectedElement] + ".png"
        }
    }
    else if (selectedElement == "026"){
        let cannonElements = JSON.parse(object.getAttribute("candy_cannon") || '[]')

        if (!cannonElements.includes("005")){
            cannonElements.push("005")
        }

        object.setAttribute("candy_cannon", JSON.stringify(cannonElements))

        object.setAttribute(elementLayer, selectedElement)
        image.src = elementsFolder + elements_ids[selectedElement] + ".png"
    }
    else if (selectedElement == "005"){
        let cannonElements = JSON.parse(object.getAttribute("candy_cannon") || '[]')

        if (!cannonElements.includes("005")){
            cannonElements.push("005")
        }

        let ammocontainer = object.querySelector(".ammocontainer")

        Array.from(ammocontainer.children).forEach(function(element){
            if (!cannonElements.includes(element.getAttribute("element"))){
                element.remove()
            }
        })

        object.setAttribute("candy_cannon", JSON.stringify(cannonElements))
        image.src = elementsFolder + elements_ids[selectedElement] + ".png"
    }
    else if (elementLayer == "normal"){
        image = object.querySelector(".normal")
        if (selectedElement in coloredCandy){
            let colorName = elements_ids[selectedColor]
            let elementName = ""
            let name = ""
    
            if (selectedColor === "002" && selectedElement === "002"){
                name = "random"
            }
            else if (selectedColor !== "002" && selectedElement === "002"){
                name = colorName
            }
            else{
                elementName = elements_ids[selectedElement] + "_"
                name = elementName + colorName
            }
            
            object.setAttribute(elementLayer, selectedElement)
            image.src = elementsFolder + name + ".png"
        }
        else{
            image.src = elementsFolder + elements_ids[selectedElement] + ".png"
        }
    }

    // Handle image sizing
    if (small.includes(selectedElement)) {
        if (!image.classList.contains("small")) {
            image.classList.add("small");
        }
    } else {
        try {
            image.classList.remove("small");
        } catch {}
    }
    
    if (stretched.includes(selectedElement)) {
        if (!image.classList.contains("stretched")) {
            image.classList.add("stretched");
        }
    } else {
        try {
            image.classList.remove("stretched");
        } catch {}
    }

    if (!(object.getAttribute("normal") in coloredCandy) && !(sugarCoatable.includes(object.getAttribute("normal")))) {
        object.setAttribute("sugarcoat", "");
        object.querySelector(".sugarcoat").src = elementsFolder + "none.png";
    }
}

export function updateElmState(object) {
    const selectedColor = getSelectedColor();
    
    if (object.getAttribute("normal") in coloredCandy) {
        let colorId = object.getAttribute("color");
        let objectId = object.getAttribute("normal");

        // Cycle through colors
        if (colorId === "002") {
            colorId = "055";
        } else if (colorId === "055") {
            colorId = "056";
        } else if (colorId === "056") {
            colorId = "057";
        } else if (colorId === "057") {
            colorId = "058";
        } else if (colorId === "058") {
            colorId = "059";
        } else if (colorId === "059") {
            colorId = "060";
        } else if (colorId === "060") {
            colorId = "002";
        }

        object.setAttribute("color", colorId);

        let colorName = elements_ids[colorId];
        let elementName = "";
        let name = "";
    
        if (colorId === "002" && objectId === "002") {
            name = "random";
        } else if (colorId !== "002" && objectId === "002") {
            name = colorName;
        } else {
            elementName = elements_ids[objectId] + "_";
            name = elementName + colorName;
        }
        object.querySelector(".normal").src = elementsFolder + name + ".png";
    }
}