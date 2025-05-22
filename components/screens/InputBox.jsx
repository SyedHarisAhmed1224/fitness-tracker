import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function InputBox( {closeBox} ) {
    return (
        <>
            <View style={styles.inputBackground}>
                <View style={styles.inputCard}>
                    <TextInput style={styles.inputBox}
                        placeholder="Routine"
                        placeholderTextColor={'#A3A3A3'}
                    />

                    <TextInput style={styles.inputBox}
                        placeholder="Start Value"
                        placeholderTextColor={'#A3A3A3'}
                    />

                    <TextInput style={styles.inputBox}
                        placeholder="End Value"
                        placeholderTextColor={'#A3A3A3'}
                    />

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.cancelButton} onPress={closeBox}>
                            <Icon name="close" size={30} color="#A8A8A8" />
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.addButton} onPress={closeBox}>
                            <Icon name="add" size={30} color="#111" />
                            <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputBackground: {
        position: "absolute",
        zIndex: 55,
        width: "100%",
        height: "100%",
        backgroundColor: '#00000030',
        // opacity: 0.3,
        borderRadius: 12,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputCard: {
        width: 300,
        height: 275,
        backgroundColor: '#000',
        opacity: 0.90,
        borderRadius: 12,
        padding: 20
    },
    inputBox: {
        color: 'white',
        height: 40,
        margin: 12,
        borderColor: '#777',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,

    },
    addButton: {
        width: '40%',
        height: 30,
        backgroundColor: '#C7F90D',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        borderRadius: 3
    },
    addText: {
        fontSize: 20,
        color: '#111',
        fontWeight: 'bold'
    },
    cancelButton: {
        width: '40%',
        height: 30,
        backgroundColor: '#333',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        borderRadius: 3
    },
    buttonView: {
        marginTop: 10,
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    cancelText: {
        fontSize: 20,
        color: '#A8A8A8',
        fontWeight: 'bold'
    }
})