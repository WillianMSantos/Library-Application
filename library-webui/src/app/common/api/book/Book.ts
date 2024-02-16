import { Author } from '../author/Author';

export class Book {
    public id: number;
    public title: string;
    public publisher: number
    public bookStatus: string;
    public isbn: string;
    public author = new Author();
    constructor() { }
  }