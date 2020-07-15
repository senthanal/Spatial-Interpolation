class ReaderCsv {
    constructor() {
        this.reader = new FileReader();
        this.reader.onload = this.handleFileLoad;
    }

    readFromFile(file) {
        this.reader.readAsText(file);
    }

    handleFileLoad(event) {
        let resultRows = event.target.result.split("\n");
        let data = resultRows.map((row) => row.split(","));
        ContentUtils.updateTotalRecords(data.length);
        ContentUtils.renderTable("Input CSV", "inputCsvTable", data);
    }
}