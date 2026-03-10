
import { api } from "./data/api_user.mjs";
import { getOutfitByTemperature } from "./outfit_engine.mjs";
const app = document.getElementById("app");

const state = {
  user: null,
  view: "signin"
};

const views = {
  signin: "./views/signin.html",
  signup: "./views/signup.html",
  loggedin: "./views/dashboard.html",
  edit: "./views/edit_acc.html"
};

 const viewBinders = {
  signin: bindSignIn,
  signup: bindSignUp,
  loggedin: () => {
    bindLoggedIn();
    bindWeather();
  },
  edit: bindEdit
};

update().catch(console.error);



async function update() {
  const viewPath = views[state.view];

  if (!viewPath) {
    console.error("View not found:", state.view);
    return;
  }

  const res = await fetch(viewPath);
  const html = await res.text();

  const template = document.createElement("template");
  template.innerHTML = html;

  app.replaceChildren(template.content.cloneNode(true));

  const binder = viewBinders[state.view];

  if (binder) {
    binder();
  }
}



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
      alert(err.message);
    }
  };

  document.getElementById("to-signup").onclick = () => {
    state.view = "signup";
    update();
  };
}

function bindSignUp() {
  document.getElementById("signup").onsubmit = async e => {
    e.preventDefault();

    const form = e.target;

    const user = {
      username: form.user.value,
      password: form.pass.value,
      email: form.email.value
    };

    try {
      await api("POST", "/account/signup", user);

      state.user = user.username;
      state.view = "loggedin";
      update();
    } catch {
      alert("Signup failed");
    }
  };

  document.getElementById("to-signin").onclick = () => {
    state.view = "signin";
    update();
  };
}


function bindLoggedIn() {
  document.getElementById("logout").onclick = async () => {
    try {
      await api("POST", "/account/logout");
    } catch {}

    state.user = null;
    state.view = "signin";
    update();
  };

  document.getElementById("edit").onclick = () => {
    state.view = "edit";
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
      renderWeather(card, data);
    } catch {
      card.replaceChildren();
      const error = document.createElement("p");
      error.textContent = "Could not fetch weather";
      card.appendChild(error);
    }
  };
}




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

  // 🔥 DELETE BUTTON
  document.getElementById("delete-account")
    ?.addEventListener("click", async () => {

      const confirmed = confirm("Are you sure you want to delete your account?");
      if (!confirmed) return;

      try {
        await api("DELETE", "/account/deleteuser");

        state.user = null;
        state.view = "signin";
        update();

      } catch {
        alert("Could not delete account");
      }
  });
}


function renderWeather(container, data) {
  container.replaceChildren();

  if (!data || !data.weather || !data.weather[0]) {
    console.error("Invalid weather data:", data);
    const error = document.createElement("p");
    error.textContent = "Invalid weather data";
    container.appendChild(error);
    return;
  }

  const {
    name,
    main: { temp, humidity },
    weather: [{ description, id }]
  } = data;

  const wrapper = document.createElement("div");
  wrapper.className = "card";

  const cityEl = document.createElement("h2");
  cityEl.textContent = name;

  const tempEl = document.createElement("p");
  tempEl.textContent = `${(temp - 273.15).toFixed(1)}°C`;

  const humidityEl = document.createElement("p");
  humidityEl.textContent = `Humidity: ${humidity}%`;

  const descEl = document.createElement("p");
  descEl.textContent = description;

  const emojiEl = document.createElement("p");
  emojiEl.textContent = getWeatherEmoji(id);
  emojiEl.className = "weatherEmoji";

  wrapper.append(cityEl, tempEl, humidityEl, descEl, emojiEl);
  container.appendChild(wrapper);

  const tempC = temp - 273.15;

const outfit = getOutfitByTemperature(tempC);

document.getElementById("layer-top").src = outfit[0];
document.getElementById("layer-pants").src = outfit[1];
document.getElementById("layer-accessory").src = outfit[2];

document.getElementById("weather-background").style.backgroundImage =
`url(${outfit[3]})`;

  
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌩️";
    case weatherId >= 300 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId > 800:
      return "☁️";
    default:
      return "❓";
  }
}


//Service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service_worker.js");
}
