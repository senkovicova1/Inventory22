
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Label, Input, Text, Form, Textarea, Item } from 'native-base';
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

class AddInventory extends Component {  // eslint-disable-line
  constructor(props) {
      super(props);
      this.state = {
        title: "",
        notes: "",
        userID: 1,
      };
      this.submit.bind(this);
    }

  submit(){
    let id = Date.now().toString(16).toUpperCase();

    rebase.post(`inventories/${id}`, {
      data: {name: this.state.title, notes: this.state.notes}
    }).then(newLocation => {
      rebase.post(`inventoryAccess/${id}`, {
        data: {invID: id, userID: this.state.userID}
      });
    });

    Actions.listInv();
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: ACC_TEAL}}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-close" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: ACC_DARK_TEAL}}>Add Inventory</Title>
          </Body>
          <Right>
            { (this.state.title.length > 0)
              &&
            <Button transparent><Icon name="md-checkmark" style={{ color: ACC_DARK_TEAL}} onPress={()=> this.submit()} /></Button>
            }
        </Right>
        </Header>

        <Content padder style={{ backgroundColor: ACC_CREAM}} >

               <Label style={{ color: ACC_DARK_PEACH }}>Title</Label>
               <Input
                 style={{ color: ACC_DARK_PEACH }}
                 value={this.state.title}
                 onChangeText={(text) => this.setState({title: text})}/>


               <Label style={{ color: ACC_DARK_PEACH }}>Notes</Label>
               <Textarea
                 rowSpan={6}
                 style={{ color: ACC_CREAM, backgroundColor: ACC_PEACH }}
                 bordered
                 placeholder="Notes"
                 value={this.state.notes}
                 onChangeText={(text) => this.setState({notes: text})} />


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

export default connect(mapStateToProps, bindAction)(AddInventory);
