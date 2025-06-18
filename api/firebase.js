const dotenv = require('dotenv');
const admin = require('firebase-admin');
const zlib = require('zlib');

if (!process.env.RENDER) {
  require('dotenv').config({ path: '../.env.firebase' });
}

if (!process.env.CHAVE_FIREBASE_KEY) {
  throw new Error('Variável CHAVE_FIREBASE_KEY não encontrada no .env.firebase');
} else {
  console.log('Variável CHAVE_FIREBASE_KEY carregada com sucesso.');
}

const chaveBase64SemQuebra = process.env.CHAVE_FIREBASE_KEY.replace(/(\r\n|\n|\r|\s)/gm, '');

const bufferCompactado = Buffer.from(chaveBase64SemQuebra, 'base64');
const jsonString = zlib.gunzipSync(bufferCompactado).toString('utf-8');
const serviceAccount = JSON.parse(jsonString);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
