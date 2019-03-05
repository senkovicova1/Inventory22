
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Thumbnail, Button, Icon, Left, Picker, Right, Body, Text, List, ListItem, CheckBox, Grid, Col, Badge, Form, Label, Input, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

import { rebase } from '../../../index.android';
import firebase from 'firebase';

const ACC_VIO = 'rgb(124, 90, 150)';
const ACC_CREAM = 'rgb(252, 244, 217)';
const ACC_PEACH = 'rgb(255, 184, 95)';
const ACC_DARK_PEACH = 'rgb(255, 122, 90)';
const ACC_TEAL = 'rgb(142, 210, 210)';
const ACC_DARK_TEAL = 'rgb(0, 170, 160)';


class Header6 extends Component {  // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      selectedInventory: "",

      searchOpen: false,
      searchedWord: '',

      recipes: [],
      inventories: [],

      userID: 1,

      isSigninInProgress: false,
    };

    this.toggleSearch.bind(this);
    this.fetch.bind(this);
    this.fetch();
  }

  componentDidMount(){
  }

  onLoginOrRegister = () => {
    console.log("auth");
    GoogleSignin.signIn()
      .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        // Login with the credential
        console.log(data);
        console.log(credential);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
        console.log(user);
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  signIn = async () => {
    try {
      console.log("eh");
      await GoogleSignin.hasPlayServices();
      console.log("eh1");
      const userInfo = await GoogleSignin.signIn();
      console.log("eh2");
      this.setState({ userInfo });
      console.log("heeere1");
            console.log(userInfo);
      console.log("heeere2");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  fetch(){
    rebase.fetch(`recipes`, {
      context: this,
      withIds: true,
      asArray: true
    }).then((rec) => {
      rebase.fetch(`recipeAccess`, {
        context: this,
        withIds: true,
        asArray: true
      }).then((recAcc) => {
        rebase.fetch(`inventories`, {
          context: this,
          withIds: true,
          asArray: true
        }).then((inv) => {
          rebase.fetch(`inventoryAccess`, {
            context: this,
            withIds: true,
            asArray: true
          }).then((invAcc) => {
              let accGrantedRec = recAcc.filter(acc => acc.userID === this.state.userID).map(acc => acc.recID);
              let accGrantedInv = invAcc.filter(inv => inv.userID === this.state.userID).map(inv => inv.invID);

              this.setState({
                recipes: rec.filter(recipe => accGrantedRec.includes(recipe.key)),
                inventories: inv.filter(inventory => accGrantedInv.includes(parseInt(inventory.key))),
              });
            })
          })
        })
      });
  }

  addItem(newItem){
    this.setState({
      recipes: this.state.recipes.concat([newItem]) //updates Firebase and the local state
    });
  }

  toggleSearch(){
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: ACC_TEAL}}>
          <Left>
            <Button transparent  onPress={() => this.props.openDrawer()}>
              <Icon name="menu" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
          </Left>
          <Body>
            { this.state.searchOpen
            &&
            <Item>
              <Input
                style={{ color: ACC_DARK_TEAL}}
                placeholder="search"
                onChangeText={(text) => this.setState({searchedWord: text})}/>
            </Item>
            }

            {!this.state.searchOpen
              &&
              <Title style={{ color: ACC_DARK_TEAL}}> Sonkine Recepty</Title>
            }

          </Body>
          <Right>
            <Button transparent onPress={this.toggleSearch.bind(this)} >
              <Icon name="search" style={{ color: ACC_DARK_TEAL}} />
            </Button>
            <Button transparent><Icon name="md-add" style={{ color: ACC_DARK_TEAL}} onPress={()=>Actions.addRec({nom:'jedlo'})} /></Button>
          </Right>

        </Header>

        <Content padder style={{ backgroundColor: ACC_CREAM}} >
          <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} />

          <Button transparent  onPress={() => this.onLoginOrRegister()}>
            <Text>hello</Text>
          </Button>

          <Picker
             mode="dropdown"
             style={{color: ACC_TEAL /*, borderBottomWidth:10, borderBottomColor: ACC_PINK*/}}
             selectedValue={this.state.selected}
             onValueChange={this.onValueChange.bind(this)}
           >
             { this.state.inventories
               .map(i =>
                      <Picker.Item key={i.key} label={i.name} value={i.key}/>
                    )
             }
           </Picker>


          <List
            dataArray={this.state.recipes.filter(rec => rec.name.toLowerCase().includes(this.state.searchedWord.toLowerCase()))}
            renderRow={data =>
              <ListItem button noBorder onPress={() => Actions.detailRec({rec: data, userID: this.state.userID}) }>
                <Left>
                  <Thumbnail
                    style={styles.stretch}
                    source={require('../../../sushi.jpg')}
                  />
                <Text style={{ color: ACC_DARK_PEACH }}>{data.name}</Text></Left>
                <Right>
                      <Badge style={{ borderRadius: 3, backgroundColor: ACC_VIO }}>
                        <Text style={{ color: ACC_CREAM }}> </Text>

                  { /*   <Text style={{ color: ACC_CREAM }}>{data.id} {data.id == 1 ? "porcia" : (data.id <= 4? "porcie" : "porcií")}</Text>*/}
                 </Badge>
                </Right>
              </ListItem>
            }
          />


        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(Header6);
