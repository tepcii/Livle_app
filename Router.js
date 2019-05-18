import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router, Tabs, Stack, ActionConst, Actions } from 'react-native-router-flux';
import EventList from './src/screens/event/EventList';
import ArtistListScreen from './src/screens/artist/ArtistListScreen';
import AddArtist from './src/screens/artist/AddArtist';
import EditArtist from './src/screens/artist/EditArtist';
import EditEvent from './src/screens/event/EditEvent';
import MoneyManagement from './src/screens/money/MoneyManagement';
import AddExpenditure from './src/screens/money/AddExpenditure';
import ExpenditureList from './src/screens/money/ExpenditureList';
import EditExpenditure from './src/screens/money/EditExpenditure';
import AddEvent from './src/screens/event/AddEvent';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const styles = {
  tabIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconStyle: {
    width: 24,
    height: 24,
    fontSize: 24,
  },
}

const TabBarIcon = props => (
  <View style={styles.tabIconContainerStyle}>
    <Icon
      name={props.iconName}
      color={props.focused ? '#FF9500' : '#A4A4A4'}
      style={styles.tabIconStyle}
    />
  </View>
);

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={{backgroundColor: '#FF9500'}}
      titleStyle={{color: '#fff'}}
      navBarButtonColor='#fff'
    >
      <Scene
        key='root'
        hideNavBar={ true }>

        <Stack
          key='event'
          title='イベントリスト'
          iconName='calendar'
          iconColor='red'
          icon={TabBarIcon}
          initial
        >
          <Scene
            key='eventlist'
            component={EventList}
            hideNavBar={ true }
            initial
          />
          <Scene
            key='addevent'
            component={AddEvent}
            title='予定追加'
          />
          <Scene
            key='editevent'
            component={EditEvent}
            title='予定編集'
          />
        </Stack>
        <Stack
          key='artist'
          iconName='list-ul'
          iconColor='red'
          icon={TabBarIcon}
        >
          <Scene
            key='artistlist'
            component={ArtistListScreen}
            title='アーティスト'
            hideNavBar={ true }
          />
          <Scene
            key='addartist'
            component={AddArtist}
            title='アーティスト追加'
          />
          <Scene
            key='editartist'
            component={EditArtist}
            title='アーティスト編集'
          />

        </Stack>

        <Stack
          key='money'
          title='お金管理'
          iconName='yen'
          iconColor='red'
          icon={TabBarIcon}
        >
          <Scene
            key='moneymanagement'
            component={MoneyManagement}
            hideNavBar={ true }
            initial
          />
          <Scene
            key='addexpenditure'
            component={AddExpenditure}
            title='支出'
          />
          <Scene
            key='editexpenditure'
            component={EditExpenditure}
            title='編集'
          />
          <Scene
            key='expenditurelist'
            component={ExpenditureList}
            title='支出明細'
            back
            onBack={() => Actions.moneymanagement({ type: ActionConst.RESET })}
          />
        </Stack>

      </Scene>
    </Router>
  )
}

export default RouterComponent;
