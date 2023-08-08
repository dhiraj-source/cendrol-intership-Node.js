import JWT from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        next('Auth Failed')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = JWT.verify(token, process.env.SECRET_KEY);
        req.user = { userId: payload.userId, role: "user" };
        console.log("requested user", req.user)
        next()

    } catch (error) {
        next('Auth Faileded')
    }


}
export default authMiddleware;