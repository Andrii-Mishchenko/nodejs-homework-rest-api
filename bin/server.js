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

//   // sendGrid
// const sgMail = require('@sendgrid/mail');

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const mail = {
//     to: 'a.mishenko@rambler.ru',
//     from: 'a.mishenko2001@gmail.com',
//     subject: 'Регистрация на сайте',
//     html: '<p>Регистрация прошла успешно! Поздравляем!</p>'
// }

// sgMail.send(mail)
//     .then(() => console.log('Verification successful'))
//     .catch(error => console.log(error.message));
    
