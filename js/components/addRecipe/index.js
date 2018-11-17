
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Label, Input, Text, List, ListItem, CheckBox, Card, CardItem, Item, Picker, Form, Textarea } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

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
              <Icon name="md-close" />
            </Button>
          </Left>
          <Body>
            <Title>New Recipe</Title>
          </Body>
          <Right>
            <Button transparent><Icon name="md-checkmark" onPress={()=>Actions.pop()} /></Button>
          </Right>

        </Header>

        <Content>

          <Form>
            <Item floatingLabel>
               <Label>Title</Label>
               <Input />
             </Item>
                <Picker
                  mode="dropdown"
                   iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  placeholder="Ďalšia ingrediencia"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2 || "Ďalšia ingrediencia"}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  {DB.map(i => {return(
                    <Picker.Item key={i} label={i} value={i} />)}
                    )}
                </Picker>

                {this.state.selected2 &&
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
                }

              <Textarea rowSpan={6} bordered placeholder="Notes" />
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
