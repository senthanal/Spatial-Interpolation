class ContentUtils {
    constructor() {}

    static renderTable(title, elementId, data) {
        let tableHtml = '<table><caption>' + title + '</caption><thead><th>Point Id</th><th>X-Coord</th><th>Y-Coord</th></thead><tbody>';
        data.forEach((row) => {
            tableHtml += '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td><td>' + row[2] + '</td></tr>';
        });
        tableHtml += '</tbody></table>';
        document.getElementById(elementId).innerHTML = tableHtml;
    }

    static humanReadableFileSize(nBytes) {
        let sOutput = nBytes + " bytes";
        // optional code for multiples approximation
        const aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        for (let nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
        }
        return sOutput;
    }

    static updateTotalRecords(totalRecords) {
        document.getElementById("totalRecords").innerHTML = totalRecords;
    }

    static updateFileSize(file) {
        document.getElementById("fileSize").innerHTML = ContentUtils.humanReadableFileSize(file.size);
    }
}