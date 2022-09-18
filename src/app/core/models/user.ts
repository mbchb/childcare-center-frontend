import { Role } from "./role";

export class User {
    public idUser: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public description: string;
    public phoneNumber: number;
    public localisation: string;
    public roles: Role[];

    constructor(idUser?: string, username?: string, firstName?: string, lastName?: string, email?: string,
         password?: string, description?: string, phoneNumber?: number, roles?: Role[], localisation?: string) {
        this.idUser = idUser;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.description = description;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
        this.localisation = localisation;
    }

}
