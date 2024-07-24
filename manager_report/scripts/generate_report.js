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
        </div>
    `;
    spotFootingSection.insertAdjacentHTML('beforeend', newSpotFooting);
}

function addSpotFootingRow() {
    const rowSize = document.getElementById('spotFootingRowSize').value;
    const spotFootingSection = document.getElementById('spotFootingsSection');
    const count = spotFootingSection.getElementsByClassName('spotFooting').length + 1;

    var newSpotFootingRow = `
        <div class="spotFootingsRow">
            <div class="spotFootingFirst">
                    <spotFootingNumber> </spotFootingNumber><br>
                    <label class="labelSpotFooting" for="spotFooting_trench">Trench:</label><br>
                    <label class="labelSpotFooting" for="spotFooting_rebar">Rebar:</label><br>
                    <label class="labelSpotFooting" for="spotFooting_pour">Pour:</label><br>
            </div>
    `;


    // const newSpotFooting = ``;

    for (let i = 0; i < rowSize; i++) {
        newSpotFootingRow += `
            <div class="spotFooting">
                    <spotFootingNumber>${count + i}</spotFootingNumber><br>
                    <input type="checkbox" name="spotFooting_trench"><br>
                    <input type="checkbox" name="spotFooting_rebar"><br>
                    <input type="checkbox" name="spotFooting_pour"><br>
            </div>
        `;
    }

    newSpotFootingRow += `
        </div>
    `;
    
    spotFootingSection.insertAdjacentHTML('beforeend', newSpotFootingRow);
}

function addSpotFootingWithData(trench, rebar, pour) {
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
        </div>
    `;
    spotFootingSection.insertAdjacentHTML('beforeend', newSpotFooting);
}

function addSpotFootingRowWithData(trenches, rebares, poures) {
    const rowSize = document.getElementById('spotFootingRowSize').value;
    const spotFootingSection = document.getElementById('spotFootingsSection');
    const count = spotFootingSection.getElementsByClassName('spotFooting').length + 1;

    var newSpotFootingRow = `
        <div class="spotFootingsRow">
            <div class="spotFootingFirst">
                    <spotFootingNumber> </spotFootingNumber><br>
                    <label class="labelSpotFooting" for="spotFooting_trench">Trench:</label><br>
                    <label class="labelSpotFooting" for="spotFooting_rebar">Rebar:</label><br>
                    <label class="labelSpotFooting" for="spotFooting_pour">Pour:</label><br>
            </div>
    `;


    // const newSpotFooting = ``;

    for (let i = 0; i < rowSize; i++) {
        newSpotFootingRow += `
            <div class="spotFooting">
                    <spotFootingNumber>${count + i}</spotFootingNumber><br>
                    <input type="checkbox" name="spotFooting_trench" ` + boolToCheckString(trenches[i]) + `><br>
                    <input type="checkbox" name="spotFooting_rebar" ` + boolToCheckString(rebares[i]) + `><br>
                    <input type="checkbox" name="spotFooting_pour" ` + boolToCheckString(poures[i]) + `><br>
            </div>
        `;
    }

    newSpotFootingRow += `
        </div>
    `;
    
    spotFootingSection.insertAdjacentHTML('beforeend', newSpotFootingRow);
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
        </div>
    `;
    panelSection.insertAdjacentHTML('beforeend', newPanel);
}
function addPanelWithData(form, reveal, embeds, rebars, inserts, pour) {
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
            <input type="checkbox" name="panel_pour" ` + boolToCheckString(pour) + `
    `;
    panelSection.insertAdjacentHTML('beforeend', newPanel);
}

function addPanelRow(panelElement) {
    console.log('PanelElement: ');
    console.log(panelElement);
    console.log(panelElement.id);
    codeLetter = panelElement.id.slice(-1);
    // codeLetter = name.slice(0);
    const rowSize = document.getElementById(panelElement.id + 'Size').value;
    console.log('Panel rowSize: ' + rowSize);
    const count = document.getElementsByClassName('panel').length + 1;
    console.log('Panel count: ' + count);

    // <div class="panelRow">
                    // <panelNumber> </panelNumber><br>
    var newPanelRow = `
            <div class="panelFirst">
                    <panelNumber> </panelNumber><br>
                    <div class="labelPanel" for="panel_code">Panel code:</div><br>
                    <div class="labelPanel" for="panel_form">Form:</div><br>
                    <div class="labelPanel" for="panel_reveal">Reveal:</div><br>
                    <div class="labelPanel" for="panel_embeds">Embeds:</div><br>
                    <div class="labelPanel" for="panel_rebars">Rebars:</div><br>
                    <div class="labelPanel" for="panel_inserts">Inserts:</div><br>
                    <div class="labelPanel" for="panel_pour">Pour:</div><br>
            </div>
    `;


    // const newSpotFooting = ``;
                    // <panelNumber>${count + i}</panelNumber><br>

    for (let i = 0; i < rowSize; i++) {
        newPanelRow += `
            <div class="panel">
                    <panelNumber>${count + i}</panelNumber><br>
                    <input type="text" name="panel_code" class="panelCode" value=${codeLetter}-${i+1}><br>
                    <input type="checkbox" name="panel_form"><br>
                    <input type="checkbox" name="panel_reveal"><br>
                    <input type="checkbox" name="panel_embeds"><br>
                    <input type="checkbox" name="panel_rebars"><br>
                    <input type="checkbox" name="panel_inserts"><br>
                    <input type="checkbox" name="panel_pour"><br>
            </div>
        `;
    }

    panelElement.insertAdjacentHTML('beforeend', newPanelRow);
}

function addPanelRowWithData(panelElement, panelCodes, forms, reveals, embedss, rebarss, insertss, pours) {
    console.log('PanelElement: ');
    console.log(panelElement);
    console.log(panelElement.id);
    codeLetter = panelElement.id.slice(-1);
    // codeLetter = name.slice(0);
    const rowSize = document.getElementById(panelElement.id + 'Size').value;
    console.log('Panel rowSize: ' + rowSize);
    const count = document.getElementsByClassName('panel').length + 1;
    console.log('Panel count: ' + count);

    var newPanelRow = `
            <div class="panelFirst">
                    <panelNumber> </panelNumber><br>
                    <div class="labelPanel" for="panel_code">Panel code:</div><br>
                    <div class="labelPanel" for="panel_form">Form:</div><br>
                    <div class="labelPanel" for="panel_reveal">Reveal:</div><br>
                    <div class="labelPanel" for="panel_embeds">Embeds:</div><br>
                    <div class="labelPanel" for="panel_rebars">Rebars:</div><br>
                    <div class="labelPanel" for="panel_inserts">Inserts:</div><br>
                    <div class="labelPanel" for="panel_pour">Pour:</div><br>
            </div>
    `;


    for (let i = 0; i < rowSize; i++) {
        newPanelRow += `
            <div class="panel">
                    <panelNumber>${count + i}</panelNumber><br>
                    <input type="text" name="panel_code" class="panelCode" value=` + panelCodes[i] + `><br>
                    <input type="checkbox" name="panel_form" ` + boolToCheckString(forms[i]) + `><br>
                    <input type="checkbox" name="panel_reveal" ` + boolToCheckString(reveals[i]) + `><br>
                    <input type="checkbox" name="panel_embeds" ` + boolToCheckString(embedss[i]) + `><br>
                    <input type="checkbox" name="panel_rebars" ` + boolToCheckString(rebarss[i]) + `><br>
                    <input type="checkbox" name="panel_inserts" ` + boolToCheckString(insertss[i]) + `><br>
                    <input type="checkbox" name="panel_pour" ` + boolToCheckString(pours[i]) + `><br>
            </div>
        `;
    }

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
            pour: element.querySelector('[name="spotFooting_pour"]').checked ? "done" : "none"
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
            pour: element.querySelector('[name="panel_pour"]').checked
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
        screenshot: form.screenshot.value,
        buildings: [
            {
                building: form.building.value, //"1",
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
    const json = JSON.stringify({ reports: [report] }, null, 4);
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
    report = fileData.reports[0];
    document.getElementById('scan_date').value = report.scan_date || '';
    document.getElementById('company').value = report.company || '';
    document.getElementById('worksite').value = report.worksite || '';
    document.getElementById('pix4dcloudlink').value = report.pix4dcloudlink || '';
    document.getElementById('screenshot').value = report.screenshot || '';

    // ideally go over the array of things
    report.buildings.forEach((building, index) => {
        console.log(building);
    })

    // but for now only only one building
    building = report.buildings[0];

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
            buildingWork.spotFootings.forEach((spotFooting, index) => {
                // addSpotFootingWithData(doneToBool(spotFooting.trench), doneToBool(spotFooting.rebar), doneToBool(spotFooting.pour));
                console.log('Adding arrays');
                trenches.push(doneToBool(spotFooting.trench))
                rebars.push(doneToBool(spotFooting.rebar));
                pours.push(doneToBool(spotFooting.pour));
                console.log('Added');
                
                if (index > 0 && ((index+1) % spotFootingRowSize) == 0) {
                    console.log('Index ' + (index+1) + ' is divisable');
                    console.log(index);
                    console.log('trenches: ' + trenches);
                    console.log('rebars: ' + rebars);
                    console.log('pours: ' + pours);
                    addSpotFootingRowWithData(trenches, rebars, pours);
            
                    trenches = [];
                    rebars = [];
                    pours = [];
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
            document.getElementById('panelBookReady').checked = buildingWork.panelBookReady;


            let panelCodes = [];
            let forms = [];
            let reveals = [];
            let embedss = [];
            let rebarss = [];
            let insertss = [];
            let pours = [];

            let panelRowElements = [
                document.getElementById('panelRowN'),
                document.getElementById('panelRowE'),
                document.getElementById('panelRowS'),
                document.getElementById('panelRowW')];

            let panelRowSizes = [
                parseInt(document.getElementById('panelRowNSize').value),
                parseInt(document.getElementById('panelRowESize').value),
                parseInt(document.getElementById('panelRowSSize').value),
                parseInt(document.getElementById('panelRowWSize').value)];

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
                    addPanelRowWithData(panelRowElements[currentPanel], panelCodes, forms, reveals, embedss, rebarss, insertss, pours);
            
                    panelCodes = [];
                    forms = [];
                    reveals = [];
                    embedss = [];
                    rebarss = [];
                    insertss = [];
                    pours = [];
                    currentPanel += 1;
                    panelRowSizeIndex = panelRowSizeIndex + panelRowSizes[currentPanel];
                    console.log('Next index to hit for the row is ' + (panelRowSizeIndex-1));
                }
                
            });
        }
    });
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

addPanelRow(document.getElementById('panelRowN')); //, 'NORTH');
addPanelRow(document.getElementById('panelRowE')); //, 'EAST');
addPanelRow(document.getElementById('panelRowS')); //, 'SOUTH');
addPanelRow(document.getElementById('panelRowW')); //, 'WEST');


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
