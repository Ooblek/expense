import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, AsyncStorage, Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Card, CardItem,  Body, Fab, Icon, Button } from "native-base";
import { withNavigation,NavigationEvents  } from 'react-navigation';



class Home extends React.Component {
   


    constructor(props){
        super(props);
        this.state = {
            data: [],
            total : '',
            date: '',
        }

      

                    

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

        }
    }

    getData = async () => {
        let sample = [{type: 'NO'},
                        {amount: 'DATA'},
                    {reason: "AVAILABLE"}];
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

         this.props.navigation.addListener(
          'didFocus',
          payload => {
            this.forceUpdate();
          }
        );
    }

    refresh = ()=> {
      this.getData();

    }

    
    

    
         

  

    render(){
          
          
      
    
           const { navigation } = this.props;
        return(
          <ScrollView style={{flex: 1}}>
              
            <View style = {styles.container}>
            <NavigationEvents
                onDidFocus={() =>   this.getData()}
                />

              <FlatList
        data={this.state.data}
        renderItem={({ item }) => <Card>
            <CardItem header>
              <Text style = {{fontSize: 20, fontFamily: "sans-serif-black"}}>{item.type}</Text>
            </CardItem>


            <CardItem>
              <Body>
                <Text>
                  Amount: {item.amount}
                </Text>
              </Body>
            </CardItem>

            <CardItem>
                <Text>{item.date}</Text>

            </CardItem>


            <CardItem footer>
              <Text>Reason: {item.reason}</Text>
            </CardItem>
          </Card>} />
          <Card>
            <CardItem header>
              <Text style = {{fontSize: 20, fontFamily: "sans-serif-black"}}>TOTAL</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {this.state.total}
                </Text>
              </Body>
            </CardItem>
            
          </Card>
          
               
            
            </View>
           
            
                     

           
              <View style = {styles.container}>
                    <Button
                 block
                 rounded
                 style={{ height: 53, marginBottom: 10 }}
                  onPress = {() => {navigation.navigate('Add')}}
                >
                    <Text style = {{fontFamily: "sans-serif-black", color: "white"}}>ADD</Text>
             </Button>
                  
                  
               <Button
                 block
                 rounded
                 style={{ height: 53, marginBottom: 10 }}
                 onPress = {() => {navigation.navigate('Chart')}}
                >
                    <Text style = {{fontFamily: "sans-serif-black", color: "white"}}>CHART</Text>
             </Button>
                  

            </View>


            
        </ScrollView>  
        );

    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        
        alignItems: "stretch",
        margin: 6
    },
    containerBut: {
        flex: 1,
        
        alignItems: "center",
        margin: 6
    },

});

export default withNavigation(Home);