import dotenv from "dotenv";
import path from "path";

dotenv.config({path:path.join(process.cwd(),".env")});

export default{
    port:parseInt(process.env.PORT) || 5000,
    app_url:process.env.APP_URL || "http://localhost:5000",
    database_url:process.env.DATABASE_URL,
    // bycrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS || 10,
    jwt_access_secret:process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
    jwt_access_expiration_time:process.env.JWT_ACCESS_EXPIRATION_TIME || "15m", 
    jwt_refresh_expiration_time:process.env.JWT_REFRESH_EXPIRATION_TIME || "7d",

}