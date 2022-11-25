/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
const hre = require('hardhat');
const { deployed } = require('./deployed');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const RandomGenerator = await hre.ethers.getContractFactory('RandomGenerator');
  const randomGenerator = await RandomGenerator.deploy();
  await randomGenerator.deployed();

  const Random = await hre.ethers.getContractFactory('Random', {
    libraries: {
      RandomGenerator: randomGenerator.address,
    },
  });
  const random = await Random.deploy();
  await random.deployed();

  await deployed('Random', hre.network.name, random.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
