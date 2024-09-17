import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

/**
 * Quick and easy twMerge and clsx combiner
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Gets the range of numbers INCLUSIVELY from `start` to `end`. If `end` < `start`, will return an empty list.
 * @param {number} start The number to start the range from (inclusive)
 * @param {number} end The number to end the range on (inclusive)
 * @returns {number[]} The range of numbers spanning from `start` to `end`
 */
export function generateRange(start: number, end: number): number[] {
    if (end < start) return [];
    else return Array.from((new Array(1 + (end - start))).keys()).map(v => start + v);
}
