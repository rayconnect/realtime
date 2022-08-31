import { RayconnectRealtimeEventHandler } from "./core/event";
import { RayconnectRealtimeOptions } from "./types";
import { RayconnectRealtimeEvent } from "@rayconnect/types/event";

export class RayconnectRealtime<
  TRANSPORTER_CONTEXT_TYPE = any,
  EVENT_CONTEXT_TYPE = any
> {
  public event: RayconnectRealtimeEvent<EVENT_CONTEXT_TYPE>;

  constructor(options: RayconnectRealtimeOptions<TRANSPORTER_CONTEXT_TYPE>) {
    this.event = RayconnectRealtimeEventHandler<EVENT_CONTEXT_TYPE>(
      options.transporter
    );
  }
}