import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import type { DashboardData } from '@/api';

import logo from '/public/JASForm_Isologo_big_transp_white.png';
import avatar from '/public/Profile-Hello-Smile1b.png';

import ItemsTable from './ItemsTable';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        margin: 0,
    },
    pageContent: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#00519E',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    bodyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00519E',
        marginBottom: 10,
    },
    content: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: 20,
    },
    headerField: {
        fontSize: 10,
        marginBottom: 10,
        color: 'white',
    },
    field: {
        fontSize: 14,
        marginBottom: 10,
        color: '#00519E',
    },
    logo: {
        width: 100,
        height: 26,
    },
    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    titleInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginLeft: 10,
    },
});

interface PDFDashboardProps {
    data: DashboardData | undefined;
    userData: any;
    formDataReport?: any;
};

export const PDFDashboard: React.FC<PDFDashboardProps> = ({ data, userData, formDataReport }) => {
    // console.log("data:", data)
    return (
        <Document author="JASForm" title="Dashboard report">
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image source={logo} style={styles.logo} />
                    <View style={styles.titleInfo}>
                        <Text style={styles.title}>Dashboard Report - {dayjs().format('MM-DD-YYYY')}</Text>
                        <Text style={styles.headerField}>{userData?.first_name} {userData?.last_name} - {userData?.email}</Text>
                        <Text style={styles.headerField}>{userData?.position_in_org} - {userData?.organization_name}</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Image source={userData?.photo || avatar} style={styles.userPhoto} />
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.field}>Total Forms: {data?.total_forms}</Text>
                    <Text style={styles.field}>Total Form Instances: {data?.total_form_instances}</Text>
                    <Text style={styles.field}>Total Form Questions: {data?.total_form_questions}</Text>
                    <Text style={styles.field}>Total Completer Users: {data?.total_completer_users}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.bodyTitle}>Last Active Forms</Text>
                    <ItemsTable data={formDataReport} />
                </View>
            </Page>
        </Document>
    );
}
