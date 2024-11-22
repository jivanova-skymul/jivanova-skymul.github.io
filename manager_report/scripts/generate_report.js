function removeAllChildrenNodes(nodeId) {
    const node = document.getElementById(nodeId);
    console.log('Children of node ' + nodeId + ' will be removed');
    node.innerHTML = '';
}

function removeChildrenNodes(nodeId, subNode) {
    const node = document.getElementById(nodeId);
    console.log('Children of node ' + nodeId + ' in the subnode ' + subNode + ' will be removed');
    children = node.querySelectorAll('.' + subNode);
    console.log('Found ' + children)
    children.forEach((child, ind) => {
        child.remove();
    });
    
    console.log('Removed');
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
    console.log('Adding spot footing row');
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
            console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
            for (let j = 0; j < spotFootingsRow.length; j++) {
                spotFootingsRow[j].checked = true;
            }
        } else {
            console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
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
    console.log('Adding spot footing row with data');
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
            console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
            for (let j = 0; j < spotFootingsRow.length; j++) {
                spotFootingsRow[j].checked = true;
            }
        } else {
            console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
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

            <label>Form:</label>
            <input type="checkbox" name="panel_form"><br>

            <label>Reveal:</label>
            <input type="checkbox" name="panel_reveal"><br>

            <label>Embeds:</label>
            <input type="checkbox" name="panel_embeds"><br>

            <label>Rebars:</label>
            <input type="checkbox" name="panel_rebars"><br>

            <label>Inserts:</label>
            <input type="checkbox" name="panel_inserts"><br>

            <label>Pour:</label>
            <input type="checkbox" name="panel_pour"><br>

            <label>Lifted:</label>
            <input type="checkbox" name="panel_lifted"><br>
        </div>
    `;
    panelSection.insertAdjacentHTML('beforeend', newPanel);
}

function addPanelWithData(form, reveal, embeds, rebars, inserts, pour, lifted) {
    const panelSection = document.getElementById('panelSection');
    const count = panelSection.getElementsByClassName('panel').length + 1;
    const newPanel = `
        <div class="panel">
            <h3>Panel ${count}</h3>
            <label>Panel code:</label>
            <input type="text" name="panel_code" value=${count}><br>

            <label>Form:</label>
            <input type="checkbox" name="panel_form" ` + boolToCheckString(form) + `><br>

            <label>Reveal:</label>
            <input type="checkbox" name="panel_reveal" ` + boolToCheckString(reveal) + `><br>

            <label>Embeds:</label>
            <input type="checkbox" name="panel_embeds" ` + boolToCheckString(embeds) + `><br>

            <label>Rebars:</label>
            <input type="checkbox" name="panel_rebars" ` + boolToCheckString(rebars) + `><br>

            <label>Inserts:</label>
            <input type="checkbox" name="panel_inserts" ` + boolToCheckString(inserts) + `><br>

            <label>Pour:</label>
            <input type="checkbox" name="panel_pour" ` + boolToCheckString(pour) + `><br>

            <label>Lifted:</label>
            <input type="checkbox" name="panel_lifted" ` + boolToCheckString(lifted) + `><br>
    `;
    panelSection.insertAdjacentHTML('beforeend', newPanel);
}

panels_row_counter = 0;

function addPanelRow(panelElement, codeLetter = panelElement.id.slice(-1)) {
    console.log('Adding panelElement: ');
    console.log(panelElement);
    console.log(panelElement.id);
    // codeLetter = panelElement.id.slice(-1);
    const rowSize = document.getElementById(panelElement.id + 'Size').value;
    console.log('Panel rowSize: ' + rowSize);
    const count = document.getElementsByClassName('panel').length + 1;
    console.log('Panel count: ' + count);

    // <div class="panelRow">
                    // <panelNumber> </panelNumber><br>
    var newPanelRow = `
            <div class="panelFirst">
                    <panelNumber>  </panelNumber><br>
                    <div class="labelPanel" for="panel_code" style="margin-top:10px;margin-bottom:15px;">Panel code:</div>
                    <div class="labelPanel" for="panel_form"><input type="checkbox" name="panel_form_row" id="panel_form_row_${panels_row_counter}" class="checkboxPanelRowFill"> Form:</div>
                    <div class="labelPanel" for="panel_reveal"><input type="checkbox" name="panel_reveal_row" id="panel_reveal_row_${panels_row_counter}" class="checkboxPanelRowFill"> Reveal:</div>
                    <div class="labelPanel" for="panel_embeds"><input type="checkbox" name="panel_embeds_row" id="panel_embeds_row_${panels_row_counter}" class="checkboxPanelRowFill"> Embeds:</div>
                    <div class="labelPanel" for="panel_rebars"><input type="checkbox" name="panel_rebars_row" id="panel_rebars_row_${panels_row_counter}" class="checkboxPanelRowFill"> Rebars:</div>
                    <div class="labelPanel" for="panel_inserts"><input type="checkbox" name="panel_inserts_row" id="panel_inserts_row_${panels_row_counter}" class="checkboxPanelRowFill"> Inserts:</div>
                    <div class="labelPanel" for="panel_pour"><input type="checkbox" name="panel_pour_row" id="panel_pour_row_${panels_row_counter}" class="checkboxPanelRowFill"> Pour:</div>
                    <div class="labelPanel" for="panel_lifted"><input type="checkbox" name="panel_lifted_row" id="panel_lifted_row_${panels_row_counter}" class="checkboxPanelRowFill"> Lifted:</div>
            </div>
    `;


    // const newSpotFooting = ``;
                    // <panelNumber>${count + i}</panelNumber><br>

    for (let i = 0; i < rowSize; i++) {
        newPanelRow += `
            <div class="panel">
                    <panelNumber>${count + i}</panelNumber><br>
                    <input type="text" name="panel_code" class="panelCode" value=${codeLetter}-${i+1}> <br>
                    <input type="checkbox" name="panel_form" id="${panels_row_counter}_panel_form_${count}"><br>
                    <input type="checkbox" name="panel_reveal" id="${panels_row_counter}_panel_reveal_${count}"><br>
                    <input type="checkbox" name="panel_embeds" id="${panels_row_counter}_panel_embeds_${count}"><br>
                    <input type="checkbox" name="panel_rebars" id="${panels_row_counter}_panel_rebars_${count}"><br>
                    <input type="checkbox" name="panel_inserts" id="${panels_row_counter}_panel_inserts_${count}"><br>
                    <input type="checkbox" name="panel_pour" id="${panels_row_counter}_panel_pour_${count}"><br>
                    <input type="checkbox" name="panel_lifted" id="${panels_row_counter}_panel_lifted_${count}"><br>
            </div>
        `;
    }

    panels_row_counter += 1;

    panelElement.insertAdjacentHTML('beforeend', newPanelRow);
}

function addPanelRowWithData(panelElement, panelCodes, forms, reveals, embedss, rebarss, insertss, pours, lifteds, codeLetter = panelElement.id.slice(-1)) {
    console.log('PanelElement: ');
    console.log(panelElement);
    console.log(panelElement.id);
    // codeLetter = panelElement.id.slice(-1);
    // codeLetter = name.slice(0);
    const rowSize = document.getElementById(panelElement.id + 'Size').value;
    console.log('Panel rowSize: ' + rowSize);
    const count = document.getElementsByClassName('panel').length + 1;
    console.log('Panel count: ' + count);

    var newPanelRow = `
            <div class="panelFirst">
                    <panelNumber>   </panelNumber><br>
                    <div class="labelPanel" for="panel_code" style="margin-top:10px;margin-bottom:15px;">Panel code:</div>
                    <div class="labelPanel" for="panel_form"><input type="checkbox" name="panel_form_row" id="panel_form_row_${panels_row_counter}" class="checkboxPanelRowFill"> Form:</div>
                    <div class="labelPanel" for="panel_reveal"><input type="checkbox" name="panel_reveal_row" id="panel_reveal_row_${panels_row_counter}" class="checkboxPanelRowFill"> Reveal:</div>
                    <div class="labelPanel" for="panel_embeds"><input type="checkbox" name="panel_embeds_row" id="panel_embeds_row_${panels_row_counter}" class="checkboxPanelRowFill"> Embeds:</div>
                    <div class="labelPanel" for="panel_rebars"><input type="checkbox" name="panel_rebars_row" id="panel_rebars_row_${panels_row_counter}" class="checkboxPanelRowFill"> Rebars:</div>
                    <div class="labelPanel" for="panel_inserts"><input type="checkbox" name="panel_inserts_row" id="panel_inserts_row_${panels_row_counter}" class="checkboxPanelRowFill"> Inserts:</div>
                    <div class="labelPanel" for="panel_pour"><input type="checkbox" name="panel_pour_row" id="panel_pour_row_${panels_row_counter}" class="checkboxPanelRowFill"> Pour:</div>
                    <div class="labelPanel" for="panel_lifted"><input type="checkbox" name="panel_lifted_row" id="panel_lifted_row_${panels_row_counter}" class="checkboxPanelRowFill"> Lifted:</div>
            </div>
    `;


    for (let i = 0; i < rowSize; i++) {
        newPanelRow += `
            <div class="panel">
                    <panelNumber>${count + i}</panelNumber><br>
                    <input type="text" name="panel_code" class="panelCode" value=` + panelCodes[i] + `><br>
                    <input type="checkbox" name="panel_form" id="${panels_row_counter}_panel_form_${count}" ` + boolToCheckString(forms[i]) + `><br>
                    <input type="checkbox" name="panel_reveal" id="${panels_row_counter}_panel_reveal_${count}" ` + boolToCheckString(reveals[i]) + `><br>
                    <input type="checkbox" name="panel_embeds" id="${panels_row_counter}_panel_embeds_${count}" ` + boolToCheckString(embedss[i]) + `><br>
                    <input type="checkbox" name="panel_rebars" id="${panels_row_counter}_panel_rebars_${count}" ` + boolToCheckString(rebarss[i]) + `><br>
                    <input type="checkbox" name="panel_inserts" id="${panels_row_counter}_panel_inserts_${count}" ` + boolToCheckString(insertss[i]) + `><br>
                    <input type="checkbox" name="panel_pour" id="${panels_row_counter}_panel_pour_${count}" ` + boolToCheckString(pours[i]) + `><br>
                    <input type="checkbox" name="panel_lifted" id="${panels_row_counter}_panel_lifted_${count}" ` + boolToCheckString(lifteds[i]) + `><br>
            </div>
        `;
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
            form: element.querySelector('[name="panel_form"]').checked,
            reveal: element.querySelector('[name="panel_reveal"]').checked,
            embeds: element.querySelector('[name="panel_embeds"]').checked,
            rebars: element.querySelector('[name="panel_rebars"]').checked,
            inserts: element.querySelector('[name="panel_inserts"]').checked,
            pour: element.querySelector('[name="panel_pour"]').checked,
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
                // works: [
                //     {
                //         type: "Foundation",
                //         spotFootings: spotFootings
                //     },
                //     {
                //         type: "Slab-on-Grade",
                //         pours: pours
                //     },
                //     {
                //         type: "Panel",
                //         panelBookReady: form.panelBookReady.checked,
                //         panels: panels
                //     }
                // ]
            }
        ]
    };

    // For all buildings
    const json = JSON.stringify({ version: 0.1, reports: [report] }, null, 4);
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
            const json = JSON.parse(e.target.result);
            populateForm(json);
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
                console.log('Adding arrays');
                trenches.push(doneToBool(spotFooting.trench))
                rebars.push(doneToBool(spotFooting.rebar));
                pours.push(doneToBool(spotFooting.pour));
                inspecteds.push(doneToBool(spotFooting.inspected));
                console.log('Added');
                
                if (index > 0 && ((index+1) % spotFootingRowSize) == 0) {
                    console.log('Index ' + (index+1) + ' is divisable');
                    console.log(index);
                    console.log('trenches: ' + trenches);
                    console.log('rebars: ' + rebars);
                    console.log('pours: ' + pours);
                    console.log('inspecteds: ' + inspecteds);
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
            let forms = [];
            let reveals = [];
            let embedss = [];
            let rebarss = [];
            let insertss = [];
            let pours = [];
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

                console.log('Adding arrays');
                panelCodes.push(panel.panelCode);
                forms.push(panel.form)
                reveals.push(panel.reveal);
                embedss.push(panel.embeds);
                rebarss.push(panel.rebars);
                insertss.push(panel.inserts);
                pours.push(panel.pour);
                lifteds.push(panel.lifted);
                console.log('Added');

                if (index > 0 && index == panelRowSizeIndex-1) {
                    console.log('currentPanel = ' + currentPanel);
                    console.log('panelRowSizeIndex = ' + panelRowSizeIndex);
                    console.log('Index ' + (index+1) + ' is divisable');
                    console.log(index);
                    console.log('panelCodes: ' + panelCodes);
                    console.log('forms: ' + forms);
                    console.log('reveals: ' + reveals);
                    console.log('embedss: ' + embedss);
                    console.log('rebarss: ' + rebarss);
                    console.log('insertss: ' + insertss);
                    console.log('pours: ' + pours);
                    console.log('lifteds: ' + lifteds);
                    addPanelRowWithData(panelRowElements[currentPanel], panelCodes, forms, reveals, embedss, rebarss, insertss, pours, lifteds);
            
                    panelCodes = [];
                    forms = [];
                    reveals = [];
                    embedss = [];
                    rebarss = [];
                    insertss = [];
                    pours = [];
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
            console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
            for (let j = 0; j < spotFootingsRow.length; j++) {
                spotFootingsRow[j].checked = true;
            }
        } else {
            console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
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
            console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', panelsRow:', panelsRow);
            for (let j = 0; j < panelsRow.length; j++) {
                panelsRow[j].checked = true;
            }
        } else {
            console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', panelsRow:', panelsRow);
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
        console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
        for (let j = 0; j < spotFootingsRow.length; j++) {
            spotFootingsRow[j].checked = true;
        }
    } else {
        console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', spotFootingsRow:', spotFootingsRow);
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
console.log('Found panel rowss: ');
console.log(panelRows);

const panelRowN = document.getElementById('panelRowN');
console.log('Found panel row: ');
console.log(panelRowN);

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
        console.log("Checkbox is checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', panelsRow:', panelsRow);
        for (let j = 0; j < panelsRow.length; j++) {
            panelsRow[j].checked = true;
        }
    } else {
        console.log("Checkbox is not checked..", this['id'], ', row_id: ', row_id, ', row_name_pattern:', row_name_pattern, ', panelsRow:', panelsRow);
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

            // input.value = ensurePercent(input.value);
        });

        input.addEventListener('blur', () => {
            let value = input.value;

            value = ensurePercent(value);
            input.value = value;

            // input.value = ensurePercent(input.value);
        });
    });
    
    // document.getElementById('myForm').addEventListener('submit', (event) => {
    //     let value = percentageInput.value;
        
    //     // Ensure the value has a % at the end before form submission
    //     if (value !== '' && !value.endsWith('%')) {
    //         percentageInput.value = value + '%';
    //     }
        
    //     // Prevent form submission if the input is invalid
    //     if (!/^\d+%$/.test(percentageInput.value)) {
    //         alert('Please enter a valid percentage value.');
    //         event.preventDefault();
    //     }
    // });
});


// Today's date for the scan date
const scanDateField = document.getElementById('scan_date');
const today = new Date();
scanDateField.value = today.toJSON().slice(0, 10);
