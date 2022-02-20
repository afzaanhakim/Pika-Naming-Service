const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); //owner of the contract and random address
  const domainContractFactory = await hre.ethers.getContractFactory("Domains"); //compiling Domain from our contracts folder using hardhat runtime environment
  const domainContract = await domainContractFactory.deploy("pika"); //creating a local eth network for the contract and destroying the network after script is complete also passing pika as the maindomain into the constructor of the domains contratc
  await domainContract.deployed();

  console.log("deployed to:", domainContract.address);

  let txn = await domainContract.register("trouble", {value: hre.ethers.utils.parseEther('0.1')}); //registering "trouble"
  await txn.wait();

  

  const domainOwnerAddress = await domainContract.getAddress("trouble");
  console.log("Owner of `trouble` ", domainOwnerAddress);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance for Pika Naming Service", hre.ethers.utils.formatEther(balance));

  // Trying to set a email 
  txn = await domainContract.connect(owner).setEmail("trouble","trouble@fraud.com");
  await txn.wait();

  //trying to set twitter handle
  txn = await domainContract.connect(owner).setTwitter("trouble", "@troublesome");
  await txn.wait();

  //trying to set profession
  txn = await domainContract.connect(owner).setProfession("trouble", "memeartist");
  await txn.wait();
//set a display pic
  txn = await domainContract.connect(owner).setPFP("trouble", "https://cloudflare-ipfs.com/ipfs/QmUKHB3EZmeakGHyQDmpSHBxUuYTDjG45Yksq6XXU2RiaG");
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log("we have an error", error);
    process.exit(1);
  }
};

runMain();
