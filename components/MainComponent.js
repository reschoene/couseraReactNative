import React, {Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishDetailComponent';
import {View, Platform, Image, StyleSheet, ScrollView, Text} from 'react-native';
import {createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromos: () => dispatch(fetchPromos()),
});

const MenuNavigator = createStackNavigator({
    Menu: {screen: Menu, 
           navigationOptions: ({navigation}) => ({
               headerLeft: <View style={{marginLeft: 10}}>
                                <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
                            </View>
           })},
    Dishdetail: {screen: Dishdetail}
}, {
    initialRouteName: 'Menu',
    navigationOptions:{
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: {screen: Home},
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <View style={{marginLeft: 10}}>
                        <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
                    </View>
    })
});

const ContactNavigator = createStackNavigator({
    Contact: {screen: Contact},
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <View style={{marginLeft: 10}}>
                        <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
                    </View>
    })
});

const AboutNavigator = createStackNavigator({
    About: {screen: About},
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <View style={{marginLeft: 10}}>
                        <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
                    </View>
    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{top: 'always', horizantal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage}/>
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorant Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: ({navigation}) => ({
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({tintColor}) => (
                <Icon name='home'
                      type='font-awesome'
                      size={24}
                      color={tintColor} />
            ) 
        })
    },    
    About:{
        screen: AboutNavigator,
        navigationOptions: ({navigation}) => ({
            title: 'About',
            drawerLabel: 'About Us',
            drawerIcon: ({tintColor}) => (
                <Icon name='info-circle'
                      type='font-awesome'
                      size={24}
                      color={tintColor} />
            )
        })        
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: ({navigation}) => ({
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({tintColor}) => (
                <Icon name='list'
                      type='font-awesome'
                      size={24}
                      color={tintColor} />
            )
        })
    },
    Contact:{
        screen: ContactNavigator,
        navigationOptions: ({navigation}) => ({
            title: 'Contact',
            drawerLabel: 'Contact Us',
            drawerIcon: ({tintColor}) => (
                <Icon name='address-card'
                      type='font-awesome'
                      size={22}
                      color={tintColor} />
            )            
        })
    }
}, {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
})

class Main extends Component{
    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render(){
        return(
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <MainNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    drawerHeader:{
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText:{
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage:{
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(null, mapDispatchToProps)(Main);
