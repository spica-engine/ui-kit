export namespace api {
    export type TypeLocation = { type: string; coordinates: [number, number] };

    export const isTypeLocation = (obj: any): obj is TypeLocation => {
        return typeof obj === "object" &&
            obj !== null &&
            typeof obj.type === "string" &&
            Array.isArray(obj.coordinates) &&
            obj.coordinates.length === 2 &&
            obj.coordinates.every((coord: unknown) => typeof coord === "number")
    }
}