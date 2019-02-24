
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
        chosenIgredients: [],

        writtenCode: "",
        validCode: "",

        recipeIDs: [],

        selected2: undefined,

        viaCode: false,
        viaForm: false,
      };


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

    handleWrittenCode(text){
      this.setState({
        title: text,
      });
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

            <Item floatingLabeldsfsff>
               <Label style={{ color: ACC_DARK_PEACH}}>Title</Label>
               <Input style={{ color: ACC_DARK_PEACH}}/>
             </Item>

             <Card>
               <CardItem header button onPress={() => alert("This is Card Header")} style={{color: ACC_PEACH}} icenleft>
                 <Icon name='md-add' style={{color: ACC_PEACH}}/>
                 <Text style={{color: ACC_PEACH}}>Add Image</Text>
               </CardItem>
            </Card>

                <Picker
                  mode="dropdown"
                   iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined, color: ACC_DARK_PEACH }}
                  placeholder="Ďalšia ingrediencia"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2 || "Ďalšia ingrediencia"}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  {DB.map(i => {return(
                    <Picker.Item key={i} label={i} value={i} />)}
                    )}
                </Picker>


                {this.state.selected2 &&
                  <Picker
                    mode="dropdown"
                     iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: undefined, color: ACC_DARK_PEACH }}
                    placeholder="Ďalšia ingrediencia"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue="Ďalšia ingrediencia"
                    onValueChange={this.onValueChange2.bind(this)}
                  >
                    {DB.map(i => {return(
                      <Picker.Item key={i} label={i} value={i} />)}
                      )}
                  </Picker>
                }

              <Textarea rowSpan={6} bordered style={{ backgroundColor: ACC_WHITE, color: ACC_CREAM}}  placeholder="Notes" />

*/
const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(Header6);
