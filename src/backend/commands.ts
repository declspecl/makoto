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