const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token diperlukan",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Akses ditolak",
      });
    }

    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Token tidak valid atau sudah kedaluwarsa",
    });
  }
};