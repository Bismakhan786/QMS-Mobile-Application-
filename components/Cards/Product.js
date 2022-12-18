import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { windowWidth } from "../../utils/Dimension";
import { windowHeight } from "../../utils/Dimension";
import { Rating } from "react-native-ratings";
import { colors } from "../../constants";

const Product = (props) => {
  return (
    <TouchableOpacity
    key={props.index}
      onPress={props.onPress}
      style={{
        width: windowWidth * 0.42,
        marginVertical: "2%",
        marginHorizontal: "2%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 8,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 150,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: props.item.image[0].url }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
        {/* <View
          style={{
            position: "absolute",
            width: "20%",
            height: "18%",
            backgroundColor: "#e38b37",
            top: 0,
            left: 0,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 8,
              color: "#e4e8eb",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            NEW
          </Text>
        </View> */}
      </View>
      <Text
        style={{
          color: "#38343a",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        {props.item.name}
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          color: "red",
          fontWeight: "400",
          marginBottom: 2,
        }}
      >
        Rs {Number(props.item.price).toFixed(2)}
      </Text>
      <View style={{ alignItems: "flex-start", marginBottom: 2 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Rating imageSize={14} readonly startingValue={props.item.ratings} />
          <Text
            style={{ marginLeft: 10, fontWeight: "bold", fontSize: 11, color: colors.brown }}
          >
            ({props.item.ratings})
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-start", marginBottom: 2 }}>
        <Text style={{ fontWeight: "bold", color: colors.brown, fontSize: 11 }}>
          Reviews: {props.item.numOfReviews}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 11,
          fontWeight: 'bold',
          color: "#e38b37",
          marginBottom: 2,
        }}
      >
        {props.item.cat.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Product;
