import { useEffect } from "react";
import { Link, useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput as RNTextInput,
} from "react-native";
import { TextInput, useTheme, IconButton } from "react-native-paper";
import { useMeal } from "@components/meals/MealContext";
import foodImg from "@assets/food.jpg";
import { Meal, MealIngredient, MealDetails } from "@components/meals/types";
import DismissKeyboardView from "@components/DismissKeyboardView";
import { useEditMeal } from "@components/meals/EditMealContext";

const EditMeal = () => {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { meals, editMeal } = useMeal();
  const { mealDetail, setMealDetail } = useEditMeal();

  useEffect(() => {
    const meal = meals.find((m) => m.id === Number(id));
    setMealDetail(parseMeal(meal));
  }, []);

  const handleOnChangeName = (text) => {
    setMealDetail((prev) => ({
      ...prev,
      name: text,
    }));
  };

  const handleOnQtyChange = (ingredId) => (text) => {
    setMealDetail((prev) => {
      const newMealDetails = { ...prev };
      newMealDetails.ingredients[ingredId].quantity = Number(text);
      return newMealDetails;
    });
  };

  const handleOnPlusQty = (ingredId) => () => {
    setMealDetail((prev) => {
      const newMealDetails = { ...prev };
      newMealDetails.ingredients[ingredId].quantity += 1;
      return newMealDetails;
    });
  };

  const handleOnMinusQty = (ingredId) => () => {
    if (mealDetail.ingredients[ingredId].quantity >= 2) {
      setMealDetail((prev) => {
        const newMealDetails = { ...prev };
        newMealDetails.ingredients[ingredId].quantity -= 1;
        return newMealDetails;
      });
    }
  };

  const handleOnSave = async () => {
    const { name, ingredients } = mealDetail;
    const meal = {
      id: Number(id),
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

  const renderIngredientRow = (ingredient: MealIngredient) => (
    <View style={style.ingredientRow}>
      <Text style={style.ingredientTitle}>{ingredient.name}</Text>
      <View style={style.ingredientContainer}>
        <TouchableOpacity onPress={handleOnPlusQty(ingredient.id)}>
          <IconButton style={style.ingredientOperator} icon="plus" size={20} />
        </TouchableOpacity>
        <RNTextInput
          style={style.ingredientQty}
          inputMode="decimal"
          keyboardType="number-pad"
          value={ingredient.quantity.toString()}
          onChangeText={handleOnQtyChange(ingredient.id)}
        />
        <TouchableOpacity onPress={handleOnMinusQty(ingredient.id)}>
          <IconButton style={style.ingredientOperator} icon="minus" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <DismissKeyboardView style={style.wrapper}>
      <FlatList
        ListHeaderComponent={
          <View style={style.header}>
            <Image style={style.image} source={foodImg} />
            <TextInput
              label="Name"
              mode="outlined"
              value={mealDetail.name}
              onChangeText={handleOnChangeName}
              style={style.nameInput}
            />
          </View>
        }
        ListFooterComponent={
          <Link href="/meals/addIngredient" asChild>
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
        data={Object.values(mealDetail.ingredients)}
        renderItem={({ item }) => renderIngredientRow(item)}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={style.footer}>
        <TouchableOpacity style={style.updateButton} onPress={handleOnSave}>
          <Text style={style.updateText}>Save</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboardView>
  );
};

export default EditMeal;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
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
    ingredientRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      backgroundColor: colors.background,
      justifyContent: "space-between",
    },
    ingredientContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ingredientTitle: {
      fontFamily: "Inter_900Black",
    },
    ingredientQty: {
      borderColor: colors.outlineVariant,
      borderWidth: 1,
      width: 40,
      height: 40,
      textAlign: "center",
    },
    ingredientOperator: {
      borderColor: colors.outlineVariant,
      borderWidth: 1,
      width: 40,
      height: 40,
      borderRadius: 0,
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

const parseMeal = (meal: Meal): MealDetails => {
  const details: MealDetails = {
    name: meal.name,
    ingredients: {},
  };

  meal.ingredients.forEach((i) => (details.ingredients[i.id] = { ...i }));

  return details;
};
