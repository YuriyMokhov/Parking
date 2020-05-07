import { User } from "@entities/User";
import { Comment } from "@entities/Comment";

export interface Topic {
    id: number,
    title: string,
    created: Date,
    created_by: number,
    created_by_user: User,
    updated: Date,
    updated_by: number,
    is_closed: boolean,
    is_fixed: boolean,
    comments: number,
    comments_entities: Comment[];
    relativeUrl: string;
}
