const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    email !== process.env.ADMIN_EMAIL
  ) {
    return res.status(401).json({
      success: false,
      message: "Email atau password salah",
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
  );

  if (!validPassword) {
    return res.status(401).json({
      success: false,
      message: "Email atau password salah",
    });
  }

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    success: true,
    message: "Login berhasil",
    token,
    admin: { email, role: "admin" },
  });
};

exports.logout = (req, res) => {
  res.json({
    success: true,
    message: "Logout berhasil. Hapus token pada frontend.",
  });
};