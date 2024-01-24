import { invoke } from "@tauri-apps/api";
import { MakotoConfig } from "./config";

export function try_serialize_default_config(): Promise<void> {
    return invoke("try_serialize_default_config");
}

export function try_deserialize_from_config_file(): Promise<MakotoConfig> {
    return invoke<MakotoConfig>("try_deserialize_from_config_file");
}