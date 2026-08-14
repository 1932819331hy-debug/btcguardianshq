/**
 * BTCGuardiansHQ - Vault Tool
 * True Shamir’s Secret Sharing + AES-256-GCM
 * Air-gapped use only
 *
 * Commands:
 *   node vault.js create
 *   node vault.js reconstruct <share1> <share2> <share3> ...
 *   node vault.js test
 */

const secrets = require('secrets.js-grempe');
const bip39 = require('bip39');
const crypto = require('crypto');

// ====================== CONFIGURATION ======================
const TOTAL_SHARES = 5;      // 3 for 2-of-3 | 5 for 3-of-5
const THRESHOLD = 3;         // 2 for 2-of-3 | 3 for 3-of-5

// TEMPORARY password for testing only
// CHANGE THIS to a strong passphrase before real use!
const ENCRYPTION_PASSWORD = 'temp-test-password-123';
const SALT = 'btcguardianshq-salt-v1';
// ===========================================================

/**
 * Derive a 256-bit key from the password
 */
function deriveKey(password) {
  return crypto.scryptSync(password, SALT, 32);
}

/**
 * Encrypt a share using AES-256-GCM
 */
function encryptShare(share) {
  const key = deriveKey(ENCRYPTION_PASSWORD);
  const iv = crypto.randomBytes(12); // 96-bit IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(share, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  // Format: iv:authTag:encryptedData
  return iv.toString('hex') + ':' + authTag + ':' + encrypted;
}

/**
 * Decrypt a share using AES-256-GCM
 */
function decryptShare(encryptedShare) {
  const parts = encryptedShare.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted share format');
  }

  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encryptedText = parts[2];

  const key = deriveKey(ENCRYPTION_PASSWORD);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Create a new vault
 */
function createVault() {
  console.log('=== BTCGuardiansHQ Vault Creation ===');
  console.log(`Scheme: ${THRESHOLD}-of-${TOTAL_SHARES}`);
  console.log('Encryption: AES-256-GCM');
  console.log('Mode: Air-gapped\n');

  // 1. Generate 24-word mnemonic
  const mnemonic = bip39.generateMnemonic(256);
  console.log('Mnemonic generated successfully.\n');

  // 2. Convert to hex for Shamir
  const mnemonicHex = secrets.str2hex(mnemonic);

  // 3. Create Shamir shares
  const shares = secrets.share(mnemonicHex, TOTAL_SHARES, THRESHOLD);

  // 4. Encrypt each share
  const encryptedShares = shares.map(share => encryptShare(share));

  // 5. Output
  console.log('=== ENCRYPTED SHARES (distribute securely) ===');
  encryptedShares.forEach((encShare, i) => {
    console.log(`\nEncrypted Share ${i + 1} of ${TOTAL_SHARES}:`);
    console.log(encShare);
  });

  console.log('\n=== SECURITY NOTES ===');
  console.log(`• Scheme: ${THRESHOLD}-of-${TOTAL_SHARES}`);
  console.log(`• Any ${THRESHOLD} shares can recover the original mnemonic.`);
  console.log(`• Fewer than ${THRESHOLD} shares reveal nothing.`);
  console.log('• Encryption: AES-256-GCM (authenticated)');
  console.log('• Store shares in geographically separated locations.');
  console.log('• Never store the full mnemonic with the shares.');
  console.log('• You must remember the encryption password for recovery.\n');

  return encryptedShares;
}

/**
 * Reconstruct the original mnemonic from encrypted shares
 */
function reconstructVault(encryptedSharesArray) {
  if (!Array.isArray(encryptedSharesArray) || encryptedSharesArray.length < THRESHOLD) {
    throw new Error(`You must provide at least ${THRESHOLD} encrypted shares.`);
  }

  try {
    // Decrypt shares
    const decryptedShares = encryptedSharesArray.map(enc => decryptShare(enc));

    // Combine with Shamir
    const recoveredHex = secrets.combine(decryptedShares);
    const mnemonic = secrets.hex2str(recoveredHex);

    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Reconstructed mnemonic failed validation.');
    }

    return mnemonic;
  } catch (err) {
    throw new Error('Reconstruction failed. Check shares and encryption password.');
  }
}

/**
 * Show usage help
 */
function showHelp() {
  console.log(`
BTCGuardiansHQ Vault Tool

Usage:
  node vault.js create
  node vault.js reconstruct <share1> <share2> <share3> ...
  node vault.js test

Examples:
  node vault.js create
  node vault.js reconstruct "iv:tag:data..." "iv:tag:data..." "iv:tag:data..."
  node vault.js test
`);
}

// ====================== CLI ======================
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  showHelp();
  process.exit(0);
}

switch (command) {
  case 'create':
    createVault();
    break;

  case 'reconstruct': {
    const shares = args.slice(1);

    if (shares.length < THRESHOLD) {
      console.error(`\nError: You must provide at least ${THRESHOLD} encrypted shares.\n`);
      showHelp();
      process.exit(1);
    }

    try {
      const mnemonic = reconstructVault(shares);
      console.log('\n✓ Reconstruction successful!');
      console.log('Recovered mnemonic:');
      console.log(mnemonic);
      console.log('');
    } catch (err) {
      console.error('\n✗', err.message);
      process.exit(1);
    }
    break;
  }

  case 'test': {
    console.log('Using TEMPORARY test password:', ENCRYPTION_PASSWORD);
    console.log('(Change ENCRYPTION_PASSWORD before real use!)\n');

    const encryptedShares = createVault();

    console.log('\n=== RECONSTRUCTION TEST ===');
    try {
      const testShares = encryptedShares.slice(0, THRESHOLD);
      const recovered = reconstructVault(testShares);
      console.log('✓ Reconstruction successful!');
      console.log('Recovered mnemonic:', recovered);
    } catch (err) {
      console.error('✗ Reconstruction failed:', err.message);
      process.exit(1);
    }
    break;
  }

  default:
    console.error(`\nUnknown command: ${command}`);
    showHelp();
    process.exit(1);
}
