export interface Blogs {
    id?: number;
    title: string;
    content: string;
    authorid: number;   
}

export interface Authors {
    id?: number;
    name: string;
    email: string;
}

export interface Tags {
    id?: number;
    name: string;
}

export interface BlogTags {
    blogid: Blogs['id'];
    tagid: Tags['id'];
}

interface MySQL_Success {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

interface MySQL_Error {
    code: string;
    errno: number;
    sqlMessage: string;
    sqlState: string;
    index: number;
    sql: string;
}

export type MySQL_Res = MySQL_Success & MySQL_Error;