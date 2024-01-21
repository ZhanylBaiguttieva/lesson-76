import crypto from 'crypto';
import {Router} from 'express';

import fileDb from "./fileDb";
import {Chat} from "./types";

const messagesRouter = Router();
messagesRouter.get('/', async (req, res)=>{
    const products = await fileDb.getItems();
    res.send(products);
});

messagesRouter.post('/', async(req, res, next)=>{
    try {
        const chat: Chat = {
            message: req.body.message,
            author: req.body.author,
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
