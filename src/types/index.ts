import { RayconnectRealtimeTransporter } from "@rayconnect/types/transporter";

export interface RayconnectRealtimeOptions<TRANSPORTER_TYPE = any> {
  transporter: RayconnectRealtimeTransporter<TRANSPORTER_TYPE>;
}
