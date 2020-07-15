class ReaderCsv {
    constructor() {}

    readFromFile(file) {
        return new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsText(file);
        });
    }
}