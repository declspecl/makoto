import { Tag } from "@/backend/tag";
import { MakotoState } from "@/backend/state";
import { createContext, useContext } from "react";
import { PartitionRule, RawPartition } from "@/backend/partition";

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

export interface ErrorfulMakotoState {
    state: MakotoState | null,
    error: Error | null
}

export function makotoStateReducer(state: ErrorfulMakotoState, action: MakotoStateActionType): ErrorfulMakotoState {
    switch (action.type) {
        case "addTag": {
            if (!state.state) return {
                state: null,
                error: new Error("`state` is null and cannot be used to add a tag to")
            };

            if (state.state.data.tag_pool.find(tag => tag.name === action.tag.name)) return {
                state: state.state,
                error: new Error(`Tag ${action.tag.name} already exists`)
            };

            return {
                state: {
                    config: state.state.config,
                    data: {
                        ...state.state.data,
                        tag_pool: [
                            ...state.state.data.tag_pool,
                            action.tag
                        ]
                    }
                },
                error: null
            };
        }

        case "addRawPartition": {
            if (!state.state) return {
                state: null,
                error: new Error("`state` is null and cannot be used to add a raw partition to")
            };

            return {
                state: {
                    config: state.state.config,
                    data: {
                        ...state.state.data,
                        raw_partitions: [
                            ...state.state.data.raw_partitions,
                            action.rawPartition
                        ]
                    }
                },
                error: null
            };
        }

        case "addPartitionRule": {
            if (!state.state) return {
                state: null,
                error: new Error("`state` is null and cannot be be used to add a partition rule to")
            };

            return {
                state: {
                    config: state.state.config,
                    data: {
                        ...state.state.data,
                        partition_rules: [
                            ...state.state.data.partition_rules,
                            action.partitionRule
                        ]
                    }
                },
                error: null
            };
        }

        case "override": {
            return {
                state: action.state,
                error: null
            };
        }
    }
}

export const MakotoStateContext = createContext<ErrorfulMakotoState>({ state: null, error: null });
export const MakotoStateDispatchContext = createContext<React.Dispatch<MakotoStateActionType>>(undefined!);

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
