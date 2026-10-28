# Operational Security

## Core Rules

- Generate and split all seeds in Tails OS with networking disabled
- Never reuse an air-gapped session for online tasks
- Store shares in different locations; never keep 3 or more together
- Never commit shares, seeds, passphrases or `bitcoin.conf` secrets to git
- Use a strong, unique passphrase (vault.js derives the key with Argon2id)

## Recommended Practices

- Verify every step yourself
- Test create and recovery with fake data before using real funds
- Keep Bitcoin Core, Mempool and Tails updated
- Write clear recovery instructions for heirs

## Threat Model Highlights

- Physical theft
- Coercion
- Device compromise
- Loss of shares or passphrase
- Natural disaster

Mitigations rely on air-gapping, a 3-of-5 threshold, and storing shares in separate places.
