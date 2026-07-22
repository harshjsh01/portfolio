const crypto = require('crypto');
const fs = require('fs');

const password = 'Character3D#@';
const passwordBuffer = Buffer.from(password);
const hash = crypto.createHash('sha256').update(passwordBuffer).digest();
const key = hash.slice(0, 32);

const encryptedData = fs.readFileSync('public/models/character.enc');
const iv = encryptedData.slice(0, 16);
const data = encryptedData.slice(16);

const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let decrypted = decipher.update(data);
decrypted = Buffer.concat([decrypted, decipher.final()]);

fs.writeFileSync('character.glb', decrypted);
console.log('Decrypted successfully');
