const users = [];
let userID = 1;

//SIGNUP
export function registerUser(username, password) {

  if (!username || !password) {
    throw new Error("MISSING_FIELDS");
  }

  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    throw new Error("USERNAME_TAKEN");
  }

  const newUser = {
    id: userID++,
    username,
    password
  };

  users.push(newUser);

  return newUser;
}

//LOGIN
export function loginUser(username, password) {

  if (!username || !password) {
    throw new Error("MISSING_FIELDS");
  }

  const user = users.find(
    u => u.username === username && u.password === password
  );

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