import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';

import { ethers } from 'ethers';

const MY_ADDRESS = "0xF1008457018f72e4BF1dA477273ec9A7Ac78D253";
const MY_PRIV_KEY = "7D1CBDDDFB8356594DC69AF971723E2697976CFA1BC4B8871A7184CC3CDB1305";
const FAUCET_ADDRESS = "0x81b7e08f65bdf5648606c89998a9cc8164397647";

export default class AccountDetails extends React.Component {
  state = {
    balance: -1,
    faucetBalance: -1,
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

    //Get wallet
    let wallet = new ethers.Wallet(MY_PRIV_KEY);

    //Make basic transaction
    let transaction = {
      nonce: 9,
      to: address,
      gasLimit: 210000,
      gasPrice: ethers.utils.bigNumberify("20000000000"),
      value: ethers.utils.parseEther(amount)
    };

    //Sign transaction
    let signPromise = wallet.sign(transaction)

    //Process transaction
    signPromise.then((signedTransaction) => {
      provider.sendTransaction(signedTransaction).then((tx) => {
        console.log(tx);
      });
    })
  }
      
  render() {
    let { network, balance, faucetBalance } = this.state;

    return (
      <>
        <Text>Network: {network}</Text>
        <Text>My Address: {MY_ADDRESS}</Text>
        <Text>Faucet Address: {FAUCET_ADDRESS}</Text>
        <Text>My Balance: {balance}</Text>
        <Text>Faucet Balance: {faucetBalance}</Text>
        <Button title="Refresh Balances" onPress={() => this.updateBalance()}/>
        <Button title="Send 1 ETH to test faucet" onPress={() => this.sendTransaction("1.0", FAUCET_ADDRESS)}/>
      </>
    );
  }
}

const styles = StyleSheet.create({

});

