import { IBaseEntity } from "@/types/shared";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getBaseEntity } from "../utils";

export interface FileInfo extends IBaseEntity {
  uri: string;
  name: string;
  size?: number | null;
  mimeType?: string | null;
}

const storageKey = "@/keys/files";

export const useFiles = (initFiles?: string[], allowedTypes?: DocumentPicker.DocumentPickerAsset["mimeType"]) => {
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    const loadStoredFiles = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) {
          const storedFiles: FileInfo[] = JSON.parse(stored);
          setFiles(storedFiles.filter((file) => (initFiles ?? []).includes(file._id)));
        }
      } catch (error) {
        console.error("Error loading files from storage", error);
      }
    };

    loadStoredFiles();
  }, [initFiles]);

  const saveFilesToStorage = async (filesToSave: FileInfo[]) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(filesToSave));
    } catch (error) {
      console.error("Error saving files to storage", error);
    }
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: allowedTypes ?? "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const formattedFiles: FileInfo[] = result.assets.map((file) => ({
        ...getBaseEntity(),
        uri: file.uri,
        name: file.name,
        size: file.size,
        mimeType: file.mimeType,
      }));

      const updatedFiles = [...files, ...formattedFiles];
      setFiles(updatedFiles);
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось выбрать файл");
      console.error("File pick error:", error);
    }
  };

  const clearFiles = async (_id?: string) => {
    if (_id) setFiles((prev) => prev.filter((f) => f._id !== _id));
    else setFiles([]);
  };

  const clearAllFiles = async () => {
    setFiles([]);
    await AsyncStorage.removeItem(storageKey);
  };

  const saveFiles = async () => {
    setFiles([]);
    const stored = await AsyncStorage.getItem(storageKey);
    if (stored) {
      const storedFiles: FileInfo[] = JSON.parse(stored);
      await saveFilesToStorage([...storedFiles, ...files]);
    }
  };

  return { pickFile, clearFiles, clearAllFiles, saveFiles, files };
};
