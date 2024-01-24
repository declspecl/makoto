import { MakotoData } from "./data";
import { MakotoConfig } from "./config";
import { invoke } from "@tauri-apps/api";

export function try_serialize_default_config(): Promise<void> {
    return invoke("try_serialize_default_config");
}

export function try_deserialize_from_config_file(): Promise<MakotoConfig> {
    return invoke<MakotoConfig>("try_deserialize_from_config_file");
}

export function try_serialize_default_data(): Promise<void> {
    return invoke("try_serialize_default_data");
}

export function try_deserialize_from_data_file(): Promise<MakotoData> {
    return invoke<MakotoData>("try_deserialize_from_data_file");
}