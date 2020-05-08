import { Topic } from "@entities/Topic"
import { User } from "@entities/User";

export interface ResultTableModel {
    topics: Topic[],
    members: User[],
    groupId: number
}
