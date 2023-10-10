import { useEffect } from "react";
import { Link, useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { TextInput, useTheme, IconButton } from "react-native-paper";
import { useMeal } from "@components/meals/MealContext";
import foodImg from "@assets/food.jpg";
import { Meal, EditMealState } from "@components/meals/types";
import { IngredientWithQty } from "@components/ingredient/types";
import { useEditMeal } from "@components/meals/EditMealContext";
import IngredientRow from "@components/ingredient/IngredientRow";

const EditMeal = () => {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { meals, editMeal } = useMeal();
  const { editMealState, setEditMealState } = useEditMeal();

  useEffect(() => {
    const meal = meals.find((m) => m.id === Number(id));
    setEditMealState(parseMeal(meal));
  }, []);

  const handleOnChangeName = (text) => {
    setEditMealState((prev) => ({
      ...prev,
      name: text,
    }));
  };

  const handleOnQtyChange = (ingredId) => (text) => {
    setEditMealState((prev) => {
      const newMealDetails = { ...prev };
      newMealDetails.ingredients[ingredId].quantity = Number(text);
      return newMealDetails;
    });
  };

  const handleOnPlusQty = (ingredId) => () => {
    setEditMealState((prev) => {
      const newMealDetails = { ...prev };
      newMealDetails.ingredients[ingredId].quantity += 1;
      return newMealDetails;
    });
  };

  const handleOnMinusQty = (ingredId) => () => {
    if (editMealState.ingredients[ingredId].quantity >= 2) {
      setEditMealState((prev) => {
        const newMealDetails = { ...prev };
        newMealDetails.ingredients[ingredId].quantity -= 1;
        return newMealDetails;
      });
    }
  };

  const handleOnSave = async () => {
    const { id, name, ingredients } = editMealState;
    const meal = {
      id,
      name,
      ingredients: Object.values(ingredients),
    };
    try {
      await editMeal(meal);
      router.back();
    } catch {
      // error
    }
  };

  const renderIngredientRow = (ingredient: IngredientWithQty) => {
    const { id } = ingredient;
    return (
      <IngredientRow
        ingredient={ingredient}
        onPlus={handleOnPlusQty(id)}
        onMinus={handleOnMinusQty(id)}
        onQtyChange={handleOnQtyChange(id)}
      />
    );
  };

  return (
    <View style={style.wrapper}>
      <FlatList
        ListHeaderComponent={
          <View style={style.header}>
            <Image style={style.image} source={foodImg} />
            <TextInput
              label="Name"
              mode="outlined"
              value={editMealState.name}
              onChangeText={handleOnChangeName}
              style={style.nameInput}
            />
          </View>
        }
        ListFooterComponent={
          <Link href={`/meals/${id}/addIngredient`} asChild>
            <TouchableOpacity style={style.addIngredientButton}>
              <IconButton
                style={style.addIngredientIcon}
                icon="plus"
                size={28}
              />
              <Text style={style.addIngredientText}>Add</Text>
            </TouchableOpacity>
          </Link>
        }
        ItemSeparatorComponent={() => <View style={style.separator} />}
        data={Object.values(editMealState.ingredients)}
        renderItem={({ item }) => renderIngredientRow(item)}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={style.flatListStyle}
      />
      <View style={style.footer}>
        <TouchableOpacity style={style.updateButton} onPress={handleOnSave}>
          <Text style={style.updateText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditMeal;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    flatListStyle: {
      flexGrow: 1,
    },
    separator: {
      borderColor: colors.outlineVariant,
      borderBottomWidth: 1,
    },
    image: {
      width: "100%",
      height: 100,
    },
    header: {
      padding: 12,
      backgroundColor: colors.background,
      marginBottom: 12,
    },
    addIngredientButton: {
      height: 40,
      flexDirection: "row",
      margin: 12,
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 20,
      alignSelf: "center",
      paddingVertical: 0,
      paddingHorizontal: 20,
      borderColor: colors.secondary,
      borderWidth: 1,
    },
    addIngredientIcon: {
      width: 28,
    },
    addIngredientText: {},
    nameInput: {
      width: "100%",
      marginTop: 10,
    },
    footer: {
      padding: 12,
      backgroundColor: colors.background,
    },
    updateButton: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      padding: 12,
      borderRadius: 12,
    },
    updateText: {
      fontSize: 18,
      fontFamily: "Inter_600SemiBold",
      color: colors.background,
    },
  });

const parseMeal = (meal: Meal): EditMealState => {
  const details: EditMealState = {
    id: meal.id,
    name: meal.name,
    ingredients: {},
  };

  meal.ingredients.forEach((i) => (details.ingredients[i.id] = { ...i }));

  return details;
};
