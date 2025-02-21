function removeAllChildrenNodes(nodeId) {
    const node = document.getElementById(nodeId);
    // console.log('Children of node ' + nodeId + ' will be removed');
    node.innerHTML = '';
}

function removeChildrenNodes(nodeId, subNode) {
    const node = document.getElementById(nodeId);
    // console.log('Children of node ' + nodeId + ' in the subnode ' + subNode + ' will be removed');
    children = node.querySelectorAll('.' + subNode);
    // console.log('Found ' + children)
    children.forEach((child, ind) => {
        child.remove();
    });
    
    // console.log('Removed');
}

function boolToCheckString(checkedStated) {
    if (checkedStated) {
        return "checked";
    }
    else {
        return "";
    }
}

// Foundation spot footing
function addSpotFooting() {
    const spotFootingSection = document.getElementById('spotFootingsSection');
    const count = spotFootingSection.getElementsByClassName('spotFooting').length + 1;
    const newSpotFooting = `
        <div class="spotFooting">
            <h3>Spot Footing ${count}</h3>

            <label>Trench:</label>
            <input type="checkbox" name="spotFooting_trench"><br>

            <label>Rebar:</label>
            <input type="checkbox" name="spotFooting_rebar"><br>

            <label>Pour:</label>
            <input type="checkbox" name="spotFooting_pour"><br>

            <label>Inspected:</label>
            <input type="checkbox" name="spotFooting_inspected"><br>
        </div>
    `;
    spotFootingSection.insertAdjacentHTML('beforeend', newSpotFooting);
}

footings_row_counter = 0

function addSpotFootingRow() {
    // console.log('Adding spot footing row');
    const rowSize = document.getElementById('spotFootingRowSize').value;
    const spotFootingSection = document.getElementById('spotFootingsSection');
    const count = spotFootingSection.getElementsByClassName('spotFooting').length + 1;

    var newSpotFootingRow = `
        <div class="spotFootingsRow">
            <div class="spotFootingFirst">
                    <spotFootingNumber> </spotFootingNumber><br>
                    <input type="checkbox" name="spotFooting_trench_row" id="spotFooting_trench_row_${footings_row_counter}" class="checkboxFootingRowFill"> <label class="labelSpotFooting" for="spotFooting_trench">Trench:</label><br>
                    <input type="checkbox" name="spotFooting_rebar_row" id="spotFooting_rebar_row_${footings_row_counter}" class="checkboxFootingRowFill"> <label class="labelSpotFooting" for="spotFooting_rebar">Rebar:</label><br>
                    <input type="checkbox" name="spotFooting_pour_row" id="spotFooting_pour_row_${footings_row_counter}" class="checkboxFootingRowFill"> <label class="labelSpotFooting" for="spotFooting_pour">Pour:</label><br>
                    <input type="checkbox" name="spotFooting_inspected_row" id="spotFooting_inspected_row_${footings_row_counter}" class="checkboxFootingRowFill"> <label class="labelSpotFooting" for="spotFooting_pour">Inspected:</label><br>
            </div>
    `;
    
    // const newSpotFooting = ``;

    for (let i = 0; i < rowSize; i++) {
        newSpotFootingRow += `
            <div class="spotFooting">
                    <spotFootingNumber>${count + i}</spotFootingNumber><br>
                    <input type="checkbox" name="spotFooting_trench" id="${footings_row_counter}_spotFooting_trench_${count}"><br>
                    <input type="checkbox" name="spotFooting_rebar" id="${footings_row_counter}_spotFooting_rebar_${count}"><br>
                    <input type="checkbox" name="spotFooting_pour" id="${footings_row_counter}_spotFooting_pour_${count}"><br>
                    <input type="checkbox" name="spotFooting_inspected" id="${footings_row_counter}_spotFooting_inspected_${count}"><br>
            </div>
        `;
    }

    footings_row_counter += 1;

    newSpotFootingRow += `
        </div>
    `;
    
    spotFootingSection.insertAdjacentHTML('beforeend', newSpotFootingRow);

    // const spotFootingCheckboxes = spotFootingSection.getElementsByClassName('checkboxFootingRowFill');
    const spotFootingCheckboxes = spotFootingSection.lastElementChild.querySelectorAll('.checkboxFootingRowFill');

    for (let i = 0; i < spotFootingCheckboxes.length; i++) {
        spotFootingCheckboxes[i].addEventListener('change', function() {

        splitted = this['id'].split('_')
        row_id = splitted[3]
        row_name_pattern = splitted[3] + '_' + splitted[0] + '_' + splitted[1] + '_'

        // ${footings_row_counter}_spotFooting_trench_${count}
        const spotFootingsRow = [...document.querySelectorAll('[id^="' + row_name_pattern + '"]')];
        

        if (this.checked) {
            // console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
            for (let j = 0; j < spotFootingsRow.length; j++) {
                spotFootingsRow[j].checked = true;
            }
        } else {
            // console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
            for (let j = 0; j < spotFootingsRow.length; j++) {
                spotFootingsRow[j].checked = false;
            }
        }
        });
    }
}

function addSpotFootingWithData(trench, rebar, pour, inspected) {
    const spotFootingSection = document.getElementById('spotFootingsSection');
    const count = spotFootingSection.getElementsByClassName('spotFooting').length + 1;
    const newSpotFooting = `
        <div class="spotFooting">
            <h3>Spot Footing ${count}</h3>

            <label>Trench:</label>
            <input type="checkbox" name="spotFooting_trench" ` + boolToCheckString(trench) + `><br>

            <label>Rebar:</label>
            <input type="checkbox" name="spotFooting_rebar" ` + boolToCheckString(rebar) + `><br>

            <label>Pour:</label>
            <input type="checkbox" name="spotFooting_pour" ` + boolToCheckString(pour) + `><br>

            <label>Pour:</label>
            <input type="checkbox" name="spotFooting_inspected" ` + boolToCheckString(inspected) + `><br>
        </div>
    `;
    spotFootingSection.insertAdjacentHTML('beforeend', newSpotFooting);
}

function addSpotFootingRowWithData(trenches, rebars, poures, inspecteds) {
    // console.log('Adding spot footing row with data');
    const rowSize = document.getElementById('spotFootingRowSize').value;
    const spotFootingSection = document.getElementById('spotFootingsSection');
    const count = spotFootingSection.getElementsByClassName('spotFooting').length + 1;

    var newSpotFootingRow = `
        <div class="spotFootingsRow">
            <div class="spotFootingFirst">
                    <spotFootingNumber> </spotFootingNumber><br>
                    <input type="checkbox" name="spotFooting_trench_row" id="spotFooting_trench_row_${footings_row_counter}" class="checkboxFootingRowFill"> <label class="labelSpotFooting" for="spotFooting_trench">Trench:</label><br>
                    <input type="checkbox" name="spotFooting_rebar_row" id="spotFooting_rebar_row_${footings_row_counter}" class="checkboxFootingRowFill"> <label class="labelSpotFooting" for="spotFooting_rebar">Rebar:</label><br>
                    <input type="checkbox" name="spotFooting_pour_row" id="spotFooting_pour_row_${footings_row_counter}" class="checkboxFootingRowFill"> <label class="labelSpotFooting" for="spotFooting_pour">Pour:</label><br>
                    <input type="checkbox" name="spotFooting_inspected_row" id="spotFooting_inspected_row_${footings_row_counter}" class="checkboxFootingRowFill"> <label class="labelSpotFooting" for="spotFooting_pour">Inspected:</label><br>
            </div>
    `;


    // const newSpotFooting = ``;

    for (let i = 0; i < rowSize; i++) {
        newSpotFootingRow += `
            <div class="spotFooting">
                    <spotFootingNumber>${count + i}</spotFootingNumber><br>
                    <input type="checkbox" name="spotFooting_trench" id="${footings_row_counter}_spotFooting_trench_${count}" ` + boolToCheckString(trenches[i]) + `><br>
                    <input type="checkbox" name="spotFooting_rebar" id="${footings_row_counter}_spotFooting_rebar_${count}" ` + boolToCheckString(rebars[i]) + `><br>
                    <input type="checkbox" name="spotFooting_pour" id="${footings_row_counter}_spotFooting_pour_${count}" ` + boolToCheckString(poures[i]) + `><br>
                    <input type="checkbox" name="spotFooting_inspected" id="${footings_row_counter}_spotFooting_inspected_${count}" ` + boolToCheckString(inspecteds[i]) + `><br>
            </div>
        `;
    }

    footings_row_counter += 1;

    newSpotFootingRow += `
        </div>
    `;
    
    spotFootingSection.insertAdjacentHTML('beforeend', newSpotFootingRow);

    // const spotFootingCheckboxes = spotFootingSection.getElementsByClassName('checkboxFootingRowFill');
    const spotFootingCheckboxes = spotFootingSection.lastElementChild.querySelectorAll('.checkboxFootingRowFill');

    for (let i = 0; i < spotFootingCheckboxes.length; i++) {
        spotFootingCheckboxes[i].addEventListener('change', function() {

        splitted = this['id'].split('_')
        row_id = splitted[3]
        row_name_pattern = splitted[3] + '_' + splitted[0] + '_' + splitted[1] + '_'

        // ${footings_row_counter}_spotFooting_trench_${count}
        const spotFootingsRow = [...document.querySelectorAll('[id^="' + row_name_pattern + '"]')];
        

        if (this.checked) {
            // console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
            for (let j = 0; j < spotFootingsRow.length; j++) {
                spotFootingsRow[j].checked = true;
            }
        } else {
            // console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
            for (let j = 0; j < spotFootingsRow.length; j++) {
                spotFootingsRow[j].checked = false;
            }
        }
        });
    }
}

// Slab on grade pours
function addPour() {
    const poursSection = document.getElementById('poursSection');
    const count = poursSection.getElementsByClassName('pour').length + 1;
    const newPour = `
        <div class="pour">
            <h3>Pour ${count}</h3>

            <label>Grade:</label>
            <input type="text" class="percent" name="pour_grade" value="0%" required><br>

            <label>Form:</label>
            <input type="text" class="percent" name="pour_form" value="0%" required><br>

            <label>Rebars:</label>
            <input type="text" class="percent" name="pour_rebars" value="0%" required><br>

            <label>Pour:</label>
            <input type="text" class="percent" name="pour_pour" value="0%" required><br>
        </div>
    `;

    poursSection.insertAdjacentHTML('beforeend', newPour);

    // console.log('pour section last element child:');
    // console.log(poursSection.lastElementChild);

    const percentFields = poursSection.lastElementChild.querySelectorAll('.percent');
    // console.log('Percent fields:');
    // console.log(percentFields);
    percentFields.forEach(input => {
        input.addEventListener('input', () => {
            let value = input.value;

            value = ensurePercent(value);
            input.value = value;
        });

        input.addEventListener('blur', () => {
            let value = input.value;

            value = ensurePercent(value);
            input.value = value;
        });
    });
}

function ensurePercent(value) {
    value = value.replace(/[^0-9]/g, '');

    if (value.length == 0) {
        value = '0';
    }

    if (value !== '' && !value.endsWith('%')) {
        value = value + '%';
    }

    return value;
}

function addPourWithData(pour_grade, pour_form, pour_rebars, pour_pour) {
    const poursSection = document.getElementById('poursSection');
    const count = poursSection.getElementsByClassName('pour').length + 1;
    const newPour = `
        <div class="pour">
            <h3>Pour ${count}</h3>

            <label>Grade:</label>
            <input type="text" class="percent" name="pour_grade" value="` + ensurePercent(pour_grade) + `" required><br>

            <label>Form:</label>
            <input type="text" class="percent" name="pour_form" value="` + ensurePercent(pour_form) + `" required><br>

            <label>Rebars:</label>
            <input type="text" class="percent" name="pour_rebars" value="` + ensurePercent(pour_rebars) + `" required><br>

            <label>Pour:</label>
            <input type="text" class="percent" name="pour_pour" value="` + ensurePercent(pour_pour) + `" required><br>
        </div>
    `;

    poursSection.insertAdjacentHTML('beforeend', newPour);

    const percentFields = poursSection.lastElementChild.querySelectorAll('.percent');
    percentFields.forEach(input => {
        input.addEventListener('input', () => {
            let value = input.value;

            value = ensurePercent(value);
            input.value = value;
        });

        input.addEventListener('blur', () => {
            let value = input.value;

            value = ensurePercent(value);
            input.value = value;
        });
    });
}

// Panel pours
function addPanel() {
    const panelSection = document.getElementById('panelSection');
    const count = panelSection.getElementsByClassName('panel').length + 1;
    const newPanel = `
        <div class="panel">
            <h3>Panel ${count}</h3>
            <label>Panel code:</label>
            <input type="text" name="panel_code" value=${count}><br>

            <label>2 Layers:</label>
            <input type="checkbox" name="panel_twolayers"><br>

            <label>Form:</label>
            <input type="checkbox" name="panel_form"><br>

            <label>Reveal:</label>
            <input type="checkbox" name="panel_reveal"><br>

            <label>Embeds Bottom:</label>
            <input type="checkbox" name="panel_embedsbottom"><br>
            <label>Rebars Bottom:</label>
            <input type="checkbox" name="panel_rebarsbottom"><br>

            <label>Pour Bottom:</label>
            <input type="checkbox" name="panel_pourbottom"><br>

            <label>Embeds Top:</label>
            <input type="checkbox" name="panel_embedstop"><br>
            <label>Rebars Top:</label>
            <input type="checkbox" name="panel_rebarstop"><br>

            <label>Inserts:</label>
            <input type="checkbox" name="panel_inserts"><br>
            <label>Pour Top:</label>
            <input type="checkbox" name="panel_pourtop"><br>

            <label>Lifted:</label>
            <input type="checkbox" name="panel_lifted"><br>
        </div>
    `;
    panelSection.insertAdjacentHTML('beforeend', newPanel);
}

panels_row_counter = 0;

function addPanelRow(panelElement, codeLetter = panelElement.id.slice(-1)) {
    console.log('Adding panelElement: ', panelElement.id, panelElement);
    const rowSize = document.getElementById(panelElement.id + 'Size').value;
    console.log('Panel rowSize: ' + rowSize);
    const count = document.getElementsByClassName('panel').length + 1;
    console.log('Panel count: ' + count);

    var newPanelRow = `
            <div class="panelFirst">
                    <panelNumber>  </panelNumber><br>
                    <div class="labelPanel" for="panel_code" style="margin-top:10px;margin-bottom:15px;">Panel code:</div>
                    <div class="labelPanel" for="panel_twolayers"><input type="checkbox" name="panel_twolayers_row" id="panel_twolayers_row_${panels_row_counter}" class="checkboxPanelRowFill"> Two Layers:</div>
                    <div class="labelPanel" for="panel_form"><input type="checkbox" name="panel_form_row" id="panel_form_row_${panels_row_counter}" class="checkboxPanelRowFill"> Form:</div>
                    <div class="labelPanel" for="panel_reveal"><input type="checkbox" name="panel_reveal_row" id="panel_reveal_row_${panels_row_counter}" class="checkboxPanelRowFill"> Reveal:</div>
                    <div class="labelPanel" for="panel_embedsbottom"><input type="checkbox" name="panel_embedsbottom_row" id="panel_embedsbottom_row_${panels_row_counter}" class="checkboxPanelRowFill"> Embeds Bottom:</div>
                    <div class="labelPanel" for="panel_rebarsbottom"><input type="checkbox" name="panel_rebarsbottom_row" id="panel_rebarsbottom_row_${panels_row_counter}" class="checkboxPanelRowFill"> Rebars Bottom:</div>
                    <div class="labelPanel" for="panel_pourbottom"><input type="checkbox" name="panel_pourbottom_row" id="panel_pourbottom_row_${panels_row_counter}" class="checkboxPanelRowFill"> Pour Bottom:</div>
                    <div class="labelPanel" for="panel_embedstop"><input type="checkbox" name="panel_embedstop_row" id="panel_embedstop_row_${panels_row_counter}" class="checkboxPanelRowFill"> Embeds Top:</div>
                    <div class="labelPanel" for="panel_rebarstop"><input type="checkbox" name="panel_rebarstop_row" id="panel_rebarstop_row_${panels_row_counter}" class="checkboxPanelRowFill"> Rebars Top:</div>
                    <div class="labelPanel" for="panel_inserts"><input type="checkbox" name="panel_inserts_row" id="panel_inserts_row_${panels_row_counter}" class="checkboxPanelRowFill"> Inserts:</div>
                    <div class="labelPanel" for="panel_pourtop"><input type="checkbox" name="panel_pourtop_row" id="panel_pourtop_row_${panels_row_counter}" class="checkboxPanelRowFill"> Pour Top:</div>
                    <div class="labelPanel" for="panel_lifted"><input type="checkbox" name="panel_lifted_row" id="panel_lifted_row_${panels_row_counter}" class="checkboxPanelRowFill"> Lifted:</div>
            </div>
    `;

    for (let i = 0; i < rowSize; i++) {
        newPanelRow += `
            <div class="panel">
                    <panelNumber>${count + i}</panelNumber><br>
                    <input type="text" name="panel_code" class="panelCode" value=${codeLetter}-${100+i+1}> <br>
                    <input type="checkbox" name="panel_twolayers" id="${panels_row_counter}_panel_twolayers_${count}"><br>
                    <input type="checkbox" name="panel_form" id="${panels_row_counter}_panel_form_${count}"><br>
                    <input type="checkbox" name="panel_reveal" id="${panels_row_counter}_panel_reveal_${count}"><br>
                    <input type="checkbox" name="panel_embedsbottom" id="${panels_row_counter}_panel_embedsbottom_${count}"><br>
                    <input type="checkbox" name="panel_rebarsbottom" id="${panels_row_counter}_panel_rebarsbottom_${count}"><br>
                    <input type="checkbox" name="panel_pourbottom" id="${panels_row_counter}_panel_pourbottom_${count}"><br>
                    <input type="checkbox" name="panel_embedstop" id="${panels_row_counter}_panel_embedstop_${count}"><br>
                    <input type="checkbox" name="panel_rebarstop" id="${panels_row_counter}_panel_rebarstop_${count}"><br>
                    <input type="checkbox" name="panel_inserts" id="${panels_row_counter}_panel_inserts_${count}"><br>
                    <input type="checkbox" name="panel_pourtop" id="${panels_row_counter}_panel_pourtop_${count}"><br>
                    <input type="checkbox" name="panel_lifted" id="${panels_row_counter}_panel_lifted_${count}"><br>
            </div>
        `;
    }

    panels_row_counter += 1;

    panelElement.insertAdjacentHTML('beforeend', newPanelRow);
}

function addPanelRowWithData(panelElement, panelCodes, twoLayers, forms, reveals, embedsBottoms, rebarsBottoms, embedsTops, rebarsTops, insertss, pourBottoms, pourTops, lifteds, codeLetter = panelElement.id.slice(-1)) {
    console.log('PanelElement: ', panelElement.id, panelElement);
    const rowSize = document.getElementById(panelElement.id + 'Size').value;
    console.log('Panel rowSize: ' + rowSize);
    const count = document.getElementsByClassName('panel').length + 1;
    console.log('Panel count: ' + count);

    var newPanelRow = `
            <div class="panelFirst">
                    <panelNumber>   </panelNumber><br>
                    <div class="labelPanel" for="panel_code" style="margin-top:10px;margin-bottom:15px;">Panel code:</div>
                    <div class="labelPanel" for="panel_twolayers"><input type="checkbox" name="panel_twolayers_row" id="panel_twolayers_row_${panels_row_counter}" class="checkboxPanelRowFill"> Two Layers:</div>
                    <div class="labelPanel" for="panel_form"><input type="checkbox" name="panel_form_row" id="panel_form_row_${panels_row_counter}" class="checkboxPanelRowFill"> Form:</div>
                    <div class="labelPanel" for="panel_reveal"><input type="checkbox" name="panel_reveal_row" id="panel_reveal_row_${panels_row_counter}" class="checkboxPanelRowFill"> Reveal:</div>
                    <div class="labelPanel" for="panel_embedsbottom"><input type="checkbox" name="panel_embedsbottom_row" id="panel_embedsbottom_row_${panels_row_counter}" class="checkboxPanelRowFill"> Embeds Bottom:</div>
                    <div class="labelPanel" for="panel_rebarsbottom"><input type="checkbox" name="panel_rebarsbottom_row" id="panel_rebarsbottom_row_${panels_row_counter}" class="checkboxPanelRowFill"> Rebars Bottom:</div>
                    <div class="labelPanel" for="panel_pourbottom"><input type="checkbox" name="panel_pourbottom_row" id="panel_pourbottom_row_${panels_row_counter}" class="checkboxPanelRowFill"> Pour Bottom:</div>
                    <div class="labelPanel" for="panel_embedstop"><input type="checkbox" name="panel_embedstop_row" id="panel_embedstop_row_${panels_row_counter}" class="checkboxPanelRowFill"> Embeds Top:</div>
                    <div class="labelPanel" for="panel_rebarstop"><input type="checkbox" name="panel_rebarstop_row" id="panel_rebarstop_row_${panels_row_counter}" class="checkboxPanelRowFill"> Rebars Top:</div>
                    <div class="labelPanel" for="panel_inserts"><input type="checkbox" name="panel_inserts_row" id="panel_inserts_row_${panels_row_counter}" class="checkboxPanelRowFill"> Inserts:</div>
                    <div class="labelPanel" for="panel_pourtop"><input type="checkbox" name="panel_pourtop_row" id="panel_pourtop_row_${panels_row_counter}" class="checkboxPanelRowFill"> Pour Top:</div>
                    <div class="labelPanel" for="panel_lifted"><input type="checkbox" name="panel_lifted_row" id="panel_lifted_row_${panels_row_counter}" class="checkboxPanelRowFill"> Lifted:</div>
            </div>
    `;

    if (panelCodes && panelCodes.length > 0)
    {
        for (let i = 0; i < rowSize; i++) {
            newPanelRow += `
                <div class="panel">
                        <panelNumber>${count + i}</panelNumber><br>
                        <input type="text" name="panel_code" class="panelCode" value=` + panelCodes[i] + `><br>
                        <input type="checkbox" name="panel_twolayers" id="${panels_row_counter}_panel_twolayers_${count}" ` + boolToCheckString(twoLayers[i]) + `><br>
                        <input type="checkbox" name="panel_form" id="${panels_row_counter}_panel_form_${count}" ` + boolToCheckString(forms[i]) + `><br>
                        <input type="checkbox" name="panel_reveal" id="${panels_row_counter}_panel_reveal_${count}" ` + boolToCheckString(reveals[i]) + `><br>
                        <input type="checkbox" name="panel_embedsbottom" id="${panels_row_counter}_panel_embedsbottom_${count}" ` + boolToCheckString(embedsBottoms[i]) + `><br>
                        <input type="checkbox" name="panel_rebarsbottom" id="${panels_row_counter}_panel_rebarsbottom_${count}" ` + boolToCheckString(rebarsBottoms[i]) + `><br>
                        <input type="checkbox" name="panel_pourbottom" id="${panels_row_counter}_panel_pourbottom_${count}" ` + boolToCheckString(pourBottoms[i]) + `><br>
                        <input type="checkbox" name="panel_embedstop" id="${panels_row_counter}_panel_embedstop_${count}" ` + boolToCheckString(embedsTops[i]) + `><br>
                        <input type="checkbox" name="panel_rebarstop" id="${panels_row_counter}_panel_rebarstop_${count}" ` + boolToCheckString(rebarsTops[i]) + `><br>
                        <input type="checkbox" name="panel_inserts" id="${panels_row_counter}_panel_inserts_${count}" ` + boolToCheckString(insertss[i]) + `><br>
                        <input type="checkbox" name="panel_pourtop" id="${panels_row_counter}_panel_pourtop_${count}" ` + boolToCheckString(pourTops[i]) + `><br>
                        <input type="checkbox" name="panel_lifted" id="${panels_row_counter}_panel_lifted_${count}" ` + boolToCheckString(lifteds[i]) + `><br>
                </div>
            `;
        }
    } else
    {    
        for (let i = 0; i < rowSize; i++) {
            newPanelRow += `
                <div class="panel">
                        <panelNumber>${count + i}</panelNumber><br>
                        <input type="text" name="panel_code" class="panelCode" value=${codeLetter}-${100+i+1}> <br>
                        <input type="checkbox" name="panel_twolayers" id="${panels_row_counter}_panel_twolayers_${count}"><br>
                        <input type="checkbox" name="panel_form" id="${panels_row_counter}_panel_form_${count}"><br>
                        <input type="checkbox" name="panel_reveal" id="${panels_row_counter}_panel_reveal_${count}"><br>
                        <input type="checkbox" name="panel_embedsbottom" id="${panels_row_counter}_panel_embedsbottom_${count}"><br>
                        <input type="checkbox" name="panel_rebarsbottom" id="${panels_row_counter}_panel_rebarsbottom_${count}"><br>
                        <input type="checkbox" name="panel_pourbottom" id="${panels_row_counter}_panel_pourbottom_${count}"><br>
                        <input type="checkbox" name="panel_embedstop" id="${panels_row_counter}_panel_embedstop_${count}"><br>
                        <input type="checkbox" name="panel_rebarstop" id="${panels_row_counter}_panel_rebarstop_${count}"><br>
                        <input type="checkbox" name="panel_inserts" id="${panels_row_counter}_panel_inserts_${count}"><br>
                        <input type="checkbox" name="panel_pourtop" id="${panels_row_counter}_panel_pourtop_${count}"><br>
                        <input type="checkbox" name="panel_lifted" id="${panels_row_counter}_panel_lifted_${count}"><br>
                </div>
            `;
        }
    }



    panels_row_counter += 1;

    panelElement.insertAdjacentHTML('beforeend', newPanelRow);
}




function generateAndDownloadJSON() {
    const form = document.getElementById('reportForm');
    const spotFootings = [];
    const pours = [];
    const panels = [];
    const buildingWorks = [];

    // Foundation spot footings
    document.querySelectorAll('.spotFooting').forEach((element, index) => {
        spotFootings.push({
            id: (index + 1).toString(),
            trench: element.querySelector('[name="spotFooting_trench"]').checked ? "done" : "none",
            rebar: element.querySelector('[name="spotFooting_rebar"]').checked ? "done" : "none",
            pour: element.querySelector('[name="spotFooting_pour"]').checked ? "done" : "none",
            inspected: element.querySelector('[name="spotFooting_inspected"]').checked ? "done" : "none"
        });
    });
    if (form.addSpotFootingsSection.checked)
    {
        buildingWorks.push({
            type: "Foundation",
            spotFootings: spotFootings
        })
    }


    // Pours
    document.querySelectorAll('.pour').forEach((element, index) => {
        pours.push({
            id: (index + 1).toString(),
            grade: element.querySelector('[name="pour_grade"]').value,
            form: element.querySelector('[name="pour_form"]').value,
            rebars: element.querySelector('[name="pour_rebars"]').value,
            pour: element.querySelector('[name="pour_pour"]').value
        });
    });
    if (form.addPoursSection.checked)
    {
        buildingWorks.push({
            type: "Slab-on-Grade",
            pours: pours
        })
    }


    // Panel pours
    document.querySelectorAll('.panel').forEach((element, index) => {
        panels.push({
            id: (index + 1).toString(),
            panelCode: element.querySelector('[name="panel_code"]').value,
            twoLayers: element.querySelector('[name="panel_twolayers"]').checked,
            form: element.querySelector('[name="panel_form"]').checked,
            reveal: element.querySelector('[name="panel_reveal"]').checked,
            embedsBottom: element.querySelector('[name="panel_embedsbottom"]').checked,
            rebarsBottom: element.querySelector('[name="panel_rebarsbottom"]').checked,
            pourBottom: element.querySelector('[name="panel_pourbottom"]').checked,
            embedsTop: element.querySelector('[name="panel_embedstop"]').checked,
            rebarsTop: element.querySelector('[name="panel_rebarstop"]').checked,
            inserts: element.querySelector('[name="panel_inserts"]').checked,
            pourTop: element.querySelector('[name="panel_pourtop"]').checked,
            lifted: element.querySelector('[name="panel_lifted"]').checked
        });
    });
    if (form.addPanelSection.checked)
    {
        buildingWorks.push({
            type: "Panel",
            panelBookReady: form.panelBookReady.checked,
            panels: panels
        })
    }


    // Complete file
    const report = {
        scan_date: form.scan_date.value,
        company: form.company.value,
        worksite: form.worksite.value,
        pix4dcloudlink: form.pix4dcloudlink.value,
        // screenshot: form.screenshot.value,
        buildings: [
            {
                building: form.building.value, //"1",
                screenshot: form.screenshot.value,
                works: buildingWorks
            }
        ]
    };

    // For all buildings
    
    // FOR DC BLOX REMOVE S107 FROM THE REPORT
    const worksiteName = document.getElementById('worksite').value;
    const buildingId = document.getElementById('building').value;
    if (worksiteName && worksiteName == 'DC Blox' && buildingId && buildingId == '1') {
        console.log('Removing S107 from the report');
        const filteredPanels = panels.filter(panel => panel.panelCode !== "S-107");
        report.buildings[0].works.find(work => work.type === "Panel").panels = filteredPanels;
    }

    const json = JSON.stringify({ version: 1.0, reports: [report] }, null, 4);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Building number
    const buildingValue = document.getElementById('building').value;

    // Date
    const scanDateValue = document.getElementById('scan_date').value;
    scanDate = new Date(scanDateValue);
    // console.log(scanDate);
    formattedScanDate = scanDate.toJSON().slice(0, 10);
    console.log('Scan date is ' + formattedScanDate);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'manager_report_bld' + buildingValue + '_' + formattedScanDate + '.json';
    link.click();
}




// Load the file 
document.getElementById('previousReportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    loadPreviousReport();
});

function loadPreviousReport() {
    const previousReportFile = document.getElementById('previousReportFile');
    const file = previousReportFile.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let report_json = JSON.parse(e.target.result);

            const worksiteName = document.getElementById('worksite').value;
            const buildingId = document.getElementById('building').value;
            if (worksiteName && worksiteName == 'DC Blox' && buildingId && buildingId == '1') {
                console.log('Removing S107 from the report');
                // const filteredPanels = panels.filter(panel => panel.panelCode !== "S-107");
                // report.buildings[0].works.find(work => work.type === "Panel").panels = filteredPanels;

                let panels = report_json.reports[0].buildings[0].works.find(work => work.type === "Panel").panels;
                console.log('Array panels before the update:', panels);
                const s106Index = panels.findIndex(panel => panel.panelCode === "S-106");
                console.log('Found index for panel S-106');
                if (s106Index !== -1) {
                    panels.splice(s106Index + 1, 0, {
                        "id": "36",
                        "panelCode": "S-107",
                        "twoLayers": true,
                        "form": true,
                        "reveal": true,
                        "embeds": true,
                        "rebars": true,
                        "embedsBottom": true,
                        "rebarsBottom": true,
                        "embedsTop": true,
                        "rebarsTop": true,
                        "inserts": true,
                        "pour": true,
                        "pourBottom": true,
                        "pourTop": true,
                        "lifted": true
                    });
                    console.log('Updated array of panels:', panels);
                    // console.log('Updated report_json before populating form:', report_json);
                }
            }


            populateForm(report_json);
        } catch (error) {
            alert('Invalid JSON file.');
        }
    };
    reader.readAsText(file);
}

function doneToBool(value) {
    if (value == "done") {
        return true;
    }
    else {
        return false;
    }
}

function populateForm(fileData) {
    const report = fileData.reports[0];
    document.getElementById('scan_date').value = report.scan_date || '';
    document.getElementById('company').value = report.company || '';
    document.getElementById('worksite').value = report.worksite || '';
    document.getElementById('pix4dcloudlink').value = report.pix4dcloudlink || '';

    // ideally go over the array of things
    let reportVersion = 0.0;
    if (fileData.hasOwnProperty('version')) {
        reportVersion = fileData.version;
        console.log('The file has version field! Version is ', reportVersion);
    } else {
        console.log('The file does not have version field! Version is ', reportVersion);
    }
    
    report.buildings.forEach((building, index) => {
        console.log(building);
    })

    // but for now only only one building
    building = report.buildings[0];
    if (reportVersion > 0) {
        document.getElementById('screenshot').value = building.screenshot || '';
    } else {
        document.getElementById('screenshot').value = report.screenshot || '';
    }

    document.getElementById('building').value = building.building || '';
    buildingWorks = building.works;

    const spotFootingRowSize = document.getElementById('spotFootingRowSize').value;
    console.log('spotFootingRowSize = ' + spotFootingRowSize);

    buildingWorks.forEach((buildingWork, index) => {
        console.log(buildingWork)
        console.log('Work type: ' + buildingWork.type)
        if (buildingWork.type == "Foundation") {
            document.getElementById('addSpotFootingsSection').checked = true;
            // removeChildrenNodes('spotFootingsSection', 'spotFooting');
            removeChildrenNodes('spotFootingsSection', 'spotFootingsRow');

            let trenches = [];
            let rebars = [];
            let pours = [];
            let inspecteds = [];
            buildingWork.spotFootings.forEach((spotFooting, index) => {
                // addSpotFootingWithData(doneToBool(spotFooting.trench), doneToBool(spotFooting.rebar), doneToBool(spotFooting.pour));
                // console.log('Adding arrays');
                trenches.push(doneToBool(spotFooting.trench))
                rebars.push(doneToBool(spotFooting.rebar));
                pours.push(doneToBool(spotFooting.pour));
                inspecteds.push(doneToBool(spotFooting.inspected));
                // console.log('Added');
                
                if (index > 0 && ((index+1) % spotFootingRowSize) == 0) {
                    // console.log('Index ' + (index+1) + ' is divisable');
                    // console.log(index);
                    // console.log('trenches: ' + trenches);
                    // console.log('rebars: ' + rebars);
                    // console.log('pours: ' + pours);
                    // console.log('inspecteds: ' + inspecteds);
                    addSpotFootingRowWithData(trenches, rebars, pours, inspecteds);
            
                    trenches = [];
                    rebars = [];
                    pours = [];
                    inspecteds = [];
                }
            });
        }
        else if (buildingWork.type == "Slab-on-Grade") {
            document.getElementById('addPoursSection').checked = true;
            removeChildrenNodes('poursSection', 'pour');
            buildingWork.pours.forEach((pour, index) => {
                addPourWithData(pour.grade, pour.form, pour.rebars, pour.pour);
            });
        }
        else if (buildingWork.type == "Panel") {
            document.getElementById('addPanelSection').checked = true;
            // removeChildrenNodes('panelSection', 'panel');
            removeChildrenNodes('panelRowN', 'panel');
            removeChildrenNodes('panelRowN', 'panelFirst');
            removeChildrenNodes('panelRowE', 'panel');
            removeChildrenNodes('panelRowE', 'panelFirst');
            removeChildrenNodes('panelRowS', 'panel');
            removeChildrenNodes('panelRowS', 'panelFirst');
            removeChildrenNodes('panelRowW', 'panel');
            removeChildrenNodes('panelRowW', 'panelFirst');

            let panelRowCPElement = document.getElementById('panelRowCP');
            if (panelRowCPElement)
            {
                removeChildrenNodes('panelRowCP', 'panel');
                removeChildrenNodes('panelRowCP', 'panelFirst');
            }
            document.getElementById('panelBookReady').checked = buildingWork.panelBookReady;


            let panelCodes = [];
            let twoLayers = [];
            let forms = [];
            let reveals = [];
            let embedsBottoms = [];
            let rebarsBottoms = [];
            let embedsTops = [];
            let rebarsTops = [];
            let insertss = [];
            let pourBottoms = [];
            let pourTops = [];
            let lifteds = [];

            let panelRowElements = [];
            let panelRowSizes = [];
            if (panelRowCPElement)
            {
                panelRowElements = [
                    document.getElementById('panelRowN'),
                    document.getElementById('panelRowE'),
                    document.getElementById('panelRowS'),
                    document.getElementById('panelRowW'),
                    panelRowCPElement
                ];

                panelRowSizes = [
                    parseInt(document.getElementById('panelRowNSize').value),
                    parseInt(document.getElementById('panelRowESize').value),
                    parseInt(document.getElementById('panelRowSSize').value),
                    parseInt(document.getElementById('panelRowWSize').value),
                    parseInt(document.getElementById('panelRowCPSize').value)
                ];
            }
            else
            {
                panelRowElements = [
                    document.getElementById('panelRowN'),
                    document.getElementById('panelRowE'),
                    document.getElementById('panelRowS'),
                    document.getElementById('panelRowW')
                ];

                panelRowSizes = [
                    parseInt(document.getElementById('panelRowNSize').value),
                    parseInt(document.getElementById('panelRowESize').value),
                    parseInt(document.getElementById('panelRowSSize').value),
                    parseInt(document.getElementById('panelRowWSize').value),
                    0
                ];
            }

            let currentPanel = 0;
            let panelRowSizeIndex = 0;
            panelRowSizeIndex = panelRowSizes[currentPanel];
            console.log('Next index to hit for the row is ' + (panelRowSizeIndex-1));
            buildingWork.panels.forEach((panel, index) => {
                // addPanelWithData(panel.form, panel.reveal, panel.embeds, panel.rebars, panel.inserts, panel.pour);

                // console.log('Adding arrays');
                panelCodes.push(panel.panelCode);
                forms.push(panel.form)
                reveals.push(panel.reveal);
                insertss.push(panel.inserts);
                if (reportVersion < 1.0) {
                    twoLayers.push(false);
                    pourBottoms.push(false);
                    pourTops.push(panel.pour);

                    embedsBottoms.push(false);
                    rebarsBottoms.push(false);
                    embedsTops.push(panel.embeds);
                    rebarsTops.push(panel.rebars);
                } else {
                    console.log('Adding bottoms and tops, panelCode:', panel.panelCode);
                    if (panel.panelCode == "S-107") {
                        console.log('Panel code is S-107, twoLayers = ', panel.twoLayers);
                    }

                    twoLayers.push(panel.twoLayers);
                    if (panel.twoLayers) {
                        pourBottoms.push(panel.pourBottom);
                        embedsBottoms.push(panel.embedsBottom);
                        rebarsBottoms.push(panel.rebarsBottom);
                    } else {
                        pourBottoms.push(false);
                        embedsBottoms.push(false);
                        rebarsBottoms.push(false);
                    }
                    pourTops.push(panel.pourTop);

                    embedsTops.push(panel.embedsTop);
                    rebarsTops.push(panel.rebarsTop);
                }   
                lifteds.push(panel.lifted);
                // console.log('Added');

                if (index >= 0 && index == panelRowSizeIndex-1) {
                    console.log('currentPanel = ' + currentPanel);
                    console.log('panelRowSizeIndex = ' + panelRowSizeIndex);
                    console.log('Index ' + (index+1) + ' is divisable');
                    console.log(index);
                    console.log('panelCodes: ' + panelCodes);
                    console.log('twoLayers: ' + twoLayers);
                    console.log('forms: ' + forms);
                    console.log('reveals: ' + reveals);
                    console.log('embedsBottoms: ' + embedsBottoms);
                    console.log('rebarsBottoms: ' + rebarsBottoms);
                    console.log('embedsTops: ' + embedsTops);
                    console.log('rebarsTops: ' + rebarsTops);
                    console.log('insertss: ' + insertss);
                    console.log('pourBottoms: ' + pourBottoms);
                    console.log('pourTops: ' + pourTops);
                    console.log('lifteds: ' + lifteds);
                    addPanelRowWithData(panelRowElements[currentPanel], panelCodes, twoLayers, forms, reveals, embedsBottoms, rebarsBottoms, embedsTops, rebarsTops, insertss, pourBottoms, pourTops, lifteds);
            
                    panelCodes = [];
                    twoLayers = [];
                    forms = [];
                    reveals = [];
                    embedsBottoms = [];
                    rebarsBottoms = [];
                    embedsTops = [];
                    rebarsTops = [];
                    insertss = [];
                    pourBottoms = [];
                    pourTops = [];
                    lifteds = [];
                    currentPanel += 1;
                    panelRowSizeIndex = panelRowSizeIndex + panelRowSizes[currentPanel];
                    console.log('Next index to hit for the row is ' + (panelRowSizeIndex-1));
                }
                
            });
        }
    });



    const spotFootingCheckboxes = spotFootingSection.getElementsByClassName('checkboxFootingRowFill');

    for (let i = 0; i < spotFootingCheckboxes.length; i++) {
        spotFootingCheckboxes[i].addEventListener('change', function() {

        splitted = this['id'].split('_')
        row_id = splitted[3]
        row_name_pattern = splitted[3] + '_' + splitted[0] + '_' + splitted[1] + '_'

        // ${footings_row_counter}_spotFooting_trench_${count}
        const spotFootingsRow = [...document.querySelectorAll('[id^="' + row_name_pattern + '"]')];
        

        if (this.checked) {
            // console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
            for (let j = 0; j < spotFootingsRow.length; j++) {
                spotFootingsRow[j].checked = true;
            }
        } else {
            // console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
            for (let j = 0; j < spotFootingsRow.length; j++) {
                spotFootingsRow[j].checked = false;
            }
        }
        });
    }



    const panelCheckboxes = panelSection.getElementsByClassName('checkboxPanelRowFill');

    for (let i = 0; i < panelCheckboxes.length; i++) {
        panelCheckboxes[i].addEventListener('change', function() {

        splitted = this['id'].split('_')
        row_id = splitted[3]
        row_name_pattern = splitted[3] + '_' + splitted[0] + '_' + splitted[1] + '_'

        // ${footings_row_counter}_spotFooting_trench_${count}
        const panelsRow = [...document.querySelectorAll('[id^="' + row_name_pattern + '"]')];
        

        if (this.checked) {
            // console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', panelsRow:', panelsRow);
            for (let j = 0; j < panelsRow.length; j++) {
                panelsRow[j].checked = true;
            }
        } else {
            // console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', panelsRow:', panelsRow);
            for (let j = 0; j < panelsRow.length; j++) {
                panelsRow[j].checked = false;
            }
        }
        });
    }
}





//////////////////////////////////////////////////////////////////////////////////////////////
// Adding sections
//////////////////////////////////////////////////////////////////////////////////////////////
// Add spot footings row
const spotFootingColumnSize = document.getElementById('spotFootingColumnSize').value;
const spotFootingSection = document.getElementById('spotFootingsSection');
const spotFootingRowsCount = spotFootingSection.getElementsByClassName('spotFootingsRow').length;

for(let i = 0; i < spotFootingColumnSize - spotFootingRowsCount; i++) {
    addSpotFootingRow();
}

const spotFootingCheckboxes = spotFootingSection.getElementsByClassName('checkboxFootingRowFill');

for (let i = 0; i < spotFootingCheckboxes.length; i++) {
    spotFootingCheckboxes[i].addEventListener('change', function() {

    splitted = this['id'].split('_')
    row_id = splitted[3]
    row_name_pattern = splitted[3] + '_' + splitted[0] + '_' + splitted[1] + '_'

    // ${footings_row_counter}_spotFooting_trench_${count}
    const spotFootingsRow = [...document.querySelectorAll('[id^="' + row_name_pattern + '"]')];
    

    if (this.checked) {
        // console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
        for (let j = 0; j < spotFootingsRow.length; j++) {
            spotFootingsRow[j].checked = true;
        }
    } else {
        // console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
        for (let j = 0; j < spotFootingsRow.length; j++) {
            spotFootingsRow[j].checked = false;
        }
    }
    });
}

// Add pours
const poursSize = document.getElementById('poursSize').value;
const poursSection = document.getElementById('poursSection');
const poursCount = spotFootingSection.getElementsByClassName('pour').length;

for(let i = 0; i < poursSize-1 - poursCount; i++) {
    addPour();
}

// Add panel rows
const panelRows = document.getElementsByClassName('panelRow');
// console.log('Found panel rowss: ', panelRows);

const panelRowN = document.getElementById('panelRowN');
// console.log('Found panel row: ', panelRowN);

addPanelRow(document.getElementById('panelRowN')); //, 'N'); //, 'NORTH');
addPanelRow(document.getElementById('panelRowE')); //, 'E'); //, 'EAST');
addPanelRow(document.getElementById('panelRowS')); //, 'S'); //, 'SOUTH');
addPanelRow(document.getElementById('panelRowW')); //, 'W'); //, 'WEST');

const panelRowCPSizeElement = document.getElementById('panelRowCPSize');
if (panelRowCPSizeElement)
{
    const panelRowCPSize = parseInt(panelRowCPSizeElement.value);
    if (panelRowCPSize && panelRowCPSize > 0)
    {
        addPanelRow(document.getElementById('panelRowCP'), 'CP'); //, 'CP');
    }
} else
{
    panelRowCPSize = 0;
}


const panelCheckboxes = panelSection.getElementsByClassName('checkboxPanelRowFill');

for (let i = 0; i < panelCheckboxes.length; i++) {
    panelCheckboxes[i].addEventListener('change', function() {

    splitted = this['id'].split('_')
    row_id = splitted[3]
    row_name_pattern = splitted[3] + '_' + splitted[0] + '_' + splitted[1] + '_'

    // ${footings_row_counter}_spotFooting_trench_${count}
    const panelsRow = [...document.querySelectorAll('[id^="' + row_name_pattern + '"]')];
    

    if (this.checked) {
        // console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', panelsRow:', panelsRow);
        for (let j = 0; j < panelsRow.length; j++) {
            panelsRow[j].checked = true;
        }
    } else {
        // console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', panelsRow:', panelsRow);
        for (let j = 0; j < panelsRow.length; j++) {
            panelsRow[j].checked = false;
        }
    }
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Listeners
//////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', (event) => {
    const percentageInputs = document.querySelectorAll('.percent');

    percentageInputs.forEach(input => {
        input.addEventListener('input', () => {
            let value = input.value;

            value = ensurePercent(value);
            input.value = value;
        });

        input.addEventListener('blur', () => {
            let value = input.value;

            value = ensurePercent(value);
            input.value = value;
        });
    });
    
});


// Today's date for the scan date
const scanDateField = document.getElementById('scan_date');
const today = new Date();
scanDateField.value = today.toJSON().slice(0, 10);
