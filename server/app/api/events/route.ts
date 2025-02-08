import db from "@/db";
import { eventTable } from "@/db/schema";

export async function GET(request: Request) {
  console.log(request);
  var events = await db.select().from(eventTable);
  console.log(events.length);
  return new Response(JSON.stringify(events), {
    headers: {
      "Content-Type": "text/plain",
      // UTF
    },
  });
}
