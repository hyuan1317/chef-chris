import { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { router } from "expo-router";
import { useTheme, Searchbar, AnimatedFAB } from "react-native-paper";
import { usePlan } from "@components/plans/PlanContext";
import PlanCard from "@components/plans/PlanCard";

const Plans = () => {
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { plans } = usePlan();
  const [searchInput, setSearchInput] = useState<string>("");
  const [extended, setExtended] = useState<boolean>(true);

  const filterPlans = () => {
    const lowerCaseSearch = searchInput.toLowerCase();
    return plans.filter((p) => p.name.toLowerCase().includes(lowerCaseSearch));
  };

  const handleOnAddMeal = () => {
    router.push("/plans/new");
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchInput}
          value={searchInput}
        />
      </View>
      <FlatList
        contentContainerStyle={style.body}
        ItemSeparatorComponent={() => <View style={style.separator} />}
        data={filterPlans()}
        renderItem={({ item }) => <PlanCard plan={item} />}
        keyExtractor={(plan) => plan.id.toString()}
      />
      <AnimatedFAB
        icon={"plus"}
        label={"New"}
        extended={extended}
        onPress={handleOnAddMeal}
        visible={true}
        animateFrom={"right"}
        iconMode="dynamic"
        style={style.fabStyle}
      />
    </SafeAreaView>
  );
};

export default Plans;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.background,
      padding: 8,
      borderBottomWidth: 1,
      borderColor: colors.outlineVariant,
    },
    body: {
      flexGrow: 1,
      padding: 8,
    },
    separator: {
      height: 10,
    },
    fabStyle: {
      bottom: 16,
      right: 16,
      position: "absolute",
    },
  });
