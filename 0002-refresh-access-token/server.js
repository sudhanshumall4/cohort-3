import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
    try {
        const { default: app } = await import("./src/app/app.js");

        const { default: connectDB } = await import("./src/config/db.js");

        const { default: config } = await import("./src/config/config.js");

        await connectDB();

        app.listen(config.PORT, () => {
            console.log(`Server is listening at ${config.PORT}`);
        });

    } catch (error) {
        console.log("Server startup error:", error.message);
        process.exit(1);
    }
};

startServer();