import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from 'dayjs';

import { truncateText } from "@/helpers/helpers";
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        fontSize: 10,
        marginBottom: 5,
    },
    publicCode: {
        width: "40%",
    },
    name: {
        width: "40%",
    },
    date: {
        width: "30%",
    },
    rate: {
        width: "20%",
    },

});

const TableRow = ({ index, item }) => {
    return (
        <View style={styles.row} key={item.id}>
            <Text style={styles.publicCode}>{index + 1}-Pub.Code: {item.public_code}</Text>
            <Text style={styles.name}>{truncateText(item.name, 15)}</Text>
            <Text style={styles.date}>Last Mod.:{dayjs(item.last_modified_date_time).format('MM-DD-YYYY')}</Text>
            <Text style={styles.rate}>Questions: {item.form_questions_count}</Text>
            <Text style={styles.rate}>Instances: {item.form_instances_count}</Text>
            <Text style={styles.rate}>{item.is_active ? "Active" : "Inactive"}</Text>
        </View>
    );
}

export default TableRow;
