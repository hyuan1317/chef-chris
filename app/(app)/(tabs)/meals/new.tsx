import { Link, router } from "expo-router";
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
import foodImg from "@assets/food.jpg";
import { IngredientWithQty } from "@components/ingredient/types";
import DismissKeyboardView from "@components/shared/DismissKeyboardView";
import { useEditMeal } from "@components/meals/EditMealContext";
import { useMeal } from "@components/meals/MealContext";

const NewMeal = () => {
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { createMeal } = useMeal();
  const { editMealState, setEditMealState } = useEditMeal();

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

  const handleOnCreate = async () => {
    const { name, ingredients } = editMealState;
    const meal = {
      name,
      ingredients: Object.values(ingredients),
    };
    try {
      await createMeal(meal);
      router.back();
    } catch {
      // error
    }
  };

  const renderIngredientRow = (ingredient: IngredientWithQty) => (
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
              value={editMealState.name}
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
        data={Object.values(editMealState.ingredients)}
        renderItem={({ item }) => renderIngredientRow(item)}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={style.footer}>
        <TouchableOpacity style={style.updateButton} onPress={handleOnCreate}>
          <Text style={style.updateText}>Create</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboardView>
  );
};

export default NewMeal;

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
