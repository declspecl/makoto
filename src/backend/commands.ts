import { MakotoState } from "./state";
import { invoke } from "@tauri-apps/api";

/**
 * Attempts to serialize a given `MakotoState` object to the user's disk
 * @param {MakotoState} state The `MakotoState` object to be serialized
 */
export function try_serialize_state_to_disk(state: MakotoState): Promise<void> {
    return invoke("try_serialize_state_to_disk", { state: state });
}

/**
 * Attempts to deserialize a `MakotoState` object from the user's disk
 * @return {MakotoState} The `MakotoState` object deserialized from the user's disk
 */
export function try_deserialize_state_from_disk(): Promise<MakotoState> {
    return invoke("try_deserialize_state_from_disk");
}
