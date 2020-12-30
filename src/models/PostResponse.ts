export interface PostResponse {
    id: string;
    user_id: string;
    title: string;
    content: string;
    date_created: Date;
    date_updates: Date;
    date_due: Date;
    category: string;
};