1. **Vault Tool (`vault/`)**
   - Offline seed generation (24-word BIP39)
   - Passphrase key derivation: Argon2id for new vaults, scrypt for legacy vaults (`--legacy`)
   - AES-256-GCM encryption
   - 3-of-5 Shamir's Secret Sharing
   - Miniscript inheritance policy: printed example only, testnet/signet only
   - Runs offline in Tails OS with networking disabled

2. **Bitcoin Node**
   - Self-hosted archival Bitcoin Core node with txindex
   - Feeds the local explorer over RPC

3. **Explorer**
   - Self-hosted Mempool instance on the local network only (not public)
   - Connected to the local node
   - Blocks and transactions work today; address history needs Fulcrum (in progress)

4. **Physical Layer**
   - Shares stored separately (paper or metal) in different locations
   - Never keep the threshold of shares together

## Security Model

- Private keys and seeds are only handled offline
- Vault creation and recovery are done air-gapped in Tails
- The explorer and node never need the seed
- Recovery requires 3 of 5 shares plus the passphrase
