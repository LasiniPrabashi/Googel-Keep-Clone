import React, {useContext, useState} from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import * as Notifications from 'expo-notifications';
import {Colors} from "@/constants/Colors";
import DateTimeComponent from "./dateTime/DateTimeComponent";

import { context } from '@/app/context/Provider';
import TakePhoto from "@/components/imagePhoto/TakePhoto";
import PhotoCameraComponent from "@/components/imagePhoto/PhotoCameraComponent";
// import now = jest.now;

const NoteDetail = ({ visible, onClose, note }) => {

    const {handleSaveNoteProvider,isConnected} = useContext(context);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [color, setColor] = useState('#FFFFFF');
    const [image, setImage] = useState<string | null>(null);
    const [showColorPalette, setShowColorPalette] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [timeDateVisible, setTimeDateVisible] = useState(false);

    const [imageClickTextVisible, setImageClickTextVisible] = useState(false);
    const [showImageCamara, setShowImageCamara] = useState(false);

    const [ShowPhoto, setShowPhoto] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);

    const imageOrCamera = () => {
        setShowImageCamara(true);
    };

    const pictureSet = () => {
        setShowImageCamara(false)
        setImageClickTextVisible(true);
        setShowPhoto(false)
        setImage(null);
    };

    const actionCamera = () =>{
        setShowPhoto(true);
        setPhotoUri(null);
        // console.log("cdsvd");
    }

    const handleColorChange = (selectedColor) => {
        setColor(selectedColor);
        setShowColorPalette(false);
    };

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setShowImageCamara(false)
            setPhotoUri(null);

        }
    };

    const handleSaveNote = async () => {
        if (title.trim() == '') {

        } else {
            if (isConnected) {
                try {
                    handleSaveNoteProvider({ title, content, color, image, date, photoUri });

                    const dateString = String(date).trim();
                    const now = new Date();
                    if (dateString !== '') {
                        console.log("Current local time:", now.toLocaleString());
                        console.log("Scheduling notification for date:", date.toLocaleString());

                        await Notifications.scheduleNotificationAsync({
                            content: {
                                title: "⏰ Alarm",
                                body: "Your alarm is ringing!",
                            },
                            trigger: date, // Use the trigger date
                        });
                    }
                    // Reset fields after successful save
                    setTitle('');
                    setContent('');
                    setColor('#F8F8F8');
                    setImage(null);
                    setDate(now);
                    setShowColorPalette(false);
                    setPhotoUri(null)
                    onClose();

                    // Show a success alert (optional)
                } catch (error) {
                    console.error('Error saving note:', error);
                    Alert.alert("Error", "Failed to save the note. Please try again.");
                }
            }
        }
    };

    // Open the date picker first when scheduling an alarm
    const scheduleAlarm = () => {
        setShowDatePicker(true);
        setTimeDateVisible(true);
    };

    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <TouchableWithoutFeedback onPress={() => onClose()}>
                <View style={styles.modalBg} />
            </TouchableWithoutFeedback>

            <View style={styles.modal}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Note</Text>
                </View>

                <View style={styles.content}>
                    <TextInput
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        style={[styles.input, { backgroundColor: color }]}
                    />
                    <TextInput
                        placeholder="Note content"
                        value={content}
                        onChangeText={setContent}
                        multiline
                        style={[styles.input, { backgroundColor: color, height: 100 }]}
                    />
                    {image  && <Image source={{ uri: image  }} style={styles.image} />}
                    {photoUri  && <Image source={{ uri: photoUri  }} style={styles.image} />}
                </View>

                {/* Static Bottom Bar */}
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        onPress={() => setShowColorPalette(!showColorPalette)}
                        style={styles.iconButton}
                    >
                        <MaterialIcons name="palette" size={24} color="white" />
                    </TouchableOpacity>

                    {showColorPalette && (
                        <View style={styles.colorPalette}>
                            {['#FFF5BA', '#F5A9B8', '#B4E197', '#A7C7E7','#F8F8F8'].map((c) => (
                                <TouchableOpacity
                                    key={c}
                                    style={[styles.colorOption, { backgroundColor: c }]}
                                    onPress={() => handleColorChange(c)}
                                />
                            ))}
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={imageOrCamera}
                        style={styles.iconButton}
                        accessibilityLabel="Pick an image"
                    >
                        <MaterialIcons name="photo" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={scheduleAlarm} style={styles.iconButton}>
                        <FontAwesome name="bell" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSaveNote} style={styles.iconButton}>
                        <FontAwesome name="save" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <PhotoCameraComponent
                    visible={showImageCamara}
                    onClose={() => setShowImageCamara(false)}// Pass the selected note
                    handlePickImage={handlePickImage}
                    actionCamera={actionCamera}
                />

                {timeDateVisible && (
                    <DateTimeComponent
                        showDatePicker={showDatePicker}
                        setShowDatePicker={setShowDatePicker}
                        showTimePicker={showTimePicker}
                        setShowTimePicker={setShowTimePicker}
                        date={date}
                        setDate={setDate}
                        setTimeDateVisible={setTimeDateVisible}
                    />
                )}

                <TakePhoto
                    visible={ShowPhoto}
                    onClose={() => setShowPhoto(false)}// Pass the selected note
                    photoUri={photoUri}
                    setPhotoUri={setPhotoUri}
                    handleConfirmPhoto={pictureSet}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 200,
        backgroundColor: Colors.pastelBackgrounds.pastelWhite,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 2000,
        padding: 20,
        flex: 1,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
    },
    headerContainer: {
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingTop: 10,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
        padding: 8,
        fontSize: 16,
        marginVertical: 5,
        borderColor: Colors.dark.background,
        borderWidth: 1,
        borderRadius: 5,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 5,
        marginRight: 10,
    },
    iconButton: {
        padding: 10,
        marginHorizontal: 8,
    },
    image: {
        width: '100%',
        height: '50%',
        marginVertical: 5,
        borderRadius: 5,
        borderColor: Colors.dark.background,
        borderWidth: 1,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 48,
        backgroundColor:'#1c1f26',
        shadowColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderTopWidth: 5,
    },
    colorPalette: {
        flexDirection: 'row',
        padding: 4,
        right: 5,
        justifyContent: 'space-evenly',
        borderRadius: 20,
        borderColor:Colors.pastelBackgrounds.pastelGreen,

    },
});

export default NoteDetail;