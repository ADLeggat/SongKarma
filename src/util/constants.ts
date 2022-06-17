export class Routes {
    static AUTH = "/auth";
    static HOW_IT_WORKS = "/howItWorks";
    static NEWS = "/news";
    static MY_KARMA = "/myKarma";
    static CHARTS = "/charts";
    static RADIO = "/radio";
    static CONTACT = "/contact";

    static PROTECTED = [
        this.NEWS, 
        this.MY_KARMA,
        this.CHARTS,
        this.RADIO,
        this.CONTACT
    ];
};

export class Crud {
    static CREATING = "creating";
    static CREATED = "created";
    static UPDATING = "updating";
    static UPDATED = "updated";
    static DELETING = "deleting";
    static DELETED = "deleted";
    static RETRIEVING = "retrieving";
    static RETRIEVED = "retrieved";
} 

export class UserEntity {
    static TABLE_NAME = "user";
    static PASSWORD = "password";
    static EMAIL = "email";
    static PASSWORD_CONFIRMATION = "password confirmation";
    static USERNAME = "username";
    static ARTIST_NAME = "artist name";
   
    static PASSWORDS_MUST_MATCH = "Passwords must match";
    static NO_USER_FOUND = "No matching user was found";
    static PASSWORD_ENTERED_INCORRECTLY = "Your password was entered incorrectly";
    static USER_EXISTS = "A user with this email already exists";
};

export class Auth {
    static CREDENTIALS = "credentials";
    static TOKEN_EXPIRED = "The authentication token has expired";
};

export class Api {
    static GENERIC_SUCCESS_MESSAGE = "Success";
    static METHOD_NOT_ALLOWED = "Method not allowed";
    static SOMETHING_WENT_WRONG = "Something went wrong";
}