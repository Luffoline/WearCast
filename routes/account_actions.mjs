// Her legger jeg inn API-endepunkter for autentisering og tilgangskontroll

import express from "express"
const router = express.Router();
const users = [];
let userID = 1;

//--------------Signup-------------------------

router.post("/signup", (req, res) => {
const {username, password} = req.body;


if (!username || !password) {
    return res.status(400).json({error: "Username and password required "});
}


})


//--------------Login-------------------------

//--------------Logout-------------------------

//--------------Delete-------------------------

export default router;