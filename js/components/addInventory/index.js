
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Label, Input, Text, Form, Textarea, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';


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
            <Title>New Inventory</Title>
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
