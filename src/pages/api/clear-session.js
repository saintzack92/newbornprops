export default function handler(req, res) {
    if (req.method === "POST") {
      // Clear cookies by setting them to expire in the past
      res.setHeader("Set-Cookie", [
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      ]);
      res.status(200).json({ message: "Session cleared" });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }