import { MakotoState } from "./state";
import { invoke } from "@tauri-apps/api";

export function try_serialize_state_to_disk(state: MakotoState): Promise<void> {
    return invoke("try_serialize_state_to_disk", { state: state });
}

export function try_deserialize_state_from_disk(): Promise<MakotoState> {
    return invoke("try_deserialize_state_from_disk");
}
