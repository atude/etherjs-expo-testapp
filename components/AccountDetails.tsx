import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';

import { ethers } from 'ethers';

const MY_ADDRESS = "0xF1008457018f72e4BF1dA477273ec9A7Ac78D253";
const FAUCET_ADDRESS = "0x81b7e08f65bdf5648606c89998a9cc8164397647";

export default class AccountDetails extends React.Component {
  state = {
    balance: "0",
    faucetBalance: "0",
    isProcessing: null,
    network: ethers.getDefaultProvider('ropsten').network.name,
    provider: ethers.getDefaultProvider('ropsten')
  }

  async componentDidMount() {
    this.updateBalance();
  }

  async updateBalance() {
    const { provider } = this.state;

    const balance = await provider.getBalance(MY_ADDRESS)
      .then(balance => balance.toString()); 

    const faucetBalance = await provider.getBalance(FAUCET_ADDRESS)
      .then(balance => balance.toString()); 

    this.setState({
      balance: balance,
      faucetBalance: faucetBalance
    });
  }

  sendTransaction(amount: string, address: string) {
    const { provider } = this.state;
    this.setState({
      isProcessing: true
    })

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
      this.updateBalance();
      this.setState({isProcessing: false})
    });
  }
      
  render() {
    let { network, balance, faucetBalance, isProcessing } = this.state;

    return (
      <>
        {isProcessing == null && 
          <Text style={{color: "red"}}> --- </Text>
        }

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
        <Button title="Refresh Balances" onPress={() => this.updateBalance()}/>
        <Button title="Send 1 ETH to test faucet" onPress={() => this.sendTransaction("1.0", FAUCET_ADDRESS)}/>
      </>
    );
  }
}

const styles = StyleSheet.create({

});

