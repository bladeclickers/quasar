import "dotenv/config";
import { getRoutes, createFetchHandler } from "./server.js";

function injectHtml(html, pathname) {
	return html.replace(/<\/body>/i, `\n</body>`);
}

const PORT = process.env.PORT || 3000;

const server = Bun.serve({
	port: PORT,
	hostname: "0.0.0.0",
	routes: getRoutes(),
	fetch: createFetchHandler(injectHtml),

	error(error) {
		console.error(error);
		return new Response("Internal Server Error", { status: 500 });
	},
});

console.log(`Listening on port ${server.port}`);
console.log(`http://localhost:${server.port}`);
