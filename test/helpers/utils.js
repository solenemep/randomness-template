const BigNumber = require('bignumber.js');
const { time } = require('@openzeppelin/test-helpers');
const { toWei } = web3.utils;

function toBN(number) {
  return new BigNumber(number);
}

async function increaseTime(duration) {
  await time.increase(duration);
}

async function increaseTimeTo(target) {
  await time.increaseTo(target);
}

async function getTime() {
  return toBN(await time.latest())
    .plus(1)
    .toString();
}

async function getCurrentBlock() {
  const block = await web3.eth.getBlock('latest');
  return block.number;
}

async function advanceBlockTo(blockAmount) {
  const lastBlock = await time.latestBlock();

  await time.advanceBlockTo(toBN(lastBlock).plus(blockAmount).toString());
}

async function getCosts(tx) {
  const receipt = await web3.eth.getTransactionReceipt(tx.hash);
  const gasUsed = receipt.gasUsed;
  const gasPrice = Number(tx.gasPrice);
  const gasCost = toBN(gasUsed).times(gasPrice);
  console.log('gas used : ' + gasUsed);
  console.log('gas price : ' + gasPrice);
  console.log(
    'tx cost : ' +
      toBN(gasCost)
        .div(10 ** 18)
        .toString() +
      ' ETH'
  );
}

module.exports = {
  toBN,
  toWei,
  increaseTime,
  increaseTimeTo,
  getTime,
  getCurrentBlock,
  advanceBlockTo,
  getCosts,
};
