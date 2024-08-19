import { TOTAL_PLAYERS } from "~/constants";
import * as db from "~/lib/db";
import { RosterEntity } from "~/types";

export async function replaceRosterEntry({ rosterIndex, agent }: RosterEntity) {
  await db.apiPost(`REPLACE INTO roster(rosterIndex, agent) VALUES(?, ?)`, [String(rosterIndex), agent]);
}

export async function getRoster() {
  const storedRoster = await db.apiGet<RosterEntity>(`SELECT * FROM roster ORDER BY rosterIndex ASC`);

  const roster = Array.from<string, string | null>({ length: TOTAL_PLAYERS }, (_, index) => {
    const result = storedRoster?.find((item) => item.rosterIndex === index);
    return result?.agent ?? null;
  });

  return roster;
}
