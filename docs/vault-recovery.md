# Vault Recovery Guide

## Important

This is a high-level overview of an unaudited prototype. Practise recovery with fake data first.

## Requirements

- At least 3 of the 5 Shamir shares
- The vault passphrase
- A Tails session with networking disabled
- The vault.js tool and its dependencies

## High-Level Steps

1. Boot Tails and keep networking disabled
2. Copy the shares into the vault folder
3. Run the reconstruct command
4. Enter the passphrase at the hidden prompt
5. vault.js recovers the 24-word mnemonic
6. Restore the mnemonic into a hardware or offline wallet to spend

A wrong passphrase or damaged share shows "decryption failed". Fewer than 3 shares is refused.

## Warnings

- Never reconstruct the seed on an online machine
- Never photograph or digitally store the recovered words
- Securely delete temporary files and clear shell history after use
