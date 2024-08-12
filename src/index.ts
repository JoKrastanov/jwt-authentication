import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

enum AccountType {
  Admin = "ADMIN",
  Manager = "MANAGER",
  User = "USER",
}

interface Payload {
  id: string,
  accountType?: AccountType
}

export function JWTAuthentication(token: string, tokenExpTime: string, refresh?: string, refreshExpTime?: string) {
  const _token = token
  const _refresh = refresh
  const _tokenExpTime = tokenExpTime
  const _refreshExpTime = refreshExpTime

  /**
   * Verifies the validity of an issued token
   * @param  {[string]} token The token provided
   * @return {[boolean]}      Whether the token provided is valid
   */
  const verifyToken = async (token: string) => {
    return await jwt.verify(token, _token);
  };

  /**
  * Verifies the validity of an issued refresh token
  * @param  {[string]} token The refresh token provided
  * @return {[boolean]}      Whether the refresh token provided is valid
  */
  const verifyRefreshToken = async (token: string) => {
    if (!_refresh) return false
    return await jwt.verify(token, _refresh);
  }

  /**
  * Signs and retuns a new JWT token
  * @param  {[string]} userId Some form of personal identification of a user
  * @param  {[AccountType]} accountType (Optional) Type of account 
  * @return {[string]} The new token      
  */
  const signToken = (userId: string, accountType?: AccountType) => {
    let payload: Payload = { id: userId };
    if (accountType) {
      payload.accountType = accountType
    }
    return jwt.sign(payload, _token, {
      expiresIn: _tokenExpTime,
    });
  };


  /**
  * Signs and retuns a new JWT refresh token
  * @param  {[string]} userId Some form of personal identification of a user
  * @param  {[AccountType]} accountType (Optional) Type of account 
  * @return {[string]} The new refresh token      
  */
  const signRefreshToken = (userId: string, accountType?: AccountType) => {
    if (!_refresh) return null
    const payload: Payload = { id: userId };
    if (accountType) {
      payload.accountType = accountType
    }
    return jwt.sign(payload, _refresh, {
      expiresIn: _refreshExpTime,
    });
  };

  /**
  * Checks the provided token to see if a user is of a certain type
  * @param  {[string]} token The user token
  * @param  {[AccountType]} accountType (Optional) Type of account 
  * @return {[boolean]} Whether the user is of the required type
  */
  const userIsType = async (token: string, type: AccountType) => {
    const payload: JwtPayload = (await jwt.verify(token, _token)) as JwtPayload;
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
