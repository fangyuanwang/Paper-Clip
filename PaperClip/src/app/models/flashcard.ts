import { FlashCardList } from './flashcard-list';
import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';


export class FlashCard extends FirebaseFlatSnapshot {
    public front: string;
    public back: string;
    public uid: string;
    // TODO : we need to link this flash card and its pack
    constructor(obj?: any) {
        super(obj);
        this.front = obj && obj.front || '';
        this.back = obj && obj.back || '';
        this.uid = obj && obj.uid || '';
    }
}