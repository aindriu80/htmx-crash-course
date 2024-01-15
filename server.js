import express from "express";

const app = express();

// Set static folder
app.use(express.static("public"));
// Parse URL-encoded bodies

app.use(express.urlencoded({ extended: true }));
// Parson JSON bodies

app.use(express.json());

// Start the server

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
