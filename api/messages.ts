import crypto from 'crypto';
import {Router} from 'express';
import fileDb from "./fileDb";
import {Chat} from "./types";

const messagesRouter = Router();
messagesRouter.get('/', async (req, res, next)=>{
    try {
        const queryDate = req.query.datetime as string;
        const chats = await fileDb.getItems();
        const filteredChats = chats.filter(currentChat => {
            const cur = currentChat.datetime > queryDate;
            console.log(cur);
            return cur;
        });

        res.send(filteredChats);

    }   catch (e) {
        next(e);
    }
});
messagesRouter.post('/', async(req, res, next)=>{
    try {

        const now = new Date;
        const datetime = now.toISOString();

        const id = crypto.randomUUID();
        const chat: Chat = {
            id: id,
            message: req.body.message,
            author: req.body.author,
            datetime: datetime
        };

        if(!chat.message || !chat.author) {
            return res.status(400).send({error: "Author or message are empty"})
        }
        const newChat = await fileDb.addItem(chat);
        res.send(newChat);
    } catch (e) {
        next(e);
    }
});

export default messagesRouter;
