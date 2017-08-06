import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';


export class FlashCard extends FirebaseFlatSnapshot {
    public front: string;
    public back: string;
    public uid: string;
    public groupKey: string;
    // TODO : we need to link this flash card and its pack
    constructor(obj?: any) {
        super(obj);
        this.front = obj && obj.front || '';
        this.back = obj && obj.back || '';
        this.uid = obj && obj.uid || '';
        this.groupKey = obj && obj.groupKey || '';
    }

    setValue(flashcard: FlashCard): void {
        this.front = flashcard.front;
        this.back = flashcard.back;
        this.uid = flashcard.uid;
        this.groupKey = flashcard.groupKey;
    }
}