import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { ethers } from 'ethers';

export default class AccountDetails extends React.Component {
  state = {
    address: "0xF1008457018f72e4BF1dA477273ec9A7Ac78D253",
    balance: -1,
    network: "...",
  }

  async componentDidMount() {
    this.updateBalance();
  }

  async updateBalance() {
    const provider = ethers.getDefaultProvider('ropsten');
    let balance = await provider.getBalance(this.state.address)
      .then(balance => balance.toString()); 

    console.log("Balance: " + balance);
    this.setState({
      network: provider.network.name,
      balance: balance
    });
  }
      
  render() {
    const provider = ethers.getDefaultProvider('ropsten');
    let { address, network, balance } = this.state;

    return (
      <>
      <Text>Network: {network}</Text>
      <Text>Address: {address}</Text>
      <Text>Balance: {balance}</Text>
      <Button title="Refresh Balance" onPress={() => this.updateBalance()}/>
      </>
    );
  }
}

const styles = StyleSheet.create({

});

