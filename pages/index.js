import React,{useState,useEffect} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Image from "next/image";

import imageEth from "../ether.png";
import creator from "../creator.png";

const Home =() => {
  const [currentAccount , setCurrentAccount ] = useState('');
  const [connect, setConnect ] = useState(false);
  const [balance , setBalance ] = useState('');

  const failMessage = "Please install Metamask and connect your wallet";
  const successMessage = "Your Account Successfully connected to metamask";
  const  INFURA_ID ="07051e619bd64826b3462b58136962c4";
  const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
  );

  const checkIfWalletConnected = async () => {
    if(!window.ethereum) return ;
    const accounts = await window.ethereum.request({method: "eth_accounts"});
    //console.log(accounts);

    if(accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("Fail");
    }

    const address = "0x388C818CA8B9251b393131C08a736A67ccB19297";
    const balance = await provider.getBalance(address);
    const showBalance = `${ethers.formatEther(balance)} ETH\n` ;
    console.log(showBalance);
    setBalance(showBalance);
  }; 

  const cWallet = async() => {
    if(!window.ethereum) return console.log(failMessage);
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
    setCurrentAccount(accounts[0]);
  }

  useEffect(() => {
  checkIfWalletConnected();
  });

  useEffect(() => {
    async function accountChanged() {
     window.ethereum.on("accountChanged", async function() {
     const accounts = await window.ethereum.request({
      method: "eth_accounts",
     });
       
    if(accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      window.location.reload();
    }
     });
    
    }
    accountChanged();
  },[]);


  return(
    <div className="card-container">
      {!currentAccount ? "" : <span className="pro">PRO</span>}
      <Image src={creator} alt="profile" width={80} height={80} />
        <h3> Check Ether</h3>
        {!currentAccount ? (
          <div>
            <div className="message">
              <p>{failMessage}</p>
            </div>
            <Image  src={imageEth} alt="ether" width={100} height={100}/>
       <p>Welcome to ether account balance checker</p>
          </div>
        ) : (
          <div>                 
            <h6>
              Verified <span className="tick">&#10004;</span>
            </h6>
            <p>Ether account and balance checker<br /> find account details </p>
            <div className="buttons">
              <button className="primary ghost" onClick={() => {}}>
                Ether Account Details
              </button>
            </div>
             </div>
        )} 
        {!currentAccount &&!connect ? (
           <div className="buttons">
              <button className="primary " onClick={() =>cWallet()}>
             Connect wallet 
              </button>
            </div>
            ) :(
              <div className="skills">
              <h6> Your Ether </h6>
              <ul>
                 <li>Account</li>
                 <li>{currentAccount}</li>
                 <li>Balance</li>
                 <li>{balance}</li>
              </ul>
               </div>
            )}
    </div>
  );
};

export default Home ;
