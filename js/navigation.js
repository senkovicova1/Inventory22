
import React, { Component } from 'react';
import { BackAndroid, NavigationExperimental, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StyleProvider, variables, Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { Router, Scene } from 'react-native-router-flux';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { closeDrawer } from './redux/actions';

import ListRecipes from './components/listRecipes';
import ListInventory from './components/listInventory';
import Edit from './components/edit';
import AddRecipe from './components/addRecipe';
import DetailRecipe from './components/detailRecipe';

import AddInventory from './components/addInventory';
import EditInventory from './components/editInventory';

import Sidebar from './components/sidebar';

const {
  popRoute,
} = actions;

const RouterWithRedux = connect()(Router);

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme((this.props.themeState === 'material') ? material : undefined)}>
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<Sidebar navigator={this._navigator} />}
          onClose={() => this.closeDrawer()}
        >
          <RouterWithRedux>
            <Scene key="root">
             <Scene key="list" component={ListRecipes} />
              <Scene key="listInv" component={ListInventory}  hideNavBar initial={true} />
              <Scene key="edit" component={Edit}/>
              <Scene key="add" component={AddRecipe}/>
              <Scene key="detail" component={DetailRecipe}  />
              <Scene key="addInv" component={AddInventory} />
              <Scene key="editInv" component={EditInventory} />
            </Scene>
          </RouterWithRedux>
        </Drawer>
      </StyleProvider>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  themeState: state.drawer.themeState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
