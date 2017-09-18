"use strict";
const argv = require("minimist")(process.argv.slice(2));
const rise = require("risejs").rise;
const balances = require('./balance');


const app = async () => {
  rise.nodeAddress = "https://wallet.rise.vision";

  console.log("\n\n _.-* Rise wallet retriever *-._ \n\n");

  if (argv.address) {

    const address = argv.address;

    console.log(`Checking the balance for ${address}`);
    const balance = await balances.checkBalanceAddress(address).catch((e) => console.error(e.message));

    if(balance)
      console.log(`Rise in the wallet: ${balance}`);

  } else if (argv.delegate) {

    const delegateName = argv.delegate;

    console.log(`Checking the balance for ${delegateName}`);
    const balance = await balances.checkBalanceDelegate(delegateName).catch((e) => console.error(e.message));

    if(balance)
      console.log(`Rise in the wallet: ${balance}`);

  } else {
    console.log("You need to pass an argument to this script. \n");
    console.log("Execute this script by using:");
    console.log("    --address {address}        -> Returns the balance for the address");
    console.log("    --delegate {delegateName}  -> Returns the balance for the delegate");
  }

  console.log("\n\n");
};

app();
