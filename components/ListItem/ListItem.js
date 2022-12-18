import React from "react";
import { 
    Text,
    TouchableOpacity,
} from "react-native";

const ListItem = ({
    label,
    onPressFunction,
}) => {
    return(
        <TouchableOpacity
            onPress={onPressFunction}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'whitesmoke',
                paddingVertical: 12,
                paddingHorizontal: 30,
                marginBottom: 4
            }}
        >
        <Text
                style={{
                    color: "#666",
                    fontSize: 16,
                    fontWeight: '300',
                }}
            >
                {label}
            </Text>
            
        </TouchableOpacity>
    )
}

export default ListItem;