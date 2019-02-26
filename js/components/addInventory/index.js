
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Label, Input, Text, Form, Textarea, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

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
        selected2: undefined

        title: "",
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
        <Header style={{ backgroundColor: ACC_TEAL}}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-close" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: ACC_DARK_TEAL}}>New Inventory</Title>
          </Body>
          <Right>
            { this.state.title
              &&
            <Button transparent><Icon name="md-checkmark" style={{ color: ACC_DARK_TEAL}} onPress={()=>Actions.pop()} /></Button>
            }
        </Right>
        </Header>

        <Content padder style={{ backgroundColor: ACC_CREAM}} >

            <Item>
               <Label style={{ color: ACC_DARK_PEACH }}>Title</Label>
               <Input style={{ color: ACC_DARK_PEACH }}/>
             </Item>

             <Item>
               <Label style={{ color: ACC_DARK_PEACH }}>Notes</Label>
               <Textarea rowSpan={6} style={{ color: ACC_CREAM, backgroundColor: ACC_PEACH }} bordered placeholder="Notes" />
             </Item>

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
