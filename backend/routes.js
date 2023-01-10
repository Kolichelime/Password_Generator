const { response } = require('express');
const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());

router.post('/generate-password', (request, response) => {
  try {
        const password = request.body;
        response.json({password});
  } catch(error) {
        console.error(error);
        response.status(500).send("Error Occured");
  }
});

module.exports = router;
