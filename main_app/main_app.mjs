// App setup & global state
import { api } from "./data/api_user.mjs";
const app = document.getElementById("app");

const state = {
  user: null,
  view: "signin"
};

update();

// View controller
function update() {
  switch (state.view) {
    case "signin":
      app.innerHTML = signInView();
      bindSignIn();
      break;

    case "signup":
      app.innerHTML = signUpView();
      bindSignUp();
      break;

    case "loggedin":
      app.innerHTML = loggedInView();
      bindLoggedIn();
      break;

    case "edit":
      app.innerHTML = editAccountView();
      bindEdit();
      break;
    
    case "delete":
        app.innerHTML = deleteAccount();
        bindDelete();
        break;
  }
}

// UI views (innerHTML)
function signInView() {
  return `
    <h1>Weather App</h1>

    <form id="signin" method="post">
      <input name="user" placeholder="Username" required />
      <input name="pass" type="password" placeholder="Password" required />
      <button>Sign in</button>
    </form>

    <button id="to-signup">Create account</button>
  `;
}


function signUpView() {
  return `
    <h1>Weather App</h1>

    <form id="signup" method="post">
      <input name="user" placeholder="Username" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="pass" type="password" placeholder="Password" required />
      <button>Sign up</button>
    </form>

    <button id="to-signin">Back</button>
  `;
}

function loggedInView() {
  return `
    <h1>Weather App</h1>
    <p>Logged in as <strong>${state.user}</strong></p>

    <button id="edit">Edit account</button>
    <button id="logout">Log out</button>
    <button id="delete">Delete</button>
  `;
}

function editAccountView() {
  return `
    <h1>Weather App</h1>

    <form id="edit-form">
      <input name="user" placeholder="New username" />
      <input name="pass" type="password" placeholder="New password" />
      <button>Save</button>
    </form>

    <button id="cancel">Cancel</button>
  `;
}

function deleteAccount() {
  return `
    <h1>Delete account</h1>
    <p>Are you sure you want to delete <strong>${state.user}</strong>?</p>

    <button id="confirm-delete">Yes, delete</button>
    <button id="cancel-delete">Cancel</button>
  `;
}

// Sign in logic
function bindSignIn() {
  document.getElementById("signin").onsubmit = async e => {
    e.preventDefault();

    const form = e.target;

    try {
      await api("POST", "/account/login", {
        username: form.user.value,
        password: form.pass.value
      });

      
      state.user = form.user.value;
      state.view = "loggedin";
      update();
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  document.getElementById("to-signup").onclick = () => {
    state.view = "signup";
    update();
  };
}



// Sign up logic
function bindSignUp() {
  document.getElementById("signup").onsubmit = async e => {
    e.preventDefault();

    const form = e.target;

    const user = {
      username: form.user.value,
      password: form.pass.value,
      email: form.email.value
    };

   await api("POST", "/account/signup", user);


    state.user = user.username;
    state.view = "loggedin";
    update();
  };

  document.getElementById("to-signin").onclick = () => {
    state.view = "signin";
    update();
  };
}

// Logged-in user actions
function bindLoggedIn() {
  document.getElementById("logout").onclick = () => {
    state.user = null;
    state.view = "signin";
    update();
  };

  document.getElementById("edit").onclick = () => {
    state.view = "edit";
    update();
  };

  document.getElementById("delete").onclick = () => {
    state.view = "delete";
    update();
  };
}

// Edit account
function bindEdit() {
  document.getElementById("cancel").onclick = () => {
    state.view = "loggedin";
    update();
  };
}

// Delete account
function bindDelete() {
  document.getElementById("confirm-delete").onclick = async () => {
    try {
      await api("DELETE", "/account/deleteuser", {
        username: state.user
      });

      state.user = null;
      state.view = "signin";
      update();
    } catch {
      alert("Could not delete account");
    }
  };

  document.getElementById("cancel-delete").onclick = () => {
    state.view = "loggedin";
    update();
  };
}



