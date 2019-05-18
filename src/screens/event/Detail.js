import React, { Component } from 'react';
import {
  Easing,
  InteractionManager,
  Animated,
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';

import { SharedElement, TranslateYAndOpacity } from 'react-native-motion';

import ListItem from './ListItem';
import Row from './Row';
import Toolbar from './Toolbar';
import DetailBottomBar from './DetailBottomBar';

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacityOfDestinationItem: 0,
      bottmButtonHide: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.phase === 'phase-2' && nextProps.phase === 'phase-3') {
      this.sharedElementRef.moveToSource();
    }
  }

  onMoveToDestinationDidFinish = () => {
    this.setState({ opacityOfDestinationItem: 1 });
    this.props.onSharedElementMovedToDestination();
  };

  onMoveToSourceWillStart = () => {
    this.setState({ opacityOfDestinationItem: 0 });
  };


  render() {
    const {
      selectedItem,
      startPosition,
      phase,
      onBackPress,
      onSharedElementMovedToSource,
      eventList,
      artists,
    } = this.props;
    const { opacityOfDestinationItem } = this.state;

    const items = [selectedItem] || [{}];

    if (!selectedItem) {
      return null;
    }

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var artist = [];
    selectedItem.artistKey.map(function(key) {
      artist.push(artists.filter(artistObj => artistObj.key === key)[0]);
    });
    console.log(artist);
    var dataSource = ds.cloneWithRows(artist);

    return (
      <View style={styles.container}>
        <Toolbar isHidden={phase === 'phase-3'} onBackPress={onBackPress} />
        <SharedElement
          ref={node => (this.sharedElementRef = node)}
          sourceId={selectedItem.key}
          easing={Easing.in(Easing.back())}
          onMoveToDestinationDidFinish={this.onMoveToDestinationDidFinish}
          onMoveToSourceWillStart={this.onMoveToSourceWillStart}
          onMoveToSourceDidFinish={onSharedElementMovedToSource}
        >
          <View
            style={{
              opacity: opacityOfDestinationItem,
              backgroundColor: 'transparent',
            }}
          >
            <ListItem
              item={selectedItem}
              onPress={() => {}}
              animateOnDidMount={false}
              isHidden={false}
            />
          </View>
        </SharedElement>
          {(() => {
            if (selectedItem.eventType === "live") {
              return (
                <ScrollView>
                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={56}>
                    <View style={styles.itemContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>アーティスト</Text>
                        </View>
                        <ListView
                          dataSource={dataSource}
                          renderRow={(rowData) => <Text style={styles.amountText}>{rowData.name}</Text>}
                          />
                      </Row>
                    </View>
                  </TranslateYAndOpacity>
                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={112}>
                    <View style={styles.itemContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>会場</Text>
                        </View>
                        <Text style={styles.amountText}>{selectedItem.venue}</Text>
                      </Row>
                    </View>
                  </TranslateYAndOpacity>
                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={168}>
                    <View style={styles.itemContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>開場</Text>
                        </View>
                        <Text style={styles.amountText}>{selectedItem.openTime}</Text>
                      </Row>
                    </View>
                  </TranslateYAndOpacity>
                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={224}>
                    <View style={styles.itemContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>開演</Text>
                        </View>
                        <Text style={styles.amountText}>{selectedItem.startTime}</Text>
                      </Row>
                    </View>
                  </TranslateYAndOpacity>

                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={280}>
                    <View style={styles.itemContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>メモ</Text>
                        </View>
                      </Row>
                      <Row style={styles.memoRowContainer}>
                        <Text style={styles.memoText}>{selectedItem.memo}</Text>
                      </Row>
                    </View>
                  </TranslateYAndOpacity>
                </ScrollView>
              );
            } else if (selectedItem.eventType === "ticket") {
              return (
                <ScrollView>
                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={56}>
                    <View style={styles.itemContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>アーティスト</Text>
                        </View>
                        <ListView
                          dataSource={dataSource}
                          renderRow={(rowData) => <Text style={styles.amountText}>{rowData.name}</Text>}
                          />
                      </Row>
                    </View>
                  </TranslateYAndOpacity>
                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={112}>
                    <View style={styles.itemContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>チケット</Text>
                        </View>
                        {(() => {
                          if (selectedItem.ticket === "payment") {
                            return <Text style={styles.amountText}>支払い期限</Text>
                          } else if (selectedItem.ticket === "subscription") {
                            return <Text style={styles.amountText}>申し込み</Text>
                          } else if (selectedItem.ticket === "announcement") {
                            return <Text style={styles.amountText}>当落発表</Text>
                          }
                        })()}
                      </Row>
                    </View>
                  </TranslateYAndOpacity>
                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={168}>
                    <View style={styles.itemContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>時間</Text>
                        </View>
                        <Text style={styles.amountText}>{selectedItem.time}</Text>
                      </Row>
                    </View>
                  </TranslateYAndOpacity>

                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={224}>
                    <View style={styles.memoContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>メモ</Text>
                        </View>
                      </Row>
                      <Row style={styles.memoRowContainer}>
                        <Text style={styles.memoText}>{selectedItem.memo}</Text>
                      </Row>
                    </View>
                  </TranslateYAndOpacity>
                </ScrollView>
              );
            } else if (selectedItem.eventType === "other") {
              return (
                <ScrollView>
                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={56}>
                    <View style={styles.itemContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>アーティスト</Text>
                        </View>
                        <ListView
                          dataSource={dataSource}
                          renderRow={(rowData) => <Text style={styles.amountText}>{rowData.name}</Text>}
                          />
                      </Row>
                    </View>
                  </TranslateYAndOpacity>

                  <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={224}>
                    <View style={styles.memoContainer}>
                      <Row style={styles.rowContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.titleText}>メモ</Text>
                        </View>
                      </Row>
                      <Row style={styles.memoRowContainer}>
                        <Text style={styles.memoText}>{selectedItem.memo}</Text>
                      </Row>
                    </View>
                  </TranslateYAndOpacity>
                </ScrollView>
              );
            }
          })()}
          {(() => {
            if (selectedItem.eventType === "live") {
              return (
                <DetailBottomBar
                  isHidden={phase === 'phase-3' || this.state.bottmButtonHide}
                  eventKey={selectedItem.key}
                  onBackPress={onBackPress}
                  date={selectedItem.date}
                  title={selectedItem.title}
                  artistKey={selectedItem.artistKey}
                  venue={selectedItem.venue}
                  openTime={selectedItem.openTime}
                  startTime={selectedItem.startTime}
                  memo={selectedItem.memo}
                  eventType={selectedItem.eventType}
                />
              )
            } else if (selectedItem.eventType === "ticket") {
              return (
                <DetailBottomBar
                  isHidden={phase === 'phase-3' || this.state.bottmButtonHide}
                  eventKey={selectedItem.key}
                  onBackPress={onBackPress}
                  date={selectedItem.date}
                  time={selectedItem.time}
                  title={selectedItem.title}
                  artistKey={selectedItem.artistKey}
                  ticket={selectedItem.ticket}
                  memo={selectedItem.memo}
                  eventType={selectedItem.eventType}
                />
              )
            } else if (selectedItem.eventType === "other") {
              return (
                <DetailBottomBar
                  isHidden={phase === 'phase-3' || this.state.bottmButtonHide}
                  eventKey={selectedItem.key}
                  onBackPress={onBackPress}
                  date={selectedItem.date}
                  title={selectedItem.title}
                  artistKey={selectedItem.artistKey}
                  memo={selectedItem.memo}
                  eventType={selectedItem.eventType}
                />
              )
            }
          })()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ededed'
  },
  memoContainer: {
    marginHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ededed'
  },
  rowContainer: {
    alignItems: 'center',
  },
  memoRowContainer: {
    marginTop: 10,
    marginBottom: 120,
    padding: 5,
    alignItems: 'center',
  },
  titleText: {},
  amountText: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'right',
  },
  memoText: {
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'left',
  },
  vatText: {
    fontSize: 10,
    color: 'gray',
  },
});
