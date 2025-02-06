import { TypeSpicaLocation } from "custom-hooks/useInputRepresenter";

export const isTypeSpicaLocation = (obj: any): obj is TypeSpicaLocation => {
    return typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        Array.isArray(obj.coordinates) &&
        obj.coordinates.length === 2 &&
        obj.coordinates.every((coord: unknown) => typeof coord === "number")
}