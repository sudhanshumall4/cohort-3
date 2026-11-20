import dotenv from 'dotenv'
dotenv.config();

import app from './app/app.js';
import { connectionDB } from './config/db.js';
const PORT=Number(process.env.PORT)||3000;

const serverstart=async()=>
{
  try
  {
     await connectionDB();
     app.listen(PORT,()=>
    {
        console.log(`Server is running on port ${PORT}`);
    });
}
    catch(error)
    {
        console.log("Setup error",error.message);
        process.exit(1);
    }
  };

serverstart();