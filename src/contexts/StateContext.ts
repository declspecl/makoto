import { MakotoData } from "@/backend/data";
import { PartitionRule, RawPartition } from "@/backend/model/partition";
import { MakotoState } from "@/backend/state";
import { Tag } from "@/backend/tag";
import { createContext } from "react";

export type MakotoStateActionType = {
    type: "addTag",
    tag: Tag
} | {
    type: "addRawPartition",
    rawPartition: RawPartition
} | {
    type: "addPartitionRule",
    partitionRule: PartitionRule
} | {
    type: "overrideData",
    data: MakotoData
}

export function makotoStateReducer(state: MakotoState, action: MakotoStateActionType) {
    switch (action.type) {
        case "addTag": {
            state.data.tags[action.tag.name] = action.tag;
            break;
        }
        case "addRawPartition": {
            state.data.raw_partitions.push(action.rawPartition);
            break;
        }
        case "addPartitionRule": {
            state.data.partition_rules.push(action.partitionRule);
            break;
        }
        case "overrideData": {
            state.data = action.data;
            break;
        }
        default: {
            console.error("unknown action type");
            break;
        }
    }
}

export const MakotoStateContext = createContext<MakotoState>(undefined!);