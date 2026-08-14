# BTCGuardiansHQ

**Sovereign Bitcoin Inheritance Tools**

Free, open-source, non-custodial tools for securing and inheriting Bitcoin without relying on third parties, banks, or KYC services.

Built for people who want full control of their keys — today and for the next generation.

## The Gap It Fills

Most Bitcoin inheritance solutions either:
- Stay too simple (one seed in a drawer), or
- Outsource trust to custodial/collaborative services

BTCGuardiansHQ takes the harder path: proper cryptography, air-gapped operations, physical metal backups, Tor privacy, and full integration with your own node.

## Core Features

- True Shamir’s Secret Sharing (2-of-2, expandable to 3-of-3 / 3-of-5 / 5-of-5)
- Offline seed generation + splitting inside Tails OS (networking disabled)
- Strong encryption (AES-256-GCM + PBKDF2, Argon2id upgrade planned)
- Multisig + timelock address generation
- Encrypted full-seed backup as safety net
- Watch-only integration with your own Bitcoin node + Mempool explorer
- PSBT workflow for funding and spending from cold storage

## Philosophy

We don’t ask for trust. We ask you to verify.

- Private keys never touch the internet
- Vault creation stays completely air-gapped
- Monitoring is watch-only (xpub / public addresses only)
- Designed with strict operational security in mind

## Status

Core infrastructure is functional:
- Archival Bitcoin node running
- Self-hosted Mempool explorer
- Encrypted Shamir vault tool working offline

Still in active hardening phase.

## Getting Started

1. Review the `vault/` directory
2. Read the documentation carefully
3. Run vault operations only in a clean Tails environment with networking disabled

## Security

This project involves high-value cryptographic material.  
Always generate and split seeds air-gapped. Verify everything yourself.

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## License

MIT

## Support

This project is currently self-funded.  
Donations welcome:

`1sXyCoMdHmPi2axsmXqLeNSkRi7RXkfPQ`
