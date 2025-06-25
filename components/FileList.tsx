import { Text } from "@/ui";
import React, { FC } from "react";
import { Dimensions, FlatList, Image, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get("screen").width - 32;

interface IProps {
  files: any[];
  clearFiles: (name?: string) => void;
  canDelete?: boolean;
}

const FileList: FC<IProps> = ({ files, clearFiles, canDelete = true }) => {
  return (
    <FlatList
      data={files}
      keyExtractor={(f) => f.name}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item }) => (
        <View>
          {canDelete && (
            <TouchableOpacity onPress={() => clearFiles(item.name)}>
              <Text>❌</Text>
            </TouchableOpacity>
          )}
          <Image source={{ uri: item.uri, width: screenWidth, height: 200 }} />
        </View>
      )}
    />
  );
};

export default FileList;
