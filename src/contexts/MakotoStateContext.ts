import { Tag } from "@/backend/tag";
import { MakotoState } from "@/backend/state";
import { createContext, useContext } from "react";
import { PartitionRule, RawPartition } from "@/backend/model/partition";

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
    type: "override",
    state: MakotoState
};

export function makotoStateReducer(state: MakotoState | null, action: MakotoStateActionType): MakotoState | null {
    switch (action.type) {
        case "addTag": {
            if (!state) throw new Error("`state` is null and cannot be used to add a tag to");

            if (state.data.tag_pool.find(tag => tag.name === action.tag.name)) throw new Error(`Tag ${action.tag.name} already exists`);

            return {
                config: state.config,
                data: {
                    ...state.data,
                    tag_pool: [
                        ...state.data.tag_pool,
                        action.tag
                    ]
                }
            };
        }

        case "addRawPartition": {
            if (!state) throw new Error("`state` is null and cannot be used to add a raw partition to");

            return {
                config: state.config,
                data: {
                    ...state.data,
                    raw_partitions: [
                        ...state.data.raw_partitions,
                        action.rawPartition
                    ]
                }
            };
        }

        case "addPartitionRule": {
            if (!state) throw new Error("`state` is null and cannot be used to add a partition rule to");

            return {
                config: state.config,
                data: {
                    ...state.data,
                    partition_rules: [
                        ...state.data.partition_rules,
                        action.partitionRule
                    ]
                }
            };
        }

        case "override": {
            return action.state;
        }
    }
}

export const MakotoStateContext = createContext<MakotoState | null>(null);
export const MakotoStateDispatchContext = createContext<React.Dispatch<MakotoStateActionType> | null>(null);

export function useMakotoStateContext() {
    const makotoState = useContext(MakotoStateContext);

    if (makotoState === null) {
        throw new Error("useMakotoStateContext must be used within a MakotoStateContextProvider");
    }

    return makotoState;
}

export function useMakotoStateDispatchContext() {
    const makotoDispatchState = useContext(MakotoStateDispatchContext);

    if (makotoDispatchState === null) {
        throw new Error("useMakotoStateDispatchContext must be used within a MakotoStateDispatchContextProvider");
    }

    return makotoDispatchState;
}