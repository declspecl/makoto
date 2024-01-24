export interface XYPair {
    x: number,
    y: number
}

export interface WidthHeightPair {
    width: number,
    height: number
}

export interface WindowProperties {
    // sizing
    initial_inner_size?: WidthHeightPair,
    minimum_inner_size?: WidthHeightPair,
    maximum_inner_size?: WidthHeightPair,
    
    initial_position?: XYPair,
    fullscreen: boolean,
    centered: boolean,

    // misc
    title: string
}

export interface MakotoProperties {

}

export interface MakotoConfig {
    window_properties: WindowProperties,
    makoto_properties: MakotoProperties
}