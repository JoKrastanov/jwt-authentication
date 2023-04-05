"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthentication = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var AccountType;
(function (AccountType) {
    AccountType["Admin"] = "ADMIN";
    AccountType["Manager"] = "MANAGER";
    AccountType["User"] = "USER";
})(AccountType || (AccountType = {}));
function JWTAuthentication() {
    const TOKEN_SECRET = process.env.JWT_SECRET || "";
    const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";
    const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN || "";
    const REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRES_IN || "";
    const verifyJWTToken = async (token) => {
        return await jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
    };
    const signJWTToken = (userId, accountType) => {
        const payload = { id: userId, user_type: accountType };
        return jsonwebtoken_1.default.sign(payload, TOKEN_SECRET, {
            expiresIn: JWT_EXPIRATION,
        });
    };
    const signJWTRefreshToken = (userId, accountType) => {
        const payload = { id: userId, user_type: accountType };
        return jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, {
            expiresIn: REFRESH_EXPIRATION,
        });
    };
    const userIsAdmin = async (token) => {
        const payload = (await jsonwebtoken_1.default.verify(token, TOKEN_SECRET));
        return ((payload.user_type) ===
            AccountType.Admin);
    };
    const userIsManager = async (token) => {
        const payload = (await jsonwebtoken_1.default.verify(token, TOKEN_SECRET));
        return ((payload.user_type) ===
            AccountType.Manager);
    };
    const userIsUser = async (token) => {
        const payload = (await jsonwebtoken_1.default.verify(token, TOKEN_SECRET));
        return ((payload.user_type) ===
            AccountType.User);
    };
    return {
        verifyJWTToken,
        signJWTToken,
        signJWTRefreshToken,
        userIsAdmin,
        userIsManager,
        userIsUser
    };
}
exports.JWTAuthentication = JWTAuthentication;
