import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

enum AccountType {
  Admin = "ADMIN",
  Manager = "MANAGER",
  User = "USER",
}

export function JWTAuthentication(token: string, tokenExpTime: string, refresh?: string, refreshExpTime?: string) {
  const TOKEN_SECRET = token
  const REFRESH_SECRET = refresh
  const JWT_EXPIRATION = tokenExpTime
  const REFRESH_EXPIRATION = refreshExpTime

  const verifyToken = async (token: string) => {
    return await jwt.verify(token, TOKEN_SECRET);
  };

  const verifyRefreshToken = async (token: string) => {
    if (!REFRESH_SECRET) return false
    return await jwt.verify(token, REFRESH_SECRET);
  }

  const signToken = (userId: string, accountType: AccountType) => {
    const payload = { id: userId, user_type: accountType };
    return jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
  };

  const signRefreshToken = (userId: string, accountType: AccountType) => {
    if (!REFRESH_SECRET) return null
    const payload = { id: userId, user_type: accountType };
    return jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRATION,
    });
  };

  const userIsType = async (token: string, type: AccountType) => {
    const payload: JwtPayload = (await jwt.verify(token, TOKEN_SECRET)) as JwtPayload;
    return (
      (payload.user_type) ===
      type
    );
  };

  return {
    signToken,
    verifyToken,
    signRefreshToken,
    verifyRefreshToken,
    userIsType,
  };
}

export type Authentication = ReturnType<typeof JWTAuthentication>;
