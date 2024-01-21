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
        return data.slice(-30);
    },
    async addItem(item: Chat) {

        data.push(item);
        await this.save();

        return item;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;