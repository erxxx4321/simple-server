const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	var myUrl = new URL(req.url, `http://${req.headers.host}/`);
	let fileName =
		myUrl.pathname === "/" ? "./index.html" : "." + myUrl.pathname;

	const page404 = fs.readFile("404.html", (err, data) => {
		if (err) throw err;
		else return data;
	});

	fs.readFile(fileName, (err, data) => {
		if (err) {
			res.writeHead(404, { "Content-Type": "text/html" });
			res.write(page404);
			return res.end();
		} else {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write(data);
			return res.end();
		}
	});
});

server.listen(3000, () => {
	console.log("server is running on port 3000");
});
