import { updateTile, updateElmState } from '../managers/tile-operations.js';
import { gameState } from '../managers/state-manager.js';

export function setupCellEventListeners(cell) {
    cell.addEventListener('contextmenu', handleContextMenu, false);
    cell.addEventListener('mouseover', handleMouseOver);
    cell.addEventListener('mousedown', handleMouseDown);
    cell.addEventListener('mouseout', handleMouseOut);
}

function handleContextMenu(ev) {
    ev.preventDefault();
    let object = ev.target.nodeType === "td" ? ev.target : ev.target.parentNode;
    updateElmState(object);
}

function handleMouseOver(event) {
    event.preventDefault();
    this.classList.add("selected");
    if (gameState.isDown) {
        updateTile(this);
    }
}

function handleMouseDown(event) {
    event.preventDefault();
    if (event.button === 0) {
        event.preventDefault();
        gameState.isDown = true;
        updateTile(this);
    }
}

function handleMouseOut(event) {
    event.preventDefault();
    try {
        this.classList.remove("selected");
    } catch {}
}

// Global mouse up handler
export function setupGlobalEventListeners() {
    document.addEventListener('mouseup', function() {
        gameState.isDown = false;
        gameState.isPortalTimeout = false;
    }, true);

    // Window resize handler
    window.onresize = function() {
        resized();
    };
}

function resized() {
    let width = window.innerWidth * .00078;
    let height = window.innerHeight * .00078;

    document.documentElement.style.setProperty("--scaleWidth", width);
    document.documentElement.style.setProperty("--scaleHeight", height);
}

// Initialize resize on load
resized();