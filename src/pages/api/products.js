// Import `query` from your utilities and other necessary imports
import { query } from "@/app/lib/utils";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { title, category, slug, isActive, content } = req.body;

        try {
            const result = await query({
                query: `INSERT INTO articles (title, category, slug, active, description) VALUES (?, ?, ?, ?, ?)`,
                values: [title, category, slug, isActive, content.html], // Assuming `content` comes in as an object with an `html` property
            });

            res.status(201).json({ success: true, message: "Article added successfully", articleId: result.insertId });
        } catch (error) {
            console.error("Insertion failed:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else  if (req.method === "GET") {
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
        // Respond for other methods
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
