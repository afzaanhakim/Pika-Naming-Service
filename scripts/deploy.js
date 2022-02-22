const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains"); //compiling Domain from our contracts folder using hardhat runtime environment
  const domainContract = await domainContractFactory.deploy("pika"); //creating a local eth network for the contract and destroying the network after script is complete also passing pika as the maindomain into the constructor of the domains contratc
  await domainContract.deployed();

  console.log("deployed to:", domainContract.address);

  let txn = await domainContract.register("cooler", {value: hre.ethers.utils.parseEther('0.1')}); //registering "trouble"
  await txn.wait();

  console.log("minted cooler.pika")
  
  txn = await domainContract.setRecord("cooler", "cold as ice");
  await txn.wait();
  console.log("record set for cooler.pika");
   // Trying to set a email --- cooler not set yet
   txn = await domainContract.setEmail("cooler","cold@pika.com");
   await txn.wait();
   console.log("email set for cooler.pika");
 
   //trying to set twitter handle
   txn = await domainContract.setTwitter("cooler", "@cubicle");
   await txn.wait();
   console.log("twitter set for cooler.pika, cubicle");
 
   //trying to set profession
   txn = await domainContract.setProfession("cooler", "full-time water");
   await txn.wait();
   console.log("profession set for cooler.pika");
 //set a display pic
   txn = await domainContract.setPFP("cooler", "");
   await txn.wait();
   console.log("pfp set for cooler.pika");

  const domainOwnerAddress = await domainContract.getAddress("cooler");
  console.log("Owner of `cooler` ", domainOwnerAddress);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance for Pika Naming Service", hre.ethers.utils.formatEther(balance));

 
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
