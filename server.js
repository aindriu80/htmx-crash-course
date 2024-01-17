import express from "express";

const app = express();

// Set static folder
app.use(express.static("public"));
// Parse URL-encoded bodies

app.use(express.urlencoded({ extended: true }));
// Parson JSON bodies

app.use(express.json());

// Handle GET request to fetch users
app.get("/users", async (req, res) => {
  // const users = [
  //   { id: 1, name: "John Does" },
  //   { id: 2, name: "Jake Wons" },
  //   { id: 3, name: "Paul Somes" },
  // ];

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
// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
