export const protectedRoutes = [
    "/news",
    "/myKarma",
    "/charts",
    "/radio",
    "/contact"
]; 

export class Crud {
    static CREATING = "creating";
    static CREATED = "created";
    static UPDATING = "updating";
    static UPDATED = "updated";
    static DELETING = "deleting";
    static DELETED = "deleted";
} 

export class UserEntity {
    static TABLE_NAME = "user";
    static PASSWORD = "password";
    static EMAIL = "email";
    static PASSWORD_CONFIRMATION = "password confirmation";
    static USERNAME = "username";
    static ARTIST_NAME = "artist name";
    static PASSWORDS_MUST_MATCH = "Passwords must match";
};

export class Auth {
    static CREDENTIALS = "credentials";
}