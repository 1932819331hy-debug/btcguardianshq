# BTCGuardiansHQ

**Self-hosted Bitcoin verification, plus a non-custodial inheritance prototype**

> **PROTOTYPE STAGE. NOT AUDITED.**
> `vault.js` has not been independently reviewed and is not production-ready. Do not trust real funds to it until it has been reviewed or audited. Use throwaway test data first.

Free, open-source, non-custodial tools for people who want to verify Bitcoin on their own hardware and plan for passing it on, without custodians, banks, or KYC services.

BTCGuardiansHQ is not a hosted wallet, not a custodian, and has no token.

## What it is

- **A self-hosted verification stack:** your own archival Bitcoin Core node and your own Mempool explorer, run on your own hardware and network.
- **An inheritance prototype (`vault/vault.js`):** a command-line tool for air-gapped use (for example Tails with networking disabled) that splits secret material into encrypted Shamir shares.

## The gap it aims to fill

Most Bitcoin inheritance setups either:
- Stay too simple (one seed in a drawer), or
- Hand trust to a custodial or collaborative service

BTCGuardiansHQ explores a harder path: sound cryptography, air-gapped operations, physical backups, and verification against your own node.

## Features (prototype)

- Shamir's Secret Sharing with configurable thresholds (for example 3-of-5)
- Offline use inside Tails OS with networking disabled
- AES-256-GCM encryption with Argon2id key derivation ...for new vaults (legacy scrypt vaults open with `--legacy`). The code is an unaudited prototype
- Watch-only monitoring against your own node and explorer (public addresses only)

Multisig, timelock and PSBT features are not built yet. Miniscript inheritance is being tested on testnet only.

## Philosophy

We don't ask for trust. We ask you to verify.

- Private keys never touch the internet
- Vault creation stays air-gapped
- Monitoring is watch-only (public addresses only)
- Strict operational security by design

## Status

Working today, in my own setup:
- Archival Bitcoin Core node
- Self-hosted Mempool explorer (local network only for now)
- Encrypted Shamir vault tool, used offline

Not done yet:
- Independent review or audit
- Address history in the explorer (needs Electrs or Fulcrum)
- A public explorer

Still in an active hardening phase.

## Getting started

1. Review the `vault/` directory and the docs.
2. Test with throwaway data only.
3. Run real vault operations only in a clean Tails session with networking disabled.
4. Store each share in a separate physical location. Never commit shares to git.

## Security

This project handles high-value cryptographic material. Always generate and split seeds air-gapped, and verify everything yourself.

See [SECURITY.md](SECURITY.md) for vulnerability reporting and the disclaimer.

## License

MIT

## Support

Solo and self-funded. Donations welcome:

`1sXyCoMdHmPi2axsmXqLeNSkRi7RXkfPQ`
