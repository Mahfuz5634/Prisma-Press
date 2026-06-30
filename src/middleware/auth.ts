import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";

import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                name: string;
                id: string;
                role: Role;
            }
        }
    }
}

// auth(Role.ADMIN, Role.USER, Role.Author)
// auth() => ...requiredRoles => [Role.ADMIN, Role.USER, Role.AUTHOR]
export const auth = (...requiredRoles : Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken ?
            req.cookies.accessToken 
            :
            req.headers.authorization?.startsWith("Bearer ") ? 
            req.headers.authorization?.split(" ")[1] 
            : req.headers.authorization;

        if(!token){
            throw new Error("You are not logged in. Please log in to access this resource.");
        }

        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret as string);

        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token payload.");
        }

        const { email, name, id, role } = verifiedToken as JwtPayload;

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if(!user){
            throw new Error("User not found. Please log in again.");
        }

        if(user.activeStatus === "BLOCKED"){
            throw new Error("Your account has been blocked. Please contact support.");
        }

        if(requiredRoles.length && !requiredRoles.includes(user.role)){
            throw new Error("Forbidden. You don't have permission to access this resource.");
        }

        req.user = {
            email: user.email,
            name: user.name,
            id: user.id,
            role: user.role
        }

        next();
        
    }
)
}
