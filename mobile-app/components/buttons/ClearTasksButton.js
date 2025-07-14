import { TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import AppText from "../AppText";

export default function ClearTasksButton(props) {
    return (
        <TouchableOpacity onPress={props.onClearTask} style={props.style}>
            <AppText style={{ fontSize: 16 }}>Clear list</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
