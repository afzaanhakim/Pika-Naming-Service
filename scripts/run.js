const main = async () => {
  const [owner, randomUser] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains"); //compiling Domain from our contracts folder using hardhat runtime environment
  const domainContract = await domainContractFactory.deploy("pika"); //creating a local eth network for the contract and destroying the network after script is complete also passing pika as the maindomain into the constructor of the domains contratc
  await domainContract.deployed();

  console.log("deployed to:", domainContract.address);

  let txn = await domainContract.register("spice", {
    value: hre.ethers.utils.parseEther('1234'),
  }); //registering "trouble"
  await txn.wait();

  const domainOwnerAddress = await domainContract.getAddress("trouble");
  console.log("Owner of `trouble` ", domainOwnerAddress);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log(
    "Contract balance for Pika Naming Service",
    hre.ethers.utils.formatEther(balance)
  );

  // Trying to set a email

  try {
    txn = await domainContract.connect(randomUser).withdraw();
    await txn.wait();
  } catch (error) {
    console.log("could not hack");
  }

  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("balance of owner before withdrawal", hre.ethers.utils.formatEther(ownerBalance));


  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));


  //   txn = await domainContract.setEmail("trouble","trouble@fraud.com");
  //   await txn.wait();

  //   //trying to set twitter handle
  //   txn = await domainContract.setTwitter("trouble", "@troublesome");
  //   await txn.wait();

  //   //trying to set profession
  //   txn = await domainContract.setProfession("trouble", "memeartist");
  //   await txn.wait();
  // //set a display pic
  //   txn = await domainContract.setPFP("trouble", "https://cloudflare-ipfs.com/ipfs/QmUKHB3EZmeakGHyQDmpSHBxUuYTDjG45Yksq6XXU2RiaG");
  //   await txn.wait();
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
