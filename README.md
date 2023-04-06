# Simple JWT-Authentication Validation
This package can be used to check validity of JWT tokens

## Make sure you provide the following environment variables or the package will not work
JWT_SECRET - Secret string used for signing and validating the JWT Token
JWT_REFRESH_SECRET - Secret string used for signing and validating the JWT Refresh Token
JWT_EXPIRES_IN - Expiration time of the JWT Token e.g. `20m` - 20 minutes
JWT_REFRESH_EXPIRES_IN - Expiration time of the JWT Refresh Token e.g. `5d` - 20 days

## Installation
Run `npm install authentication-validation` or `npm i authentication-validation`

## Usage
In a .js/.ts file use 
`import { JWTAuthentication } from "authentication-validation/lib";`

After you have imported the package you can assign it to a variable using
`const jwtAuth = JWTAuthentication();`

## Functions

### Authentication
`verifyJWTToken(token)` where token is provided as a header by the user when attemting to make a request

`signJWTToken(userId, accountType)` used for creating a new token. Uses the user id as payload, but also can include account type for authorization purposes

`signJWTRefreshToken(userId, accountType)` same functionality as the `signJWTToken`, but used for the refresh token

Supported account types:

```
enum AccountType {
  Admin = "ADMIN",
  Manager = "MANAGER",
  User = "USER",
}
```
### Authorization
`userIsAdmin(token)`
`userIsManager(token)`
`userIsUser(token)`

Used to check the account type of the users. Returns true if correct and false otherwise.