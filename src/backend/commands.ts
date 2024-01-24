import { MakotoData } from "./data";
import { MakotoState } from "./state";
import { MakotoConfig } from "./config";
import { invoke } from "@tauri-apps/api";

export function get_state(): Promise<MakotoState> {
    return invoke<MakotoState>("get_state");
}

export function update_state_config(new_config: MakotoConfig): Promise<void> {
    return invoke("update_state_config", { new_config });
}

export function update_state_data(new_data: MakotoData): Promise<void> {
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