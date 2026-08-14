# Architecture

BTCGuardiansHQ is designed around strict separation of concerns:

## Components

1. **Vault Tool (`vault/`)**
   - Offline seed generation
   - True Shamir’s Secret Sharing
   - AES-256-GCM encryption
   - Multisig + timelock address creation
   - Runs only in air-gapped Tails OS

2. **Bitcoin Node**
   - Full archival node
   - Tor-only networking preferred
   - Provides watch-only monitoring via RPC

3. **Explorer**
   - Self-hosted Mempool instance
   - Connected to the local node
   - Watch-only (xpub / public addresses only)

4. **Physical Layer**
   - Metal seed plates
   - Geographically separated storage
   - Encrypted full-seed backup as safety net

## Security Model

- Private keys never touch the internet
- Vault creation is fully air-gapped
- Monitoring is strictly watch-only
- Recovery requires threshold of shares + password
