"use strict";

const rise = require("risejs").rise;

const checkBalanceAddress = async address => {

  return new Promise(async (resolve, reject) => {
    let balance = await rise.accounts
      .getBalance(address)
      .catch(() => {
      return reject(new Error('Address not found'));
    });

    if (balance && balance.success) resolve(balance.balance);
    else reject(new Error('Request failled'));

  });

};

const checkBalanceDelegate = async delegateName => {

  return new Promise(async (resolve, reject) => {

    let delegate = await rise.delegates
      .getByUsername(delegateName)
      .catch(() => {
        return reject(new Error('Delegate not found'));
      });

    if (delegate && delegate.success && delegate.delegate && delegate.delegate.address) {

      const balance = await checkBalanceAddress(
        delegate.delegate.address
      ).catch(() => reject(false));

      return resolve(balance);

    } else
      reject(new Error('Request failled'));
  });

};

module.exports.checkBalanceAddress = checkBalanceAddress;
module.exports.checkBalanceDelegate = checkBalanceDelegate;
