const CLIENT_ID = "1463284692923973828";
const REDIRECT_URI = window.location.origin + window.location.pathname;

const loginButon = document.getElementById("login");

if (loginButon) {
  loginButon.href =
    "https://discord.com/oauth2/authorize" +
    "?client_id=" + CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
    "&response_type=token" +
    "&scope=identify";
}

// Discord'tan dönüşte token alma
if (window.location.hash) {
  const hash = new URLSearchParams(window.location.hash.substring(1));
  const token = hash.get("access_token");

  if (token) {
    localStorage.setItem("discord_token", token);
    window.location.href = "panel.html";
  }
}

function girisKontrol() {
  if (!localStorage.getItem("discord_token")) {
    window.location.href = "index.html";
  }
}

function cikis() {
  localStorage.removeItem("discord_token");
  window.location.href = "index.html";
}
