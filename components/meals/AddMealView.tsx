import { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useTheme, Searchbar } from "react-native-paper";
import MealCard from "@components/meals/MealCard";
import { useMeal } from "@components/meals/MealContext";
import { Meal } from "./types";

interface Props {
  onAdd: (meal: Meal) => void;
}

const AddMealView = (props: Props) => {
  const { onAdd } = props;
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { meals } = useMeal();
  const [searchInput, setSearchInput] = useState<string>("");

  const filterMeals = () => {
    const lowerCaseSearch = searchInput.toLowerCase();
    return meals.filter((m) => m.name.toLowerCase().includes(lowerCaseSearch));
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
        renderItem={({ item }) => <MealCard onSelect={onAdd} meal={item} />}
        keyExtractor={(meal) => meal.id.toString()}
      />
    </SafeAreaView>
  );
};

export default AddMealView;

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
  });
