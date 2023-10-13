import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import CCText from "./CCText";
import { useTheme } from "react-native-paper";

interface ITab {
  name: string;
  content: React.ElementType;
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

  const TabElement = activeTab?.content;
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
      <View style={style.body}>{TabElement && <TabElement />}</View>
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
      <CCText style={style.tabTitle}>{name}</CCText>
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
    },
  });

export default Tabs;
