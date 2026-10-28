# Review request: vault.js (v0.2.0-review)

BTCGuardiansHQ is a solo, self-funded, non-custodial Bitcoin inheritance prototype.
`vault/vault.js` is an **unaudited prototype**. I'm asking for an independent volunteer review.
This is not a paid audit, and there is no bounty or reward.

## What vault.js does
- `create`: generates a 24-word BIP39 mnemonic and splits it 3-of-5 with Shamir (secrets.js-grempe).
  Each share is encrypted with AES-256-GCM using a key from Argon2id
  (m=65536 KiB, t=3, p=1, random salt per vault), then written to share-1.json .. share-5.json.
- `reconstruct`: decrypts 3 or more shares and recombines the mnemonic.
- `--legacy`: reads the old v1 `iv:tag:hex` shares (scrypt with a fixed salt), so old vaults stay readable.
- The passphrase is asked for with a hidden prompt (12 characters minimum) and is never taken from the command line.
- The Miniscript policy it prints is only an example. On-chain inheritance is not built yet (testnet or signet only).

## Threat model (short)
- It runs offline on Tails with networking disabled.
- An attacker holding fewer than 3 shares, or shares without the passphrase, should learn nothing.
- Out of scope: a compromised machine, coercion, heirs colluding, and on-chain enforcement.

## Where to look first
1. KDF parameters and salt handling, and how the GCM IV/nonce is generated and reused.
2. Share file format: versioning, authentication of the metadata, and handling of tampered shares.
3. Shamir library choice and how the mnemonic entropy is encoded before splitting.
4. The legacy scrypt path: is keeping it readable a risk?
5. Error handling: does it leak anything, and do wrong-passphrase or tampered-share cases fail clearly?
6. Dependency pinning (argon2 0.44.0, bip39, secrets.js-grempe).

## How to test (fake data only)
```
cd vault && npm ci
node vault.js create --out /tmp/test
node vault.js reconstruct /tmp/test/share-1.json /tmp/test/share-3.json /tmp/test/share-5.json
```
Never use real funds or a real seed while testing.

## How to report
- For anything that could cause loss of funds, use GitHub's private vulnerability reporting (Security tab), or the email in SECURITY.md.
- For everything else, open an issue or a PR on tag `v0.2.0-review`.

Reviewers who agree will be thanked by name in REVIEW.md. Findings are published once they are fixed.
