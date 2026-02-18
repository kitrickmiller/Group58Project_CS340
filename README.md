# web-ui Backend README

This README explains how to run and access the backend server for the web-ui project on the classwork host.

Port
- Backend listens on port: 53261

If you are connecting from your laptop or any external machine, use an SSH tunnel so `http://localhost:53261` on your local machine forwards to the remote backend.

SSH tunnel (run on your local machine):

Foreground (interactive):
```bash
ssh -L 53261:localhost:53261 your_onid@classwork.engr.oregonstate.edu
```

Background (no interactive shell):
```bash
ssh -fN -L 53261:localhost:53261 your_onid@classwork.engr.oregonstate.edu
```

Auto-reconnect (if you have `autossh` installed):
```bash
autossh -M 0 -f -N -L 53261:localhost:53261 your_onid@classwork.engr.oregonstate.edu
```

If your local port 53261 is already in use, forward to a different local port, e.g. `-L 9999:localhost:53261`, then open `http://localhost:9999`.

Running the backend (on the classwork host, in the `web-ui` directory)

- Development (hot reload with `nodemon`):
```bash
npm run backend:development
```

- Production (run as a background process with `forever`):
```bash
npm run backend:production

# stop production:
npm run backend:stop_production
```

Testing the backend locally on the classwork host:

On the classwork host (or via SSH tunnel from local):
```bash
curl http://localhost:53261/       # diagnostic route
curl http://localhost:53261/api/characters
```

Notes
- The backend is currently bound to `localhost` on the classwork host. Other users cannot reach `http://classwork.engr.oregonstate.edu:53261` directly unless the server is bound to `0.0.0.0` and network/firewall rules allow incoming connections on that port.
- If you want the service reachable by everyone without per-user tunnels, let me know and I can prepare a patch to bind `0.0.0.0` and provide guidance on firewall/network changes (you must have permission).

Questions or changes? Send me what you want included and I can update this README.
# Dungeon Master Companion — Frontend & Backend

Quick start: 

1. Install dependencies:

npm install

2. Start dev server: 

npm start

The app expects a backend API at `/api/<endpoint>` (or configure the `proxy` in `package.json`). Endpoints used:
- `GET /api/characters`  (list)
- `POST /api/characters` (create)
- `PUT /api/characters/:id` (update)
- `DELETE /api/characters/:id` (delete)

Same pattern for `items`, `quests`, `areas`, `monsters`. and intersection tables. 



