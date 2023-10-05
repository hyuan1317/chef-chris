import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

interface ITab {
  name: string;
  content: React.ReactNode;
}

interface FromTabs {
  onSelect?: (tab: ITab) => void;
  activeTabName?: string;
  initialActive?: boolean;
}

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ITab>();
  const theme = useTheme();
  const style = makeStyles(theme.colors);

  return (
    <View style={style.wrapper}>
      <View style={style.tabsContainer}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            onSelect: setActiveTab,
            activeTabName: activeTab?.name,
            initialActive: index === 0,
          });
        })}
      </View>
      <View style={style.body}>{activeTab?.content}</View>
    </View>
  );
};

Tabs.Tab = ({
  name,
  content,
  onSelect,
  activeTabName,
  initialActive,
}: ITab & FromTabs) => {
  const theme = useTheme();
  const style = makeStyles(theme.colors);

  useEffect(() => {
    if (initialActive) onSelectTab();
  }, []);

  const onSelectTab = () => {
    onSelect({
      name,
      content,
    });
  };

  const isActive = name === activeTabName;

  return (
    <Pressable
      style={[style.tab, isActive && style.active]}
      onPress={onSelectTab}
    >
      <Text style={style.tabTitle}>{name}</Text>
    </Pressable>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    tabsContainer: {
      backgroundColor: colors.background,
      flexDirection: "row",
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 16,
      paddingBottom: 16,
    },
    active: {
      borderColor: colors.primary,
      borderBottomWidth: 2,
    },
    tabTitle: {
      fontFamily: "Inter_900Black",
      fontSize: 16,
    },
    body: {
      flex: 1,
      padding: 8,
    },
  });

export default Tabs;
