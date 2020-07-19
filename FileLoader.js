class FileLoader {
    /**
     * Takes html5 file object as argument
     * @param {object} file 
     */
    constructor(file) {
        this.file = file;
        this.csvReader = new ReaderCsv();
    }

    /**
     * Listener function which supplied with uploaded file object file upload event. 
     * Initiates the interpolation process for bad records.
     */
    loadFile() {
        this.csvReader.readFromFile(this.file).then((result) => this.process(result));
    }

    /**
     * Business logic: Spatial interpolation
     * @param {string} result 
     */
    process(result) {
        let parsedCsvData = ReaderCsv.parse(result); // 1. Parse the csv data
        ContentUtils.updateElementContent("delimiter", parsedCsvData.delimiter); // 2. Update html content for delimiter
        ContentUtils.updateElementContent("hasHeaderRow", parsedCsvData.hasHeaderRow); // 3. Update html content for has header row
        ContentUtils.updateElementContent("fileSize", ContentUtils.humanReadableFileSize(this.file.size)); // 4. Update html content for file size
        ContentUtils.updateElementContent("totalRecords", parsedCsvData.records.length); // 5. Update html content for total number of records count
        ContentUtils.renderTable("Input Records", "inputCsvTable", parsedCsvData.records, parsedCsvData.columns); // 6. Update html content for input records table
        let badRecords = Calculate.findBadRecords(parsedCsvData.records); // 7. Filter the bad records when the value field is zero
        ContentUtils.updateElementContent("badRecords", badRecords.length); // 8. Update html content for number of bad recods count
        ContentUtils.renderTable("Bad Records", "badCsvTable", badRecords, parsedCsvData.columns); // 9. Update html content for bad recods table
        this.interpolate(parsedCsvData.records, badRecords, parsedCsvData.columns); // 10. Spatially interpolated bad recods from the given valid records
    }

    /**
     * Compute spatial interpolation for bad records.
     * @param {array<array>} records 
     * @param {array<array>} badRecords 
     * @param {array<string>} headerColumns 
     */
    interpolate(records, badRecords, headerColumns) {
        let validRecords = records.filter((record) => badRecords.indexOf(record) === -1); // 1. Filter valid records by removing bad records
        let badRecordsWithSpatialNeighbors = Calculate.findSpatialNeighbors(validRecords, badRecords, 2); // 2. Find the two closest valid points to the bad records
        let interpolatedRecords = badRecordsWithSpatialNeighbors.map((data) => Calculate.interpolateBadRecord(
            data.badRecord,
            data.spatialNeighbors
        )); // 3. Calculate the interpolated values for bad records based on the two closest points
        let finalRecords = [...new Set([...records, ...interpolatedRecords])]; // 4. Update the interpolated values into the original records
        ContentUtils.renderTable("Interpolated Records", "interpolatedCsvTable", finalRecords, headerColumns); // 5. Print the final interpolated recods
    }

    /**
     * Reset the input form and all the relevant fields
     */
    resetFormContent() {
        ContentUtils.updateElementContent("delimiter", "?");
        ContentUtils.updateElementContent("hasHeaderRow", "?");
        ContentUtils.updateElementContent("fileSize", 0);
        ContentUtils.updateElementContent("totalRecords", 0);
        ContentUtils.updateElementContent("badRecords", 0);
        ContentUtils.updateElementContent("inputCsvTable", "");
        ContentUtils.updateElementContent("badCsvTable", "");
        ContentUtils.updateElementContent("interpolatedCsvTable", "");
        this.file = null;
        this.csvReader = null;
    }
}