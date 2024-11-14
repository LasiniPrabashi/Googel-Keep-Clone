
import { View, TextInput, Image, StyleSheet,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Import icons
import React, { useState } from 'react';
import NoteDetail from "@/components/NoteDetail";
import ImageNoteDetails from "../../components/ImageNoteDetails";
import {black, white} from "colorette";

const Home = () => {

    const [search, searchTitle] = useState('');
    const [selectedText, setSelectedText] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);

    const [imageClickText, setImageClickText] = useState(false);
    const [imageClickTextVisible, setImageClickTextVisible] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const handleBannerPress = () => {
        setSelectedText(true);
        setDetailVisible(true); // Show the modal when the banner is pressed
    };

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageClickText(true);
            setImageClickTextVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerMain}>
                    <Image
                        style={styles.tinyLogo}
                        source={{ uri: 'https://img.icons8.com/?size=100&id=OTxpMqWbm71F&format=png&color=000000' }}
                    />
                    <TextInput
                        placeholder="Search your notes"
                        value={search}
                        onChangeText={searchTitle}
                        style={styles.searchInput}
                    />
                    <Image
                        style={styles.tinyLogo}
                        source={{ uri: 'https://img.icons8.com/?size=100&id=114442&format=png&color=000000' }}
                    />
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
            </View>

            <View style={styles.bottomBarRightSide}>
                <TouchableOpacity onPress={() =>handleBannerPress()}>
                    <Image
                        style={styles.plusLogo}
                        source={{ uri: 'https://img.icons8.com/?size=100&id=62888&format=png&color=000000' }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={() => {/* Handle pencil icon action */}}>
                    <FontAwesome name="pencil" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePickImage}>
                    <MaterialIcons name="photo" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {selectedText && (
                <NoteDetail
                    visible={detailVisible}
                    onClose={() => setDetailVisible(false)}
                    note={selectedText}  // Pass the selected note
                />
            )}

            {imageClickText && (
                <ImageNoteDetails
                    visible={imageClickTextVisible}
                    onClose={() => setImageClickTextVisible(false)}// Pass the selected note
                    image={image}
                    setImage={setImage}
                    handlePickImage={handlePickImage}
                />
            )}
        </View>
    );
}

export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#10131a',
        },
        headerContainer: {
            height: 80,
            top:30,
            backgroundColor: '#10131a',
            paddingHorizontal: 15,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        plusLogo: {
            width: 30,
            height: 30,

        }
        ,
        headerMain: {
            width: '100%',
            backgroundColor: '#1c1e2b',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 5,
            borderBottomWidth: 5,
            borderLeftWidth: 5,
            borderRightWidth: 5,
        },
        tinyLogo: {
            width: 40,
            height: 40,
            marginRight: 10,
            backgroundColor: '#1A1A19',
        },
        searchInput: {
            backgroundColor: '#FEF9F2',
            borderRadius: 8,
            padding: 8,
            width: '70%',
        },
        content: {
            marginTop: 100, // Adjust content placement below header
            padding: 20,
        },
        bottomBar: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 60,
            backgroundColor: '#1c1f26',
            shadowColor: '#000',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 20,

            shadowOpacity: 0.2,
            shadowRadius: 5,
            borderTopWidth: 5,
        },
        bottomBarRightSide:{
            zIndex: 2,
            position: 'absolute',
            borderRadius: 15,
            bottom: 50,
            width: '20%',
            right: 40,
            height: 60,
            backgroundColor: '#272a31',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 20,

            borderTopWidth: 5,
            borderBottomWidth: 5,
            borderLeftWidth: 5,
            borderRightWidth:5,
        }
    });



