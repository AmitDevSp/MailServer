import express from 'express'
import dotenv from 'dotenv'
import {MailRoutes} from  './routes/mailRoute'
const log = require('./helpers/loggerHelper')


dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();


app.use(express.json());
app.use(MailRoutes);


app.listen(port, () => {
    log.info(`Server is running on http://localhost:${port}`)
    console.log(`Server is running on http://localhost:${port}`)
});