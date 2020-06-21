var express = require('express');
var router = express.Router();

/* POST emails to check */
router.post('/', function(req, res, next) {
  let emailList = req.body;

  // Validate list of emails passed in
  let errorMessage = validate(emailList);
  if (errorMessage) {
    return res.status(400).send(errorMessage);
  }

  // Determine the number of unique emails addresses
  let numberEmailAddrs = numberUniqueEmailAddrs(emailList)

  return res.status(200).json(numberEmailAddrs);
});

module.exports = router;

const validate = function(emailList) {
  let errorMessage = null;

  if (!emailList || !emailList.length || emailList.length < 1) {
    errorMessage = "A non-null request body is required.";
  }

  for (let i = 0; i < emailList.length; i++) {
    let email = emailList[i];
    let valid = /[^@]+@[^@]+/.test(email);
    if (!valid) {
      errorMessage = "Invalid email address in list";
      break;
    }
  }

  return errorMessage;
}

const numberUniqueEmailAddrs = function(emailList) {
  let emailDictionary = {};
  emailList.forEach(email => {
    let emailPieces= email.split("@");  // we know there will be an @ due to regex validation
    let domain = emailPieces[1];
    let loginName = emailPieces[0].split("+")[0].replace(".", "");
    emailDictionary[`${loginName}@${domain}`] = 1;
  });
  return Object.keys(emailDictionary).length;
}