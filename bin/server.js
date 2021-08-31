const mongoose = require('mongoose');
require("dotenv").config();

const app = require('../app')

// const PORT = process.env.PORT || 3000 //- второй способ
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`)
    })
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  });


