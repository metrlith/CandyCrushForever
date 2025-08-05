import { gameState, updateGameState, setElementLayer, setSelectedElement, setSelectedColor, setCurrentMode, getPreferredColors } from './state-manager.js';
import { removePortal } from './tile-operations.js';
import { elements_ids, orderItems, magicMixerItems, coloredCandy, elementsFolder } from '../core/constants-test.js';

export function updateSelection(object, element, layer) {
    if (object) {
        try {
            document.querySelector(".elementselected").classList.remove("elementselected");
        } catch {}
        object.classList.add("elementselected");
    }
    setSelectedElement(elements_ids[element] ? elements_ids[element] : element);
    setElementLayer(layer);
    
    if (gameState.lastPortalObject && layer !== 'portal_exit' && layer !== 'portal_entrance') {
        removePortal(gameState.lastPortalObject);
    }
}

export function updateColor(object, color) {
    try {
        document.querySelector(".colorselected").classList.remove("colorselected");
    } catch {}
    object.classList.add("colorselected");
    setSelectedColor(elements_ids[color]);
}

export function switchedRequirement(object) {
    document.getElementById("requirementwarning").style.display = "none";
    let requirement = object.value;
    let image = object.parentNode.querySelector("img");
    image.src = "ui/hud/" + orderItems[requirement] + ".png";
}

export function switchedRequirementIngredient(object) {
    document.getElementById("requirementwarning").style.display = "none";
    let requirement = object.value;
    let image = object.parentNode.querySelector("img");
    image.src = "ui/hud/" + requirement + ".png";
}

export function removeRequirement(object) {
    object.parentNode.remove();
    document.getElementById("requirementwarning").style.display = "none";
}

export function addRequirement(isIngredient = false, ignoreLimit = false) {
    let requirementsObj = document.getElementById("requirements");

    if (!ignoreLimit) {
        if (requirementsObj.childNodes.length > 100) {
            document.getElementById("requirementwarning").style.display = "block";
            return;
        } else {
            document.getElementById("requirementwarning").style.display = "none";
        }
    }
    
    let section = document.createElement("div");
    section.classList.add("sideoptions");
    let typeText = "Order";
    section.setAttribute("reqtype", "order");
    if (isIngredient) {
        typeText = "Ingredient";
        section.setAttribute("reqtype", "ingredient");
    }
    section.innerHTML = '<button style="position: 102px; right: 90px; top: 20px; border-radius: 50%; background-color: #00000090; width: 35px; height: 35px; font-size: 1.2em; color: white; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center;" onclick="removeRequirement(this)">✖</button> <p class="BananaSplit break" style="font-weight: bold; color: white; text-align: center;">Requirement:</p> <img src="ui/hud/red.png" style="max-width: 30px; max-height: 30px;"> <p class="BananaSplit" style="margin: 10px; display: block; color: white; text-align: center;">' + typeText + ':</p> <select onchange="switchedRequirement(this)"> </select> <div class="break"></div> <img src="ui/btn_quit.png" style="max-width: 0px; max-height: 0px;"> <p class="BananaSplit" style="margin: 10px; display: block; color: white; text-align: center;">X Amount:</p> <input style="width: 50px; text-align: center;" placeholder="0" type="number">';

    let select = section.querySelector("select");
    if (!isIngredient) {
        Object.keys(orderItems).forEach(function(key) {
            let option = document.createElement("option");
            option.value = key;
            option.innerHTML = orderItems[key];
            select.appendChild(option);
        });
    } else {
        select.setAttribute("onchange", "switchedRequirementIngredient(this)");
        section.querySelector("img").src = "ui/hud/cherry.png";

        let ingredients = ["cherry", "hazelnut", "butter", "liquorice_root", "almond"];
        ingredients.forEach(ingredient => {
            let option = document.createElement("option");
            option.value = ingredient;
            option.innerHTML = ingredient;
            select.appendChild(option);
        });
    }
    requirementsObj.prepend(section);
}

export function switchedMixerOption(object) {
    document.getElementById("requirementwarning").style.display = "none";
    let requirement = object.value;
    let image = object.parentNode.querySelector("img");
    image.src = "ui/hud/" + magicMixerItems[requirement] + ".png";
}

export function addMixerOption() {
    let requirementsObj = document.getElementById("mixeroptions");
    
    let section = document.createElement("div");
    section.classList.add("sideoptions");
    section.setAttribute("reqtype", "mixeroption");
    section.innerHTML = '<button style="position: 102px; right: 90px; top: 20px; border-radius: 50%; background-color: #00000090; width: 35px; height: 35px; font-size: 1.2em; color: white; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center;" onclick="removeRequirement(this)">✖</button><div class="break"></div><img src="ui/hud/All Blockers.png" style="max-width: 30px; max-height: 30px;"><p class="BananaSplit" style="margin: 10px; display: block; color: white; text-align: center;">Blocker:</p><select onchange="switchedMixerOption(this)"></select><div class="break"></div>';

    let select = section.querySelector("select");

    Object.keys(magicMixerItems).forEach(function(key) {
        let option = document.createElement("option");
        option.value = key;
        option.innerHTML = magicMixerItems[key];
        select.appendChild(option);
    });
    
    requirementsObj.prepend(section);
}

export function selectMode() {
    const mode = document.querySelector('input[name="leveltype"]:checked').value;
    
    if (mode === "Classic" || mode == "Jelly Time" || mode == "Drop Time" || mode == "Order Time" || mode == "Jelly Color Time") {
        document.getElementById("moves-section").style.display = "none";
        document.getElementById("time-section").style.display = "flex";
    } else {
        document.getElementById("moves-section").style.display = "flex";
        document.getElementById("time-section").style.display = "none";
    }

    document.getElementById("requirements-options-section").style.display = "none";

    if (mode.includes('Drop down') || mode.includes('Jelly Drop') || mode.includes('Order Drop') || mode.includes('Super Mix') || mode.includes('Drop Time') || mode.includes('Jelly Color Drop')) {
        document.getElementById("requirements-options-section").style.display = "block";
        document.getElementById("addingredient").style.display = "block";
    } else {
        document.getElementById("addingredient").style.display = "none";
        let requirementsContainer = document.getElementById("requirements");
        Array.from(requirementsContainer.children).forEach(function(child) {
            if (child.getAttribute("reqtype") == "ingredient") {
                child.remove();
            }
        });
    }

    if (mode.includes('Order') || mode.includes('Super Mix') || mode.includes('Jelly Color Order')) {
        document.getElementById("requirements-options-section").style.display = "block";
        document.getElementById("addorder").style.display = "block";
    } else {
        document.getElementById("addorder").style.display = "none";
        let requirementsContainer = document.getElementById("requirements");
        Array.from(requirementsContainer.children).forEach(function(child) {
            if (child.getAttribute("reqtype") == "order") {
                child.remove();
            }
        });
    }

    setCurrentMode(mode);
}

export function togglePreferred(object) {
    const color = Number(object.getAttribute("value"));
    const preferredColors = getPreferredColors();

    if (!preferredColors.includes(color)) {
        if (!(object.classList.contains("preferredselected"))) {
            object.classList.add("preferredselected");
        }
        preferredColors.push(color);
    } else {
        object.classList.remove("preferredselected");
        preferredColors.splice(preferredColors.indexOf(color), 1);
    }
    
    setPreferredColors(preferredColors);
}

export function toggleDropdown(object) {
    let dropped = document.getElementById(object.getAttribute("associd"));
    let p = object.querySelector(".arrow");
    
    if (dropped.style.display == "none") {
        dropped.style.display = "block";
        p.style.transform = "rotate(" + 0 + "deg)";
    } else {
        dropped.style.display = "none";
        p.style.transform = "rotate(" + 90 + "deg)";
    }
}

export function toggleDreamworld(object) {
    document.getElementById("dreamworldoptions").style.display = object.checked ? "block" : "none";
}

export function updateElmState(object){
    if (object.getAttribute("normal") in coloredCandy){
        let colorId = object.getAttribute("color");
        let objectId = object.getAttribute("normal");

        if (colorId === "002"){
            colorId = "055"
        }
        else if (colorId === "055"){
            colorId = "056"
        }
        else if (colorId === "056"){
            colorId = "057"
        }
        else if (colorId === "057"){
            colorId = "058"
        }
        else if (colorId === "058"){
            colorId = "059"
        }
        else if (colorId === "059"){
            colorId = "060"
        }
        else if (colorId === "060"){
            colorId = "002"
        }


        object.setAttribute("color", colorId)

        let colorName = elements_ids[colorId]
        let elementName = ""
        let name = ""
    
        if (colorId === "002" && objectId === "002"){
            name = "random"
        }
        else if (colorId !== "002" && objectId === "002"){
            name = colorName
        }
        else{
            elementName = elements_ids[objectId] + "_"
            name = elementName + colorName
        }
        object.querySelector(".normal").src = elementsFolder + name + ".png"
    }
}