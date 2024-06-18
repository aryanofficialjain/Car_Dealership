const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Authorization token is not provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const { role } = decoded;

        // Check if the role is admin or user
        if (role !== 'admin' && role !== 'user') {
            return res.status(403).json({ message: "Unauthorized: Invalid role" });
        }

        req.user = decoded;
        next(); // Call next middleware
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authToken;
