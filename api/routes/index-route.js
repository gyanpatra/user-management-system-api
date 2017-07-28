const express = require("express");
const userRoutes = require("./user-management-routes");

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);
router.get('/gauri', (req, res) =>
  res.send('GAURI')
);

// mount user routes at /users
router.use('/users', userRoutes);


module.exports = router;
