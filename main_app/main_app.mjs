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
      app.innerHTML = dashboardView();
      bindLoggedIn();
      bindWeather()
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
    <div class="login-container">
      <h1>LOGIN</h1>

      <form id="signin" method="post">
        <div class="input-group">
          <label for="user">EMAIL</label>
          <input 
            type="text" 
            id="user" 
            name="user" 
            placeholder="your@email.com" 
            required
          />
        </div>

        <div class="input-group">
          <label for="pass">PASSWORD</label>
          <input 
            type="password" 
            id="pass" 
            name="pass" 
            placeholder="••••••••" 
            required
          />
        </div>

        <button type="submit">SIGN IN</button>
      </form>

      <div class="footer">
        Don't have an account? 
        <a href="#" id="to-signup">Sign up</a>
      </div>
    </div>
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

function dashboardView() {
  return `
    <div class="login-container">
      <h1>Weather</h1>

      <form id="weather-form">
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          required
        />
        <button type="submit">Get weather</button>
      </form>

      <div id="weather-card"></div>

      <img
         src="./assets/Base-figure.png"
          alt="Base figure"
      class="dashboard-image"
/>


      <button id="edit">Edit account</button>
      <button id="delete">Delete</button>
      <button id="logout">Log out</button>
    </div>
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

function bindWeather() {
  const form = document.getElementById("weather-form");
  const card = document.getElementById("weather-card");

  form.onsubmit = async e => {
    e.preventDefault();

    const city = form.city.value;

    try {
      const data = await api("GET", `/api/weather?city=${city}`);
      card.innerHTML = renderWeather(data);
    } catch {
      card.innerHTML = `<p>Could not fetch weather</p>`;
    }
  };
}


// Edit account
function bindEdit() {
  document.getElementById("edit-form").onsubmit = async e => {
    e.preventDefault();

    const form = e.target;
    const updateData = {};

    if (form.user.value) {
      updateData.username = form.user.value;
    }

    if (form.pass.value) {
      updateData.password = form.pass.value;
    }

    try {
      await api("PUT", "/account/edit", updateData);

      if (updateData.username) {
        state.user = updateData.username;
      }

      state.view = "signin";
      update();
    } catch {
      alert("Could not update account");
    }
  };

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
function renderWeather(data) {
  const {
    name,
    main: { temp, humidity },
    weather: [{ description }]
  } = data;

  return `
    <div class="card">
      <h2>${name}</h2>
      <p>${(temp - 273.15).toFixed(1)}°C</p>
      <p>Humidity: ${humidity}%</p>
      <p>${description}</p>
    </div>
  `;
}



