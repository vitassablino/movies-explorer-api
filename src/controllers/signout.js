/* Выход */
module.exports.logout = (res) => {
  res.clearCookie('jwt');
  res.send("Выход успершен");
};