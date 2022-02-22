const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains"); //compiling Domain from our contracts folder using hardhat runtime environment
  const domainContract = await domainContractFactory.deploy("pika"); //creating a local eth network for the contract and destroying the network after script is complete also passing pika as the maindomain into the constructor of the domains contratc
  await domainContract.deployed();

  console.log("deployed to:", domainContract.address);

  let txn = await domainContract.register("feraligatr", {value: hre.ethers.utils.parseEther('0.1')}); //registering "trouble"
  await txn.wait();

  console.log("minted  feraligatr.pika")
  
  txn = await domainContract.setRecord("feraligatr", "hydro pump!");
  await txn.wait();
  console.log("record set for feraligatr.pika")

  const domainOwnerAddress = await domainContract.getAddress("feraligatr");
  console.log("Owner of `feraligatr` ", domainOwnerAddress);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance for Pika Naming Service", hre.ethers.utils.formatEther(balance));

  // Trying to set a email --- feraligatr not set yet
  txn = await domainContract.setEmail("feraligatr","roar@pika.com");
  await txn.wait();

  //trying to set twitter handle
  txn = await domainContract.setTwitter("feralligatr", "@croc");
  await txn.wait();

  //trying to set profession
  txn = await domainContract.setProfession("feralligatr", "full-time pokemon");
  await txn.wait();
//set a display pic
  txn = await domainContract.setPFP("feralligatr", "https://cloudflare-ipfs.com/ipfs/QmaXAjnCQyyH57r94eJ8RcvTYNJfqzQT6K4iiB7MVTVVFU");
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
