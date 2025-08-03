import { toggleDreamworld, selectMode, togglePreferred, toggleDropdown } from '../managers/ui-manager.js';
import { addRequirement, addMixerOption, removeRequirement, switchedRequirement, switchedRequirementIngredient, switchedMixerOption } from '../managers/ui-manager.js';
import { displayImportLevelUI, importLevelUI, exportLevelUI } from '../managers/level-manager.js';

window.toggleDreamworld = toggleDreamworld;
window.selectMode = selectMode;
window.togglePreferred = togglePreferred;
window.toggleDropdown = toggleDropdown;
window.addRequirement = addRequirement;
window.addMixerOption = addMixerOption;
window.removeRequirement = removeRequirement;
window.switchedRequirement = switchedRequirement;
window.switchedRequirementIngredient = switchedRequirementIngredient;
window.switchedMixerOption = switchedMixerOption;
window.displayImportLevelUI = displayImportLevelUI;
window.importLevelUI = importLevelUI;
window.exportLevelUI = exportLevelUI;