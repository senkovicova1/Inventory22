
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Label, Input, Text, List, ListItem, CheckBox, Card, CardItem, Item, Picker, Form, Textarea } from 'native-base';
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
const ACC_WHITE= 'rgb(255, 255, 255)';

/*
hexString = yourNumber.toString(16).toUpperCase();
yourNumber = parseInt(hexString, 16);
*/

class Header6 extends Component {  // eslint-disable-line
  constructor(props) {
      super(props);
      this.state = {
        userID: 1,

        title: "",
        body: "",
        ingredients: [],
        chosenIgredientsName: {},
        chosenIgredientsAmount: {},
        chosenIgredientsUnit: {},

        newIngredientName: "",
        newIngredientAmount: "",
        newIngredientUnit: "",

        writtenCode: "",
        validCode: "",

        recipeIDs: [],

        selected2: undefined,

        searchOpen: false,

        viaCode: false,
        viaForm: false,
      };

  //    this.toggleSearch.bind(this);

      this.addNewIngredient.bind(this);
      this.handleWrittenCode.bind(this);
      this.handleTitle.bind(this);
      this.toggleCode.bind(this),
      this.toggleForm.bind(this),
      this.fetch.bind(this);
      this.fetch();
    }

    fetch(){
      rebase.fetch(`ingredients`, {
        context: this,
        withIds: true,
        asArray: true
      }).then((ingredients) => {
        rebase.fetch(`recipes`, {
          context: this,
          withIds: true,
          asArray: true
        }).then((rec) => {
          this.setState({
            ingredients,
            recipeIDs: rec.map(recipe => recipe.key)
          })
        });
      });
    }

    submit(){
      console.log("meh");
      let id = Date.now().toString(16).toUpperCase();

      if (this.state.validCode){
        rebase.post(`recipeAccess/${id}`, {
          data: {userID: this.state.userID, recID: this.state.writtenCode}
        }).then(newLocation => {
        });
      }
      Actions.listRec();
    }

    toggleCode(){
      console.log("ugh");
      this.setState({
        viaCode: !this.state.viaCode,
      })
    }

    toggleForm(){
      console.log("ugha");
      this.setState({
        viaForm: !this.state.viaForm,
      })
    }

    onValueChange2(value: string) {
      this.setState({
        selected2: value
      });
    }

    handleWrittenCode(text){
      if (this.state.recipeIDs.includes(text)){
        this.setState({
          validCode: true,
          writtenCode: text,
        });
      } else {
        this.setState({
          validCode: false,
          writtenCode: text,
        });
      }
    }

    handleTitle(text){
      this.setState({
        title: text,
      });
    }

    toggleSearch(){
      this.setState({
        searchOpen: !this.state.searchOpen,
      });
    }

    addNewIngredient(){
      if (this.state.newIngredientName !== ""
      && this.state.newIngredientUnit !== ""
      && this.state.newIngredientAmount !== ""){
          let index = this.state.ingredients.filter(ing => ing.name === this.state.newIngredientName)[0].key;

          let newChosenIingredientsName = {...this.state.chosenIgredientsName};
          newChosenIingredientsName[index] = this.state.newIngredientName;

          let newChosenIingredientsUnit = {...this.state.chosenIgredientsUnit};
          newChosenIingredientsUnit[index] = this.state.newIngredientUnit;

          let newChosenIingredientsAmount = {...this.state.chosenIgredientsAmount};
          newChosenIingredientsAmount[index] = this.state.newIngredientAmount;

          this.setState({
            chosenIgredientsName: newChosenIingredientsName,
            chosenIgredientsUnit: newChosenIingredientsUnit,
            chosenIgredientsAmount: newChosenIingredientsAmount,

            newIngredientName: "",
            newIngredientUnit: "",
            newIngredientAmount: "",
          });
      }
    }

  render() {
      const PICKER_ITEMS = this.state.ingredients.map(ingredient =>
            <Picker.Item key={ingredient.key} label={ingredient.name} value={ingredient.name} />
        );
       PICKER_ITEMS.unshift(<Picker.Item key="0" label="" value=""/>);

    return (
      <Container>
        <Header style={{ backgroundColor: ACC_TEAL}}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-close" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: ACC_DARK_TEAL}}>New Recipe</Title>
          </Body>
          <Right>
            {
              (this.state.validCode || this.state.title !== "")
              &&
            <Button transparent><Icon name="md-checkmark"  style={{ color: ACC_DARK_TEAL}} onPress={()=> this.submit()} /></Button>
            }
        </Right>

        </Header>

        <Content style={{ backgroundColor: ACC_CREAM}} >

          <Button block style={{ backgroundColor: ACC_PEACH}} onPress={this.toggleCode.bind(this)}>
              <Text style={{ color: ACC_DARK_PEACH}}>Add Existing</Text>
          </Button>

          {
            this.state.viaCode && !this.state.validCode
            &&
            <Item>
              <Input
                style={{ backgroundColor: ACC_WHITE, color: ACC_PEACH}}
                placeholder="add recipe code"
                onChangeText={(text) => this.handleWrittenCode(text)}/>
            </Item>
          }


          <Button block style={{ backgroundColor: ACC_PEACH}} onPress={this.toggleForm.bind(this)}>
              <Text style={{ color: ACC_DARK_PEACH}}>Create New</Text>
          </Button>

          {
            this.state.viaForm
            &&
            <Form>
              <Item>
                <Input
                  style={{ backgroundColor: ACC_WHITE, color: ACC_PEACH}}
                  placeholder="Enter name"
                  onChangeText={(text) => this.handleTitle(text)}/>
              </Item>


              {
                Object.keys(this.state.chosenIgredientsName).map(key =>
                  <Item>
                    <Picker
                      mode="dropdown"
                      style={{ width: "50%", color: ACC_DARK_PEACH }}
                      selectedValue={this.state.chosenIgredientsName[key]}
                      onValueChange={(itemValue, itemIndex) => {
                                      console.log("1");
                                      let newChosenIingredientsName = {...this.state.chosenIgredientsName};
                                      console.log("2");
                                      newChosenIingredientsName[key] = itemValue;
                                      console.log("3");
                                      this.setState({
                                         chosenIgredientsName: newChosenIingredientsName,
                                       });
                                     }
                      }>
                        {PICKER_ITEMS}
                      </Picker>
                      <Input
                        style={{ width: '5%', backgroundColor: ACC_TEAL, color: ACC_PEACH}}
                        value={this.state.chosenIgredientsAmount[key]}
                        placeholder=""
                        onChangeText={(text) =>{
                              let newChosenIingredientsAmount = {...this.state.chosenIgredientsAmount};
                              newChosenIingredientsAmount[key] = text;
                              this.setState({
                                chosenIgredientsAmount: newChosenIgredientsAmount,
                              });
                          }
                        }/>

                      <Picker
                         mode="dropdown"
                         style={{width: '25%', color: ACC_TEAL }}
                         selectedValue={this.state.chosenIgredientsUnit[key]}
                         onValueChange={(itemValue, itemIndex) =>{
                                         let newChosenIingredientsUnitt = {...this.state.chosenIgredientsUnit};
                                         newChosenIingredientsUnitt[key] = itemValue;
                                          this.setState({
                                            chosenIgredientsUnit: newChosenIingredientsUnit,
                                          });
                                        }
                      }>
                        <Picker.Item key="0" label="" value=""/>

                        <Picker.Item key="1" label="ml" value="ml"/>
                        <Picker.Item key="2" label="dcl" value="dcl"/>
                        <Picker.Item key="3" label="l" value="l"/>

                        <Picker.Item key="4" label="g" value="g"/>
                        <Picker.Item key="4" label="dkg" value="dkg"/>
                        <Picker.Item key="5" label="kg" value="kg"/>

                        <Picker.Item key="6" label="pcs" value="pcs"/>

                        <Picker.Item key="7" label="tsp" value="tsp"/>
                        <Picker.Item key="8" label="tbsp" value="tbsp"/>

                        <Picker.Item key="9" label="cup" value="cup"/>
                       </Picker>

                        <Icon name='md-remove-circle' style={{color: ACC_DARK_PEACH}} onPress={() => this.removeIngredient(key)}/>

                  </Item>
                )}


                  <Item>
                    <Picker
                      mode="dropdown"
                      style={{ width: "50%", color: ACC_DARK_PEACH }}
                      selectedValue={this.state.newIngredientName}
                      onValueChange={(itemValue, itemIndex) =>
                                        this.setState({
                                          newIngredientName: itemValue
                                        })
                      }>
                          {PICKER_ITEMS}
                      </Picker>

                      <Input
                        style={{ width: '5%', backgroundColor: ACC_TEAL, color: ACC_PEACH}}
                        value={this.state.newIgredientAmount}
                        onChangeText={(text) =>
                          this.setState({
                            newIngredientAmount: text
                          })
                        }/>

                      <Picker
                         mode="dropdown"
                         style={{width: '25%', color: ACC_TEAL /*, borderBottomWidth:10, borderBottomColor: ACC_PINK*/}}
                         selectedValue={this.state.newIngredientUnit}
                         onValueChange={(itemValue, itemIndex) =>
                                          this.setState({
                                            newIngredientUnit: itemValue
                                          })
                      }>
                        <Picker.Item key="0" label="" value=""/>

                        <Picker.Item key="1" label="ml" value="ml"/>
                        <Picker.Item key="2" label="dcl" value="dcl"/>
                        <Picker.Item key="3" label="l" value="l"/>

                        <Picker.Item key="4" label="g" value="g"/>
                        <Picker.Item key="4" label="dkg" value="dkg"/>
                        <Picker.Item key="5" label="kg" value="kg"/>

                        <Picker.Item key="6" label="pcs" value="pcs"/>

                        <Picker.Item key="7" label="tsp" value="tsp"/>
                        <Picker.Item key="8" label="tbsp" value="tbsp"/>

                        <Picker.Item key="9" label="cup" value="cup"/>
                       </Picker>

                      <Icon name='md-add' style={{color: ACC_DARK_PEACH}} onPress={this.addNewIngredient.bind(this)}/>

                  </Item>

            </Form>
          }


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
/*

*/
const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(Header6);
