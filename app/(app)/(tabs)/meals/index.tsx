import { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useTheme, Searchbar, AnimatedFAB } from "react-native-paper";
import MealCard from "@components/meals/MealCard";
import { useMeal } from "@components/meals/MealContext";
import { router } from "expo-router";

const Meals = () => {
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { meals } = useMeal();
  const [searchInput, setSearchInput] = useState<string>("");
  const [extended, setExtended] = useState<boolean>(true);

  const filterMeals = () => {
    const lowerCaseSearch = searchInput.toLowerCase();
    return meals.filter((m) => m.name.toLowerCase().includes(lowerCaseSearch));
  };

  const handleOnAddMeal = () => {
    router.push("/meals/newMeal");
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
        data={filterMeals()}
        renderItem={({ item }) => <MealCard meal={item} />}
        keyExtractor={(meal) => meal.id.toString()}
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

export default Meals;

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
      // borderColor: colors.outlineVariant,
      // borderBottomWidth: 2,
    },
    fabStyle: {
      bottom: 16,
      right: 16,
      position: "absolute",
    },
  });
