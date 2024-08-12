# Simple JWT-Authentication Validation
This package can be used to check validity of JWT tokens

## Installation
Run `npm install authentication-validation` or `npm i authentication-validation`

## Usage
In a .js/.ts file use 
`import { JWTAuthentication } from "authentication-validation/lib";`

After you have imported the package you can assign it to a variable using
`const jwtAuth = JWTAuthentication(token, tokenExpTime, refresh, refreshExpTime);`

token - Secret string used for signing and validating the JWT Token
tokenExpTime - Expiration time of the JWT Token e.g. `20m` - 20 minutes
refresh (Optional) - Secret string used for signing and validating the JWT 
refreshExpTime (Optional) - Expiration time of the JWT Refresh Token e.g. `5d` - 5 days

## Functions

### Authentication
`verifyToken(token)` where token is provided as a header by the user when attemting to make a request

`signToken(userId, accountType)` used for creating a new token. Uses the user id as payload, but also can include account type for authorization purposes

`verifyRefreshToken(token)` same functionality as the `verifyToken`, but used for the refresh token

`signRefreshToken(userId, accountType)` same functionality as the `signToken`, but used for the refresh token

Supported account types:

```
enum AccountType {
  Admin = "ADMIN",
  Manager = "MANAGER",
  User = "USER",
}
```
### Authorization
`userIsType(token, type)` Used to check the account type of the users. Returns true if correct and false otherwise.