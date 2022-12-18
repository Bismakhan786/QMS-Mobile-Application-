import React from "react";
import { 
    Text,
    TouchableOpacity,
} from "react-native";

const CustomButton = ({
    label,
    onPressFunction,
    width
}) => {
    return(
        <TouchableOpacity
            onPress={onPressFunction}
            style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#d6cfcb",
                paddingVertical: 12,
                borderRadius: 10,
                paddingHorizontal: 30
            }}
        >
        <Text
                style={{
                    color: "#843b62",
                    fontSize: 16,
                    fontWeight: '300',
                }}
            >
                {label}
            </Text>
            
        </TouchableOpacity>
    )
}

export default CustomButton;