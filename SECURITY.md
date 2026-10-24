# Security Policy

## What this project is

BTCGuardiansHQ is a **self-hosted Bitcoin verification stack** plus a **non-custodial inheritance prototype**.

- You run Bitcoin Core. You run the explorer.
- Vault tools are meant for **air-gapped** use (e.g. Tails with networking off).
- There is **no** custodial service, **no** KYC product, and **no** token.

Private keys, seeds, Shamir shards, RPC credentials, and `bitcoin.conf` secrets must **never** be pasted into issues, PRs, chat, or public docs.

## Supported surface

| Surface | Support expectation |
| --- | --- |
| Docs and public site copy | Best-effort; report inaccuracies |
| Vault tooling under `vault/` (air-gapped use) | Best-effort while the project is in active hardening |
| Self-hosted explorer compose / Mempool stack | Best-effort for configs you run on your own hardware |
| Third-party hosts, forks, or modified builds | Not supported |

There is no SLA. This is a solo, self-funded project.

## Reporting a vulnerability

Email **btcguardianshq@proton.me** privately.

Please include:

1. What you found and where (repo path, commit, or public URL).
2. Steps to reproduce **without** real seeds, shards, or live mainnet funds at risk.
3. Impact (key exposure, false verification, DoS of a self-hosted component, etc.).
4. Whether you plan a public write-up and preferred timeline.

### Please do **not** include

- Real mnemonic seeds, xprvs, Shamir shards, or encrypted vault payloads that still protect funds
- RPC passwords, `.cookie` files, or `bitcoin.conf` auth material
- Screenshots that reveal LAN IPs you want kept private (redact if unsure)

You should get an acknowledgement when the mailbox is checked. Fix timing depends on severity and capacity; there is no guaranteed response window yet.

## Safe disclosure defaults

- Prefer email before public GitHub issues for anything that could burn keys or mislead users about verification.
- For docs-only mistakes (overclaiming explorer features, tone/marketing errors), a normal issue is fine.
- Public proofs of node health belong in the repo's existing proof issues, never by publishing RPC access.
 
## Known limitations

- vault.js currently contains a hardcoded test password for development. Never use it to protect a real vault. A runtime password prompt is planned.
- The vault password KDF is PBKDF2. A move to Argon2id is planned, with old vaults kept readable.
## Operator note

If you are running the stack:

- Keep `8332` (Bitcoin Core RPC) on your local network only. Never port-forward it.
- Never publish RPC passwords, `.cookie` files, or `bitcoin.conf` auth lines.
- Create real vault shares only on an air-gapped Tails session with networking disabled.
- Store each shard in a separate physical location. Never keep all shards, or enough of them to recover, in one place or one folder.
- Never commit shard files to git. The repo ignores `share-*.json` as a safety net, not a substitute for care.
- Test the whole recovery process with a tiny, throwaway amount before trusting it with real funds.
- Treat Tor-proxied LAN RPC as unsupported for local tests (use `--noproxy '*'` when probing the node from Tails).

## Disclaimer

BTCGuardiansHQ is an unaudited, prototype-stage project provided "as is", without warranty of any kind. It is not a hosted wallet, custodian, financial service, or legal or estate-planning advice.

You are solely responsible for your keys, backups, recovery steps, and any funds you choose to protect with these tools. Do not rely on this software with real funds until it has been independently reviewed. The maintainer is not liable for any loss of funds, keys, or data arising from its use.

Check the laws that apply to inheritance and digital assets where you live, and consider speaking to a qualified professional.
