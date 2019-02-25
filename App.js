/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

import Placeholder from 'rn-placeholder';
import RNFetchBlob from 'rn-fetch-blob';
import Test from './Test';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {


  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isReady: true
      });
    }, 3000);
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={{
        padding: 20
      }}>
        <Placeholder.ImageContent
          position="right"
          hasRadius
          lineNumber={5}
          textSize={14}
          lineSpacing={5}
          color="#00ff00"
          width="100%"
          lastLineWidth="30%"
          firstLineWidth="10%"
          onReady={this.state.isReady}
        >
          <Text style={{
            height: 100,
            color: 'white',
            fontSize: 22,
            textAlignVertical: 'center'
          }}>Placeholder has finished :D</Text>
        </Placeholder.ImageContent>
      </View>
    )
  }

  _onUpload() {
    let str = new Test().data;
    // RNFetchBlob.fetch('POST', 'http://www.example.com/upload-form', {
    //   Authorization: "Bearer access-token",
    //   otherHeader: "foo",
    //   'Content-Type': 'multipart/form-data',
    // }, [
    //     // element with property `filename` will be transformed into `file` in form data
    //     { name: 'avatar', filename: 'avatar.png', data: str },
    //   ]).then((resp) => {
    //     console.log("BACHK_response: ", resp);
    //   }).catch((err) => {
    //     console.log("BACHK_error: ", err);
    //   })

    RNFetchBlob.fetch('POST', 'http://www.example.com/upload', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'octet-stream'
    }, str)
      // listen to upload progress event
      .uploadProgress((written, total) => {
        console.log('uploaded', written / total)
      })
      // listen to download progress event
      .progress((received, total) => {
        console.log('progress', received / total)
      })
      .then((resp) => {
        console.log("BACHK_response: ", resp);
      })
      .catch((err) => {
        console.log("BACHK_error: ", err);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Placeholder.Paragraph
          lineNumber={3}
          textSize={16}
          lineSpacing={5}
          color="#ff0000"
          width="100%"
          lastLineWidth="70%"
          firstLineWidth="50%"
          onReady={this.state.isReady}
        >
          <Text>Placeholder finished</Text>
        </Placeholder.Paragraph> */}

        {/* <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        /> */}
        <TouchableOpacity onPress={() => this._onUpload()}>
          <Text>Upload file</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'gray',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
