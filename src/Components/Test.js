import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    pageTwo: {
        display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0
    },
    tableRow: { margin: "auto", flexDirection: "row" },
    section: {
        fontSize: 10,
        margin: 2,
        padding: 2,
        flexGrow: 1
    }
});

// Create Document Component
const Test = () => (
    <Document>
        <Page size="A4" >
            <View style={styles.page}>
                <View style={styles.section}>
                    <Text>Core Competency</Text>
                </View>
                <View style={styles.section}>
                    <Text>Self Rating</Text>
                </View>
                <View style={styles.section}>
                    <Text >Supervisor Rating</Text>
                </View>
                <View style={styles.section}>
                    <Text >Average Score</Text>
                </View>
                <View style={styles.section}>
                    <Text >RPL</Text>
                </View>
                <View style={styles.section}>
                    <Text >DME</Text>
                </View>
                <View style={styles.section}>
                    <Text >80%</Text>
                </View>
            </View>
            <View style={styles.pageTwo}>
                <View style={styles.tableCol}>
                    <View style={styles.section}>
                        <Text>Core Competency</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text>Self Rating</Text>
                </View>
                <View style={styles.section}>
                    <Text >Supervisor Rating</Text>
                </View>
                <View style={styles.section}>
                    <Text >Average Score</Text>
                </View>
                <View style={styles.section}>
                    <Text >RPL</Text>
                </View>
                <View style={styles.section}>
                    <Text >DME</Text>
                </View>
                <View style={styles.section}>
                    <Text >80%</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default Test;