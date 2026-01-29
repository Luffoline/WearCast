// Her legger jeg inn API-endepunkter for å hente værdata som brukes i WearCast

import express from "express";

const router = express.Router();

router.get("/:city", async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Could not fetch weather data"
      });
    }

    const data = await response.json();
    res.json(data); 

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
});

export default router;
