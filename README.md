# [Imgres 在线地址](https://imgres.online)

这是项目的前端部分，[后端部分地址](https://github.com/wms-why/imgres-api)

[English](https://github.com/wms-why/imgres-web/blob/main/README_en.md)

## 启动步骤

### 首先，clone 项目的前端和后台。

```bash
git clone https://github.com/wms-why/imgres-web.git
git clone https://github.com/wms-why/imgres-api.git
```

### 其次，分别启动项目

```bash
# 前端
yarn install
yarn dev

#后台
cargo run
```

### 然后，使用 caddy 或者 nginx 做反向代理，推荐使用[caddy](https://github.com/caddyserver/caddy/releases)

Caddyfile 配置如下

```Caddyfile

:54321

reverse_proxy /api/* localhost:3001
reverse_proxy * localhost:3000

```

### 最后，浏览器访问 地址： http://localhost:54321
