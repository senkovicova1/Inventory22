
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, Container, Thumbnail, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables } from 'native-base';
import { Actions } from 'react-native-router-flux';

import material from '../../../native-base-theme/variables/material';
import { changePlatform, changeMaterial, closeDrawer } from '../../redux/actions/drawer';
import styles from './style';

import { rebase } from '../../../index.android';

const ITEMS = ['Doma', 'Záhrada','VýletDecember2018','Tajné'];

const ACC_VIO = 'rgb(69, 41, 92)';
const ACC_PEACH = 'rgb(255, 184, 95)';
const ACC_DARK_PEACH = 'rgb(255, 122, 90)';
const ACC_TEAL = 'rgb(142, 210, 210)';
const ACC_DARK_TEAL = 'rgb(0, 170, 160)';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      showStuff: false,

      inventories: [],

      userID: 1,
    };
  }

  this.fetch.bind(this);
  this.fetch();
  }

  fetch(){
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
      let accessGranted = invAcc.filter(inventoryAcc => inventoryAcc.userID === this.state.userID);
      this.setState({
        inventories: accessGranted,
      })
    });
  });
  }


  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: ACC_VIO, top: -1 }}
        >
        <List>
          <ListItem button noBorder onPress={() => { Actions.listRec(); this.props.closeDrawer();}} >
            <Left>
              <Icon active name='md-book' style={styles.sidebarIcon} />
              <Text style={styles.text}>Recepty</Text>
            </Left>
            <Right style={{ flex: 1 }}>
            </Right>
          </ListItem>


            <ListItem button noBorder onPress={() => {this.setState( {showStuff:!this.state.showStuff}) }} >
              <Left>
                <Icon active name='md-basket' style={styles.sidebarIcon} />
                <Text style={styles.text}>Inventáre</Text>
              </Left>
              <Right style={{ flex: 1 }}>
                <Badge
                  style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: ACC_TEAL }}
                >
                  <Text style={{fontSize: (Platform.OS === 'ios') ? 13 : 11, textAlign: 'center', marginTop: (Platform.OS === 'android') ? -3 : undefined, color: ACC_VIO}}>Zmenené</Text>
                </Badge>
              </Right>
            </ListItem>
          {
            this.state.showStuff &&
              <List
              dataArray={this.state.inventories} renderRow={data =>
                <ListItem button noBorder  onPress={()=>{ Actions.listInv({data}); this.props.closeDrawer();}}>
                  <Left>
                    <Thumbnail
                      style={styles.stretch}
                      source={require('../../../sushi.jpg')}
                    />
                  <Text style={{ color: ACC_DARK_PEACH }}>{data.name}</Text>
                  </Left>
                </ListItem> } />
              }

              {
                this.state.showStuff &&
                    <Button block style={{ backgroundColor: ACC_PEACH }}  onPress={()=>{ Actions.addInv(); this.props.closeDrawer();}} >
                     <Icon active name='md-add' style={{ color: ACC_VIO, fontSize: 26}} />
                    </Button>
              }

              <ListItem  noBorder >
              </ListItem>

            <ListItem button noBorder onPress={()=>{ Actions.editRec(); this.props.closeDrawer();}} >
              <Left>
                <Icon active name='md-settings' style={styles.sidebarIcon} />
                <Text style={styles.text}>Nastavenia</Text>
              </Left>
              <Right style={{ flex: 1 }}>
              </Right>
            </ListItem>


        </List>

        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    changePlatform: () => dispatch(changePlatform()),
    changeMaterial: () => dispatch(changeMaterial()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(SideBar);
