'use strict';

const test = require("tape");
const balances = require("../balance");
const rise = require("risejs").rise;

test("Testing balances from address", async t => {
  rise.nodeAddress = "https://wallet.rise.vision";

  const goodAddress = "7128048429618539851R";
  const badAddress = "7128048429618539851RA";

  const balance = await balances.checkBalanceAddress(goodAddress).catch(() => {
    t.fail("Should accept a good address");
  });

  t.is(
    typeof balance,
    "string",
    "Balance shouldn't be error with good address"
  );

  await balances.checkBalanceAddress(badAddress).catch(() => {
    t.pass("Should return error with wrong address");
  });

  t.end();
});

test("Testing balances from delegate", async t => {
  rise.nodeAddress = "https://wallet.rise.vision";

  const goddDelegateName = "lumberjack";
  const badDelegateName = "lumberjacka";

  const balance = await balances
    .checkBalanceDelegate(goddDelegateName)
    .catch(() => {
      t.fail("Should accept a good delegateName");
    });

  t.is(
    typeof balance,
    "string",
    "Balance shouldn't be error with good delegate"
  );

  await balances.checkBalanceDelegate(badDelegateName).catch(() => {
    t.pass("Should return error with wrong delegateName");
  });

  t.end();
});
