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
            <input type="checkbox" name="spotFooting_trench" checked><br>

            <label>Rebar:</label>
            <input type="checkbox" name="spotFooting_rebar" checked><br>

            <label>Pour:</label>
            <input type="checkbox" name="spotFooting_pour"><br>
        </div>
    `;
    spotFootingSection.insertAdjacentHTML('beforeend', newSpotFooting);
}

// function removeSpotFootings() {
//     const spotFootingSection = document.getElementById('spotFootingsSection');
//     console.log(spotFootingSection);
//     spotFootingSection.innerHTML = '';
// }

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

// Slab on grade pours
function addPour() {
    const poursSection = document.getElementById('poursSection');
    const count = poursSection.getElementsByClassName('pour').length + 1;
    const newPour = `
        <div class="pour">
            <h3>Pour ${count}</h3>

            <label>Grade:</label>
            <input type="text" name="pour_grade" value="95%" required><br>

            <label>Form:</label>
            <input type="text" name="pour_form" value="90%" required><br>

            <label>Rebars:</label>
            <input type="text" name="pour_rebars" value="20%" required><br>

            <label>Pour:</label>
            <input type="text" name="pour_pour" value="0%" required><br>
        </div>
    `;
    poursSection.insertAdjacentHTML('beforeend', newPour);
}

function addPourWithData(pour_grade, pour_form, pour_rebars, pour_pour) {
    const poursSection = document.getElementById('poursSection');
    const count = poursSection.getElementsByClassName('pour').length + 1;
    const newPour = `
        <div class="pour">
            <h3>Pour ${count}</h3>

            <label>Grade:</label>
            <input type="text" name="pour_grade" value="` + pour_grade + `" required><br>

            <label>Form:</label>
            <input type="text" name="pour_form" value="` + pour_form + `" required><br>

            <label>Rebars:</label>
            <input type="text" name="pour_rebars" value="` + pour_rebars + `" required><br>

            <label>Pour:</label>
            <input type="text" name="pour_pour" value="` + pour_pour + `" required><br>
        </div>
    `;
    poursSection.insertAdjacentHTML('beforeend', newPour);
}

// Panel pours
function addPanelPour() {
    const panelPoursSection = document.getElementById('panelPoursSection');
    const count = panelPoursSection.getElementsByClassName('panelPour').length + 1;
    const newPanelPour = `
        <div class="panelPour">
            <h3>Panel Pour ${count}</h3>

            <label>Form:</label>
            <input type="checkbox" name="panelPour_form" checked><br>

            <label>Reveal:</label>
            <input type="checkbox" name="panelPour_reveal" checked><br>

            <label>Embeds:</label>
            <input type="checkbox" name="panelPour_embeds" checked><br>

            <label>Rebars:</label>
            <input type="checkbox" name="panelPour_rebars" checked><br>

            <label>Inserts:</label>
            <input type="checkbox" name="panelPour_inserts" checked><br>

            <label>Pour:</label>
            <input type="checkbox" name="panelPour_pour" checked><br>
        </div>
    `;
    panelPoursSection.insertAdjacentHTML('beforeend', newPanelPour);
}
function addPanelPourWithData(form, reveal, embeds, rebars, inserts, pour) {
    const panelPoursSection = document.getElementById('panelPoursSection');
    const count = panelPoursSection.getElementsByClassName('panelPour').length + 1;
    const newPanelPour = `
        <div class="panelPour">
            <h3>Panel Pour ${count}</h3>

            <label>Form:</label>
            <input type="checkbox" name="panelPour_form" ` + boolToCheckString(form) + `><br>

            <label>Reveal:</label>
            <input type="checkbox" name="panelPour_reveal" ` + boolToCheckString(reveal) + `><br>

            <label>Embeds:</label>
            <input type="checkbox" name="panelPour_embeds" ` + boolToCheckString(embeds) + `><br>

            <label>Rebars:</label>
            <input type="checkbox" name="panelPour_rebars" ` + boolToCheckString(rebars) + `><br>

            <label>Inserts:</label>
            <input type="checkbox" name="panelPour_inserts" ` + boolToCheckString(inserts) + `><br>

            <label>Pour:</label>
            <input type="checkbox" name="panelPour_pour" ` + boolToCheckString(pour) + `
    `;
    panelPoursSection.insertAdjacentHTML('beforeend', newPanelPour);
}





function generateAndDownloadJSON() {
    const form = document.getElementById('reportForm');
    const spotFootings = [];
    const pours = [];
    const panelPours = [];
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
    document.querySelectorAll('.panelPour').forEach((element, index) => {
        panelPours.push({
            id: (index + 1).toString(),
            form: element.querySelector('[name="panelPour_form"]').checked,
            reveal: element.querySelector('[name="panelPour_reveal"]').checked,
            embeds: element.querySelector('[name="panelPour_embeds"]').checked,
            rebars: element.querySelector('[name="panelPour_rebars"]').checked,
            inserts: element.querySelector('[name="panelPour_inserts"]').checked,
            pour: element.querySelector('[name="panelPour_pour"]').checked
        });
    });
    if (form.addPanelPoursSection.checked)
    {
        buildingWorks.push({
            type: "Panel",
            panelBookReady: form.panelBookReady.checked,
            panelPours: panelPours
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
                //         panelPours: panelPours
                //     }
                // ]
            }
        ]
    };

    // For all buildings
    

    const json = JSON.stringify({ reports: [report] }, null, 4);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'manager_report.json';
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

    buildingWorks.forEach((buildingWork, index) => {
        console.log(buildingWork)
        console.log('Work type: ' + buildingWork.type)
        if (buildingWork.type == "Foundation") {
            document.getElementById('addSpotFootingsSection').checked = true;
            removeChildrenNodes('spotFootingsSection', 'spotFooting');
            buildingWork.spotFootings.forEach((spotFooting, index) => {
                addSpotFootingWithData(doneToBool(spotFooting.trench), doneToBool(spotFooting.rebar), doneToBool(spotFooting.pour));
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
            document.getElementById('addPanelPoursSection').checked = true;
            removeChildrenNodes('panelPoursSection', 'panelPour');
            document.getElementById('panelBookReady').checked = buildingWork.panelBookReady;
            buildingWork.panelPours.forEach((panelPour, index) => {
                addPanelPourWithData(panelPour.form, panelPour.reveal, panelPour.embeds, panelPour.rebars, panelPour.inserts, panelPour.pour);
            });
        }
    });
}