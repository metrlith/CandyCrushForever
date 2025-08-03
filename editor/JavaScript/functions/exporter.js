function exportLevel(){
    let levelArray = []
    let levelObject = document.getElementById("level")
    let level = {}
    level['portals'] = []
    if (currentMode.includes("Rainbow Rapids")) {
        level.rainbowRapidsTargets = 0
    }
    levelObject.childNodes.forEach(function(row){
        rowArray = []
        for (var i = 0; i < row.childNodes.length; i++){
            let object = row.childNodes[i]

            if (object.getAttribute("tile") == "000"){
                rowArray.push("000")
                continue
            }
            let candyCannon = JSON.parse(object.getAttribute("candy_cannon") || '[]')
            if (currentMode !== "Classic" && currentMode !== "Jelly Time" && currentMode !== "Order Time" && currentMode !== "Drop Time" && currentMode !== "Jelly Color Time" && candyCannon.includes('069')) {
                //let j=0
                for (let cannon of candyCannon) {
                    if (cannon==='069') {
                        candyCannon[i]='069'
                    }
                    //j++
                }
            }
            console.log(candyCannon)
            let totalCode = [].concat(candyCannon)

            let toLoopThrough = [].concat(layers, ["color"])

            toLoopThrough.splice(toLoopThrough.indexOf("candy_cannon"), 1)
            
            toLoopThrough.forEach(function(layer){
                //i is column
                //levelArray.length is row
                let element = ""
                if (object.hasAttribute(layer)){
                    element = object.getAttribute(layer)
                }
                else{
                    return
                }

                if (currentMode.includes("Rainbow Rapids") && element=="156") {
                    level.rainbowRapidsTargets++
                }

                if (currentMode !== "Classic" && currentMode !== "Jelly Time" && currentMode !== "Order Time" && currentMode !== "Drop Time" && currentMode !== "Jelly Color Time") {
                    if (element==='050') {
                        element='084'
                    }
                }
 
                if (element=="991" || element=="015") {
                    //element="011991"
                }

                if (element=="990" || element=="014") {
                    let row2 = parseInt(object.getAttribute('portalexitrow'))
                    let col2 = parseInt(object.getAttribute('portalexitcol'))
                    let portal = [[i,levelArray.length],[col2,row2]]
                    if (element=='990') {
                        portal[0][2]=14
                        portal[1][2]=14
                    }
                    level.portals.push(portal)
                    //element='011990'
                }

                if (!totalCode.includes(element) && element != ""){
                    totalCode.push(element)
                }
            })

            if (object.getAttribute("normal") !== "002" && object.getAttribute("color") == "002"){
                totalCode.splice(totalCode.indexOf("002"), 1)
            }
            
            if (totalCode.includes("001") && totalCode.length != 1){
                totalCode.splice(totalCode.indexOf("001"), 1)
            }

            rowArray.push(totalCode.join(""))
        }
        levelArray.push(rowArray)
    })
    level['tileMap'] = levelArray
    level['numberOfColours'] = preferredColors.length
    level['enableSugarTrack'] = document.getElementById("enablesugardrops").checked
    level['preferredColors'] = preferredColors


    level['colorWeightAdjustments'] = [0]

    let star1 = Number(document.getElementById("star1").value) || 1000
    let star2 = Number(document.getElementById("star2").value) || 2000
    let star3 = Number(document.getElementById("star3").value) || 3000

    level['scoreTargets'] = [star1, star2, star3]

    level['protocolVersion'] = "0.3"
    level['randomSeed'] = 0

    level['gates'] = []
    level['orlocks'] = []
    level['skulls'] = []

    if (currentMode === "Classic" || currentMode === "Jelly Time" || currentMode === "Order Time" || currentMode === "Drop Time" || currentMode === "Jelly Color Time"){
        let time = document.getElementById("time").value
        if (time === ''){
            time = 30
        }
        else{
            time = Number(time)
        }
        level['timeLimit'] = time
    }
    else{
        let moves = document.getElementById("moves").value
        if (moves === ''){
            moves = 15
        }
        else{
            moves = Number(moves)
        }

        level['moveLimit'] = moves
        
    }
    {
        let frogstomachsize = document.getElementById("frogstomachsize").value
        if (frogstomachsize === ''){
            frogstomachsize = 13
        }
        else{
            frogstomachsize = Number(frogstomachsize)
        }

        level['frogStomachSize'] = frogstomachsize
        
    }
    
    





    if (currentMode.includes('Drop down') || currentMode.includes('Drop Down') || currentMode.includes('Super Mix') || currentMode.includes('Order Drop') || currentMode.includes('Jelly Color Drop')){
        let hazelnuts = 0
        let cherries = 0
        let butters = 0
        let liquorice_roots = 0
        let almonds = 0

        let requirementsContainer = document.getElementById("requirements")
        for (var i = 0; i < requirementsContainer.children.length; i++){
            element = requirementsContainer.children[i]

            if (element.getAttribute("reqtype") !== "ingredient"){
                continue
            }

            let item = element.querySelector("select").value

            let quantity = element.querySelector("input").value
            if (quantity === ''){
                quantity = 0
            }
            else{
                quantity = Number(quantity)
            }

            console.log(item)

            if (item == "cherry"){
                cherries = quantity
            }
            else if (item == "hazelnut"){
                hazelnuts = quantity
            }
            else if (item == "butter"){
                butters = quantity
            }
            else if (item == "liquorice_root"){
                liquorice_roots = quantity
            }
            else if (item == "almond"){
                almonds = quantity
            }
        }

        level.numIngredientsOnScreen = parseInt(document.getElementById('numIngredientsOnScreen').value) || 0
        level.maxNumIngredientsOnScreen = parseInt(document.getElementById('maxNumIngredientsOnScreen').value) || 0
        level.ingredientSpawnDensity = parseInt(document.getElementById('ingredientSpawnDensity').value) || 0

        level['ingredients'] = [hazelnuts, cherries, butters, liquorice_roots, almonds]
    }

    if (currentMode.includes('Order') || currentMode.includes('Super Mix')){
        let orders = []
        let requirementsContainer = document.getElementById("requirements")
        for (var i = 0; i < requirementsContainer.children.length; i++){
            element = requirementsContainer.children[i]

            if (element.getAttribute("reqtype") !== "order"){
                continue
            }

            let item = Number(element.querySelector("select").value)

            let quantity = element.querySelector("input").value
            if (quantity === ''){
                quantity = 0
            }
            else{
                quantity = Number(quantity)
            }

            orders.push({"item": item, "quantity": quantity})
        }

        level['_itemsToOrder'] = orders
    }

    level['gameModeName'] = currentMode

    level['episodeId'] = 0

    level["evilSpawnerAmount"] = parseInt(document.getElementById('evilSpawnerAmount').value) || 3

    let magicMixerElements = []
    let mixerElementsContainer = document.getElementById("mixeroptions")
    for (var i = 0; i < mixerElementsContainer.children.length; i++){
        element = mixerElementsContainer.children[i]

        let item = Number(element.querySelector("select").value)

        magicMixerElements.push(item)
    }

    level["evilSpawnerElements"] = magicMixerElements
    level["evilSpawnerInterval"] = parseInt(document.getElementById('evilSpawnerInterval').value) || 3

    //Add cannon preferences
    cannonCodes.forEach(function(nameArray){
        let elm = nameArray[0]

        let cannonSettingAddons = ["Max", "Spawn", ""]

        cannonSettingAddons.push(nameArray[1])

        cannonSettingAddons.forEach(function(setting){
            //console.log(elm + setting)
            let inputElement = document.getElementById(elm + setting)
            if (inputElement != null && inputElement.value != ""){
                level[elm + setting] = Number(inputElement.value) || 0
            }
        })
    })

    //dreamworld
    if (document.getElementById("isOwlModeEnabled").checked) {
        level.isOwlModeEnabled = true
        level.initialMovesUntilMoonStruck = parseInt(document.getElementById("initialMovesUntilMoonStruck").value) || 5
        level.initialMovesDuringMoonStruck = parseInt(document.getElementById("initialMovesDuringMoonStruck").value) || 3
        level.maxAllowedScaleDiff = parseInt(document.getElementById('maxAllowedScaleDiff').value) || 10
        level.leftWeightToTriggerMoonStruck = 0
        level.rightWeightToTriggerMoonStruck = 0
        level.totalWeightToTriggerMoonStruck = 0
        level.useSplitWeightConditionToTriggerMoonStruck = false
        level.useTotalWeightConditionToTriggerMoonstruck = false
    }
    return level
}

function exportLevelUI(){
    let level = exportLevel()
    document.getElementById("exportfield").value = JSON.stringify(level)
    document.getElementById("exportmenu").style.display = "block"
}