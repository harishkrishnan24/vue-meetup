const User = require("../models/users");
const passport = require("passport");

exports.getUsers = function(req, res) {
  User.find({}).exec((errors, users) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    return res.json(users);
  });
};

exports.getCurrentUser = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.sendStatus(422);
  }

  return res.json(user.toAuthJSON());
};

exports.register = (req, res) => {
  const registerData = req.body;

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: "is required",
        message: "Email is required"
      }
    });
  }
  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
        message: "Password is required"
      }
    });
  }

  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: "is not the same as confirmation password",
        message: "Password is not the same as confirmation password"
      }
    });
  }

  const user = new User(registerData);
  user.save((errors, savedUser) => {
    if (errors) {
      return res.status(422).json({ errors });
    }
    return res.json(savedUser);
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({
      errors: {
        email: "is required",
        message: "Email is required"
      }
    });
  }
  if (!password) {
    return res.status(422).json({
      errors: {
        password: "is required",
        message: "Password is required"
      }
    });
  }

  return passport.authenticate("local", (err, passportUser) => {
    if (err) return next(err);
    if (passportUser) {
      // req.login(passportUser, err => {
      //   if (err) next(err);
      //   return res.json(passportUser);
      // });

      return res.json(passportUser.toAuthJSON());
    } else {
      return res.status(422).send({
        errors: {
          message: "Invalid password or email!"
        }
      });
    }
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  return res.json({ status: "Session destroyed" });
};
