export default async function handler(req, res) {
	const q = req.query.q;

	if (!q || typeof q !== "string") {
		return res.status(400).json({ error: "Query parameter is required" });
	}

	try {
		const result = await fetch(
			`https://duckduckgo.com/ac/?q=${encodeURIComponent(q)}&format=json`,
		);
		const data = await result.json();
		res.setHeader("Cache-Control", "public, max-age=60");
		return res.status(200).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Failed to fetch autocomplete" });
	}
}
