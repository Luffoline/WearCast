import { pool } from "../modules/db.mjs";

//SIGNUP
export async function registerUser(username, password) {

  if (!username || !password) {
    throw new Error("MISSING_FIELDS");
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, `${username}@placeholder.com`, password]
    );

    return result.rows[0];

  } catch (err) {
    if (err.code === "23505") {
      throw new Error("USERNAME_TAKEN");
    }

    throw err;
  }
}

//LOGIN
export async function loginUser(username, password) {

  if (!username || !password) {
    throw new Error("MISSING_FIELDS");
  }

  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1 AND password = $2",
    [username, password]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return user;
}

//EDIT
export function editUser(userId, newUsername, newPassword) {

  const user = users.find(u => u.id === userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (newUsername) {
    const nameTaken = users.find(
      u => u.username === newUsername && u.id !== userId
    );

    if (nameTaken) {
      throw new Error("USERNAME_TAKEN");
    }

    user.username = newUsername;
  }

  if (newPassword) {
    user.password = newPassword;
  }

  return user;
}

//DELETE
export function deleteUser(userId) {

  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    throw new Error("USER_NOT_FOUND");
  }

  users.splice(index, 1);

  return true;
}