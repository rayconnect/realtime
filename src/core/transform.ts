import { RayconnectRealtimeTransform } from "@rayconnect/types/transform";

export const TRANSFORM = {
  parse: <DATA_TYPE = any>(
    data: object | string
  ): RayconnectRealtimeTransform<DATA_TYPE> => {
    const json = typeof data == "string" ? JSON.parse(data) : data;
    return {
      type: json["type"],
      event: json["event"],
      data: json["data"] as DATA_TYPE,
    };
  },
  convert: <DATA_TYPE = any>(
    data: RayconnectRealtimeTransform<DATA_TYPE>
  ): string => {
    return JSON.stringify({
      type: data.type,
      event: data.event,
      data: data.data,
    });
  },
  next: <DATA_TYPE = any>(event: string, data: DATA_TYPE) => {
    return JSON.stringify({
      type: "next",
      event: event,
      data: data,
    });
  },
  error: <DATA_TYPE = any>(event: string, data: DATA_TYPE) => {
    return JSON.stringify({
      type: "error",
      event: event,
      data: data,
    });
  },
  complete: (event: string) => {
    return JSON.stringify({
      type: "complete",
      event: event,
    });
  },
};
