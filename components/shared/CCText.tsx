import { Text, StyleProp, TextStyle, StyleSheet } from "react-native";
import React from "react";

interface Props {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export default function CCText(props: Props) {
  const { style, children } = props;
  return <Text style={[styles.ccText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  ccText: {
    fontFamily: "Inter_400Regular",
  },
});
