import React from "react";
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import discordImg from "../../assets/discord.png";

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  children: string;
}

export function ButtonIcon({ children, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={discordImg} style={styles.icon}/>
      </View>
      <Text style={styles.title}>{children}</Text>
    </TouchableOpacity>
  )
}