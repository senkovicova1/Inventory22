
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Textarea, Left, Right, Card, CardItem, Body, Text, List, ListItem, CheckBox, Grid, Col, Badge, Form, Label, Input, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

import { rebase } from '../../../index.android';

const ACC_VIO = 'rgb(124, 90, 150)';
const ACC_CREAM = 'rgb(252, 244, 217)';
const ACC_PEACH = 'rgb(255, 184, 95)';
const ACC_DARK_PEACH = 'rgb(255, 122, 90)';
const ACC_TEAL = 'rgb(142, 210, 210)';
const ACC_DARK_TEAL = 'rgb(0, 170, 160)';

const DB = [
  {name:"Basmati ryža",
    amount: "2,5kg"},
  {name:"Sushi ryža",
    amount: "800g"},
  {name:"Hl. múka",
    amount: "1kg"},
  {name:"Jablká",
    amount: "2kg"},
  {name:"Jahody",
    amount: "500g"},
  {name:"Polotovarové palacinky",
    amount: "5kg"},
  {name:"Čerstvý losos",
    amount: "200g"},
  {name:"Čokoláda",
    amount: "300g"},
  {name:"Avokádo",
    amount: "200g"},
  {name:"Ryžový ocot",
    amount: "300ml"},
  {name:"Cukor",
    amount: "1kg"},
  {name:"Soľ",
    amount: "1kg"},
  {name:"Sójovka",
  amount: "500ml"},]


class Header6 extends Component {  // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      notes: this.props.data.notes,
      key: this.props.data.key,

      editTitle: false,
      editNotes: false,

      showID: false,

      searchOpen: false,
      searchedWord: '',

      ingredients: {},
      foodInInventory: {},

      userID: 1,
    };

    this.toggleSearch.bind(this);
  }

  componentDidMount(){
      rebase.syncState(`foodInInventory/${this.state.key}`, {
        context: this,
        state: 'foodInInventory',
        withIds: true,
      });
      rebase.syncState(`ingredients`, {
        context: this,
        state: 'ingredients',
        withIds: true,
        asArray: true,
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

  submitInv(){
    rebase.update(`inventories/${this.state.key}`, {
      data: {name: this.state.name, notes: this.state.notes}
    }).then((data) =>
      this.setState({editNotes: false, editTitle: false})
    );
  }

  render() {
    console.log(this.state.foodInInventory);
    console.log("a2 " + this.state.ingredients.length);

    let FOOD = [];

    if (this.state.ingredients.length > 0){
      console.log("here");
      FOOD = this.state.ingredients.filter(ing => Object.keys(this.state.foodInInventory).includes(ing.key)).map(ing => ({key: ing.key, name: ing.name, amount: this.state.foodInInventory[ing.key]}));
    }

    return (
      <Container>
        <Header style={{ backgroundColor: ACC_TEAL}}>
          <Left>
            <Button transparent onPress={() => this.props.openDrawer()}>
              <Icon name="menu" style={{ color: ACC_DARK_TEAL}} />
            </Button>
          </Left>
          <Body>
            { (!this.state.searchOpen && !this.state.editTitle)
              &&
              <Title style={{ color: ACC_DARK_TEAL}}>{this.state.showID ? this.state.key : this.state.name}</Title>
            }
            {(this.state.searchOpen)
              &&
              <Item>
              <Input
                style={{ color: ACC_DARK_TEAL}}
                placeholder="search"
                onChangeText={(text) => this.setState({searchedWord: text})}/>
              </Item>
            }
            {(this.state.editTitle)
              &&
              <Item>
              <Input
                style={{ color: ACC_DARK_TEAL}}
                placeholder="change name"
                value={this.state.name}
                onChangeText={(text) => this.setState({name: text})}/>
              </Item>
            }
          </Body>
          <Right>
            <Button transparent onPress={() => this.setState({searchOpen: (!this.state.editTitle && !this.state.showID ? !this.state.searchOpen : false)})}>
              <Icon name="search" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
            {!this.state.editTitle
              &&
            <Button transparent onPress={() => this.setState({editTitle: (!this.state.searchOpen && !this.state.showID ? !this.state.editTitle : false)})}>
              <Icon name="md-create" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
            }
            {this.state.editTitle
              &&
            <Button transparent onPress={() => this.submitInv()}>
              <Icon name="md-checkmark" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
            }
            <Button transparent onPress={() => this.setState({showID: (!this.state.editTitle && !this.state.searchOpen ? !this.state.showID : false) })}>
              <Icon name="md-share-alt" style={{ color: ACC_DARK_TEAL}} />
            </Button>
          </Right>

        </Header>

        <Content padder style={{ backgroundColor: ACC_CREAM}}>
          <Item>
            { !this.state.editNotes
              &&
            <Text style={{ color: ACC_DARK_PEACH }}>{this.state.notes}</Text>
            }
            { this.state.editNotes
              &&
              <Textarea
                rowSpan={6}
                style={{ width: '90%', color: ACC_CREAM, backgroundColor: ACC_PEACH }}
                bordered
                placeholder="Notes"
                value={this.state.notes}
                onChangeText={(text) => this.setState({notes: text})} />
              }
            <Right>
              {
                !this.state.editNotes
                &&
                <Icon name="md-create" style={{ color: ACC_DARK_PEACH, fontSize: 20}} onPress={() => this.setState({editNotes: true})}/>
              }
              {    this.state.editNotes
                &&
                  <Icon name="md-checkmark" style={{ color: ACC_DARK_PEACH, fontSize: 20}} onPress={() => this.submitInv()}/>
              }
            </Right>
          </Item>

          <Text>{"   "}</Text>

          <Button style={{ backgroundColor: ACC_PEACH }} full onPress={()=> Actions.addIng()} >
            <Icon active name='md-add' style={{ color: ACC_DARK_PEACH, fontSize: 26}} />
          </Button>

          <List
            dataArray={FOOD.filter(ing => ing.name.toLowerCase().includes(this.state.searchedWord.toLowerCase()))} renderRow={data =>
              <ListItem noBorder>
                <Left><Text style={{ color: ACC_DARK_PEACH }}>{data.name}</Text></Left>
                <Right><Text style={{ color: ACC_DARK_PEACH }}>{data.amount}</Text></Right>
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
