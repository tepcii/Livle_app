import React, { Component } from 'react';
import { connect } from 'react-redux';
import Svg, {G} from 'react-native-svg';
import { View, Animated, Button, Easing, StyleSheet, ScrollView, FlatList, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slice from "./Slice";
import Toolbar from "./Toolbar";
import BottomBar from "./BottomBar";

const AnimatedSlice = Animated.createAnimatedComponent(Slice);
const zeroMoney = [
  {
    money: 1,
    color: '#dfdfdf',
    name: '合計金額０円',
  }
];

export class MoneyManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animValue: new Animated.Value(0.1),
      data: [],
      datas: [{}],
      allTotalMoney: 0,
      index: 0,
    };
  }

  componentWillMount() {
    this.setState({allTotalMoney: 0});
    this.props.artists.map(artist => {
      var totalMoney = 0;
      this.props.expenditure.map(exp => {
        if(exp.artistKey.indexOf(artist.key) >= 0) {
          totalMoney += exp.amountOfMoney / exp.artistKey.length;
        }
      });

      var dataCopy = this.state.data;
      dataCopy.push({name: artist.name, money: totalMoney, color: artist.color});
      this.setState({data: dataCopy, allTotalMoney: this.state.allTotalMoney += totalMoney});
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({allTotalMoney: 0});
    nextProps.artists.map(artist => {
      var totalMoney = 0;
      nextProps.expenditure.map(exp => {
        if(exp.artistKey.indexOf(artist.key) >= 0) {
          totalMoney += exp.amountOfMoney / exp.artistKey.length;
        }
      });

      var dataCopy = this.state.data;
      dataCopy.push({name: artist.name, money: totalMoney, color: artist.color});
      this.setState({data: dataCopy, allTotalMoney: this.state.allTotalMoney += totalMoney});
    })
  }

  componentDidMount() {
    Animated.timing(
      this.state.animValue,
      {
        toValue: 2,
        duration: 500,
        easing: Easing.inOut(Easing.quad)
      }
    ).start();
  }

  renderItem = ({ item }) => {
    var totalMoney = 0;
    this.props.expenditure.map(exp => {
      if(exp.artistKey.indexOf(item.key) >= 0) {
        totalMoney += exp.amountOfMoney / exp.artistKey.length;
      }
    });

    return (
      <View style={styles.itemRow}>
        <Icon
          name={'circle'}
          color={item.color}
          style={styles.tabIconStyle}
        />
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemTextNumber}>{Math.floor(totalMoney).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}円</Text>
      </View>
    )
  }

  render() {
    const { artists } = this.props;
    let endAngle = Animated.multiply(this.state.animValue, Math.PI);
    var pieWidthAndHeight = Dimensions.get("window").height * 0.3;

    return (
      <View style={styles.container}>
        <Toolbar artists={artists} />
        {(() => {
          if (this.state.allTotalMoney > 0) {
            return (
              <View style={styles.pie}>
                <Svg
                  width={pieWidthAndHeight}
                  height={pieWidthAndHeight}
                  viewBox={`-100 -100 200 200`}
                  >
                  <G>
                    {
                      this.state.data.map( (item, index) => {
                        return (
                          <AnimatedSlice
                            index={index}
                            endAngle={endAngle}
                            color={item.color}
                            name={item.name}
                            data={this.state.data}
                            key={'pie_shape_' + index}
                          />
                        )
                      })
                    }
                  </G>
                </Svg>
                <Text style={{fontSize: 20, marginTop: 10}}>合計金額︰{Math.ceil(this.state.allTotalMoney).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}円</Text>
              </View>
            )
          } else {
            return (
              <View style={styles.pie}>
                <Svg
                  width={pieWidthAndHeight}
                  height={pieWidthAndHeight}
                  viewBox={`-100 -100 200 200`}
                  >
                  <G>
                    {
                      zeroMoney.map( (item, index) => {
                        return (
                          <AnimatedSlice
                            index={index}
                            endAngle={endAngle}
                            color={item.color}
                            data={zeroMoney}
                            key={'pie_shape_' + index}
                            />
                        )
                      })
                    }
                  </G>
                </Svg>
                <Text style={{fontSize: 20, marginTop: 10}}>合計金額︰{this.state.allTotalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}円</Text>
              </View>
            )
          }
        })()}
        <View style={styles.list}>
          {(() => {
            if (this.state.index == 0) {
              return (
                <View style={styles.itemRow}>
                  <Text style={{fontSize: 15, textAlign: 'center'}}>アーティスト別</Text>
                </View>
              )
            } else if (this.state.index == 1) {
              return (
                <View style={styles.itemRow}>
                  <Text style={{fontSize: 15, textAlign: 'center'}}>日付別</Text>
                </View>
              )
            } else if (this.state.index == 2) {
              return (
                <View style={styles.itemRow}>
                  <Text style={{fontSize: 15, textAlign: 'center'}}>種類別</Text>
                </View>
              )
            }
          })()}
          <ScrollView>
            <FlatList
              data={artists}
              extraData={this.state.expenditure}
              renderItem={this.renderItem}
              keyExtractor={item => item.name}
              />
          </ScrollView>
        </View>
        <BottomBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pie: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  itemRow: {
    borderColor: '#ededed',
    borderTopWidth: 1,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemText: {
    flex: 1,
    fontSize: 25,
  },
  itemTextNumber: {
    flex: 1,
    fontSize: 25,
    textAlign: 'right',
  },
  tabIconStyle: {
    width: 24,
    height: 24,
    fontSize: 24,
  },
});

const mapStateToProps = state => {
  return {
    eventList: state.liveEvent,
    artists: state.artists,
    expenditure: state.expenditure,
  };
};

const Container = connect(
  mapStateToProps,
)(MoneyManagement);

export default Container;
