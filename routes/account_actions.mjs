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
const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    return res.status(409).json({ error: "Username already taken" });
  }

  const newUser = {
    id: userID++,
    username,
    password
  };

  users.push(newUser);

  res.status(201).json({ success: true });

});


//--------------Login-------------------------

router.post("/login", (req, res) =>{
    const {username, password} = req.body;
    
    const user = users.find(
        u => u.username === username && u.password === password);
    
    if (!user){
        return res.status(401).json({error: "Invalid username or password"});
    }

    res.status(200).json({success: true});
}) 

//--------------Logout-------------------------

router.post("/logout", (req, res) =>{
    req.destroy();

   return res.status(200).json({success: true});
})

//--------------Delete-------------------------

export default router;