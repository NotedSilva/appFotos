import {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage, firestore, storage} from "../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";



export default function Home() {
    const [img, setImg] = useState("");
    const [file, setFile] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(fire, "files"),(snapshot) =>{
            snapshot.docChanges().forEach((change) => {
                if(change.type === "added"){
                    setFile((prevFiles) => [...prevFiles, change.doc.data()]);
                }
            });
        })
        return () => unsubscribe();
    }, []);
    async function uploadImage(uri, fileType) {
        const res = await fetch(uri);
        const blob = await res.blob();
        const storageRef = ref(storage, "");
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            "state_changed",
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (DownloadURL) => {
                    await saveRecord(fileType, DownloadURL, new Date().toISOString());
                    setImg("");
                });
            }
        )
    }
}

async function saveRecord(fileType, url, createdAt){
    try {
        const docRef = await addDoc(collection,(firestore, "files"), {
            fileType,
            url,
            createdAt,
        })
    } catch (e) {
        console.log(e);
    }

    return (
        <View>
            <Text>Minhas Fotos Lindas</Text>
            <FlatList
                data={file}
                keyExtractor={(item) => item.url}
                renderItem={({item}) => {
                    if (item.fileType === "img"){
                        return (
                            <Image
                                source={{uri:item.url}}
                                style={estilo.fotos}
                            />
                        )
                    }
                }}
                numColumns={2}
            
            />
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fotos: {
        width: '200px',
        height: '200px'
    }
})