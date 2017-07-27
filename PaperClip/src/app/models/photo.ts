import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';


export class Note extends FirebaseFlatSnapshot {
    public title: string;
    public content: string;
    public uid: string;
    constructor(obj?: any) {
        super(obj);
        this.title = obj && obj.title || '';
        this.content = obj && obj.content || '';
        this.uid = obj && obj.uid || '';
    }
}