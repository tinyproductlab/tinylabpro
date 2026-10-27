# NConvo APK download

Deployed 2026-09-24; extended 2026-10-09 with the desktop packages. Public URLs:
https://tinylabpro.com/dl/NConvo-1.0.0.apk
https://tinylabpro.com/dl/NConvo-macOS-arm64.zip
https://tinylabpro.com/dl/NConvo-Windows-x64.zip
https://tinylabpro.com/dl/desktop-version.json  (version manifest, JSON, not an attachment)

Filenames stay fixed; the auto-uploader on the owner's Mac replaces file contents
in place (drop folder: `NConvo 安卓包自动上传`, subfolders `Mac 安装包` /
`Windows 安装包`, backups under `/var/www/tinylabpro/apk-backups/`).

The APK is stored only on the owner's Oracle Linux backend, opc@129.80.49.186:
`/var/www/tinylabpro/dl/NConvo-1.0.0.apk`.
It is not uploaded to Workers, Pages, or R2. Cloudflare still transports requests
because the existing domain and origin use Cloudflare. Responses use no-store.

Routing:
1. `tinylabpro.com/dl/*` invokes this small streaming Worker.
2. It requests `https://unmark.tinylabpro.com/dl/NConvo-1.0.0.apk`.
3. Tunnel `unmark` has a first ingress rule for hostname `unmark.tinylabpro.com`,
   path `^/dl/.*`, service `http://tinylab-downloads:8080`.
4. Dedicated nginx container `tinylab-downloads` serves the read-only file mount.

The container uses `/opt/tinylab-downloads/compose.yml` and `nginx.conf`, the existing
`unmark_default` network, and restart policy `unless-stopped`. No new public port
is opened. Existing service containers were not rebuilt or restarted.
`tunnel-before.json` preserves the ingress configuration before this change.

Verification: HEAD 200, correct APK MIME and attachment filename, Range 206,
full public download 79,499,653 bytes and matching SHA-256:
`e9efbca515d6b179b2f71d806895012d36b46bac517545585a4c7da3a9be3625`.
Main website, backend health, and account health returned 200 after deployment.
The live NConvo page already links to the public URL above.

For additional filenames, add the exact path in both nginx.conf and src/index.ts.
Upload as a temporary file, compare checksums, then atomically rename it before
publishing the new link. Deploy only this Worker with its explicit config:
`wrangler deploy --config workers/apk-download/wrangler.toml`.

Rollback: remove this Worker's `/dl/*` route; remove only the download ingress
rule from the current tunnel config; stop the downloads Compose service.
Do not blindly restore an old tunnel config if unrelated rules changed later.
