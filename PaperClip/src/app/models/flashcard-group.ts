import { FlashCard } from './flashcard';
import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';


export class FlashCardGroup extends FirebaseFlatSnapshot {
    public title: string;
    public desc: string;
    public uid: string;
    public flashCards: FlashCard[];
    constructor(obj?: any) {
        super(obj);
        this.title = obj && obj.title || '';
        this.desc = obj && obj.desc || '';
        this.uid = obj && obj.uid || '';
        this.flashCards = obj && obj.flashCards || '';
    }
}