import { Contact } from '../classes/Contact';
import { Transaction } from '../classes/Transaction';
import { IUser } from '../interfaces/User';
import { findByPublicKey } from './get';

const getFullName = (person: Contact | IUser) => {
  const { title, firstName, lastName } = person;
  let fullName = '';
  fullName += title ? `${title} ` : '';
  fullName += firstName ? `${firstName} ` : '';
  fullName += lastName ? `${lastName} ` : '';
  return fullName;
};

const getBalance = (transactions: Transaction[], publicKey: string) => {
  let balance = 0;
  transactions
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(transaction => {
      const { amount, to } = transaction;
      const incoming = to === publicKey;
      incoming ? balance += amount : balance -= amount;
  });
  return balance;
};

const getBalanceByTransaction = (transactions: Transaction[], publicKey: string, transactionId: string) => {
  let balance = 0;
  const sorted = transactions.sort((a, b) => a.timestamp - b.timestamp);
  for (const transaction of sorted) {
    const { amount, to } = transaction;
    const incoming = to === publicKey;
    incoming ? balance += amount : balance -= amount;
    if (transaction.id === transactionId) { continue; }
  }
  return balance;
};

const getBalanceArray = (transactions: Transaction[], publicKey: string) => {
  let balance = 0;
  const balanceArray: number[][] = [];
  transactions
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((transaction) => {
      const { amount, timestamp, to } = transaction;
      const incoming = to === publicKey;
      incoming ? balance += amount : balance -= amount;
      const value = [
        timestamp,
        balance
      ];
      balanceArray.push(value);
    });
  return balanceArray;
}

const getContact = (contacts: Contact[], publicKey: string) => {
  const index = findByPublicKey(publicKey, contacts);
  return index === -1 ? undefined : contacts[index];
}

export { getBalance, getBalanceArray, getBalanceByTransaction, getContact, getFullName };
