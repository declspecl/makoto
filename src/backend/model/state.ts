import { PartitionRule, RawPartition } from "./partition";

export interface CoordinatePair {
    x: number,
    y: number
}

export interface WidthHeightPair {
    width: number,
    height: number
}

export interface WindowProperties {
    initial_inner_size?: WidthHeightPair,
    minimum_inner_size?: WidthHeightPair,
    maximum_inner_size?: WidthHeightPair,
    
    initial_position?: CoordinatePair,
    maximized: boolean,
    fullscreen: boolean,
    centered: boolean,

    title: string
}

export interface MakotoProperties {

}

export interface MakotoConfig {
    window_properties: WindowProperties,
    makoto_properties: MakotoProperties
}

export interface Tag {
    name: string,
    description: string,
    color: string // hex string
}

export interface MakotoData {
    raw_partitions: RawPartition[],
    partition_rules: PartitionRule[],
    tag_pool: Tag[]
}

export interface MakotoState {
    config: MakotoConfig,
    data: MakotoData
}