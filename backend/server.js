const express = require('express');
const app = express();
const port = 4002;
const route = require('./routes')
const cors = require('cors')
const character = require('./character');
const { response } = require('express');

app.use('/app', route)
app.use(cors())
app.use(express.json());


function generatePassword(length, uppercase, lowercase, symbols, numbers) {
   
  const symbolsarr = '!@#$%^&*~';
  const numbersarr = '0123456789';
  const uppercasearr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercasearr = 'abcdefghijklmnopqrstuvwxyz';

  let characters = '';
  if(uppercase) {
    characters += uppercasearr;
  }
  if(lowercase) {
    characters += lowercasearr;
  }
  if(symbols) {
    characters += symbolsarr;
  }
  if(numbers) {
    characters += numbersarr;
  }
      
        let password = '';
      
        // Generate a random character and add it to the password length times
        for (let i = 0; i < length; i++) {
          password += characters[Math.floor(Math.random() * characters.length)];
        }
        if (
          !uppercase &&
          !lowercase &&
          !symbols &&
          !numbers
        ) {
          return '';
        }
        else
          return password;
      }

      app.post('/generate-password', async (req, res) => {
        const length = req.body.length;
        const uppercase = req.body.uppercase;
        const lowercase = req.body.lowercase;
        const symbols = req.body.symbols;
        const numbers = req.body.numbers;
        const password = generatePassword(length, uppercase, lowercase, symbols, numbers);
      console.log(length);
          // console.log(res.json({ password }))
        // console.log(res)
        console.log(password);
        res.status(200).json({password : password});
      });

      app.get("/", (request, response) => {
        console.log("Inside Localhost ");
      })

      app.post("/password", (request, response) => {
        const length = request.body.length;
        const includeSymbols = request.body.includeSymbols;
        const includeUppercase = request.body.includeUppercase;
        const includeLowercase = request.body.includeLowercase;
        const includeNumbers = request.body.includeNumbers;
        const password = generatePassword(length)
        response.send(password);
      });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
