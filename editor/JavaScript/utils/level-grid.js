import { GRID_SIZE, elements_ids, layers, elementsFolder } from '../core/constants.js';
import { updateTile, updateElmState } from '../managers/tile-operations.js';
import { gameState } from '../managers/state-manager.js';

export function createNewTable(clear = false) {
    var levelTable = document.getElementById('level');
    
    const existingCells = levelTable.querySelectorAll('td');
    existingCells.forEach(cell => {
        cell.replaceWith(cell.cloneNode(true));
    });
    
    levelTable.innerHTML = "";
    
    for (let i = 0; i < GRID_SIZE; i++) {
        var row = document.createElement("tr");
        levelTable.appendChild(row);
        
        for (let g = 0; g < GRID_SIZE; g++) {
            var object = document.createElement("td");
            object.setAttribute("style", "position: relative; left: 0; top: 0;");
            object.setAttribute("pos-row", i);
            object.setAttribute("pos-col", g);
            object.setAttribute("candy_cannon", '');
            
            // Set default attributes
            layers.forEach(function(layer) {
                object.setAttribute(layer, "");
            });
            
            // Event listeners
            object.addEventListener('contextmenu', function(ev) {
                ev.preventDefault();
                let object = ev.target;
                if (object.nodeType != "td") {
                    object = object.parentNode;
                }
                updateElmState(object);
            }, false);

            object.addEventListener('mouseover', function(event) {  
                event.preventDefault();  
                this.classList.add("selected");
                if (gameState.isDown) {
                    updateTile(this);
                }
            });

            object.addEventListener('mousedown', function(event) {
                event.preventDefault();
                if (event.button === 0) {
                    event.preventDefault();
                    gameState.isDown = true;
                    updateTile(this);
                }
            });

            object.addEventListener('mouseout', function(event) {  
                event.preventDefault();  
                try {
                    this.classList.remove("selected");
                } catch {}
            });
            
            if (!clear) {
                object.setAttribute('normal', "002");
                object.setAttribute('color', "002");
            }
            object.setAttribute('tile', "001");

            let ammo = object.appendChild(document.createElement("div"));
            ammo.classList.add("ammocontainer");

            // Create image elements for each layer
            layers.forEach(function(layer) {
                let image = document.createElement("img");
                image.setAttribute('draggable', false);
                image.classList.add(layer, "default");
                object.appendChild(image);
            });

            let image = object.querySelector(".tile");
            image.src = 'elements/grid.png';
            image.classList.remove("default");

            if (!clear) {
                if (i === 0) {
                    image = object.querySelector(".candy_entrance");
                    image.src = elementsFolder + "candy_entrance.png";
                    object.setAttribute("candy_entrance", "026");
                    object.setAttribute("candy_cannon", '["005"]');
                }
                
                image = object.querySelector(".normal");
                image.src = elementsFolder + elements_ids["002"] + ".png";
                image.classList.add("small");
            }

            image = object.querySelector(".selectimg");
            image.src = elementsFolder + "select.png";
            image.style.display = "none";

            row.appendChild(object);
        }
    }
}

export function resized() {
    let container = document.getElementById("level");
    let width = window.innerWidth * SCALE_FACTOR_WIDTH;
    let height = window.innerHeight * SCALE_FACTOR_HEIGHT;

    document.documentElement.style.setProperty("--scaleWidth", width);
    document.documentElement.style.setProperty("--scaleHeight", height);
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Setup resize handler with debouncing
window.onresize = debounce(resized, 100);

// Global mouse events
document.addEventListener('mouseup', function() {
    gameState.isDown = false;
    gameState.isPortalTimeout = false;
}, true);