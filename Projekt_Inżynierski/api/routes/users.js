const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// Import the Role model
const { Role } = require("../models/role");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) return res.status(409).send({ message: "User with given email already exists!" });

    // Find the role with roleName "User"
    const userRole = await Role.findOne({ where: { roleName: "User" } });

    if (!userRole) {
      return res.status(500).send({ message: "Internal Server Error: User role not found." });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    // Set roleId for the new user to the ID of the "User" role
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      roleId: userRole.id,
    };

    await User.create(newUser);
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" + error });
  }
});

module.exports = router;
