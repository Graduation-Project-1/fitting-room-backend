const jwt = require("jsonwebtoken");
const rbac = require("../rbac/rbac");

module.exports = (endPoint) => {
    return async (req, res, next) => {
        try {
            if (req.headers.authorization) {
                let bareToken = req.headers.authorization;
                let token = bareToken.split(" ")[1];
                var decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
                const isAllowed = await rbac.can(decoded.role, endPoint);
                req.user = decoded;
                if (isAllowed) {
                    next();
                }
                else {
                    return res.status(401).json({ message: "unauthorized" });
                }
            }
            else if (!req.headers.authorization) {
                return res.status(401).json({ message: "unauthorized" });
            }
        } catch (error) {
            if (error.message == "invalid signature") {
                return res.status(401).json({ message: "unauthorized" });
            }
            else {
                return res.status(500).json({ message: "Something went wrong", error });
            }
        }

    }
}