class FileLoader {
    constructor(file) {
        this.file = file;
        this.csvReader = new ReaderCsv();
    }

    loadFile() {
        this.csvReader.readFromFile(this.file);
    }

    updateFileSize() {
        document.getElementById("fileSize").innerHTML = ContentUtils.humanReadableFileSize(this.file.size);
    }
}