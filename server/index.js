const express = require("express");
const FormData = require("form-data");
const fetch = require("node-fetch");
const { client_id, redirect_uri, client_secret } = require("./config");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.post("/auth", async (req, res) => {
  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", req.body);
  data.append("redirect_uri", redirect_uri);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");

      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});
app.post("/auth/repos", async (req, res) => {
  console.log(req.body, "=>hello");
  fetch(
    `https://api.github.com/users/${req.body}/repos?type=public&per_page=20`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
