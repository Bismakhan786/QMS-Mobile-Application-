import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

// Modal for rate order
import RateOrderModal from "../Modal/RateOrderModal";
// import { Modal } from "react-native";
import Modal from "react-native-modal";
import UpcomingOrderDetailsModal from "../Modal/UpcomingOrderDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  clearCancelOrderError,
  clearCancelOrderSuccess,
  getAllMyOrders,
} from "../../Redux/slices/OrdersSlice";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { windowHeight, windowWidth } from "../../utils/Dimension";

// order item component
const OrderItem = (props) => {
  console.log(props.item);

  const dispatch = useDispatch();
  const { navigation } = props;
  const [modalReorderVisible, setModalReorderVisible] = useState(false);
  const [modalUpcVisible, setModalUpcVisible] = useState(false);
  

  

  const reorderOrTrack = (order) => () => {
    if (order === "Upcoming") {
      navigation.navigate("TrackOrder");
    } else {
      navigation.navigate("Reorder", props.item);
    }
  };

  const rateOrCancel = (order, id) => () => {
    if (order === "Upcoming") {
      dispatch(cancelOrder(id));
      console.log(id);
    } else {
      setModalReorderVisible(true);
    }
  };

  return (
    <>
      
      <View style={styles.container}>
        <View>
          <Modal
            animationIn={"slideInUp"}
            transparent={true}
            isVisible={modalReorderVisible}
            hasBackdrop={true}
            backdropOpacity={0.2}
            onBackButtonPress={() =>
              setModalReorderVisible(!modalReorderVisible)
            }
            onBackdropPress={() => setModalReorderVisible(!modalReorderVisible)}
          >
            <RateOrderModal />
          </Modal>
        </View>

        <View>
          <Modal
            animationIn={"slideInUp"}
            transparent={true}
            isVisible={modalUpcVisible}
            hasBackdrop={true}
            backdropOpacity={0.2}
            onBackButtonPress={() => setModalUpcVisible(!modalUpcVisible)}
            onBackdropPress={() => setModalUpcVisible(!modalUpcVisible)}
          >
            <UpcomingOrderDetailsModal
              orderItems={props.item.cartItems}
              total={props.item.totalAmount}
              paymentType={props.item.paymentType}
            />
          </Modal>
        </View>

        <TouchableOpacity
          onPress={() => setModalUpcVisible(true)}
          disabled={props.orderType === "History" && true}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.orderID}>
              Order: #{props.item._id}
            </Text>
            <Text style={styles.total}>Rs {props.item.totalPrice}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.dateTimeItems}>
              {props.item.createdAt.slice(0, 10)}
            </Text>
            <View
              style={{
                height: 1,
                width: 1,
                borderWidth: 2,
                borderRadius: 40,
                marginHorizontal: 8,
                borderColor: "#6666",
              }}
            ></View>
            <Text style={styles.dateTimeItems}>
              {props.item.orderItems.length} items
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 1,
                  width: 1,
                  borderWidth: 3.5,
                  borderRadius: 40,
                  marginRight: 8,
                  borderColor:
                    props.item.orderStatus === "Delivered"
                      ? "green"
                      : props.item.orderStatus === "Processing" ||
                        props.item.orderStatus === "Shipped"
                      ? "#c38200"
                      : "red",
                }}
              ></View>
              <Text
                style={[
                  styles.status,
                  props.item.status === "Delivered"
                    ? styles.statusDel
                    : props.item.orderStatus === "Processing" ||
                      props.item.orderStatus === "Shipped"
                    ? styles.statusOnTheWay
                    : styles.statusCancel,
                ]}
              >
                {props.item.orderStatus}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.icon}
                onPress={reorderOrTrack(props.orderType)}
              >
                <MaterialCommunityIcons
                  name={props.orderType === "History" ? "replay" : "truck-fast"}
                  size={20}
                  color="whitesmoke"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={rateOrCancel(props.orderType, props.item._id)}
              >
                <Entypo
                  name={props.orderType === "History" ? "star" : "cross"}
                  size={20}
                  color="whitesmoke"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Toast />
    </>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    // backgroundColor: "#e7e7e8",
    backgroundColor: "whitesmoke",
    borderRadius: 10,
  },
  modal: {
    height: "50%",
  },
  orderID: {
    width: "70%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginVertical: 3,
  },
  total: {
    fontWeight: "bold",
  },
  dateTimeItems: {
    fontSize: 12,
    color: "#666",
    fontWeight: "300",
    marginVertical: 3,
  },
  status: {
    fontSize: 12,
    fontWeight: "500",
  },
  statusCancel: {
    color: "red",
  },
  statusDel: {
    color: "green",
  },
  statusOnTheWay: {
    color: "#c38200",
  },
  icon: {
    padding: 5,
    backgroundColor: "#e38b37",
    borderRadius: 40,
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
