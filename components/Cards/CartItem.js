import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

import { connect } from "react-redux";
import { removeFromCart } from "../../Redux/slices/CartSlice";

const CartItem = (props) => {
  // console.log("Cart Item", props.item)

  const increaseCount = () => {
    // props.item.quantity = 5;
    
  };

  const decreaseCount = () => {
    if (count > 0) {
      // props.item.quantity--;
    }
  };

  const totalPrice = props.item.product.price * props.item.qty;
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 5,
          marginHorizontal: 16,
          padding: 8,
          borderRadius: 10,
          backgroundColor: "#e7e7e8",
        }}
      >
        <TouchableOpacity
          onPress={() => props.removeItemFromCart(props.item.id)}
          style={{
            position: "absolute",
            top: -10,
            right: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name='trash' size={20} color="#e38b37" />
        </TouchableOpacity>
        <View
          style={{
            width: "25%",
          }}
        >
          <Image
            source={{uri: props.item.product.image[0].url}}
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
            }}
          />
        </View>
        <View
          style={{
            width: "75%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Title and price of a product */}
          <View
            style={{
              marginBottom: 10,
              width: "45%",
            }}
          >
            <Text style={styles.title}>{props.item.product.name}</Text>
            <Text style={styles.price}>Rs {totalPrice.toFixed(2)}</Text>
          </View>

          {/* Quantity Setter */}

          <View
            style={{
              width: "45%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              padding: 5,
              marginRight: 10,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity onPress={decreaseCount}>
              <AntDesign
                name="minus"
                size={20}
                color="#e38b37"
                style={styles.qtyIcon}
              />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{props.item.qty}</Text>
            <TouchableOpacity onPress={increaseCount}>
              <AntDesign
                name="plus"
                size={20}
                color="#e38b37"
                style={styles.qtyIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return{
    removeItemFromCart: (id) => {
      dispatch(removeFromCart(id))
    },
  }
}

export default connect(null, mapDispatchToProps)(CartItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
  },
  price: {
    fontSize: 12,
    fontWeight: "500",
    color: "#e38b37",
  },
  qtyText: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#38343a",
  },
  qtyIcon: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
