import { invoke } from "@tauri-apps/api";
import { MakotoState } from "../model/state";

export function try_serialize_state_to_disk(state: MakotoState): Promise<void> {
    return invoke("try_serialize_state_to_disk", {
        state: state
    });
}

export function try_deserialize_state_from_disk(createIfDoesNotExist: boolean): Promise<MakotoState> {
    return invoke("try_deserialize_state_from_disk", {
        create_if_does_not_exist: createIfDoesNotExist
    });
}
