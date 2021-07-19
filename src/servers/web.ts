import express from "express";
import fse from "fs-extra";

const app = express();

export default (path: string): void => {
  const port = 8080;

  app.use(express.static(path));

  app.get("/login", async (req, res) => {
    const html = await fse.readFile(`${__dirname}/widget/login.html`, "utf-8");
    res.type(".html");
    res.send(html);
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};
