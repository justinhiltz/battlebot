import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import clientRouter from "./clientRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import battlesRouter from "./api/v1/battlesRouter.js";
import usersBattlesRouter from "./api/v1/usersBattlesRouter.js";
import wordsRouter from "./api/v1/wordsRouter.js";
import linesRouter from "./api/v1/linesRouter.js";
import sentencesRouter from "./api/v1/sentencesRouter.js";
import versesRouter from "./api/v1/versesRouter.js";
import rhymeRouter from "./api/v1/rhymeRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/battles", battlesRouter);
rootRouter.use("/api/v1/users-battles", usersBattlesRouter);
rootRouter.use("/api/v1/words", wordsRouter);
rootRouter.use("/api/v1/lines", linesRouter);
rootRouter.use("/api/v1/sentences", sentencesRouter);
rootRouter.use("/api/v1/verses", versesRouter);
rootRouter.use("/api/v1/rhymes", rhymeRouter);

export default rootRouter;
