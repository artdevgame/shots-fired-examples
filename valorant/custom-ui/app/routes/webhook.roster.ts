import { ActionFunctionArgs } from "@remix-run/node";
import { GAME_ID_VALORANT } from "~/constants";
import { getRoster, replaceRosterEntry } from "~/repository/roster";
import { RosterWebhookEvent, ShotsFiredWebhook } from "~/types";

export async function action({ request, context: { io } }: ActionFunctionArgs) {
  const body = await request.json();
  const { gameId, event, eventIndex, data } = body as ShotsFiredWebhook;

  if (gameId !== GAME_ID_VALORANT || !event.startsWith("roster")) return;

  try {
    const { character } = JSON.parse(data) as RosterWebhookEvent;
    const { rosterIndex, agent } = { rosterIndex: eventIndex, agent: character };

    if (!rosterIndex) return Response.json({ ok: false, message: "rosterIndex missing" });

    await replaceRosterEntry({ rosterIndex, agent });

    const roster = await getRoster();

    io.emit("valorant:roster", roster);

    return Response.json({ ok: true, rosterIndex, agent }, { status: 200 });
  } catch (err: any) {
    return Response.json({ ok: false }, { status: 500 });
  }
}
