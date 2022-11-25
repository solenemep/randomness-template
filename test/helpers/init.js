const { ethers, upgrades } = require('hardhat');
const { toWei } = require('./utils');

let randomGenerator;
let random;

const init = async () => {
  const users = await ethers.getSigners();

  await deployLibrary();
  await deployContracts();

  return {
    users,
    randomGenerator,
    random,
  };
};

const deployLibrary = async () => {
  // Library
  const RandomGenerator = await ethers.getContractFactory('RandomGenerator');
  randomGenerator = await RandomGenerator.deploy();
  await randomGenerator.deployed();
};

const deployContracts = async () => {
  const Random = await ethers.getContractFactory('Random', {
    libraries: {
      RandomGenerator: randomGenerator.address,
    },
  });
  random = await Random.deploy();
  await random.deployed();
};

module.exports.init = init;
