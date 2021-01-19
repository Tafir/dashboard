export interface PostDetailsRequest {
    title: string;
    category: "Academic" | "Careers" | "Other";
    dateDue: Date;
    content: string;
}