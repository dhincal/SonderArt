export async function GET(request: Request) {
  return new Response("thank you for liking art 🎨", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}