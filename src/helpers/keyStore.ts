import * as ethLw from 'eth-lightwallet';

const { keystore } = ethLw;
const password = 'testWallet1';
const seedPhrase = 'unhappy nerve cancel reject october fix vital pulse cash behind curious bicycle';
const hdPathString = `m/44'/60'/0'/0`;

const createAddresses = () => {
  return new Promise((resolve, reject) => {
    keystore.createVault({
      password,
      seedPhrase,
      hdPathString
    }, (err, ks) => {
      if (err) { reject(err); }
      ks.keyFromPassword(password, (e, key) => {
        if (e) { reject(e); }
        ks.generateNewAddress(key, 1);
        resolve(ks.getAddresses());
      });
    });
  });
};

export { createAddresses }
