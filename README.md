# 🍭 Candy Crush Forever

**Candy Crush Forever** is a web-based platform that combines a powerful **Level Editor** and a functional **Web Player** for creating and playing custom Candy Crush Saga levels — all in your browser!

Made with ❤️ by Metr.

---

## 📂 Project Structure

```plaintext
CandyCrushForever/
├── editor/              # Level Editor (HTML + JS based)
│   ├── index.html       # Drag-and-drop editor for building levels
|   └── [images, audio, assets...]
│
├── player/              # Web Player (Flash-based)
│   ├── index.html       # Main Player (normal mode)
│   ├── sugardropindex.html  # Player with Sugar Drops enabled
│   ├── ccgame_levelLoader.swf
│   ├── SugarDrop_loader.swf
│   ├── urls.txt         # Optional shuffle list
│   └── [images, audio, assets...]
│
├── README.md            # This file
├─  index.html           # The landing site
└── LICENSE

```

---

## 🚀 How to Use

### 🛠️ Level Editor

1. Go to [`/editor/index.html`](./editor/index.html)
2. Build your custom level using the UI
3. Click the `▶ Play` button to test it

> The `▶ Play` button will open the player with your level preloaded.

---

### 🎮 Web Player

1. Open [`/player/index.html`](./player/index.html)
2. Paste a `levelCode` in the URL like this:

```url
/player/index.html?levelCode=YOUR_LEVEL_CODE_HERE
```

3. You can click **"Enable Sugar Drops"** to play using the alternate SWF:

```url
/player/sugardropindex.html?levelCode=YOUR_LEVEL_CODE_HERE
```

---

## 🌟 Features

- Drag-and-drop Level Editor with visual tools
- Multiple level types supported
- Full support for Sugar Drops
- Web Player UI with background personalization
- Toggle between Editor and Player seamlessly
- Shuffle system using `urls.txt` (optional)
- Debug tools for advanced users (`Ctrl+D`)

---

## ⚠ Flash Support Required

The Player uses SWF files, so you'll need a Flash-compatible browser like **Waterfox Classic.** Use the install guide here: [Get Flash-Enabled Browser](https://www.mediafire.com/folder/y4nh28s0yuy0o/WaterFox_%26_Flash_Installers)

---

## 🧃 Credits

> This project is fan-made and not affiliated with King.

- Editor code by **Metr**
- Based on the structure of Candy Crush Saga
- All assets are owned by King, used for educational purposes

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
