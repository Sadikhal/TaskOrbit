import express from "express";
const router = express.Router();

//this route for checking the Public health 
router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "TaskOrbit backend is running",
    timestamp: new Date(),
  });
});

export default router;
