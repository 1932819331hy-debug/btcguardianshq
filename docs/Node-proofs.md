# Node proofs

Read-only output from BTCGuardiansHQ's own Bitcoin Core node.
Run on 28 Oct 2026, around 18:11 UTC. No RPC details, IP addresses or wallet data are shown.

## Node status

| Check | Result |
| --- | --- |
| Chain | `main` |
| Blocks / headers | 973579 / 973579 (fully synced) |
| Initial block download | `false` |
| Pruned | `false` (full archival node) |
| Size on disk | 888,073,191,938 bytes (about 888 GB) |
| Software | Bitcoin Core `/Satoshi:27.0.0/` |
| Connections | 10 (10 outbound, 0 inbound) |
| Services | NETWORK, WITNESS, COMPACT_FILTERS, NETWORK_LIMITED, P2P_V2 |

Best block hash at height 973579:
`PASTE_BESTBLOCKHASH_HERE`

## Chain start check (block 0)

`bitcoin-cli getblockhash 0` returns:
`000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`

This matches the well-known first block of the Bitcoin chain, which confirms the node is on mainnet.

## How to reproduce

```
bitcoin-cli getblockchaininfo
bitcoin-cli getblockhash 0
bitcoin-cli getblockcount
bitcoin-cli getnetworkinfo
```

You can check the best block hash against any public explorer at the same height.
