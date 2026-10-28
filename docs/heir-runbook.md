# Heir Runbook

> **PROTOTYPE. NOT AUDITED.** This guide is for the people Marc has chosen to inherit his bitcoin. Read it all the way through once, calmly, before you touch anything. Practise it with the test kit first if one was left for you.

## Before you start

You do **not** need to rush. Bitcoin does not expire. Most losses happen when people hurry, ask strangers for help, or type secret words into a website.

**Nobody legitimate will ever ask you for the words, the shares, or the passphrase.** Not a bank, not an exchange, not "support", not someone who says they knew Marc. If anyone asks, stop.

## What you need

- **3 of the 5 share files** (`share-1.json` to `share-5.json`). Any 3 work. They are kept in separate places; see the sealed location list.
- **The vault passphrase.** It is stored separately from the shares.
- **A Tails USB stick** and a computer you can boot it on.
- **The vault tool** (`vault.js` and its `package.json` / `package-lock.json`, with dependencies already installed) on that stick or a second USB.
- **A hardware wallet** (new, bought direct from the maker) to receive the recovered words.
- Pen and paper.

Two shares on their own reveal nothing. Three shares without the passphrase reveal nothing. You need both.

## Step by step

1. **Gather** 3 shares and the passphrase. Do not photograph or email them.
2. **Boot Tails** and leave networking **off** (do not connect to Wi-Fi or plug in a cable).
3. **Copy** the 3 share files into the vault folder on the stick.
4. **Open a terminal** in the vault folder and run, using the share numbers you have:

   ```
   node vault.js reconstruct --show share-1.json share-3.json share-5.json
   ```

5. **Type the passphrase** when asked. Nothing appears on screen as you type; that is normal.
6. The tool should say **"Recovered a valid 24-word BIP39 mnemonic"** and print 24 words.
7. **Write the 24 words on paper**, in order, and check each one twice.
8. **Clear the screen and shut down Tails.** Nothing is saved once it is off.
9. **Restore the 24 words into the hardware wallet** using its "restore from recovery phrase" option. The balance should appear there.

## If something goes wrong

| What you see | What it means | What to do |
| --- | --- | --- |
| "decryption failed" | Wrong passphrase, or a damaged share | Retype the passphrase slowly. Then try a different set of 3 shares. |
| Refuses with fewer than 3 | Not enough shares | Fetch another share. |
| "unsupported format version ... try --legacy" | Very old shares | Run the same command with `--legacy` added after `reconstruct`. |
| Anything else | Unknown | Stop. Shut down. Ask the trusted technical contact below. Do not post the error with secrets in it. |

## After recovery

- Move the funds to a wallet you control and understand, at your own pace.
- Destroy or securely store the paper copy of the words. Never type them into a phone, cloud note, or website.
- Leftover shares are now sensitive in combination. Collect and destroy them, or keep them as securely as before.

## Contacts (fill in privately, not in the public repo)

- Trusted technical contact: ______
- Where the location list is kept: ______
- Solicitor / executor: ______

*This is not legal or estate-planning advice. Check the inheritance laws where you live.*
