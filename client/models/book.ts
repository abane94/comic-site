interface iBook {
    id?: number;
    thumb_lg: string;
    desc_sh: string;
    desc_lg?: string;
    series_name: string;
    series_id: number;
    creator_id: number;
    creator_name: string;
    pages: Array<iPageInfo>;
    iss_num: number;

    isBook: true;
}

interface iPageInfo {
    id: number;
    src: string;
}

export class Book implements iBook {
    id?: number;
    thumb_lg: string;
    desc_sh: string;
    desc_lg?: string;
    series_name: string;
    series_id: number;
    creator_id: number;
    creator_name: string;
    pages: Array<iPageInfo>;
    iss_num: number;

    isBook: true;

    constructor(obj: object) {
        this.id = obj['id'];
        this.thumb_lg = obj['thumb_lg'];
        this.desc_sh = obj['desc_sh'];
        this.desc_lg = obj['desc_lg'];
        this.series_name = obj['series_name'];
        this.series_id = obj['series_id'];
        this.creator_id = obj['creator_id'];
        this.pages = obj['pages'];
        this.iss_num = obj['iss_num'];
        this.creator_name = obj['creator_name']
    }
}
