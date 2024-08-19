import { useLoaderData } from "@remix-run/react";
import { ReactElement, useEffect, useState } from "react";
import { getRoster } from "~/repository/roster";
import { useSocket } from "~/SocketProvider";

export async function loader() {
  return getRoster();
}

export default function Index() {
  const rosterFromDb = useLoaderData<(string | null)[]>();
  const socket = useSocket();
  const [roster, setRoster] = useState(() => rosterFromDb);

  useEffect(() => {
    if (!socket) return;
    socket.on("valorant:roster", setRoster);
  }, [socket]);

  return (
    <main className="flex w-full h-full">
      <div className="mt-6 mx-auto">
        <div className="bg-black flex space-x-3 p-3 rounded-lg">
          {roster.map((agent, rosterIndex) => (
            <div key={`agent-${rosterIndex}`} className="w-[40px] h-[40px] border-gray-700 border rounded">
              {mapAgentToPic(agent)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function Agent({ src }: { src: string }) {
  return <img src={src} alt="" width={40} height={40} className="rounded" />;
}

function mapAgentToPic(agent: string | null): ReactElement | null {
  if (agent === "Aamir" || agent === "Gumshoe") return <Agent src="/agents/Cypher_icon.webp" />;
  if (agent === "Aggrobot") return <Agent src="/agents/Gekko_icon.webp" />;
  if (agent === "Architect" || agent === "Sequoia") return <Agent src="/agents/Iso_icon.webp" />;
  if (agent === "BountyHunter") return <Agent src="/agents/Fade_icon.webp" />;
  if (agent === "Breach") return <Agent src="/agents/Breach_icon.webp" />;
  if (agent === "Cable") return <Agent src="/agents/Deadlock_icon.webp" />;
  if (agent === "Chamber") return <Agent src="/agents/Chamber_icon.webp" />;
  if (agent === "Clay") return <Agent src="/agents/Raze_icon.webp" />;
  if (agent === "Crusader") return <Agent src="/agents/Crusader_icon.webp" />;
  if (agent === "Grenadier") return <Agent src="/agents/KAYO_icon.webp" />;
  if (agent === "Guide") return <Agent src="/agents/Skye_icon.webp" />;
  if (agent === "Hawk" || agent === "Woosh" || agent === "Wushu") return <Agent src="/agents/Jett_icon.webp" />;
  if (agent === "Hunter") return <Agent src="/agents/Sova_icon.webp" />;
  if (agent === "Killjoy") return <Agent src="/agents/Killjoy_icon.webp" />;
  if (agent === "Mage") return <Agent src="/agents/Harbor_icon.webp" />;
  if (agent === "Pandemic") return <Agent src="/agents/Viper_icon.webp" />;
  if (agent === "Phoenix" || agent === "Apollo") return <Agent src="/agents/Phoenix_icon.webp" />;
  if (agent === "Rift") return <Agent src="/agents/Astra_icon.webp" />;
  if (agent === "Sarge") return <Agent src="/agents/Brimstone_icon.webp" />;
  if (agent === "Shatter") return <Agent src="/agents/Shatter_icon.webp" />;
  if (agent === "SmokeDancer" || agent === "Smonk") return <Agent src="/agents/Clove_icon.webp" />;
  if (agent === "Sprinter") return <Agent src="/agents/Neon_icon.webp" />;
  if (agent === "Stealth" || agent === "Stealthboi") return <Agent src="/agents/Yoru_icon.webp" />;
  if (agent === "Thorne") return <Agent src="/agents/Sage_icon.webp" />;
  if (agent === "Vampire") return <Agent src="/agents/Reyna_icon.webp" />;
  if (agent === "Wraith") return <Agent src="/agents/Omen_icon.webp" />;

  return null;
}
