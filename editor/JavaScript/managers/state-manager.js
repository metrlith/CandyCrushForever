import { elements_ids, stretched, small, sugarCoatable } from '../core/constants.js';

export let gameState = {
    elementLayer: 'normal',
    selectedElement: '002',
    selectedColor: '002',
    isPortalTimeout: false,
    lastPortalObject: null,
    isDown: false,
    currentMode: 'Classic moves',
    preferredColors: [0,1,2,3,4]
};

export function updateGameState(key, value) {
    gameState[key] = value;
}

export function getGameState(key) {
    return gameState[key];
}

export function setElementLayer(layer) {
    gameState.elementLayer = layer;
}

export function setSelectedElement(element) {
    gameState.selectedElement = element;
}

export function setSelectedColor(color) {
    gameState.selectedColor = color;
}

export function getElementLayer() {
    return gameState.elementLayer;
}

export function getSelectedElement() {
    return gameState.selectedElement;
}

export function getSelectedColor() {
    return gameState.selectedColor;
}

export function getCurrentMode() {
    return gameState.currentMode;
}

export function setCurrentMode(mode) {
    gameState.currentMode = mode;
}

export function getPreferredColors() {
    return gameState.preferredColors;
}

export function setPreferredColors(colors) {
    gameState.preferredColors = colors;
}

export function setLastPortalObject(obj) {
    gameState.lastPortalObject = obj;
}

export function getLastPortalObject() {
    return gameState.lastPortalObject;
}

export { stretched, small, sugarCoatable };