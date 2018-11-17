
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables } from 'native-base';
import { Actions } from 'react-native-router-flux';

import material from '../../../native-base-theme/variables/material';
import { changePlatform, changeMaterial, closeDrawer } from '../../redux/actions/drawer';
import styles from './style';

const ITEMS = ['Doma', 'Záhrada','VýletDecember2018','Tajné'];

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      showStuff:false
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
        <List>
          <ListItem button noBorder onPress={() => { Actions.listRecipes(); this.props.closeDrawer();}} >
            <Left>
              <Icon active name='md-book' style={{ color: '#777', fontSize: 26, width: 30 }} />
              <Text style={styles.text}>Recepty</Text>
            </Left>
            <Right style={{ flex: 1 }}>
            </Right>
          </ListItem>


            <ListItem button noBorder onPress={() => {this.setState( {showStuff:!this.state.showStuff}) }} >
              <Left>
                <Icon active name='md-basket' style={{ color: '#777', fontSize: 26, width: 30 }} />
                <Text style={styles.text}>Inventáre</Text>
              </Left>
              <Right style={{ flex: 1 }}>
                <Badge
                  style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: 'blue' }}
                >
                  <Text style={styles.badgeText}>Zmenené</Text>
                </Badge>
              </Right>
            </ListItem>
          {
            this.state.showStuff &&
              <List
              dataArray={ITEMS} renderRow={data =>
                <ListItem button noBorder onPress={()=>{ Actions.edit(); this.props.closeDrawer();}}>
                  <Left>
                    <Icon active name='md-cafe' style={{ color: '#777', fontSize: 26, width: 30 }} />
                    <Text style={styles.text}>{data}</Text>
                  </Left>
                </ListItem> } />
              }

              {
                this.state.showStuff &&

                    <ListItem button noBorder onPress={()=>{ Actions.edit(); this.props.closeDrawer();}}>
                      <Left>
                        <Icon active name='md-cafe' style={{ color: '#777', fontSize: 26, width: 30 }} />
                        <Text style={styles.text}>Batoh</Text>
                      </Left>
                      <Right style={{ flex: 1 }}>
                        <Badge
                          style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: 'blue' }}
                        >
                          <Text style={styles.badgeText}>Zmenené</Text>
                        </Badge>
                      </Right>
                    </ListItem>
                  }

              {
                this.state.showStuff &&
                    <Button info block onPress={()=>{ Actions.addInventory(); this.props.closeDrawer();}} >
                     <Icon active name='md-add' style={{ color: '#fff', fontSize: 26}} />
                    </Button>
              }

              <ListItem  noBorder >
              </ListItem>

            <ListItem button noBorder onPress={()=>{ Actions.edit(); this.props.closeDrawer();}} >
              <Left>
                <Icon active name='md-book' style={{ color: '#777', fontSize: 26, width: 30 }} />
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
