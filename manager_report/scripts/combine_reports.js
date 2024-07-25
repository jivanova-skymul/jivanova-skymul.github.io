function sortReportsByDate(reports) {
    // console.log(reports);
    reports.forEach(a => {
        console.log("date:" + new Date(a.scan_date));
    });
    // console.log(reports.sort((a, b) => new Date(b.scan_date) - new Date(a.scan_date)));
    return reports.sort((a, b) => new Date(b.scan_date) - new Date(a.scan_date));
}

function combineFiles() {
    const input = document.getElementById('fileInput');
    const files = input.files;
    if (files.length === 0) {
        alert('Please select JSON files to combine.');
        return;
    }

    let combinedData = {};
    combinedData.reports = [];
    let warnings = [];

    let filePromises = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'application/json') {
            filePromises.push(
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        try {
                            const jsonData = JSON.parse(event.target.result)["reports"];
                            if (Array.isArray(jsonData)) {
                                combinedData.reports = combinedData.reports.concat(jsonData);
                                // combinedData = combinedData.concat(jsonData);
                            } else {
                                warnings.push(`${file.name} does not contain a list. Skipping this file.`);
                            }
                            resolve();
                        } catch (e) {
                            warnings.push(`Error parsing ${file.name}: ${e.message}`);
                            reject(e);
                        }
                    };
                    reader.readAsText(file);
                })
            );
        } else {
            warnings.push(`${file.name} is not a JSON file. Skipping this file.`);
        }
    }

    console.log(combinedData);
    // combinedData.reports.entries().all
    // console.log(el);
    // // combinedData = sortReportsByDate(combinedData);
    // combinedData = { reports: combinedData.reports };
    // combinedData.reports = sortReportsByDate(combinedData.reports);
    // console.log(combinedData);

    Promise.all(filePromises).then(() => {
        const combinedJson = JSON.stringify(combinedData, null, 4);
        const blob = new Blob([combinedJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // const downloadLink = document.getElementById('downloadLink');
        // downloadLink.href = url;
        // downloadLink.download = 'manager_report_combined.json';
        // downloadLink.style.display = 'block';
        // downloadLink.textContent = 'Download Combined JSON';

        // const warningsDiv = document.getElementById('warnings');
        // warningsDiv.innerHTML = warnings.map(w => `<div class="warning">${w}</div>`).join('');

        const a = document.createElement('a');
        a.href = url;
        a.download = 'manager_report_combined.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        const warningsDiv = document.getElementById('warnings');
        warningsDiv.innerHTML = warnings.map(w => `<div class="warning">${w}</div>`).join('');
    }).catch((error) => {
        console.error('Error combining files:', error);
    });
}