export interface PostDetailsResponse {
    id: string;
    title: string;
    category: "Academic" | "Careers" | "Other";
    dateCreated: Date,
    dateUpdated: Date,
    dateDue: Date;
    content: string;
}