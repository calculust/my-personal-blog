export interface UsersTable {
    id?: number;
    email?: string;
    password?: string;
    create_at?: Date;
}

export interface MysqlResponse {
    affectedRows: number;
    insertId: number;
}