// @ts-ignore
import * as W3 from 'web3';
const Web3 = require('web3'); // tslint:disable-line

const web3: W3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/SG3z8qbWkyg2PEQUJGXi'));

export { web3 };
