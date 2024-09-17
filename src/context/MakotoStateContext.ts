import { Tag } from "@backend/model/state";
import { SetErrorLogType } from "./ErrorLog";
import { createContext, useContext } from "react";
import { MakotoState } from "@/backend/model/state";
import { PartitionRule, RawPartition } from "@backend/model/partition";

export type MakotoStateActionType = {
    type: "addTag",
    tag: Tag,
    setErrorLog: SetErrorLogType
} | {
    type: "addRawPartition",
    rawPartition: RawPartition,
    setErrorLog: SetErrorLogType
} | {
    type: "addPartitionRule",
    partitionRule: PartitionRule,
    setErrorLog: SetErrorLogType
} | {
    type: "override",
    state: MakotoState
};

export function makotoStateReducer(state: MakotoState, action: MakotoStateActionType): MakotoState {
    switch (action.type) {
        case "addTag": {
            if (state.data.tag_pool.find(tag => tag.name === action.tag.name)) {
                action.setErrorLog(errorLog => [...errorLog, `Tag ${action.tag.name} already exists`]);
                return state;
            };

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

        case "override": return action.state;
    }
}

export const MakotoStateContext = createContext<MakotoState | null>(null);
export const MakotoStateDispatchContext = createContext<React.Dispatch<MakotoStateActionType> | null>(null);

export function useMakotoStateContext(): MakotoState {
    const state = useContext(MakotoStateContext);

    if (state === null) {
        throw new Error("useMakotoStateContext must be used within a MakotoStateContextProvider");
    }

    return state;
}

export function useMakotoStateDispatchContext() {
    const makotoDispatchState = useContext(MakotoStateDispatchContext);

    if (makotoDispatchState === null) {
        throw new Error("useMakotoStateDispatchContext must be used within a MakotoStateDispatchContextProvider");
    }

    return makotoDispatchState;
}
