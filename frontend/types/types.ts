export interface Blog {
    id: string;
    title: string;
    description: string;
    publishedDate: string;
    readingTime: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    role: string;
}