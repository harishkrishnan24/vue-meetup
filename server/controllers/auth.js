const passport = require("passport");
// exports.onlyAuthUser = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   return res.status(401).send({ errors: { auth: "Not Authenticated" } });
// };

exports.onlyAuthUser = passport.authenticate("jwt", { session: false });
