class FileLoader {
    constructor(file) {
        this.file = file;
        this.records = null;
        this.badRecords = null;
        this.csvReader = new ReaderCsv();
    }

    loadFile() {
        this.csvReader.readFromFile(this.file).then((result) => {
            this.updateCsvData(result);
            ContentUtils.updateFileSize(this.file);
            ContentUtils.updateTotalRecords(this.records.length);
            ContentUtils.renderTable("Input Records", "inputCsvTable", this.records);
            this.badRecords = Calculate.findBadRecords(this.records);
            ContentUtils.renderTable("Bad Records", "badCsvTable", this.badRecords);
            let spatialNeighborForBadRecords = Calculate.findSpatialNeighbors(this.records, this.badRecords);
            console.log(spatialNeighborForBadRecords);
            let interpolatedRecords = spatialNeighborForBadRecords.map((data) => Calculate.interpolateBadRecord(
                data.badRecord,
                data.spatialNeighbors
            ));
            console.log(interpolatedRecords);
            this.records.forEach((record) => {
                let interpolatedRecord = interpolatedRecords.find((interpolatedRecord) => interpolatedRecord.id === record[0]);
                if (interpolatedRecord) {
                    record[1] = interpolatedRecord.x;
                    record[2] = interpolatedRecord.y;
                }
            });
            ContentUtils.renderTable("Interpolated Records", "interpolatedCsvTable", this.records);
        });
    }

    updateCsvData(result) {
        let resultRows = result.split("\n");
        this.records = resultRows.map((row) => row.split(",").map((data) => {
            return isNaN(Number(data)) ? data : Number(data);
        }));
    }

}