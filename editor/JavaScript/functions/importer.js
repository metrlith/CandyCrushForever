function importLevel(levelData){
    let originalLevel = document.getElementById("level")
    let levelParent = originalLevel.parentElement;
    originalLevel.id = "levelold"
    originalLevel.style.display = "none"

    let origColor = selectedColor
    let origLayer = elementLayer
    let origElement = selectedElement

    let newLevel = levelParent.appendChild(document.createElement("table"))
    newLevel.id = "level"
    newLevel.setAttribute("cellspacing", "0")
    createNewTable(true)

    levelArray = levelData['tileMap']

    try{
        let levelObject = newLevel
        let childrenRows = [].slice.call(levelObject.children)
        //console.log(childrenRows)
        let blacklistedCake = []
        childrenRows.forEach(function(row, rIndex){
            let objects = [].slice.call(row.children)
            let color = "002"
    
            objects.forEach(function(object, cIndex){
                //Split object into array of parts of 3
                try{
                    textObject = levelArray[rIndex][cIndex].match(/.{1,3}/g)
                }
                catch{
                    throw "This level has a grid bigger than 9x9"
                }

                textObject.forEach(function(objectId, index){
                    if (objectId in colors){
                        color = objectId
                        if (objectId != "002")
                        textObject.splice(index, 1)
                    }
                })
    
                textObject.forEach(function(objectId){
                    if (objectId.length !== 3){
                        throw "An object ID is not 3 characters long."
                    }

                    if (objectId == "002" && object.getAttribute("normal") != undefined){
                        return
                    }

                    if (objectId === "069") objectId="069"
                    if (objectId === '050') objectId='050'

                    //portals are dealt with later
                    if (objectId === '011' || objectId==='990'||objectId==='991'||objectId==='014'||objectId==='015') {
                        return
                    }

                    if (objectId == "035"){
                        if (blacklistedCake.includes(String(rIndex) + String(cIndex))){
                            return
                        }
                        else{
                            if (cIndex == 8 || rIndex == 8){
                                return
                            }
                            else{
                                blacklistedCake.push(String(rIndex) + String(cIndex + 1))
                                blacklistedCake.push(String(rIndex + 1) + String(cIndex))
                                blacklistedCake.push(String(rIndex + 1) + String(cIndex + 1))
                            }
                        }
                    }

                    
    
                    let layer = getLayerFromId(objectId)
                    selectedColor = color
                    elementLayer = layer
                    selectedElement = objectId
                    
                    try{
                        updateTile(object)
                    }
                    catch{
                        elementLayer = "tile"
                        selectedElement = "none"
                    }
                })
            })
        })
        if (levelData.portals) {
            for (let portal of levelData.portals) {
                //console.log(portal)
                elementLayer = 'portal_entrance'
                if (portal[0][2]==14) {
                    selectedElement = '990'
                } else {
                    selectedElement = '014'
                }
                
                try {
                    updateTile([].slice.call(childrenRows[portal[0][1]].children)[portal[0][0]])
                    isPortalTimeout=false
                }
                catch (err) {
                    console.warn(err)
                    elementLayer = "tile"
                    selectedElement = "none"
                }

                elementLayer = 'portal_exit'
                if (portal[1][2]==14) {
                    selectedElement = '991'
                } else {
                    selectedElement = '015'
                }
                
                try {
                    updateTile([].slice.call(childrenRows[portal[1][1]].children)[portal[1][0]])
                    isPortalTimeout=false
                }
                catch (err) {
                    console.warn(err)
                    elementLayer = "tile"
                    selectedElement = "none"
                }
            }
        }


        originalLevel.remove()
        newLevel.style.display = "block"
    }
    catch(err){
        //alert(err.stack)
        console.log(err)
        newLevel.remove()
        originalLevel.id = "level"
        originalLevel.style.display = "block"
        throw(err)
    }
    
    //Set game mode
    let wantedMode = levelData['gameModeName']
    let wantedModeInput = document.getElementById("modeselection").querySelector('input[value="' + String(wantedMode) + '"]')
    if (wantedModeInput != null){
        wantedModeInput.click()
    }

    //Set moves & time
    document.getElementById("moves").value = levelData.moveLimit || ""
    document.getElementById("time").value = levelData.timeLimit || ""
    document.getElementById("frogStomachSize").value = levelData.frogStomachSize || ""
    

    //Set preferred colors
    let colorspref = document.getElementById("colorspref-section")
    preferredColors = levelData.preferredColors || [0,1,2,3,4]
    for (let i = 0; i < 6; i++){
        let prefbutton = colorspref.querySelector('button[value="' + String(i) + '"]')
        if (preferredColors.includes(i)){
            if (!prefbutton.classList.contains("preferredselected")){
                prefbutton.classList.add("preferredselected")
            }
        }
        else{
            if (prefbutton.classList.contains("preferredselected")){
                prefbutton.classList.remove("preferredselected")
            }
        }
    }
    
    
    //Add requirements
    let requirementsContainer = document.getElementById("requirements")

    Array.from(requirementsContainer.children).forEach(function(child){
        child.remove()
    })

    //Set Pre Level Booster
    try{
        document.getElementById("enablesugardrops").checked = levelData.enableSugarTrack || true
    } 
    catch{
        document.getElementById("enablesugardrops").checked = true
    }

    //Set score targets
    let scoreTargets = levelData.scoreTargets || []
    document.getElementById("star1").value = scoreTargets[0] || ''
    document.getElementById("star2").value = scoreTargets[1] || ''
    document.getElementById("star3").value = scoreTargets[2] || ''


    let ingredientOrder = {0: "hazelnut", 1: "cherry", 2: "butter", 3: "liquorice_root", 4: "almond"}
    if (wantedMode.includes('Drop down') || wantedMode.includes('Drop Down') || wantedMode.includes('Super Mix') || wantedMode.includes('Order Drop') || wantedMode.includes('Jelly Color Drop')){
        (levelData.ingredients || []).forEach(function(quantity, index){
            try{
                if (quantity == 0){
                    return
                }
                let item = ingredientOrder[index]

                addRequirement(true, true, true)

                let requirementNode = requirementsContainer.children[0]
                let selectNode = requirementNode.querySelector("select")
                selectNode.value = item
                switchedRequirementIngredient(selectNode)

                requirementNode.querySelector("input").value = quantity
            }catch{}
        })
    }
    if (wantedMode.includes('Order') || wantedMode.includes('Super Mix') || wantedMode.includes('Jelly Color Order')){
        (levelData._itemsToOrder || []).forEach(function(itemDict){
            try{
                let item = itemDict['item']
                let quantity = itemDict['quantity']

                addRequirement(false, true)

                let requirementNode = requirementsContainer.children[0]
                let selectNode = requirementNode.querySelector("select")
                selectNode.value = item
                switchedRequirement(selectNode)

                requirementNode.querySelector("input").value = quantity
            }catch{}
        })
    }

    let mixerElementsContainer = document.getElementById("mixeroptions");

    Array.from(mixerElementsContainer.children).forEach(function(child){
        child.remove()
    });

    (levelData.evilSpawnerElements || []).forEach(function(item){
        try{

            addMixerOption()

            let requirementNode = mixerElementsContainer.children[0]
            let selectNode = requirementNode.querySelector("select")
            selectNode.value = item
            switchedMixerOption(selectNode)
        }catch{}
    })

    //Set cannon preferences
    cannonCodes.forEach(function(nameArray){
        let elm = nameArray[0]

        let cannonSettingAddons = ["Max", "Spawn"]

        cannonSettingAddons.push(nameArray[1])

        cannonSettingAddons.forEach(function(setting){
            let inputElement = document.getElementById(elm + setting)
            
            if (inputElement != null){
                inputElement.value = levelData[elm + setting] || ""
            }
        })
    })

    //Set element selection back
    selectedColor = origColor
    elementLayer = origLayer
    selectedElement = origElement

    //set dreamworld settings
    //set it to the opposite then click it so it applies the hide or show part of the menu
    document.getElementById('isOwlModeEnabled').checked = levelData.isOwlModeEnabled
    document.getElementById("dreamworldoptions").style.display = levelData.isOwlModeEnabled ? "block" : "none"
    document.getElementById("initialMovesUntilMoonStruck").value = levelData.initialMovesUntilMoonStruck || ''
    document.getElementById("initialMovesDuringMoonStruck").value = levelData.initialMovesDuringMoonStruck || ''
    document.getElementById('maxAllowedScaleDiff').value = levelData.maxAllowedScaleDiff || ''

    //set last portal to none
    lastPortalObject = undefined
}

function displayImportLevelUI(){
    document.getElementById("importmenu").style.display = "block"
}

function importLevelUI(){
    try{
        let importField = document.getElementById("importfield")
        importLevel(JSON.parse(importField.value))
        document.getElementById("importerror").style.display = "none"
        importField.value = ""
        document.getElementById("importmenu").style.display = "none"
    }
    catch(err) {
        //alert(err.stack)
        let errorPara =  document.getElementById("importerror")
        errorPara.style.display = "block"
        errorPara.innerHTML = err
    }
}