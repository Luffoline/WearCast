import { pool } from "../modules/db.mjs";

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

export async function editUser(userId, newUsername, newPassword) {

  if (!newUsername && !newPassword) {
    throw new Error("NO_CHANGES");
  }

  const result = await pool.query(
    `UPDATE users
     SET username = COALESCE($1, username),
         password = COALESCE($2, password)
     WHERE id = $3
     RETURNING *`,
    [
      newUsername ?? null,
      newPassword ?? null,
      userId
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  return result.rows[0];
}

export async function deleteUser(userId) {

  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [userId]
  );

  if (result.rowCount === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  return true;
}