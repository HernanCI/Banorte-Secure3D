const validate = require("./puppeteer");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/helloWorld", (req, res) => res.send("Hello world"));

app.post("/api/validateCredentials", async (req, res) => {
  var resposnse = await validate.validateBanorte3DSecure(req);
  res.send({
    status: 200,
    body: resposnse,
    message: "Success",
  });
});

app
  .listen("8080", () => {
    console.log("Server is listening on port: ", 8080);
  })
  .on("error", (err) => {
    console.log("Error: " + err);
  });
