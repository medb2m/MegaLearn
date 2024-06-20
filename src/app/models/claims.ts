
export class Claim {
    _id: string;
    title: string;
    description: string;
    constructor(_id: string, title: string, description: string) {
        this._id = _id;
        this.title = title;
        this.description = description;
    }
}
