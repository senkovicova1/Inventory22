
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Label, Input, Text, List, ListItem, CheckBox, Card, CardItem, Item, Picker, Form, Textarea  } from 'native-base';
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

const DB = ["---","Basmati ryža","Sushi ryža", "Hl. múka", "Jablká", "Jahody", "Polotovarové palacinky", "Čerstvý losos", "Čokoláda", "Avokádo", "Ryžový ocot", "Cukor", "Soľ", "Sójovka"]

class Header6 extends Component {  // eslint-disable-line

  constructor(props) {
   super(props);
   this.state = {
     selected2: undefined
   };
 }
 onValueChange2(value: string) {
   this.setState({
     selected2: value
   });
 }

  render() {
    console.log(this.props);
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
            <Button transparent><Icon name="md-checkmark" onPress={()=>Actions.pop()} /></Button>
          </Right>

        </Header>

        <Content>

          <Form>
                 {
                   ITEMS.map(item => {return (
                       <Picker
                         mode="dropdown"
                         iosIcon={<Icon name="ios-arrow-down-outline" />}
                         style={{ width: undefined }}
                         placeholder="Select your SIM"
                         placeholderStyle={{ color: "#bfc6ea" }}
                         placeholderIconColor="#007aff"
                         selectedValue={item.name}
                         onValueChange={this.onValueChange2.bind(this)}
                       >
                        {DB.map(i => {return(
                          <Picker.Item key={i} label={i} value={i} />)}
                          )}
                       </Picker>
                       )
                     })
                    }
                    <Picker
                      mode="dropdown"
                       iosIcon={<Icon name="ios-arrow-down-outline" />}
                      style={{ width: undefined }}
                      placeholder="Ďalšia ingrediencia"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue="Ďalšia ingrediencia"
                      onValueChange={this.onValueChange2.bind(this)}
                    >
                      {DB.map(i => {return(
                        <Picker.Item key={i} label={i} value={i} />)}
                        )}
                    </Picker>

                  <Textarea rowSpan={6} bordered placeholder="Ryžu dajte doryžovarky a uvarte podľa návodu. Medzitým do hrnčeka nalejte ryžový ocot so soľou a cukrom a nechajte zovrieť. Cukor aj soľ by mali byť úplne rozspustené. Keď je ryža hotová, zmiešajte ju s prevareným octom a nechajte vychladnúť. Potom zrolujte sushi podľa youtube návodov.

                   DO NOT FORGET: Sonka má rada menšie kúsky, Theri väčšie." />
            </Form>
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
