(# Client: How to run the static site)

This file documents simple, copy-paste commands to serve the `client` directory locally for development or quick manual testing.

Recommended port: `8000` (change if already in use). All commands assume a Linux bash shell.

## Option A — Recommended: Node (npx http-server)
When to use: your repo already uses Node; `npx` requires no global install and is cross-platform.

Start (one-off):

```bash
cd /home/bijaybk/Projects/qr-code-generator
npx http-server ./client -p 8000 -a 127.0.0.1
```

Explanation:
- `npx http-server` runs the `http-server` static server without installing it globally.
- `-p 8000` sets the port. `-a 127.0.0.1` binds to localhost only.

Add an npm script (optional):

Add to your project `package.json` scripts section:

```json
"scripts": {
	"start:client": "http-server ./client -p 8000 -a 127.0.0.1"
}
```

Then run:

```bash
npm run start:client
```

## Option B — Quick, zero-deps: Python 3
When to use: quick ad-hoc checks on machines with Python 3.

Start (foreground):

```bash
cd /home/bijaybk/Projects/qr-code-generator/client
python3 -m http.server 8000 --bind 127.0.0.1
```

Start in background and log output:

```bash
cd /home/bijaybk/Projects/qr-code-generator/client
nohup python3 -m http.server 8000 --bind 127.0.0.1 > server.log 2>&1 &
echo $! > server.pid
```

Stop the background server (if you saved a pid):

```bash
kill $(cat server.pid)
```

Or kill whatever is listening on the port:

```bash
fuser -k 8000/tcp
```

## Verify the server

Check headers (fast):

```bash
curl -I http://127.0.0.1:8000/
```

Expected: an HTTP `200` response and `Content-Type: text/html` (or `text/html; charset=utf-8`).

Get the full page:

```bash
curl http://127.0.0.1:8000/
```

## Troubleshooting & tips
- If you see "Address already in use", try another port (e.g. `8001`) or run `lsof -i :8000` to find the process and `kill <pid>`.
- To allow access from other devices, bind to `0.0.0.0` instead of `127.0.0.1`, but be aware of the security implications.
- Use `server.log` (if started with `nohup`) to inspect any runtime messages.
- To stop a foreground server: press Ctrl+C.

## Minimal quick workflow (copy-paste)

```bash
cd /home/bijaybk/Projects/qr-code-generator/client
python3 -m http.server 8000 --bind 127.0.0.1 &
curl -I http://127.0.0.1:8000/
fuser -k 8000/tcp    # stops the server when you're done
```

---

If you want, I can also add an npm script in the project `package.json` or a tiny `scripts/start-client.sh` helper and a `scripts/stop-client.sh` to make this repeatable — tell me which you prefer.

