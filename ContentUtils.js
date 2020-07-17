class ContentUtils {
    constructor() {}

    /**
     * Renders html table into the given elementId with provided dataset
     * @param {string} title 
     * @param {string} elementId 
     * @param {object} dataRows 
     */
    static renderTable(title, elementId, dataRows, columns) {
        let tableHtml = '<table><caption>' + title + `</caption><thead><th>${columns[0]}</th><th>${columns[1]}</th><th>${columns[2]}</th></thead><tbody>`;
        dataRows.forEach((row) => {
            tableHtml += '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td><td>' + row[2] + '</td></tr>';
        });
        tableHtml += '</tbody></table>';
        document.getElementById(elementId).innerHTML = tableHtml;
    }

    /**
     * Prints human readable file size from given file size in bytes
     * @param {number} filesize 
     * @returns {string} Human readbale file size text
     */
    static humanReadableFileSize(filesize) {
        let fileSizeText = filesize + " bytes";
        const unit = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        for (let nMultiple = 0, nApprox = filesize / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            fileSizeText = nApprox.toFixed(3) + " " + unit[nMultiple] + " (" + filesize + ")";
        }
        return fileSizeText;
    }

    /**
     * Updates the content of the given html element id
     * @param {string} id 
     * @param {string} content 
     */
    static updateElementContent(id, content) {
        document.getElementById(id).innerHTML = content;
    }
}