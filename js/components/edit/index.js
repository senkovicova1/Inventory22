
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Label, Input, Text, List, ListItem, CheckBox, Card, CardItem, Item, Picker, Form, Textarea  } from 'native-base';
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

class EditRecipe extends Component {  // eslint-disable-line

  constructor(props) {
   super(props);
   this.state = {
     selected2: undefined,
       showID: false,
       name: this.props.name,
       key: this.props.keyy,
       body: this.props.body,
       ingredientsInRecipe: this.props.ingredients,
       userID: 1,

       ingredients: [],
       chosenIgredientsName: {},
       chosenIgredientsAmount: {},
       chosenIgredientsUnit: {},

       newIngredientName: "",
       newIngredientAmount: "",
       newIngredientUnit: "",


       searchOpen: false,

     };


     this.addNewIngredient.bind(this);
     this.fetch.bind(this);
     this.fetch();
   }

   fetch(){
     rebase.fetch(`ingredients`, {
       context: this,
       withIds: true,
       asArray: true
     }).then((ingredients) =>
         this.setState({
           ingredients,
         })
       );
   }

   submit(){
     console.log("meh");

     let ings = {};
     Object.keys(this.state.ingredientsInRecipe).map(key =>
       ings[this.state.ingredientsInRecipe[key].key] = this.state.ingredientsInRecipe[key].amount);

     rebase.update(`recipes/${this.state.key}`, {
       data: {name: this.state.name, body: this.state.body, ingredients: ings}
     });

  //   Actions.goBack();
   }

   addNewIngredient(){
     if (this.state.newIngredientName.length > 0
     && this.state.newIngredientUnit.length > 0
     && this.state.newIngredientAmount.length > 0){
       let key = this.state.ingredients.filter(ing => ing.name === this.state.newIngredientName)[0].key;
       let object = {key: key, name: this.state.newIngredientName, amount: this.state.newIngredientAmount + " " + this.state.newIngredientUnit};
       let newIngredientsInRecipe = {...this.state.ingredientsInRecipe};
       newIngredientsInRecipe[newIngredientsInRecipe.length] = object,
         this.setState({
           ingredientsInRecipe: newIngredientsInRecipe,

           newIngredientName: "",
           newIngredientUnit: "",
           newIngredientAmount: "",
         });
     }
   }

   removeIngredient(key){
     let newIngredientsInRecipe = {...this.state.ingredientsInRecipe};
     delete newIngredientsInRecipe[key];
       this.setState({
         ingredientsInRecipe: newIngredientsInRecipe,
       });

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
           <Title style={{ color: ACC_DARK_TEAL}}>Edit Recipe</Title>
         </Body>
         <Right>
           <Button transparent><Icon name="md-checkmark"  style={{ color: ACC_DARK_TEAL}} onPress={()=> this.submit()} /></Button>

       </Right>

       </Header>

       <Content style={{ backgroundColor: ACC_CREAM}} >

           <Form>
             <Item>
               <Input
                 style={{ backgroundColor: ACC_WHITE, color: ACC_PEACH}}
                 placeholder="Enter name"
                 value={this.state.name}
                 onChangeText={(text) => this.setState({name: text})}/>
             </Item>


             {
               Object.keys(this.state.ingredientsInRecipe).map(key =>
                 <Item>
                   <Picker
                     mode="dropdown"
                     style={{ width: "50%", color: ACC_DARK_PEACH }}
                     selectedValue={this.state.ingredientsInRecipe[key].name}
                     onValueChange={(itemValue, itemIndex) => {
                                     let newIngredientsInRecipe = {...this.state.ingredientsInRecipe};
                                     newIngredientsInRecipe[key].name = itemValue;
                                     this.setState({
                                        ingredientsInRecipe: newIngredientsInRecipe,
                                      });
                                    }
                     }>
                       {PICKER_ITEMS}
                     </Picker>
                     <Input
                       style={{ width: '5%', backgroundColor: ACC_TEAL, color: ACC_PEACH}}
                       value={this.state.ingredientsInRecipe[key].amount.substring(0, this.state.ingredientsInRecipe[key].amount.indexOf(" "))}
                       placeholder=""
                       onChangeText={(text) =>{
                             let newIngredientsInRecipe = {...this.state.ingredientsInRecipe};
                             let newValue = text + " " + this.state.ingredientsInRecipe[key].amount.substring(this.state.ingredientsInRecipe[key].amount.indexOf(" ")+1);
                             newIngredientsInRecipe[key].amount = newValue;
                             this.setState({
                               ingredientsInRecipe: newIngredientsInRecipe,
                             });
                         }
                       }/>

                     <Picker
                        mode="dropdown"
                        style={{width: '25%', color: ACC_TEAL }}
                        selectedValue={this.state.ingredientsInRecipe[key].amount.substring(this.state.ingredientsInRecipe[key].amount.indexOf(" ")+1)}
                        onValueChange={(itemValue, itemIndex) =>{
                                        let newIngredientsInRecipe = {...this.state.ingredientsInRecipe};
                                        let newValue = this.state.ingredientsInRecipe[key].amount.substring(0, this.state.ingredientsInRecipe[key].amount.indexOf(" ")) + " " + itemValue;
                                        newIngredientsInRecipe[key].amount = newValue;
                                         this.setState({
                                           ingredientsInRecipe: newIngredientsInRecipe,
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
                   <Textarea
                     rowSpan={5}
                     bordered
                     placeholder="Steps"
                     onChangeText={(text) => this.setState({body: text})}
                     value={this.state.body}/>


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

export default connect(mapStateToProps, bindAction)(EditRecipe);
