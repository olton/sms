import {sendSms} from "./sns.js";

export const routes = (app) => {
    app.get('/', (req, res) => {
        res.status(200).send(`Hello World!`);
    })

    app.post('/sms/send', async (req, res) => {
        const {phoneNumber, message} = req.body

        if (!phoneNumber || !message) {
            return res.status(400).send({error: 'Missing phoneNumber or message'})
        }

        const response = await sendSms(phoneNumber, message)

        res.status(200).send(response)
    })
}