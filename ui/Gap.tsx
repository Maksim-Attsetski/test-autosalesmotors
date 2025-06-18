import React, { FC } from 'react';
import { View } from 'react-native';

interface IProps {
  x?: number | 'auto';
  y?: number | 'auto';
}

const Gap: FC<IProps> = ({ x = 0, y = 8 }) => {
  return <View style={{ marginHorizontal: x, marginVertical: y }} />;
};

export default Gap;
