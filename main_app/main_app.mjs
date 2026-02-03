const app = document.getElementById("app");

const state = {
  user: null,
  view: "signin"
};

update();

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
  }
}

function signInView() {
  return `
    <h1>Weather App</h1>

    <form id="signin">
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

    <form id="signup">
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

function bindSignIn() {
  document.getElementById("signin").onsubmit = e => {
    e.preventDefault();
    state.user = "demo-user";
    state.view = "loggedin";
    update();
  };

  document.getElementById("to-signup").onclick = () => {
    state.view = "signup";
    update();
  };
}

function bindSignUp() {
  document.getElementById("signup").onsubmit = e => {
    e.preventDefault();
    state.user = "new-user";
    state.view = "loggedin";
    update();
  };

  document.getElementById("to-signin").onclick = () => {
    state.view = "signin";
    update();
  };
}

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
}

function bindEdit() {
  document.getElementById("cancel").onclick = () => {
    state.view = "loggedin";
    update();
  };
}

