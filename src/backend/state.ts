import { MakotoData } from "./data";
import { MakotoConfig } from "./config";

export interface MakotoState {
    config: MakotoConfig,
    data: MakotoData
}