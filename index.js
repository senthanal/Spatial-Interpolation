// TODO: Should be unbind
document.getElementById("uploadInput").addEventListener("change", onChange, false);

function onChange() {
    let fileLoader = new FileLoader(this.files[0]);
    fileLoader.loadFile();
    fileLoader.updateFileSize();
}