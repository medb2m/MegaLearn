import { verifyToken, isAdmin, isModerator } from "../middlewares/authJwt.js";
import { allAccess, userBoard, moderatorBoard, adminBoard } from "../controllers/user.controller.js";

export default function userRoutes(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/user", [verifyToken], userBoard);

  app.get(
    "/api/test/mod",
    [verifyToken, isModerator],
    moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [verifyToken, isAdmin],
    adminBoard
  );
};
