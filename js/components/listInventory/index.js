
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Card, CardItem, Body, Text, List, ListItem, CheckBox, Grid, Col, Badge, Form, Label, Input, Item } from 'native-base';
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

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: ACC_TEAL}}>
          <Left>
            <Button transparent onPress={() => this.props.openDrawer()}>
              <Icon name="menu" style={{ color: ACC_DARK_TEAL}} />
            </Button>
          </Left>
          <Body>
              <Title style={{ color: ACC_DARK_TEAL}}>Doma</Title>
          </Body>
          <Right>
            <Button transparent><Icon name="search" style={{ color: ACC_DARK_TEAL}}/></Button>
            <Button transparent><Icon name="md-create" style={{ color: ACC_DARK_TEAL}}/></Button>
          </Right>

        </Header>

        <Content padder style={{ backgroundColor: ACC_CREAM}}>
          <Button transparent onPress={()=>Actions.editInv({nom:'jedlo'})} >
            <Text style={{ color: ACC_DARK_PEACH }}>Sonkin domáci inventár</Text>
            <Right>
              <Icon name="md-create" style={{ color: ACC_DARK_PEACH, fontSize: 20}} />
            </Right>
          </Button>
          <Button style={{ backgroundColor: ACC_PEACH }} full onPress={()=> Actions.addInv()} >
            <Icon active name='md-add' style={{ color: ACC_DARK_PEACH, fontSize: 26}} />
          </Button>
          <List
            dataArray={DB} renderRow={data =>
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
