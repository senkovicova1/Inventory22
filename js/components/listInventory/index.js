
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, List, ListItem, CheckBox, Grid, Col, Badge, Form, Label, Input, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

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
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
              <Title>Doma</Title>
          </Body>
          <Right>
            <Button transparent><Icon name="search" style={{ color:"#fff" }} /></Button>
            <Button transparent><Icon name="md-create" onPress={()=>Actions.editInventory({nom:'jedlo'})} /></Button>
          </Right>

        </Header>

        <Content padder>
          <Text>Sonkin domáci inventár</Text>
          <Text></Text>
          <Button info block onPress={()=> Actions.addInventory()} >
            <Icon active name='md-add' style={{ color: '#fff', fontSize: 26}} />
          </Button>
          <List
            dataArray={DB} renderRow={data =>
              <ListItem button noBorder onPress={() => Actions.detailRecipe() }>
                <Left><Text>{data.name}</Text></Left>
                <Right><Text>{data.amount}</Text></Right>
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
