import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Chat} from "./types";

const fileName = './db.json';
let data: Chat[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(item: Chat) {
        const now = new Date;
        const datetime = now.toISOString();

        const id = crypto.randomUUID();

        const chat = {id, datetime,...item};
        data.push(chat);
        await this.save();

        return chat;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;