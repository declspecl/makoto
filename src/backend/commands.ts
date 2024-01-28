import { MakotoData } from "./data";
import { MakotoState } from "./state";
import { MakotoConfig } from "./config";
import { invoke } from "@tauri-apps/api";
import { Tag } from "./tag";

export async function get_state(): Promise<MakotoState> {
    const state = await invoke<MakotoState>("get_state");

    state.data.tags = new Map(Object.entries(state.data.tags));

    return state;
}

export function update_state_config(new_config: MakotoConfig): Promise<void> {
    return invoke("update_state_config", { new_config });
}

export function update_state_data(new_data: MakotoData): Promise<void> {
    const newTags: Record<string, Tag> = {};

    // new_data.tags.forEach((tag, name) => {
    //     newTags[name] = tag;
    // })

    return invoke("update_state_data", { new_data });
}

export function get_startup_error_log(): Promise<string[]> {
    return invoke<string[]>("get_startup_error_log");
}

export function try_serialize_state_config_to_disk(): Promise<void> {
    return invoke("try_serialize_state_config_to_disk");
}

export function try_serialize_state_data_to_disk(): Promise<void> {
    return invoke("try_serialize_state_data_to_disk");
}