import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { actionCount } from '../..';

export default class TestReduxSaga extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{
                    fontSize: 20
                }}>Test Redux Saga</Text>

                <Text style={{
                    fontSize: 20,
                    marginTop: 20
                }}>{"this.props.count"}</Text>
                
                <TouchableOpacity
                    // onPress={() => {
                    //     this.props.dispatch(actionCount(10));
                    // }}
                    style={{
                        marginTop: 30
                    }}>
                    <Text style={{
                        fontSize: 20
                    }}>ADD</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.DEMO.count
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});