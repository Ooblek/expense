import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, AsyncStorage,TextInput,CheckBox, Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Card, CardItem,  Body, Fab, Icon, Button,  ListItem, DatePicker } from "native-base";



export default class Add extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            amount:'',
            type: 'Debit',
            reason: '',
            date: '',
            data: []
   

        }
        

      
    }

    setData = () => {
        this.state.data.push({amount: this.state.amount, type: this.state.type, reason: this.state.reason, date:this.state.date});
        this.storeData();
    }
 
    storeData = async ()=> {
            

            if(this.state.data != null){
                let str = JSON.stringify(this.state.data);

                try {
                    await AsyncStorage.setItem('data', str);
                }
                catch(error){console.log("shit's fucked")}

            }
            else{
                console.log("nothing to save");
            }
        }


    getData = async () => {
       
         try {
        const value = await AsyncStorage.getItem('data');
        if (value !== null) {
        // We have data!!
        let total = 0;
            let data = JSON.parse(value);
            for(let d of data){
                if(d.type == 'Debit'){
                    total -= d.amount;

                }
                else{
                    total += parseInt(d.amount);
                }
            }
            this.setState({total: total});

            
            this.setState({data:JSON.parse(value)});
            
        }
        else{
           
        }
    } catch (error) {
        // Error retrieving data
  }
    }

     componentDidMount(){
         this.getData();
    }


    render(){
        
        return(
            <ScrollView>
                <View style = {styles.container}>
                    <Container>
                        <Text style = {styles.textSize}>Amount: </Text>
                        <View style={{borderWidth: 1, margin: "1%"}}>
                            <TextInput keyboardType={'numeric'}  onChangeText={(text) => this.setState({amount: text})} ></TextInput>
                        </View>
                        <View style= {{margin: "-1%", marginTop: "5%"}}>
                            <ListItem>
                            <CheckBox
                                value={this.state.checked}
                                onValueChange={() => this.setState({ checked: !this.state.checked, type: "Credit" })}
                                />
                                <Body style = {{margin: "2%"}}><Text  style = {styles.textSize}>Credit</Text>
                                </Body>
                            
                            </ListItem>
                        
                        </View>
                        <View style= {{margin: "-1%", marginTop: "5%"}}>
                            <ListItem>
                                <CheckBox
                                value={!this.state.checked}
                                onValueChange={() => this.setState({ checked: !this.state.checked, type: "Debit" })}
                                />
                                
                                <Body style = {{margin: "2%"}}><Text  style = {styles.textSize}>Debit</Text>
                                </Body>
                            
                            </ListItem>
                        
                        </View>
                        
                    <Text style = {{fontSize: 18,
            fontFamily: "sans-serif-medium", marginTop: "5%"}}>Reason: </Text>
                        <View style={{borderWidth: 1, margin: "1%"}}>
                            <TextInput   onChangeText={(text) => this.setState({reason: text})} ></TextInput>
                        </View>

                        <View style = {{alignItems: "flex-start"}}>                     

                            <View style = {{margin: "2%", marginTop: "5%"}}>
                            <DatePicker
                            
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"slide"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={(date) => this.setState({date: date.toString().substr(4, 12)})}
                                disabled={false}
                                style = {{colour: "red"}}
                                
                                />
                            </View>
                        </View>


                        <View style= {{margin: "-1%", marginTop: "5%"}}>
                        
                            <Button block success onPress = {() => {if(!this.state.amount || !this.state.reason || !this.state.type || !this.state.date){Alert.alert("please fill in all the fields")} 
                                                                    else{this.setData(); 
                                                                    console.log(this.state);
                                                                    
                                                                    this.props.navigation.navigate('Home', {
                                                                        onGoBack: () => this.refresh(),
                                                                    });
                                                                    
                                                        
                                                                    
                                                                    }}}><Text style = {{fontFamily: "sans-serif-black", color: "white"}}>SUBMIT</Text></Button>
                            
                        
                        
                        </View>
            
            
                    </Container>

                
                
                
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        
        alignItems: "stretch",
        margin: "3%"
    },
    containerBut: {
        flex: 1,
        
        alignItems: "center",
        margin: 6
    },
    textSize: {
        fontSize: 18,
        fontFamily: "sans-serif-medium"
    }

});