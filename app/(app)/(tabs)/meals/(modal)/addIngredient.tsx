import { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTheme, Searchbar } from "react-native-paper";
import { router } from "expo-router";
import { useEditMeal } from "@components/meals/EditMealContext";
import IngredientCard from "@components/meals/ingredient/IngredientCard";
import { useIngredient } from "@components/meals/ingredient/IngredientContext";
import { Ingredient } from "@components/meals/types";

const AddIngredient = () => {
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { ingredients, createIngredient } = useIngredient();
  const { setMealDetail } = useEditMeal();
  const [searchInput, setSearchInput] = useState<string>("");

  const filterIngredients = () => {
    const lowerCaseSearch = searchInput.toLowerCase();
    return ingredients.filter((m) =>
      m.name.toLowerCase().includes(lowerCaseSearch)
    );
  };

  const handleOnSelect = (item: Ingredient) => {
    setMealDetail((prev) => {
      const newMealDetails = { ...prev };
      newMealDetails.ingredients[item.id] = {
        ...item,
        quantity: 1,
      };
      return newMealDetails;
    });
    router.back();
  };

  const handleOnAdd = async () => {
    const newIngred = await createIngredient(searchInput);
    setMealDetail((prev) => {
      const newMealDetails = { ...prev };
      newMealDetails.ingredients[newIngred.id] = {
        ...newIngred,
        quantity: 1,
      };
      return newMealDetails;
    });
    router.back();
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
        data={filterIngredients()}
        ItemSeparatorComponent={() => <View style={style.separator} />}
        renderItem={({ item }) => (
          <IngredientCard ingredient={item} onSelect={handleOnSelect} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={style.footer}>
        <TouchableOpacity style={style.addButton} onPress={handleOnAdd}>
          <Text style={style.addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddIngredient;

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
      paddingVertical: 8,
    },
    separator: {
      borderColor: colors.outlineVariant,
      borderBottomWidth: 1,
    },
    footer: {
      padding: 12,
      backgroundColor: colors.background,
    },
    addButton: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      padding: 12,
      borderRadius: 12,
    },
    addText: {
      fontSize: 18,
      fontFamily: "Inter_600SemiBold",
      color: colors.background,
    },
  });
