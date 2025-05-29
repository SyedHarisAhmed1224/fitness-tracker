// FitnessDashboard.js
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import InputBox from './InputBox';


export default function FitnessDashboard() {
    const [routines, setRoutines] = useState([
        { name: 'Morning Routine', time: 'Hours', fill: 40, url: 'https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Afternoon Burn', time: '45 mins', fill: 60, url: 'https://plus.unsplash.com/premium_photo-1661603419378-55ba02b894f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Evening Stretch', time: '30 mins', fill: 80, url: 'https://images.unsplash.com/photo-1631501700640-cfd8663b9bd7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Cardio Blast', time: '25 mins', fill: 70, url: 'https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Night Meditation', time: '15 mins', fill: 90, url: 'https://images.unsplash.com/photo-1567010369387-e93d8d1e5e24?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ]);

    const addRoutine = (routine) => {
        setRoutines(prev => [...prev, routine]);
    };

    const [isEnabledInputBox, setEnabledInputBox] = useState(false)

    const { darkMode } = useContext(ThemeContext);
    const styles = getStyles(darkMode);


    return (
        <>
            <TouchableOpacity style={styles.fab} onPress={() => setEnabledInputBox(true)}>
                <Icon name="add" size={30} color="#111" />
            </TouchableOpacity>

            {isEnabledInputBox && <InputBox closeBox={() => setEnabledInputBox(false)} onAddRoutine={addRoutine} />}

            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcome}>Welcome Back!!!</Text>
                        <Text style={styles.username}>Mr.Fugazi</Text>
                    </View>
                    <View style={styles.headerIcons}>
                        <Icon name="notifications-outline" size={24} color="white" style={{ marginRight: 15 }} />
                        <Icon name="settings-outline" size={24} color="white" />
                    </View>
                </View>

                {/* Workout Progress */}
                <View style={styles.progressCard}>
                    <Text style={styles.progressTitle}>Workout Progress !</Text>
                    <View style={styles.progressRow}>
                        <Text style={styles.exerciseText}>14 Exercise left</Text>
                        <AnimatedCircularProgress
                            size={40}
                            width={4}
                            fill={75}
                            tintColor="#C7F90D"
                            backgroundColor="#555"
                        >
                            {fill => <Text style={styles.percentText}>75%</Text>}
                        </AnimatedCircularProgress>
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    {/* Calories */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Calories</Text>
                        <AnimatedCircularProgress
                            size={80}
                            width={10}
                            fill={60}
                            tintColor="#222"
                            backgroundColor="#FFFFFF"
                            rotation={0}
                            lineCap="round"
                        >
                            {() => (
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.cardText}>730</Text>
                                    <Text style={styles.cardSubText}>/kCal</Text>
                                </View>
                            )}
                        </AnimatedCircularProgress>
                    </View>

                    {/* Steps */}
                    <View style={[styles.card, { backgroundColor: '#222' }]}>
                        <Icon name="footsteps-outline" size={24} color="#FFFFFF" />
                        <Text style={styles.stepsText}>Steps</Text>
                        <Text style={styles.stepsText}>230</Text>
                    </View>
                </View>

                {/* Sleep & Image */}
                <View style={styles.statsRow}>
                    {/* Sleep */}
                    <View style={[styles.card, { flex: 1 }]}>
                        <Text style={styles.cardTitle}>Sleep</Text>
                        <Text style={styles.cardText}>5/8</Text>
                        <Text style={styles.cardSubText}>Hours</Text>
                        <AnimatedCircularProgress
                            size={40}
                            width={5}
                            fill={62.5}
                            tintColor="#222"
                            backgroundColor="#FFFFFF"
                        />
                    </View>

                    {/* Image */}
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                        style={styles.imageCard}
                    />
                </View>

                {/* Program Buttons */}
                <View style={styles.programRow}>
                    {['Jog', 'Yoga', 'Cycling', 'Workout'].map((item, idx) => (
                        <TouchableOpacity key={idx} style={styles.programButton}>
                            <Text style={styles.programText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Routine Cards */}
                {routines.map((routine, index) => (
                    <View key={index} style={styles.routineCard}>
                        <Image
                            source={{ uri: routine.url }}
                            style={{ width: 60, height: 60, borderRadius: 10 }}
                        />
                        <View style={{ flex: 1, marginLeft: 10, }}>
                            <Text style={styles.routineText}>{routine.name}</Text>
                            <Text style={styles.routineTextTime}>{routine.time}</Text>
                        </View>
                        <AnimatedCircularProgress
                            size={30}
                            width={4}
                            fill={routine.fill}
                            tintColor="#C7F90D"
                            backgroundColor="#222"
                        />
                    </View>
                ))}

                <Text>.</Text>
                <Text>.</Text>
                <Text>.</Text>
                <Text>.</Text>
            </ScrollView>
        </>
    );
}

const getStyles = (darkMode) => {
    const colors = {
        background: darkMode ? '#111' : '#F5F5F5',
        text: darkMode ? 'white' : '#111',
        inverseText: 'white',
        subText: darkMode ? '#aaa' : '#444',
        cardBg: darkMode ? '#222' : '#E0E0E0',
        highlight: '#C7F90D',
        blackBgText: darkMode ? '#FFFFFF' : '#000000',
        circularBg: darkMode ? '#555' : '#DDD',
        imageCardBg: darkMode ? '#333' : '#DDD',
    };

    return StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background, paddingStart: 20, paddingEnd: 20, paddingTop: 50 },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        welcome: { color: colors.subText, fontSize: 14 },
        username: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
        headerIcons: { flexDirection: 'row' },
        progressCard: {
            backgroundColor: colors.cardBg,
            borderRadius: 12,
            padding: 15,
            marginTop: 20,
        },
        progressTitle: { color: colors.text, fontSize: 16, marginBottom: 10 },
        progressRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        exerciseText: { color: colors.subText },
        percentText: { color: colors.highlight, fontSize: 12 },
        statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
        card: {
            backgroundColor: colors.highlight,
            borderRadius: 12,
            padding: 15,
            flex: 1,
            justifyContent: 'center',
            marginRight: 10,
            alignItems: 'center',
        },
        cardTitle: { color: '#000', fontWeight: 'bold' },
        cardTitleBlackBG: { color: colors.blackBgText, fontWeight: 'bold' },
        cardText: { fontSize: 20, fontWeight: 'bold', color: '#000' },
        cardSubText: { color: '#000' },
        imageCard: {
            width: 120,
            height: 120,
            borderRadius: 12,
            backgroundColor: colors.imageCardBg,
        },
        programRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
        },
        programButton: {
            backgroundColor: colors.highlight,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 10,
        },
        programText: { color: '#111', fontWeight: 'bold' },
        routineCard: {
            backgroundColor: colors.cardBg,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            marginTop: 20,
        },
        fab: {
            position: 'absolute',
            bottom: '1.5%',
            right: '2.0%',
            backgroundColor: colors.highlight,
            width: 40,
            height: 40,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 1,
            zIndex: 10,
        },
        routineText: {
            color: colors.text,
            fontSize: 16
        },
        routineTextTime: {
            color: colors.text,
            fontSize: 13
        },
        stepsText: {
            color: colors.inverseText
        }
    });
};
