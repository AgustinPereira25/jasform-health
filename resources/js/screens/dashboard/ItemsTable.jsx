import React from "react";
import { StyleSheet, View } from "@react-pdf/renderer";

import TableRow from "./TableRow";

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
const ItemsTable = ({ data = [] }) => (
    <View style={styles.tableContainer}>
        {data.map((item, index) => (
            <TableRow index={index} item={item} />
        ))}
    </View>
);

export default ItemsTable;
