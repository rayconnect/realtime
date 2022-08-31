import {
  RayconnectRealtimeEvent,
  RayconnectRealtimeEventNextSubscribtion,
  RayconnectRealtimeEventSubject,
  RayconnectRealtimeEventSubscribtion,
} from "@rayconnect/types/event";
import { RayconnectRealtimeTransform } from "@rayconnect/types/transform";
import { RayconnectRealtimeTransporter } from "@rayconnect/types/transporter";

export const RayconnectRealtimeEventHandler =
  <EVENT_CONTEXT_TYPE>(
    transporter: RayconnectRealtimeTransporter
  ): RayconnectRealtimeEvent<EVENT_CONTEXT_TYPE> =>
  (name: string): RayconnectRealtimeEventSubject<EVENT_CONTEXT_TYPE> => ({
    next: <DATA_TYPE = any>(data: DATA_TYPE): void => {
      transporter.publish({
        type: "next",
        data: data,
        event: name,
      });
    },
    error: <DATA_TYPE = any>(data: DATA_TYPE): void => {
      transporter.publish({
        type: "error",
        data: data,
        event: name,
      });
    },
    complete: (): void => {
      transporter.publish({
        type: "complete",
        event: name,
      });
    },
    subscribe: <NEXT_DATA = any, ERROR_DATA = any>(
      object:
        | RayconnectRealtimeEventNextSubscribtion<NEXT_DATA, EVENT_CONTEXT_TYPE>
        | RayconnectRealtimeEventSubscribtion<
            NEXT_DATA,
            ERROR_DATA,
            EVENT_CONTEXT_TYPE
          >
    ): void => {
      if (typeof object === "object") {
        // if object was RayconnectRealtimeEventSubscribtion
        transporter.subscribe(name, object);
      } else if (typeof object === "function") {
        // if object was a function
        transporter.subscribe<any, any>(name, {
          next: object,
        });
      } else {
        // if object was bad things
        throw Error(
          "Subscribe must be a function or a RayconnectRealtimeEventSubscribtion"
        );
      }
    },
  });

export const useRayconnectRealtimeEvent = <
  DATA_TYPE = any,
  NEXT_DATA = any,
  ERROR_DATA = any,
  CONTEXT_TYPE = any
>(
  data: RayconnectRealtimeTransform<DATA_TYPE>,
  subscription: RayconnectRealtimeEventSubscribtion<
    NEXT_DATA,
    ERROR_DATA,
    CONTEXT_TYPE
  >,
  context: CONTEXT_TYPE
) => {
  switch (data.type) {
    case "next":
      if (subscription.next) subscription.next(data.data as any, context);
      break;

    case "error":
      if (subscription.error) subscription.error(data.data as any, context);
      break;

    case "complete":
      if (subscription.complete) subscription.complete(context);
      break;

    default:
      break;
  }
};
