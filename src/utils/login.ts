import bcrypt from 'bcrypt';

import { jwtGenerator } from './jwtGenerator';
import { findUser } from './findUser';

export const login = async (email: string, password: string) => {
    const user = await findUser(email);
    if (!user) { throw {message: "User not found"}; }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) { throw {message:"Invalid password"}; }

    return {
        token: jwtGenerator(user.id),
        name: user.name,
        email: user.email
    };
}

