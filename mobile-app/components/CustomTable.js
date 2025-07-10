import { useSelector } from "react-redux";
import themes from "../design/themes";
import { View, Text, StyleSheet } from "react-native";

export default function CustomTable(props) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const cols = props.cols;
    const data = props.data;
    return (
        <View style={style.table}>
            <View style={style.headerRow}>
                {cols.map((colName) => (
                    <Text style={style.headerCell}>{colName}</Text>
                ))}
            </View>
            {data.map((row, rowIndex) => (
                <View key={`${rowIndex}-${row}`} style={style.dataRow}>
                    {cols.map((colName, cellIndex) => (
                        <Text
                            key={`${cellIndex}-${colName}`}
                            style={style.dataCell}
                        >
                            {row[colName]}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        table: {
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.CustomTable.borderColor,
            overflow: "hidden",
        },
        headerRow: {
            flexDirection: "row",
            backgroundColor: theme.CustomTable.headerRowBackgroundColor,
            padding: 8,
        },
        headerCell: {
            flex: 1,
            fontWeight: "bold",
            textAlign: "center",
        },
        dataRow: {
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: theme.CustomTable.dataCellBorderBottom,
            backgroundColor: theme.CustomTable.dataCellBackgroundColor,
            padding: 8,
        },
        dataCell: {
            flex: 1,
            textAlign: "center",
        },
    });
