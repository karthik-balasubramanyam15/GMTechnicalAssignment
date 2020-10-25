/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/*
We’re looking forward to getting together and digging into some code. 
In advance of that, we would like you to do the following: 
1. Create a free GitHub account (if you do not already have one) 
2. Create a new GitHub repository 
3. Create a mobile app using Java, Swift or React Native that accomplishes the following: 
  a) Connects to the GitHub API; 
  b) Uses that API to retrieve the most recent commits (at least 25) Note: if you are using Android, try to use Dagger. 
  c) Displays those commits in a list with the author, commit hash, and commit message. 

As you create this app, please make frequent commits of your work in progress because we want to be 
able to follow the process you went through in creating the app. We would like you to provide the 
link to your public GitHub repo to HVOD. Provide the link requested as your response to this challenge question.
*/

import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import _ from 'lodash';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            repository: '',
            validateUserName: false,
            validateRepository: false,
            repos: [],
            repositoryExists: true,
        };
        this.handleCommits = this.handleCommits.bind(this);
    }

    async handleCommits() {
        let userId = !_.isEmpty(this.state.userName) ? this.state.userName : null;
        let repos = !_.isEmpty(this.state.repository) ? this.state.repository : null;
        if (_.isEmpty(userId)) {
            this.setState({
                validateUserName: true,
            });
        }
        if (_.isEmpty(repos)) {
            this.setState({
                validateRepository: true,
            });
        }
        if (!_.isEmpty(userId) && !_.isEmpty(repos)) {
            await this.getRepositories().then((res) => {
                console.log("In Commit: ", res)
                this.getRepositoryNames(res);
            });

            if (this.state.repos.includes(repos)) {
                this.setState({ repositoryExists: true })
            } else {
                this.setState({ repositoryExists: false })
            }
        }
    }

    getRepositories = () => {
        let username = this.state.userName.toLowerCase().trim();
        const url = `https://api.github.com/users/${username}/repos`;
        return fetch(url).then((res) => res.json());
    }

    getRepositoryNames(repoArray) {
        let tempArray = []
        repoArray && repoArray.length > 0 ? repoArray.map((repo) => {
            repo && repo.name ? tempArray.push(repo.name) : null
        })
            : null

        this.setState({
            repos: tempArray
        })
    }

    displayMainView() {
        console.log('IN Render: ', this.state);
        return (
            <View style={{
                flex: 1,
                marginTop: 100,
                padding: 10,
                backgroundColor: 'white',
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 0.35, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16 }}>
                            GitHub Username:
                        </Text>
                    </View>
                    <View style={{ flex: 0.65 }}>
                        <TextInput
                            placeholder={this.state.validateUserName ? 'Enter Valid Username' : 'Enter your Github Username'}
                            placeholderTextColor={this.state.validateUserName ? 'red' : 'grey'}
                            style={{
                                padding: 10,
                                fontSize: 16,
                                borderColor: this.state.validateUserName ? 'red' : 'grey',
                                borderWidth: 1,
                                borderRadius: 10,
                            }}
                            value={this.state.userName}
                            autoCapitalize={'none'}
                            spellCheck={false}
                            autoCorrect={false}
                            onChangeText={(input) => this.setState({ userName: input, validateUserName: false })}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ flex: 0.35, marginTop: !this.state.repositoryExists ? -15 : 0 }}>
                        <Text style={{ fontSize: 16 }}>
                            Repository Name:
                        </Text>
                    </View>
                    <View style={{ flex: 0.65 }}>
                        <TextInput
                            placeholder={this.state.validateRepository ? 'Enter Valid Repository' : 'Github the Repository Name'}
                            placeholderTextColor={this.state.validateRepository ? 'red' : 'grey'}
                            style={{
                                padding: 10,
                                fontSize: 16,
                                borderColor: this.state.validateRepository || !this.state.repositoryExists ? 'red' : 'grey',
                                borderWidth: 1,
                                borderRadius: 10,
                            }}
                            autoCapitalize={'none'}
                            value={this.state.repository}
                            spellCheck={false}
                            autoCorrect={false}
                            onChangeText={(input) => this.setState({ repository: input, validateRepository: false })}
                        />
                        {!this.state.repositoryExists ?
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'red', fontSize: 16 }}>Entered Repository doesn't exist</Text>
                            </View>
                            : null
                        }
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

