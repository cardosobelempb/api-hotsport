import express from "express";
import { sessionMiddleware } from "./middlewares/session.middleware";
import { indexRouter } from "./routes/index.route";
import { userRouter } from "./routes/user.routes";
import { adminRouter } from "./routes/admin.routes";
import { notFoundHandler } from "./routes/error.routes";
import session from "express-session";
import { loadAppConfig } from "./config/config.loader";
import { AppContext } from "./context/app.context";
import { themeRouter } from "./routes/theme.routes";
import { loadTheme } from "./services/theme.loader";
import { sessionRouter } from "./routes/session.router";

export const app = express();

// sessão
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// carrega config (equivalente ao foreach do PHP)
const mUser = "demo"; // viria do login
const config = loadAppConfig(mUser);
const theme = loadTheme();
AppContext.setConfig(config);

app.use(express.json());
// rotas
app.get("/config", (_req, res) => {
  res.json(AppContext.getConfig());
});
app.get("/theme", (_req, res) => {
  res.json(theme);
});
app.use(sessionMiddleware);
app.use("/", indexRouter);
app.use("/session", sessionRouter);
app.use("/api", userRouter);
app.use("/admin", adminRouter);
app.use("/api", themeRouter);

// 404
app.use(notFoundHandler);
