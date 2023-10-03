import cors from "cors";
import express, { Application} from "express";
import morgan from "morgan";
import helmet from "helmet"
import router from "./router/authRouter";


export const main = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmet());
    app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(express.static(`${__dirname}/css`));

  app.get("/", (req, res) => {
    try {
      const data = {
        name: "emmanuel",
        email: "emmanuel@gmail.com",
        url: "https://google.com",
      };
      return res.status(200).render("index", data);
    } catch (error) {
      return res.status(404).json({
        message: "error",
      });
    }
  });
  
  app.use("/api", router)
};
