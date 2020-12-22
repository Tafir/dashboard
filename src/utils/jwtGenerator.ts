import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const jwtGenerator = (user_id: string) => {
    const payload = {
        userId: user_id
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
}