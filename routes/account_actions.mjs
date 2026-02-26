import express from "express"
import { registerUser, loginUser, editUser, deleteUser } from "../service/userService.mjs";
import { pool } from "../modules/db.mjs";
const router = express.Router();

//--------------Signup-------------------------

router.post("/signup", (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = registerUser(username, password);

    req.session.user = newUser;

    return res.status(201).json({ success: true });

  } catch (err) {

    if (err.message === "MISSING_FIELDS")
      return res.status(400).json({ error: "Username and password required" });

    if (err.message === "USERNAME_TAKEN")
      return res.status(409).json({ error: "Username already taken" });

    return res.status(500).json({ error: "Server error" });
  }
});


//--------------Login-------------------------

router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    const user = loginUser(username, password);

    req.session.user = user;

    return res.status(200).json({ success: true });

  } catch (err) {

    if (err.message === "MISSING_FIELDS")
      return res.status(400).json({ error: "Username and password required" });

    if (err.message === "INVALID_CREDENTIALS")
      return res.status(401).json({ error: "Invalid username or password" });

    return res.status(500).json({ error: "Server error" });
  }
});

//--------------Logout-------------------------

router.post("/logout", (req, res) =>{
    req.session.destroy();

   return res.status(200).json({success: true});
})

//--------------Edit-------------------------

router.put("/edit", (req, res) => {

  if (!req.session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { username, password } = req.body;

    const updatedUser = editUser(
      req.session.user.id,
      username,
      password
    );

    req.session.user = updatedUser;

    return res.status(200).json({ success: true });

  } catch (err) {

    if (err.message === "USER_NOT_FOUND")
      return res.status(404).json({ error: "User not found" });

    if (err.message === "USERNAME_TAKEN")
      return res.status(409).json({ error: "Username already taken" });

    return res.status(500).json({ error: "Server error" });
  }
});

//--------------Delete-------------------------

router.delete("/deleteuser", (req, res) => {

  if (!req.session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {

    deleteUser(req.session.user.id);

    req.session.destroy();

    return res.status(200).json({ success: true });

  } catch (err) {

    if (err.message === "USER_NOT_FOUND")
      return res.status(404).json({ error: "User not found" });

    return res.status(500).json({ error: "Server error" });
  }
});

export default router;