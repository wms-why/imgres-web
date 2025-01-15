# [Imgres Online](https://imgres.online)

This is the frontend part of the project, [backend part address](https://github.com/wms-why/imgres-api)

## Getting Started

### First, clone the frontend and backend of the project.

```bash
git clone https://github.com/wms-why/imgres-web.git
git clone https://github.com/wms-why/imgres-api.git
```

### Second, start the projects respectively

```bash
# Frontend
yarn install
yarn dev

# Backend
cargo run
```

### Then, use caddy or nginx as reverse proxy, recommend using [caddy](https://github.com/caddyserver/caddy/releases)

Caddyfile configuration as follows

```Caddyfile
:54321

reverse_proxy /api/* localhost:3001
reverse_proxy * localhost:3000
```

### Finally, access the address in browser: http://localhost:54321
