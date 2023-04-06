import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

enum AccountType {
  Admin = "ADMIN",
  Manager = "MANAGER",
  User = "USER",
}

export function JWTAuthentication() {
  const TOKEN_SECRET = process.env.JWT_SECRET || "";
  const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";
  const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN || "";
  const REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRES_IN || "";

  const verifyJWTToken = async (token: string) => {
    return await jwt.verify(token, TOKEN_SECRET);
  };

  const verifyRefreshToken = async (token: string) => {
    return await jwt.verify(token, REFRESH_SECRET);
  }

  const signJWTToken = (userId: string, accountType: AccountType) => {
    const payload = { id: userId, user_type: accountType };
    return jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
  };

  const signJWTRefreshToken = (userId: string, accountType: AccountType) => {
    const payload = { id: userId, user_type: accountType };
    return jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRATION,
    });
  };

  const userIsAdmin = async (token: string) => {
    const payload: JwtPayload = (await jwt.verify(token, TOKEN_SECRET)) as JwtPayload;
    return (
      (payload.user_type) ===
      AccountType.Admin
    );
  };

  const userIsManager = async (token: string) => {
    const payload: JwtPayload = (await jwt.verify(token, TOKEN_SECRET)) as JwtPayload;
    return (
      (payload.user_type) ===
      AccountType.Manager
    );
  };

  const userIsUser = async (token: string) => {
    const payload: JwtPayload = (await jwt.verify(token, TOKEN_SECRET)) as JwtPayload;
    return (
      (payload.user_type) ===
      AccountType.User
    );
  };

  return {
    verifyJWTToken,
    verifyRefreshToken,
    signJWTToken,
    signJWTRefreshToken,
    userIsAdmin,
    userIsManager,
    userIsUser
  };
}

export type Authentication = ReturnType<typeof JWTAuthentication>;
