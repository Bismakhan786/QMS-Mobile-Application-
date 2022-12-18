import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { windowWidth } from "../../utils/Dimension";
import { windowHeight } from "../../utils/Dimension";
import { Ionicons } from "@expo/vector-icons";
import { connect, Connect } from "react-redux";
import { removeFromFav } from "../../Redux/slices/FavouritesSlicer";

const FavProduct = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("ProductDetails", props.item.item)
      }
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
          position: "absolute",
          width: "30%",
          height: "24%",
          top: -10,
          //   bottom: 0,
          right: 0,
        }}
      >
        <TouchableOpacity
        onPress={() => {props.removeItem(props.item.favId)}}
          style={{
            padding: 8,
            backgroundColor: "whitesmoke",
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="trash-bin" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
          source={props.item.item.image}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
        <View
          style={{
            position: "absolute",
            width: "20%",
            height: "18%",
            top: 0,
            left: 0,
          }}
        >
          <Ionicons name="heart-sharp" size={20} color="#e38b37" />
        </View>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: "#38343a",
          fontWeight: "600",
          marginBottom: 2,
        }}
      >
        {props.item.item.title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "400",
          color: "red",
          fontWeight: "400",
          marginBottom: 2,
        }}
      >
        Rs {props.item.item.price}
      </Text>
      <Text
        style={{
          fontSize: 11,
          color: "#e38b37",
          marginBottom: 2,
        }}
      >
        {props.item.item.category}
      </Text>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => {
      dispatch(removeFromFav(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(FavProduct);
