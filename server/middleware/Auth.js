export const AuthToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
            message: "Invalid Token",
            });
        }
        req.user = decoded;
        next();
        });
    } else {
        return res.status(401).json({
        message: "No token provided",
        });
    }
    }