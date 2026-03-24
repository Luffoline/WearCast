import express from "express"
import i18n from "../modules/i18n.mjs";
import { getLocalLang } from "../middleware/getLocalLang.mjs";
import { registerUser, loginUser, editUser, deleteUser } from "../service/userService.mjs";
const router = express.Router();

//--------------Signup-------------------------

router.post("/signup", async (req, res) => {

const locale = getLocalLang(req);

  try {
    const { username, password } = req.body;

    const newUser = await registerUser(username, password);
    
    req.session.user = newUser;

    return res.status(201).json({ success: true });

 } catch (err) {

  if (err.message === "MISSING_FIELDS")
    return res.status(400).json({ error: locale.MISSING_FIELDS });

  if (err.message === "USERNAME_TAKEN")
    return res.status(409).json({ error: locale.USERNAME_TAKEN });

  return res.status(500).json({ error: locale.SERVER_ERROR });
}
});


//--------------Login-------------------------

router.post("/login", async (req, res) => {

  const locale = getLocalLang(req);
  
  try {
    const { username, password } = req.body;

    const user = await loginUser(username, password);

    req.session.user = user;

    return res.status(200).json({ success: true });

  } catch (err) {

  if (err.message === "MISSING_FIELDS")
    return res.status(400).json({ error: locale.MISSING_FIELDS });

  if (err.message === "INVALID_CREDENTIALS")
    return res.status(401).json({ error: locale.INVALID_CREDENTIALS });

  return res.status(500).json({ error: locale.SERVER_ERROR });
}
});

//--------------Logout-------------------------

router.post("/logout", async (req, res) =>{
    req.session.destroy();

   return res.status(200).json({success: true});
})

//--------------Edit-------------------------

router.put("/edit", async (req, res) => {
  
  const locale = getLocalLang(req);

  if (!req.session.user) {
    return res.status(401).json({ error: locale.NOT_AUTHENTICATED });
  }

  try {
    const { username, password } = req.body;

    const updatedUser = await editUser(
      req.session.user.id,
      username,
      password
    );

    req.session.user = updatedUser;

    return res.status(200).json({ success: true });

  } catch (err) {

    if (err.message === "USER_NOT_FOUND")
      return res.status(404).json({ error: locale.USER_NOT_FOUND });

    if (err.message === "USERNAME_TAKEN")
      return res.status(409).json({ error: locale.USERNAME_TAKEN });

    return res.status(500).json({ error: locale.SERVER_ERROR });
  }
});

//--------------Delete-------------------------

router.delete("/deleteuser", async (req, res) => {
  
const locale = getLocalLang(req);

  if (!req.session.user) {
    return res.status(401).json({ error: locale.NOT_AUTHENTICATED });
  }

  try {

    await deleteUser(req.session.user.id);

    req.session.destroy();

    return res.status(200).json({ success: true });

  } catch (err) {

    if (err.message === "USER_NOT_FOUND")
  return res.status(404).json({ error: locale.USER_NOT_FOUND });

return res.status(500).json({ error: locale.SERVER_ERROR });
  }
});

export default router;