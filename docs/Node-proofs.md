# Node proofs

Read-only output from BTCGuardiansHQ's own Bitcoin Core node.
Run on 29 Oct 2026, about 08:54 to 09:14 London time (UTC+0). No RPC details, IP addresses or wallet data are shown.

## Node status (block 973666)

| Check | Result |
| --- | --- |
| Chain | `main` |
| Blocks / headers | 973666 / 973666 (fully synced) |
| Initial block download | `false` |
| Pruned | `false` (full archival node) |
| Size on disk | 888,246,902,397 bytes (about 888 GB) |
| Software | Bitcoin Core `/Satoshi:27.0.0/` (from getnetworkinfo, 28 Oct 2026) |

Best block hash at height 973666:
`000000000000000000003f1c535de1152535d5d57e9b2ea187cdee4f77ee362e`

This matches the hash public explorers such as mempool.space show for block 973666.

## Chain start check (block 0)

`bitcoin-cli getblockhash 0` returns:
`000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`

This matches the well-known first block of the Bitcoin chain, which confirms the node is on mainnet.

## Chain integrity check

`bitcoin-cli verifychain 4 1000` returned `true`.
The node re-checked the last 1000 blocks at level 4, the most thorough check level, which also tests that each block can be undone and reapplied cleanly.

## How to reproduce

    bitcoin-cli getblockchaininfo
    bitcoin-cli getblockcount
    bitcoin-cli getblockhash 0
    bitcoin-cli verifychain 4 1000

Compare the best block hash with any public explorer at the same height.
