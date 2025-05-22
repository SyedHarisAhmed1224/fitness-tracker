import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ThemeContext } from '../../ThemeContext';

export default function SettingsScreen() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
        <View style={[styles.container, darkMode && styles.darkBackground]}>
            <Text style={[styles.title, darkMode && styles.darkText]}>Settings</Text>

            <View style={styles.settingRow}>
                <Text style={[styles.settingText, darkMode && styles.darkText]}>Dark Mode</Text>
                <Switch
                    value={darkMode}
                    onValueChange={toggleDarkMode}
                    thumbColor={darkMode ? '#C7F90D' : '#f4f3f4'}
                    trackColor={{ false: '#767577', true: '#a8e063' }}
                />
            </View>

            {/* other settings */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    darkBackground: {
        backgroundColor: '#121212',
    },
    title: {
        color: '#C7F90D',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
    },
    settingText: {
        fontSize: 18,
        color: '#ccc',
    },
    darkText: {
        color: '#C7F90D',
    },
});
