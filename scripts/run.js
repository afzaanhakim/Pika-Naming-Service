const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); //owner of the contract and random address
  const domainContractFactory = await hre.ethers.getContractFactory("Domains"); //compiling Domain from our contracts folder using hardhat runtime environment
  const domainContract = await domainContractFactory.deploy(); //creating a local eth network for the contract and destroying the network after script is complete
  await domainContract.deployed();

  console.log("deployed to:", domainContract.address);
  console.log("deployed by:", owner.address);
  let txn = await domainContract.register("pika"); //registering "pika"
  await txn.wait();

  

  const domainOwnerAddress = await domainContract.getAddress("pika");
  console.log("Owner of `pika` ", domainOwnerAddress);

  // Trying to set a email 
  txn = await domainContract.connect(owner).setEmail("pika","123@fraud.com");
  await txn.wait();

  //trying to set twitter handle
  txn = await domainContract.connect(owner).setTwitter("pika", "@fraud");
  await txn.wait();

  //trying to set profession
  txn = await domainContract.connect(owner).setProfession("pika", "dev");
  await txn.wait();
//set a display pic
  txn = await domainContract.connect(owner).setPFP("pika", "https://cloudflare-ipfs.com/ipfs/QmdJZjrrHuWZJ8RWuKGjSSc17fYLS8jPJrR3CWzES4Lxns");
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
