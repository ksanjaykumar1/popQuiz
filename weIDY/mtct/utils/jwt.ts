import * as jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

const createJWT = ({ payload }: any) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }: any) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { createJWT, isTokenValid };
