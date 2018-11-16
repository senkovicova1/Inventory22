
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables } from 'native-base';
import { Actions } from 'react-native-router-flux';

import material from '../../../native-base-theme/variables/material';
import { changePlatform, changeMaterial, closeDrawer } from '../../redux/actions/drawer';
import styles from './style';

const ITEMS = ['Items', 'Recipes','Dogshits','Inventars','Asettings'];

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      showShit:false
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
          <ListItem button noBorder onPress={() => {this.setState( {showShit:!this.state.showShit}) }} >
            <Left>
              <Icon active name='star' style={{ color: '#777', fontSize: 26, width: 30 }} />
              <Text style={styles.text}>Shows shit</Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <Badge
                style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: 'blue' }}
              >
                <Text style={styles.badgeText}>Baaadž</Text>
              </Badge>
            </Right>
          </ListItem>
        {
          this.state.showShit &&
          <List
            dataArray={ITEMS} renderRow={data =>
              <ListItem button noBorder onPress={()=>{Actions.edit();this.props.closeDrawer();}}>
                <Left>
                  <Icon active name='heart' style={{ color: '#777', fontSize: 26, width: 30 }} />
                  <Text style={styles.text}>{data}</Text>
                </Left>
              </ListItem>}
          />}

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
