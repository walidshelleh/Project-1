const User = require('../models/user'); // Ensure this path is correct

exports.postLogin = (req, res, next) => {
    const { username, password } = req.body;
  
    // Find user by username
    User.findOne({ name: username })
      .then((user) => {
        if (!user) {
          // If user not found
          return res.render("auth/login", {
            PageTitle: "Login",
            isAuthenticated: req.session.isAuthenticated || false,
            invalid: true, // Indicate invalid credentials
          });
        }
  
        // Check if the plaintext password matches
        if (user.password === password) {
          req.session.isAuthenticated = true;
          req.session.user_id = user._id
          req.session.user = user; // Store user in session
          return req.session.save(() => {
            res.redirect("/"); // Redirect to index if login is successful
          });
        } else {
          // Password mismatch
          return res.render("auth/login", {
            PageTitle: "Login",
            isAuthenticated: req.session.isAuthenticated || false,
            invalid: true, // Indicate invalid credentials
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("An error occurred during login."); // Handle server error
      });
  };
exports.getLogin = (req, res, next) => {
  return res.render("auth/login", {
    PageTitle: "Login",
    isAuthenticated: req.session?.isAuthenticated || false,
    invalid: false,
  });
};
exports.getLogout = (req, res, next) => {
  req.session.destroy();
  return res.redirect("/");
};


exports.getRegister = (req, res, next) => {
        res.render("auth/register", {
          title: "Register",
          isAuthenticated: req.session?.isAuthenticated || false,
        });
};


exports.postRegister = (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
  
    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).send("All fields are required.");
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }
  
    // Check if the email is already registered
    User.findOne({ email })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).send("Email already in use.");
        }
  
        // Create a new user
        const newUser = new User({
          name: username, // Match the form's "username" field
          email,
          password, // Save plaintext password (not recommended for production)
          cart: { items: [] }, // Initialize cart as empty
        });
  
        return newUser.save();
      })
      .then(() => {
        res.redirect("/login"); // Redirect to the login page after successful registration
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("An error occurred during registration.");
      });
  };