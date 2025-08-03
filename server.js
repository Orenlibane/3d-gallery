// server.js – ultra‑basic Express server for the gallery
// ------------------------------------------------------
// 1. `npm init -y`
// 2. `npm i express`  (optionally: nodemon for live‑reload)
// 3. `node server.js` and open http://localhost:3000

import express from "express";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ------------- static front‑end -------------
app.use(express.static(__dirname));

// ------------- API endpoint -------------
app.get("/items", async (_req, res) => {
  try {
    // הוסף זמנית בתוך try:

    // read fresh copy each time so edits to items.json are reflected immediately
    const jsonPath = path.join(__dirname, "assets", "items.json");
    console.log("JSON path →", jsonPath);   // <<< שורת בדיקה
    const raw = await readFile(jsonPath, "utf8");
    res.type("application/json").send(raw);
  } catch (err) {
    console.error("/items error", err);
    res.status(500).json({ message: "Failed to load items" });
  }
});

app.listen(PORT, () => {
  console.log(`Gallery server running → http://localhost:${PORT}`);
});
