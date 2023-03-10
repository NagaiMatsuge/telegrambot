import axios from 'axios'
import { config } from 'dotenv'
import express from 'express'

config()
const app = express()
const SEND_MESSAGE_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/new-message', async (req, res) => {
    const {message} = req.body
    const messageText = message?.text?.toLowerCase()?.trim()
    const chatId = message?.chat?.id
    if (!messageText || !chatId) {
        return res.sendStatus(400)
    }

    console.log(messageText)
    if (messageText === 'hi') {
        await axios.post(SEND_MESSAGE_URI, {
            chat_id: chatId,
            text: 'hello'
        })

        res.send('Done')
    } else {
        await axios.post(SEND_MESSAGE_URI, {
            chat_id: chatId,
            text: messageText
        })

        res.send('Done')
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})