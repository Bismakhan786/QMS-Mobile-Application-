import React from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";

const RenderItem = (props) =>{
  const itemTotalPrice = Number(props.item.quantity * props.item.product.price).toFixed(2);
  return(
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  }}>
      <Text style={[styles.item, {width: "45%", fontWeight: 'bold'}]} numberOfLines={1} ellipsizeMode='tail'>{props.item.product.title}</Text>
      <Text style={[styles.item, {width: "25%", textAlign:'right', fontWeight: 'bold'}]}>{props.item.quantity}</Text>
      <Text style={[styles.item, {width: "30%", textAlign: 'right', fontWeight: 'bold'}]}>{itemTotalPrice}</Text>
  </View>
  )
}

const UpcomingOrderDetailsModal = (props) => {
  // console.log(props)
  return (
    <View style={styles.container}>
      {/* <StatusBar
        barStyle={"dark-content"}
        hidden={false}
        backgroundColor="#6666"
      /> */}
      <View style={styles.modalView}>
        <Text style={styles.orderHead}>Order Details...</Text>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Text style={[styles.subHead, {width: '45%'}]}>Medicine</Text>
            <Text style={[styles.subHead, {width: '25%', textAlign: 'right'}]}>Quantity</Text>
            <Text style={[styles.subHead, {width: '30%', textAlign: 'right'}]}>Price</Text>
        </View>
        <View style={{height: '78%', marginVertical: 10}}>

        <FlatList
          data={props.orderItems}
          renderItem={({item}) => <RenderItem item={item}/>}
          numColumns={1}
          showsVerticalScrollIndicator={false}
        />
        </View>
        <Text style={styles.bottomTxt}>Hope you are all set!</Text>
        
      </View>
    </View>
  );
};

export default UpcomingOrderDetailsModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column-reverse",
        alignItems: "center",
        // backgroundColor: 'red'
      },
      modalView: {
        position: "absolute",
        bottom: 0,
        height: "70%",
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: "10%",
        padding: "5%",
      },
      orderHead: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
      },
      subHead: {
        fontWeight: 'bold',
        color: '#666',
      },
      bottomTxt: {
        position: 'absolute',
        bottom: 10,
        color: '#e38e37',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
      },
      item: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: '#6666'
      }
});
