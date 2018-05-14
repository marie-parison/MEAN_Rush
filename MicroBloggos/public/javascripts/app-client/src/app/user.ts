export class User {
    _id?: String;
    name?: string; // Le ? permet d'indiquer que c'est optionnel
    email?: string;
    password?: string;
    following?: Array<number>;
    followers?: Array<number>;
}