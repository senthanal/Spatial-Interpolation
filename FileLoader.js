class FileLoader {
    constructor(file) {
        this.file = file;
        this.data = null;
        this.csvReader = new ReaderCsv();
    }

    loadFile() {
        this.csvReader.readFromFile(this.file).then((result) => {
            this.updateCsvData(result);
            ContentUtils.updateFileSize(this.file);
            ContentUtils.updateTotalRecords(this.data.length);
            ContentUtils.renderTable("Input CSV", "inputCsvTable", this.data);
        });
    }

    updateCsvData(result) {
        let resultRows = result.split("\n");
        this.data = resultRows.map((row) => row.split(","));
    }
}