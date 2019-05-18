import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaleAndOpacity } from 'react-native-motion';
import moment from 'moment';

export class NextMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateLeft: null,
    };
  };

  showDiffDate = ( tYear, tMonth, tDay ) => {
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();
    var targetDate = new Date( tYear, tMonth-1, tDay );
    var dnumTarget = targetDate.getTime();
    var diffMSec = dnumTarget - dnumNow;
    var diffDays = diffMSec / ( 1000 * 60 * 60 * 24 );
    var showDays = Math.ceil( diffDays );
    if (showDays === 0) {
      return "本日予定が入っています。";
    } else {
      var Msg = "次の予定は" + showDays + "日後です。";

      return Msg;
    }
  };

  howManyDaysAreLeft = (eventList) => {
    var nowDate = new Date();
    var today = moment(nowDate).format("YYYY-MM-DD");
    var eventListInstead = eventList.slice(0, eventList.length);
    var result = eventListInstead.filter(eventObj => eventObj.date >= today);
    if (result.length > 0){
      return this.showDiffDate(
        moment(result[0].date).format('YYYY'),
        moment(result[0].date).format('MM'),
        moment(result[0].date).format('DD'));
    } else {
      return "次の予定はありません。";
    }
  };

  componentWillMount() {
    const { eventList } = this.props;

    if (eventList.length > 0) {
      this.setState({dateLeft: this.howManyDaysAreLeft(eventList)});
    } else {
      this.setState({dateLeft: "次の予定はありません。"});
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({dateLeft: this.howManyDaysAreLeft(nextProps.eventList)});
  };

  render() {
    return (
      <View style={[styles.container]} pointerEvents="box-only">
        <Text style={styles.message}>{this.state.dateLeft}</Text>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF9500',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  message: {
    color: 'white',
  }
});


export default NextMessage;
