const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5500;

// Enable CORS for frontend requests
app.use(cors());

app.get("/api/quiz", async (req, res) => {
    try {
        const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
