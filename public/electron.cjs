const { app, BrowserWindow } = require("electron");

const createWindows = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    win.loadURL("http://localhost:4321");
};

app.whenReady().then(() => {
    createWindows();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindows();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
