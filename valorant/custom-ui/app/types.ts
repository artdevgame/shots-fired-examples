import { Server } from "socket.io";

export type ShotsFiredWebhook = {
  category: string | null;
  custom: Record<string, unknown>;
  data: string;
  event: string;
  eventIndex: string | null;
  feature: string;
  gameId: string;
};

export type RosterWebhookEvent = {
  character: string;
  local: boolean;
  locked: boolean;
  name: string;
  player_id: string;
  rank: number;
  teammate: boolean;
};

export type RosterSocketEvent = {
  rosterIndex: number;
  agent: string;
};

export type RosterEntity = {
  rosterIndex: number | string;
  agent: string;
};

declare module "@remix-run/node" {
  interface AppLoadContext {
    io: Server;
  }
}
