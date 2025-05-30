import { useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ThemeContext } from '../../ThemeContext';

export default function SettingsScreen() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const styles = getStyles(darkMode);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.settingRow}>
                <Text style={styles.settingText}>Dark Mode</Text>
                <Switch
                    value={darkMode}
                    onValueChange={toggleDarkMode}
                    thumbColor={darkMode ? '#C7F90D' : '#f4f3f4'}
                    trackColor={{ false: '#767577', true: '#a8e063' }}
                />
            </View>
        </View>
    );
}

const getStyles = (darkMode) => {
    const colors = {
        background: darkMode ? '#121212' : '#F5F5F5',
        text: darkMode ? '#C7F90D' : '#222',
        settingText: darkMode ? '#C7F90D' : '#555',
        border: darkMode ? '#333' : '#ccc',
    };

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 20,
        },
        title: {
            color: colors.text,
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 30,
        },
        settingRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
        },
        settingText: {
            fontSize: 18,
            color: colors.settingText,
        },
    });
};
