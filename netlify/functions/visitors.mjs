import { getStore } from "@netlify/blobs";

export default async function handler(req) {
  const store = getStore({
    name: "portfolio-visitors",
    consistency: "strong"
  });

  const key = "total-visits";

  try {
    const currentValue = await store.get(key);
    const currentCount = Number(currentValue || 0);

    if (req.method === "GET") {
      return Response.json({ count: currentCount });
    }

    if (req.method === "POST") {
      const newCount = currentCount + 1;
      await store.set(key, String(newCount));
      return Response.json({ count: newCount });
    }

    return Response.json({ error: "Method not allowed" }, { status: 405 });
  } catch {
    return Response.json({ count: null });
  }
}