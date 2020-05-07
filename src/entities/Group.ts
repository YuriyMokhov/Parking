import { GroupContact } from "@entities/GroupContact"

export interface Group {
    id: number,
    name: string,
    contacts: GroupContact[]
}
