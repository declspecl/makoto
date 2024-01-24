export interface WindowProperties {
    // sizing
    initial_width?: number,
    initial_height?: number,
    minimum_width?: number,
    minimum_height?: number,
    maximum_width?: number,
    maximum_height?: number,

    // position
    x_position?: number,
    y_position?: number,
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