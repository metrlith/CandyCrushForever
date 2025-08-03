import { createNewTable, resized } from '../utils/level-grid.js';
import { updateColor, updateSelection } from '../managers/ui-manager.js';
import { elementsFolder } from '../core/constants.js';
import { setupGlobalEventListeners } from '../utils/event-handlers.js';

export function initializeColorButtons() {
    document.querySelectorAll(".selectcolor").forEach(function(element) {
        let color = element.getAttribute("color");
        let parent = element.parentElement;

        let button = document.createElement('button');
        let image = button.appendChild(document.createElement("img"));
        image.classList.add("selectionimage");
        image.src = elementsFolder + color + ".png";

        button.addEventListener('click', () => updateColor(button, color));

        element.remove();
        parent.appendChild(button);
    });
}

export function initializeColoredElements() {
    document.querySelectorAll(".selectcoloredelement").forEach(function(element) {
        let elementName = element.getAttribute('element');
        let parent = element.parentElement;

        let button = document.createElement('button');
        let image = button.appendChild(document.createElement("img"));
        image.classList.add("selectionimage");
        image.src = elementsFolder + elementName + "_random.png";

        button.addEventListener('click', () => updateSelection(button, elementName, 'normal'));

        element.remove();
        parent.appendChild(button);
    });
}

export function initializeElements() {
    document.querySelectorAll(".selectelement").forEach(function(element) {
        let elementName = element.getAttribute('element');
        let parent = element.parentElement;

        let button = document.createElement('button');
        let layer = element.getAttribute("gamelayer");

        if (layer == "candy_cannon" && element.getAttribute('element') != "candy_cannon") {
            let ammoImage = button.appendChild(document.createElement("img"));
            ammoImage.setAttribute("style", "max-width: 40px; position: absolute; height: 40px; pointer-events: none;");
            ammoImage.src = elementsFolder + "/ammo.png";
        }

        let image = button.appendChild(document.createElement("img"));
        image.classList.add("selectionimage");
        image.src = elementsFolder + elementName + ".png";

        button.addEventListener('click', () => updateSelection(button, elementName, layer));

        element.remove();
        parent.appendChild(button);
    });
}

export function initializeCannonPreferences() {
    document.querySelectorAll(".cannonpref").forEach(function(element) {
        let elm = element.getAttribute("elm");
        let imageSrc = element.getAttribute("image");
        let tick = element.getAttribute("tick");

        element.innerHTML = '<td> <img class="elmimg" style="max-width: 70%;"> </td> <td> <input class="max" style="width: 50px; text-align: center;" placeholder="0" type="number"> </td> <td> <input class="spawn" style="width: 50px; text-align: center;" placeholder="0" type="number"> </td> <td> <input class="tick" style="width: 50px; text-align: center;" placeholder="0" type="number"> </td>';

        element.querySelector(".elmimg").src = imageSrc;
        element.querySelector(".max").id = elm + "Max";
        element.querySelector(".spawn").id = elm + "Spawn";
        if (tick != "") {
            element.querySelector(".tick").id = elm + tick;
        } else {
            element.querySelector(".tick").style.display = "none";
        }
    });
}

// Initialize the application
function init() {
    createNewTable();
    initializeColorButtons();
    initializeColoredElements();
    initializeElements();
    initializeCannonPreferences();
    resized();
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

setupGlobalEventListeners();