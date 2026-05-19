import jwt from "jsonwebtoken";

export const tokenVerification = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Você não tem autorização para visualizar esta página" });
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const validatedToken = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ error: "Você não tem autorização para visualizar esta página" });
    };
}

