import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';


export class Note extends FirebaseFlatSnapshot {
    public title: string;
    public content: string;
    public uid: string;
    public favoriteBy: string;

    constructor(obj?: any) {
        super(obj);
        this.title = obj && obj.title || '';
        this.content = obj && obj.content || '';
        this.uid = obj && obj.uid || '';
        this.favoriteBy = obj && obj.favoriteBy || '';
    }

    setValue(note: Note):void {
        this.title = note.title;
        this.content = note.content;
        this.uid = note.uid ;
        this.favoriteBy =  note.favoriteBy;
    }
}