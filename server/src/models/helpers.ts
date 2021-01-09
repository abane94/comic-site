export interface Created {
    creatorId: string;
    creatorName: string;
}

export enum MaturityRating {
    // TODO: come up with more detailed descriptions with example that can be viewed in the editor and on its own page for view information
    // using an enum will allow for easy quries like MaturityRating < T+ (teen plus)

    /** Everyone */
    E,  // For everyone
    /** Teen */
    T,  // For those around 12-13 and up
    /** Teen Plus */
    'T+',  // For older teens\
    /** Mature */
    M,  // Mature (but not explicit) content
    /** Explicit */
    X  // explicit content  // Currently not supported, but could in the future
}

export enum ViewAccess {
    public,
    linkAccess,
    private,
}

export interface Content extends Created {
    title: string;
    coverUrl: string;
    shortDesc: string;  // blurb?
    longDesc: string;
    maturityRating: MaturityRating;
    viewAccess: ViewAccess;
    lastEdited: string;
    created: string;

    // TODO: implement contributor logic
    // contributors?: { [contributorId: string]: {
    //     userName: string;
    //     title: string;  // TODO should this be a defined set of string or free text? both?
    //     canEdit: boolean;
    // }};
}
