import React, {Component} from 'react';
import {Text, ScrollView, View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function History(){
    return(
        <Card
            title='Our History'
        >
            <View>
                <Text style={{margin: 10}}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
                <Text style={{margin: 10}}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
            </View>
        </Card>
    );
}

function Leadership ({leaders}){
    const renderLeader = ({item, index}) => {
        return (
            <ListItem 
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
        );
    }

    return(
        <Card
            title='Corporate Leadership'
        >
            <FlatList 
                data={leaders}
                renderItem={renderLeader}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class About extends Component{
    static navigationOptions = {
        title: 'About Us'
    }

    render(){
        const renderAboutItem = ({item, index}) => {
            if (index == 0){
                return (
                    <History />  
                );
            }else{
                return(
                    <Leadership leaders={this.props.leaders.leaders}/>
                );
            }
        }

        if (this.props.leaders.isLoading){
            return(
                <ScrollView>
                    <History />  
                    <Card title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess){
            return(
                <ScrollView>
                    <History />  
                    <Card title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );            
        }

        return(
            <FlatList
                data={[{id:0}, {id:1}]}
                renderItem={renderAboutItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(About);