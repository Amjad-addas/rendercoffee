const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10; // Recommended value for security
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function isPassword(password,pass) {
  const ispass= await bcrypt.compare(password,pass)
  return ispass
}
module.exports={hashPassword,isPassword}