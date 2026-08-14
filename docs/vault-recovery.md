# Vault Recovery Guide

## Important

This is a high-level overview. Always test recovery with small amounts first.

## Requirements

- Required number of Shamir shares (e.g. 2-of-2, 3-of-5)
- The encryption password
- A clean Tails environment (networking disabled)
- The vault.js tool

## High-Level Steps

1. Boot into a clean Tails session
2. Disable networking
3. Load the required shares
4. Enter the encryption password
5. Reconstruct the seed
6. Derive the required keys / addresses
7. Use PSBT workflow for any spending

## Warnings

- Never reconstruct the seed on an online machine
- Never photograph or digitally store the reconstructed seed
- Destroy temporary files after use
- Verify the recovered addresses match your watch-only monitoring
