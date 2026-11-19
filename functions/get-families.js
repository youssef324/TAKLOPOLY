/* ==========================================================================
   API Endpoint: /get-families
   Returns the centrally configured family names for the current competition.
   ========================================================================== */
import { COMPETITION_FAMILIES } from "./_config.js";

export async function onRequestGet() {
  return new Response(JSON.stringify({
    success: true,
    families: COMPETITION_FAMILIES
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60"
    }
  });
}

export async function onRequestPost() {
  return onRequestGet();
}
