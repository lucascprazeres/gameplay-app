import React from 'react';
import { ScrollView } from 'react-native';

import { styles } from './styles';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

type Props = {
  selectedCategoryId: string;
  selectCategoryById: (id: string) => void;
  hasCheckBox?: boolean;
};

export function CategorySelect({
  selectedCategoryId,
  selectCategoryById,
  hasCheckBox = false,
}: Props) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map(({ id, title, icon }) => (
        <Category
          key={id}
          title={title}
          icon={icon}
          checked={id === selectedCategoryId}
          onPress={() => selectCategoryById(id)}
          hasCheckBox={hasCheckBox}
        />
      ))}
    </ScrollView>
  );
}
