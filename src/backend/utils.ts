import { MakotoState } from "./state";
import { RgbColor, Tag } from "./tag";

export function hexColorToRgbColor(hexColor: string) {
    if (hexColor.charAt(0) === '#') {
        hexColor = hexColor.slice(1, hexColor.length);
    }

    const rgbColor: RgbColor = {
        r: parseInt(hexColor.substring(0, 2)),
        g: parseInt(hexColor.substring(2, 4)),
        b: parseInt(hexColor.substring(4, 6))
    }

    return rgbColor;
}

export function rgbColorToHexColor(rgbColor: RgbColor) {
    return `#${rgbColor.r.toString(16)}${rgbColor.g.toString(16)}${rgbColor.b.toString(16)}`;
}

export async function createTag(state: MakotoState, tag: Tag): Promise<void> {
    state.data.tags[tag.name] = tag;
}