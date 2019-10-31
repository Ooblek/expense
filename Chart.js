import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, AsyncStorage,TextInput,CheckBox, Alert, Dimensions} from 'react-native';

import {LineChart} from 'react-native-chart-kit';

import { withNavigation,NavigationEvents  } from 'react-navigation';




export default class Chart extends React.Component {


    constructor(props){
        super(props);

        this.state = {data:[],
                      dates: [],
                      amounts: [0,0]};
    }
 
    


      getData = async () => {
       
         try {
        const value = await AsyncStorage.getItem('data');
        if (value !== null) {
        // data get
        let total = 0;
         let dateData = [];
         let amountData = [];
            let data = JSON.parse(value);
            for(let d of data){
                dateData.push(d.date);
                amountData.push(parseInt(d.amount));
                if(d.type == 'Debit'){
                    total -= d.amount;
                     
                      
                      
                }
                else{
                    total += parseInt(d.amount);
                    
                }
                console.log(dateData.sort())
            }
            this.setState({total: total});

            this.setState({data:JSON.parse(value)});
          
            this.setState({dates: dateData})
            this.setState({amounts: amountData})
            console.log(this.state.amounts)
        }
        else{
          
        }
    } catch (error) {
        // Error retrieving data
  }
    }
    
    getChartData = () => {
        let amt = [];
       
      
       if(amt != null){
           return amt
       }
       else{
             return 0
       }
    }
    componentDidUpdate(){
        console.log("update"+this.state.amounts)
    }


    render(){
      
       if(!this.state.amounts){
           return(
               <View style = {styles.container}>
                   <Text> Loading</Text>
               </View>
           )
       }
       else{
        return(
            <View style= {styles.container}>
                 <NavigationEvents
                onDidFocus={() =>   this.getData()}
                />
                        <LineChart
                            data={{
                            labels: this.state.dates,
                            datasets: [
                                {
                                data: this.state.amounts
                                }
                            ]
                            }}
                            width={340} // from react-native
                            height={220}
                            yAxisLabel={"$"}
                            chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                        />
            </View>
        )
    }
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