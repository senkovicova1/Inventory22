
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Thumbnail, Picker, Content, Button, Icon, Left, Right, Body, Text, List, ListItem, CheckBox, Card, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import styles from './styles';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

import { rebase } from '../../../index.android';

const ACC_VIO = 'rgb(124, 90, 150)';
const ACC_CREAM = 'rgb(252, 244, 217)';
const ACC_PEACH = 'rgb(255, 184, 95)';
const ACC_DARK_PEACH = 'rgb(255, 122, 90)';
const ACC_TEAL = 'rgb(142, 210, 210)';
const ACC_DARK_TEAL = 'rgb(0, 170, 160)';


class DetailRecipe extends Component {  // eslint-disable-line

  constructor(props) {
      super(props);
      this.state = {
        showID: false,
        name: this.props.rec.name,
        key: this.props.rec.key,
        body: this.props.rec.body,
        ingredients: this.props.rec.ingredients,
      };

      rebase.fetch(`ingredients`, {
          context: this,
          withIds: true,
          asArray: true,
        }).then((ings) => {
          let actualIngs = Object.keys(this.state.ingredients).map(key => {
            let name = ings.filter(ingredient => ingredient.key === key.toString()).map(ingredient => ingredient.name)[0];
            return ({name, amount: this.state.ingredients[key], key: key.toString()});
          });
          this.setState({
            ingredients: actualIngs,
          })
        });
    }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: ACC_TEAL}}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: ACC_DARK_TEAL}} >{this.state.showID ? this.state.key : this.state.name}</Title>

          </Body>
          <Right>
            <Button transparent><Icon name="md-share-alt" style={{ color: ACC_DARK_TEAL}} onPress={() => this.setState({showID: !this.state.showID })}/><Text></Text></Button>
            <Button transparent><Icon name="md-create" style={{ color: ACC_DARK_TEAL}} onPress={()=> Actions.editRec({name: this.state.name, keyy: this.state.key, body: this.state.name, ingredients: this.state.ingredients})}/><Text></Text></Button>
          </Right>

        </Header>

        <Content padder style={{ backgroundColor: ACC_CREAM}}>

         <List>
            <ListItem noBorder key="obr">
              <Image
                  style={styles.stretch}
                  source={require('../../../sushi.jpg')}
                />
            </ListItem>
         {
           Object.keys(this.state.ingredients)
           .map(item =>
             <ListItem noBorder key={this.state.ingredients[item].key}>
                   <Left>
                   <Thumbnail
                     style={styles.thumbnl}
                     source={require('../../../sushi.jpg')}
                   />
                 <Text style={{ color: ACC_DARK_PEACH}}>{this.state.ingredients[item].name}</Text>
                     </Left>
                  <Right>
                      <Button transparent><Text style={{ color: ACC_DARK_PEACH }}>{this.state.ingredients[item].amount + "   "} </Text>
                      <Icon name="md-remove-circle" style={{ color: ACC_PEACH }}/></Button>
                  </Right>
                </ListItem>)
        }

        <ListItem>
          <Right>
            <Button transparent><Text style={{ color: ACC_DARK_PEACH }}> Odobrať všetky </Text><Icon name="md-remove-circle" style={{ color: ACC_DARK_PEACH}}/></Button>
          </Right>
          </ListItem>

            <ListItem>
                <Text style={{ color: ACC_DARK_PEACH }}> {this.state.body}</Text>
            </ListItem>
         </List>
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

export default connect(mapStateToProps, bindAction)(DetailRecipe);
