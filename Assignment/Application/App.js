/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            repository: '',
        };
        this.handleCommits = this.handleCommits.bind(this)
        this.handleInputText = this.handleInputText.bind(this)
    }

    handleCommits() {
        console.log('Display Button Clicked: ', this.state);
    }

    handleInputText = (type, value) => {
        let userId = this.state.userName ? this.state.userName : null
        let repos = this.state.repository ? this.state.repository : null

        if (type === 'username') {
            userId = value;
        }
        else if (type === 'repo') {
            repos = value
        }

        this.setState({
            userName: userId,
            repository: repos
        })
    }



    displayMainView() {
        return (
            <View style={{
                flex: 1,
                marginTop: 100,
                padding: 10,
                backgroundColor: 'white',
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 0.35 }}>
                        <Text style={{ fontSize: 16 }}>
                            GitHub Username:
                        </Text>
                    </View>
                    <View style={{ flex: 0.65 }}>
                        <TextInput
                            placeholder="Enter your Github Username"
                            style={{
                                padding: 10,
                                fontSize: 16,
                                borderColor: 'grey',
                                borderWidth: 1,
                                borderRadius: 10,
                            }}
                            spellCheck={false}
                            autoCorrect={false}
                            onChangeText={(input) => this.handleInputText('username', input)}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ flex: 0.35 }}>
                        <Text style={{ fontSize: 16 }}>
                            Repository Name:
                        </Text>
                    </View>
                    <View style={{ flex: 0.65 }}>
                        <TextInput
                            placeholder="Github the Repository Name"
                            style={{
                                padding: 10,
                                fontSize: 16,
                                borderColor: 'grey',
                                borderWidth: 1,
                                borderRadius: 10,
                            }}
                            spellCheck={false}
                            autoCorrect={false}
                            onChangeText={(input) => this.handleInputText('repo', input)}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        height: 50,
                        backgroundColor: '#263238',
                        borderColor: '#263238',
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 10,
                        justifyContent: 'center',
                    }}
                    onPress={() => this.handleCommits()} >
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: 18,
                        alignSelf: 'center',
                    }}>
                        Display Commits
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'teal' }}>
                {this.displayMainView()}
            </SafeAreaView>
        );
    }
}

export default App;

