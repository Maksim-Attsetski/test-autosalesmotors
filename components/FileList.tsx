import { Text } from "@/ui";
import React, { FC } from "react";
import { Dimensions, FlatList, Image, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get("screen").width - 32;

interface IProps {
  files: any[];
  clearFiles: (name?: string) => void;
}

const FileList: FC<IProps> = ({ files, clearFiles }) => {
  return (
    <FlatList
      data={files}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => clearFiles(item.name)}>
            <Text>❌</Text>
          </TouchableOpacity>
          <Image source={{ uri: item.uri, width: screenWidth, height: 200 }} />
        </View>
      )}
    />
  );
};

export default FileList;
