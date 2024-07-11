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

function generateAndDownloadJSON() {
    const form = document.getElementById('reportForm');
    const spotFootings = [];
    const pours = [];
    const panelPours = [];

    document.querySelectorAll('.spotFooting').forEach((element, index) => {
        spotFootings.push({
            id: (index + 1).toString(),
            trench: element.querySelector('[name="spotFooting_trench"]').checked ? "done" : "none",
            rebar: element.querySelector('[name="spotFooting_rebar"]').checked ? "done" : "none",
            pour: element.querySelector('[name="spotFooting_pour"]').checked ? "done" : "none"
        });
    });

    document.querySelectorAll('.pour').forEach((element, index) => {
        pours.push({
            id: (index + 1).toString(),
            grade: element.querySelector('[name="pour_grade"]').value,
            form: element.querySelector('[name="pour_form"]').value,
            rebars: element.querySelector('[name="pour_rebars"]').value,
            pour: element.querySelector('[name="pour_pour"]').value
        });
    });

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

    const report = {
        scan_date: form.scan_date.value,
        company: form.company.value,
        worksite: form.worksite.value,
        pix4dcloudlink: form.pix4dcloudlink.value,
        screenshot: form.screenshot.value,
        buildings: [
            {
                building: form.building.value, //"1",
                works: [
                    {
                        type: "Foundation",
                        spotFootings: spotFootings
                    },
                    {
                        type: "Slab-on-Grade",
                        pours: pours
                    },
                    {
                        type: "Panel",
                        panelBookReady: form.panelBookReady.checked, // ? "done" : "none", //true,
                        panelPours: panelPours
                    }
                ]
            }
        ]
    };

    const json = JSON.stringify({ reports: [report] }, null, 4);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'manager_report.json';
    link.click();
}