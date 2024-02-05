export interface MakotoError {
    tag: "IOError" | "FailedToGetPath" | "SerdeYAMLError"
    message: string
}