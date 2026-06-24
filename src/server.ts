import app from "./app";
import "dotenv/config";
import { prisma } from "./lib/prisma";
import config from "./config";
const port= config.port;
async function main(){
    try{

      await prisma.$connect();
      console.log("Database connected successfully with prisma!!");
      app.listen(port,()=>{
        console.log(`server is running ${port}`);
      })
    }
    catch(error){
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    }
}

main();