// Adjust the import path as per your project structure
import { query } from "@/app/lib/utils"; // Example path, adjust accordingly

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const products = await query({
                query: 'SELECT * FROM articles', // Ensure table name matches exactly, case-sensitive,
                values:[]
            });
            res.status(200).json({product: products});
        } catch (error) {
            console.error("Query failed:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
