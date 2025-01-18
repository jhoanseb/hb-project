import { Router } from "express";
import fs from "fs";
import passport from "passport";

const authRouter = Router();

// JSON file to save the users data
const USERS_FILE = "./users.json";

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// Read and write users on JSON file
const readUsers = () => {
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Routes
authRouter.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({ user, message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

authRouter.post("/register", (req, res) => {
  const { username, password, displayName } = req.body;
  const users = readUsers();

  if (users.some((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users.push({ username, password, displayName });
  writeUsers(users);

  res.status(201).json({ message: "User registered successfully" });
});

// GITHUB Routes
authRouter.get(
  "/github",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  })
);

authRouter.get(
  "/github/callback",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  }),
  (req, res) => {
    const user = JSON.stringify(req.user);
    res.status(200).send(`
      <!DOCTYPE html>
        <html lang="en">
        <body></body>
        <script>
          window.opener.postMessage(${user}, 'http://localhost:5173/home')
        </script>
        </html>
    `);
  }
);

export { authRouter };
