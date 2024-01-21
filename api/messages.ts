import crypto from 'crypto';
import {Router} from 'express';

import fileDb from "./fileDb";
import {Chat} from "./types";

const messagesRouter = Router();
messagesRouter.get('/', async (req, res)=>{
    const products = await fileDb.getItems();
    res.send(products);
});

messagesRouter.post('/', async(req, res)=>{

    const chat: Chat = {
        message: req.body.message,
        author: req.body.author,
    };

    const newChat = await fileDb.addItem(chat);
    res.send(newChat);
});

export default messagesRouter;