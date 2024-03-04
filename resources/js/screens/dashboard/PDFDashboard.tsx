import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import type { DashboardData } from '@/api';

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    margin: 10,
  },
  pageContent: {
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00519E', // Blue color for text
  },
  content: {
    marginTop: 20,
  },
  field: {
    fontSize: 14,
    marginBottom: 10,
    color: '#00519E', // Blue color for text
  },
});

interface PDFDashboardProps {
  data: DashboardData | undefined;
};

// Create Document Component
export const PDFDashboard: React.FC<PDFDashboardProps> = ({ data }) => (
  <Document author="JASForm" title="Dashboard report">
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard Report</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.field}>Total Forms: {data?.total_forms}</Text>
        <Text style={styles.field}>Total Form Instances: {data?.total_form_instances}</Text>
        <Text style={styles.field}>Total Form Questions: {data?.total_form_questions}</Text>
        <Text style={styles.field}>Total Completer Users: {data?.total_completer_users}</Text>
      </View>
    </Page>
  </Document>
);