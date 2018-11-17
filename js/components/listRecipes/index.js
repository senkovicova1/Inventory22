
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, List, ListItem, CheckBox, Grid, Col, Badge, Form, Label, Input, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

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

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
              <Title> Sonkine Recepty</Title>
          </Body>
          <Right>
            <Button transparent><Icon name="search" style={{ color:"#fff" }} /></Button>
            <Button transparent><Icon name="md-add" onPress={()=>Actions.addRecipe({nom:'jedlo'})} /></Button>
          </Right>

        </Header>

        <Content padder>
          <Form>

          </Form>

          <List
            dataArray={ITEMS} renderRow={data =>
              <ListItem button noBorder onPress={() => Actions.detailRecipe() }>
                <Left><Text>{data.title}</Text></Left>
                <Right>
                  <Grid>
                    <Col>
                      <Badge info>
                        <Text>{data.amount}</Text>
                      </Badge>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                      <Icon name='md-arrow-dropright'/>
                    </Col>
                  </Grid>

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
