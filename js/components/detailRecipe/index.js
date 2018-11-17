
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, List, ListItem, CheckBox, Card, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

const ITEMS = [
  {name:"Sushi ryža",
  amount:"200g"},
  {name:"Čerstvý losos",
  amount:"100g"},
  {name:"Avokádo",
  amount:"50g"},
  {name:"Ryžový ocot",
  amount:"30ml"},
  {name:"Cukor",
  amount:"5g"},
  {name:"Soľ",
  amount:"5g"},
  {name:"Sójovka",
  amount:"--"},
]

class Header6 extends Component {  // eslint-disable-line

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Sushi</Title>
          </Body>
          <Right>
            <Button transparent><Icon name="md-create" onPress={()=>Actions.edit({nom:'jedlo'})} /></Button>
            <Button transparent><Icon name="md-trash" /></Button>
          </Right>

        </Header>

        <Content padder>
          <Card>
         {
           ITEMS.map(item => {return (
             <CardItem key={item.name}>
                 <Text>{item.name}</Text>
              <Right>

                  <Button transparent><Text>{item.amount + "   "} </Text><Icon name="md-remove-circle" /></Button>
              </Right>
            </CardItem>)
           })
        }
            <CardItem>
                <Text>Ryžu dajte doryžovarky a uvarte podľa návodu. Medzitým do hrnčeka nalejte ryžový ocot so soľou a cukrom a nechajte zovrieť. Cukor aj soľ by mali byť úplne rozspustené. Keď je ryža hotová, zmiešajte ju s prevareným octom a nechajte vychladnúť. Potom zrolujte sushi podľa youtube návodov.</Text>
            </CardItem>
            <CardItem>
                <Text> DO NOT FORGET: Sonka má rada menšie kúsky, Theri väčšie. </Text>
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(Header6);
