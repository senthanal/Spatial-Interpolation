let fileLoader = null;
// Listens for file upload event and initiates the interpolation process
document.getElementById("uploadInput").addEventListener("change", onChange, false);
document.getElementById("reset").addEventListener("click", onReset, false);

/**
 * File upload onChange listener which initiates the interpolation process.
 */
function onChange() {
    fileLoader = new FileLoader(this.files[0]);
    fileLoader.resetFormContent();
    fileLoader.loadFile();
}

/**
 * Reset button onClick listener which resets the whole proces. After that, 
 * user can restart the interpolation process again.
 */
function onReset() {
    document.getElementById('uploadInput').value = null; // Reset file input element
    fileLoader.resetFormContent();
}