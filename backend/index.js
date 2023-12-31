import express from "express";
import cors from "cors";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";
import db from "./src/config/Database.js";
import UserRoute from "./src/routes/UserRoute.js";
import ProductRoute from "./src/routes/ProductRoute.js";
import AuthRoute from "./src/routes/AuthRoute.js";
import BlogRoute from "./src/routes/BlogRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// (async () => {
//   await db.sync();
//   console.log("Database Synced");
// })();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// Sync the session table
store.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: "auto" },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public/images"));

app.use(UserRoute);
app.use(ProductRoute); // Add route path
app.use(AuthRoute); // Add route path
app.use(BlogRoute); // Add route path

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
