import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button } from 'react-native';

import { ethers } from 'ethers';

const MY_ADDRESS = "0xF1008457018f72e4BF1dA477273ec9A7Ac78D253";
const FAUCET_ADDRESS = "0x81b7e08f65bdf5648606c89998a9cc8164397647";

export default function AccountDetails(props) {
  const [balance, setBalance] = useState("0");
  const [faucetBalance, setFaucetBalance] = useState("0");
  const [isProcessing, setIsProcessing] = useState(null);
  
  const network = ethers.getDefaultProvider('ropsten').network.name;
  const provider = ethers.getDefaultProvider('ropsten');

  const updateBalances = async () => {
    setBalance(await provider.getBalance(MY_ADDRESS).then(balance => balance.toString())); 
    setFaucetBalance(await provider.getBalance(FAUCET_ADDRESS).then(balance => balance.toString())); 
  }

  useEffect(() => {
    updateBalances();
  })

  const sendTransaction = (amount: string, address: string) => {
    setIsProcessing(true);

    let privateKey = '0x7D1CBDDDFB8356594DC69AF971723E2697976CFA1BC4B8871A7184CC3CDB1305';
    let wallet = new ethers.Wallet(privateKey, provider);

    let transaction = {
      to: address,
      value: ethers.utils.parseEther(amount)
    };

    // Send the transaction
    let sendTransactionPromise = wallet.sendTransaction(transaction);

    sendTransactionPromise.then((tx) => {
      console.log(tx);
      setIsProcessing(false);
    });
  }
      
  return (
    <>
      {isProcessing === true &&
        <Text style={{color: "red"}}>Processing transaction...</Text>
      } 
      
      {isProcessing === false &&
        <Text style={{color: "green"}}>Transaction Completed.</Text>
      }
      <Text>Network: {network}</Text>
      <Text>My Address: {MY_ADDRESS}</Text>
      <Text>Faucet Address: {FAUCET_ADDRESS}</Text>
      <Text>My Balance: {ethers.utils.formatEther(balance)}</Text>
      <Text>Faucet Balance: {ethers.utils.formatEther(faucetBalance)}</Text>
      <Button title="Refresh Balances" onPress={() => updateBalances()}/>
      <Button title="Send 1 ETH to test faucet" onPress={() => sendTransaction("1.0", FAUCET_ADDRESS)}/>
    </>
  );
}

const styles = StyleSheet.create({

});

