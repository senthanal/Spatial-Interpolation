// Listens for file upload event and initiates the interpolation process
document.getElementById("uploadInput").addEventListener("change", onChange, false);

/**
 * File upload onChange listener which initiates the interpolation process.
 */
function onChange() {
    let fileLoader = new FileLoader(this.files[0]);
    fileLoader.loadFile();
}