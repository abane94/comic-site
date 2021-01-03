interface ProfileWithoutId {
    givenName: string;
    familyName: string;
    profilePic: string;
}

export interface UserWithoutId extends ProfileWithoutId {
    token: string;
    email: string;
    isCreator?: boolean;
    gid?: string;
}
