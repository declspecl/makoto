export interface MakotoError {
    tag: "IOError" | "FailedToGetPath" | "TOMLEditSerError" | "TOMLEditDeError"
    message: string
}