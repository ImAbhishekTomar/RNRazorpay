/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// require('dotenv').config();
//console.log(dotenv);

// require('dotenv').config();
// console.log(dotenv);

// const RAZORPAY_KEY_ID = process.env?.RAZORPAY_KEY_ID ?? '';
// const RAZORPAY_KEY_SECRET = process.env?.RAZORPAY_KEY_SECRET ?? '';

console.log(process.env.RAZORPAY_KEY_ID);
console.log(process.env.RAZORPAY_KEY_SECRET);

const Section = (props: {children: any; title: any; onPress?(): any}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={props.onPress}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {props.title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {props.children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPay = () => {
    const options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'enter your key',
      amount: '5000',
      name: 'Acme Corp',
      order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'abhi.tomar@live.com',
        contact: '0917840000702',
        name: 'Mr. Sample Payment',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        console.info('Success!!', JSON.stringify(data));
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(function (error: {code: any; description: any}) {
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{backgroundColor: isDarkMode ? Colors.black : Colors.white}}>
          <Section title="Pay Now" onPress={onPay}>
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section
            title="See Your Changes"
            onPress={() => console.log('click')}>
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More" onPress={() => console.log('click')}>
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
