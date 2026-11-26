import dotenv from 'dotenv'
dotenv.config();
const { default: app } = await import("./src/app/app.js");
const PORT=process.env.PORT||3000;

const startServer=async()=>
{
    try
    {
        app.listen(PORT,()=>
        {
            console.log(`Server is running at ${PORT}`);
        })
    }
    catch(error)
    {
        console.log("Server startup",error.message);
        process.exit(1);
    }
};
startServer();