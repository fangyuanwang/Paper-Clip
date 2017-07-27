import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';


export class FlashCardList extends FirebaseFlatSnapshot {
    public title: string;
    public desc: string;
    public uid: string;
    constructor(obj?: any) {
        super(obj);
        this.title = obj && obj.title || '';
        this.desc = obj && obj.desc || '';
        this.uid = obj && obj.uid || '';
    }
}