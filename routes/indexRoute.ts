import express from "express";
import session from "express-session";

import {
  ensureAuthenticated,
  ensureAdmin,
} from "../middleware/checkAuth";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "<pre><strong>http://localhost:8000/auth/login</strong> for the login page. </pre><pre><strong>http://localhost:8000/dashboard</strong> for the dashboard (requires login).</pre>"
  );
});

router.get(
  "/dashboard",
  ensureAuthenticated,
  (req, res) => {
    res.render("dashboard", {
      user: req.user,
    });
  }
);

router.get(
  "/admin",
  ensureAuthenticated,
  ensureAdmin,
  (req, res, next) => {
    const store =
      req.sessionStore as session.MemoryStore;

    store.all((err, sessions) => {
      if (err) {
        next(err);
        return;
      }

      res.render("admin", {
        user: req.user,
        sessions: sessions,
      });
    });
  }
);

router.post(
  "/revoke-session",
  ensureAuthenticated,
  ensureAdmin,
  (req, res, next) => {
    const sessionID = req.body.sessionID;

    if (typeof sessionID !== "string") {
      res.status(400).send("Invalid session ID");
      return;
    }

    req.sessionStore.destroy(
      sessionID,
      (err) => {
        if (err) {
          next(err);
          return;
        }

        res.redirect("/admin");
      }
    );
  }
);

export default router;