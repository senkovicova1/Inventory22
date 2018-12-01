
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Thumbnail, Button, Icon, Left, Picker, Right, Body, Text, List, ListItem, CheckBox, Grid, Col, Badge, Form, Label, Input, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

const ACC_VIO = 'rgb(124, 90, 150)';
const ACC_CREAM = 'rgb(252, 244, 217)';
const ACC_PEACH = 'rgb(255, 184, 95)';
const ACC_DARK_PEACH = 'rgb(255, 122, 90)';
const ACC_TEAL = 'rgb(142, 210, 210)';
const ACC_DARK_TEAL = 'rgb(0, 170, 160)';

const INV = ['Jedlo z inventára Doma', 'Jedlo z inventára Záhrada','Jedlo z inventára VýletDecember2018','Jedlo z inventára Tajné'];

const ITEMS = [
  {title: 'Chlieb s maslom',
  amount: 9,
  },
  {title: 'Špeci chlebík',
  amount: 4,
  },
  {title: 'Sushi',
  amount: 3,
},
  {title: 'Hummus',
  amount: 2,
  },
  {title: 'Údený losos s ryžou a zeleninou',
  amount: 2,
},
  {title: 'Mňam bryndzové halušky',
  amount: 1,
  },
];

class Header6 extends Component {  // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      selected: "key1"
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: ACC_TEAL}}>
          <Left>
            <Button transparent  onPress={() => this.props.openDrawer()}>
              <Icon name="menu" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
          </Left>
          <Body>
              <Title style={{ color: ACC_DARK_TEAL}}> Sonkine Recepty</Title>
          </Body>
          <Right>
            <Button transparent><Icon name="search" style={{ color: ACC_DARK_TEAL}} /></Button>
            <Button transparent><Icon name="md-add" style={{ color: ACC_DARK_TEAL}} onPress={()=>Actions.addRec({nom:'jedlo'})} /></Button>
          </Right>

        </Header>

        <Content padder style={{ backgroundColor: ACC_CREAM}} >
          <Picker
             mode="dropdown"
             iosHeader="Select your SIM"
             iosIcon={<Icon name="ios-arrow-down-outline" />}
             style={{color: ACC_TEAL /*, borderBottomWidth:10, borderBottomColor: ACC_PINK*/}}
             selectedValue={this.state.selected}
             onValueChange={this.onValueChange.bind(this)}
           >
             { INV.map(i => {return(
               <Picker.Item key={i} label={i} value={i}/>
             )})
           }
           </Picker>


          <List
            dataArray={ITEMS} renderRow={data =>
              <ListItem button noBorder onPress={() => Actions.detailRec() }>
                <Left>
                  <Thumbnail
                    style={styles.stretch}
                    source={require('../../../sushi.jpg')}
                  />
                <Text style={{ color: ACC_DARK_PEACH }}>{data.title}</Text></Left>
                <Right>
                      <Badge style={{ borderRadius: 3, backgroundColor: ACC_VIO }}>
                        <Text style={{ color: ACC_CREAM }}>{data.amount} {data.amount == 1 ? "porcia" : (data.amount <= 4? "porcie" : "porcií")}</Text>
                      </Badge>
                </Right>
              </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(Header6);
