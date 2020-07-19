class ReaderCsv {
    constructor() {}

    /**
     * HTML5 file reader wrapped into promise. Promise wrapping helps to start 
     * interpolation right after the file content read asynchronously.
     * @param {object} file 
     * @returns {Promise} HTML5 promise which resolves file content as string
     */
    readFromFile(file) {
        return new Promise((resolve) => {
            let fileReader = new FileReader(); // HTML5 file reader api
            fileReader.onload = (e) => resolve(fileReader.result); // File reader api onload event listener which later resolves with csv file content
            fileReader.readAsText(file); // Read the file content as text
        });
    }

    /**
     * Parse the csv data string and extracts records, file metrics.
     * @param {string} result 
     * @param {object} csvData 
     */
    static parse(result) {
        let csvData = null; // Returned result object
        let resultRows = result.split(/\r\n|\n/); // Split rows/records from the csv data string
        let headerRow = resultRows[0]; // Assumes the first row as header row
        csvData = Object.assign({}, { // Finds the delimiter, if tab space or comma
            delimiter: headerRow.split(/\t|\s/).length === 3 ? "Space" : headerRow.split(/,/).length === 3 ? "Comma" : false
        });
        if (csvData.delimiter) { // Proceed further only when a valid delimiter is found
            let splitRegEx = csvData.delimiter === "Space" ? /\t|\s/ : /,/; // Regex for tab space or comma csv separator
            csvData = Object.assign(csvData, { // Has header row only when the first row contains textual information
                hasHeaderRow: headerRow.split(splitRegEx).map((data) => isNaN(data)).length === 3
            });
            if (csvData.hasHeaderRow) { // Collect column names when the header row exists
                csvData = Object.assign(csvData, {
                    columns: headerRow.split(splitRegEx)
                });
            }
            csvData = Object.assign(csvData, { // Collect rows/records from the csv 
                records: resultRows.slice(1).map((row) => row.split(splitRegEx).map((data) => {
                    return isNaN(Number(data)) ? data : Number(data); // Parse values from string to number type
                }))
            });
        }
        return csvData;
    }
}