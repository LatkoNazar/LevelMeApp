import { TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import AppText from "./AppText";

export default function ClearTasks(props) {
    return (
        <TouchableOpacity onPress={props.onClearTask} style={props.style}>
            <AppText style={{ fontSize: 16 }}>Clear list</AppText>
        </TouchableOpacity>
    );
}

ClearTasks.propTypes = {
    onClearTask: PropTypes.func.isRequired,
    style: PropTypes.object,
};

const styles = StyleSheet.create({});
