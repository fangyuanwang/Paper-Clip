import { FlashCard } from './flashcard';
import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';


export class FlashCardGroup extends FirebaseFlatSnapshot {
    public title: string;
    public desc: string;
    public uid: string;
    public favoriteBy: {};

    constructor(obj?: any) {
        super(obj);
        this.title = obj && obj.title || '';
        this.desc = obj && obj.desc || '';
        this.uid = obj && obj.uid || '';
        this.favoriteBy = obj && obj.favoriteBy || {};
    }

    setValue(flashcardGroup: FlashCardGroup): void {
        this.title = flashcardGroup.title;
        this.desc = flashcardGroup.desc;
        this.uid = flashcardGroup.uid;
        this.favoriteBy = flashcardGroup.favoriteBy;
    }
}