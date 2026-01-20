const express = require("express");
const fetch = require("node-fetch");
const app = express();

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

app.get("/login", (req, res) => {
  const redirect = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=identify`;
  res.redirect(redirect);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    scope: "identify",
  });

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const token = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

  const user = await userRes.json();

  res.redirect(
    "https://ownerx10.github.io/hukuk-panel/panel.html?user=" +
      encodeURIComponent(user.username)
  );
});

app.listen(3000);
