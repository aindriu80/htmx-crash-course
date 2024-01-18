import express from "express";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set static folder
app.use(express.static("public"));
// Parse URL-encoded bodies

app.use(express.urlencoded({ extended: true }));
// Parson JSON bodies

app.use(express.json());

// Add route for /request
app.get("/request", (req, res) => {
  // Use path.join to safely join paths
  const filePath = path.join(__dirname, "public", "request.html");

  // Send the file as a response
  res.sendFile(filePath);
});

// Add route for /request
app.get("/temperature", (req, res) => {
  // Use path.join to safely join paths
  const filePath = path.join(__dirname, "public", "temperature.html");

  // Send the file as a response
  res.sendFile(filePath);
});

// Add route for /request
app.get("/polling", (req, res) => {
  // Use path.join to safely join paths
  const filePath = path.join(__dirname, "public", "polling.html");

  // Send the file as a response
  res.sendFile(filePath);
});
// Add route for /polling
// Add route for /temperature
app.post("/convert", (req, res) => {
  setTimeout(() => {
    const fahrenheit = parseFloat(req.body.fahrenheit);
    const celsius = (fahrenheit - 32) * (5 / 9);

    res.send(
      `<p>${fahrenheit} degrees Farenheit is equal to ${celsius.toFixed(
        2,
      )} degrees Celsius</p>`,
    );
  }, 2000);
});

// Handle GET request to fetch users
app.get("/users", async (req, res) => {
  setTimeout(async () => {
    const limit = +req.query.limit || 10;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`,
    );
    const users = await response.json();

    res.send(`
    <h1 class="text-2xl font-bold my-4">Users</h1>
      <ul> 
        ${users.map((user) => `<li>${user.name}</li>`).join("")}
      </ul>
    `);
  }, 3000);
});

// Handle get request for polling example
let counter = 0;
app.get("/poll", (req, res) => {
  counter++;

  const data = { value: counter };

  res.json(data);
});

let currentTemperature = 20;

app.get("/get-temperature", (req, res) => {
  currentTemperature += Math.random() * 2 - 1; //Random Temperature change
  res.send(currentTemperature.toFixed(1) + "°C");
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
