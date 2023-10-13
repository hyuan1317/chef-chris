import { useLocalSearchParams, Stack } from "expo-router";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import { IngredientWithQty } from "@components/ingredient/types";
import IngredientRow from "@components/ingredient/IngredientRow";
import { useEditPlan } from "@components/plans/EditPlanContext";

const EditPlanMeal = () => {
  const { mealId } = useLocalSearchParams();
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { editPlanState, setEditPlanState } = useEditPlan();

  const handleOnQtyChange = (ingredId) => (text) => {
    setEditPlanState((prev) => {
      const newPlanDetails = { ...prev };
      const targetIngredient = newPlanDetails.meals[
        Number(mealId)
      ].ingredients.find((i) => i.id === ingredId);
      targetIngredient.quantity = Number(text);
      return newPlanDetails;
    });
  };

  const handleOnPlusQty = (ingredId) => () => {
    setEditPlanState((prev) => {
      const newPlanDetails = { ...prev };
      const targetIngredient = newPlanDetails.meals[
        Number(mealId)
      ].ingredients.find((i) => i.id === ingredId);
      targetIngredient.quantity += 1;
      return newPlanDetails;
    });
  };

  const handleOnMinusQty = (ingredId) => () => {
    if (
      editPlanState.meals[Number(mealId)].ingredients.find(
        (i) => i.id === ingredId
      ).quantity >= 2
    ) {
      setEditPlanState((prev) => {
        const newPlanDetails = { ...prev };
        const targetIngredient = newPlanDetails.meals[
          Number(mealId)
        ].ingredients.find((i) => i.id === ingredId);
        targetIngredient.quantity -= 1;
        return newPlanDetails;
      });
    }
  };

  const handleOnDelete = (ingredId) => () => {
    setEditPlanState((prev) => {
      const newPlanDetails = { ...prev };
      const targetMeal = newPlanDetails.meals[Number(mealId)];
      targetMeal.ingredients = targetMeal.ingredients.filter(
        (i) => i.id !== ingredId
      );
      return newPlanDetails;
    });
  };

  const renderIngredientRow = (ingredient: IngredientWithQty) => {
    const { id } = ingredient;
    return (
      <IngredientRow
        ingredient={ingredient}
        onPlus={handleOnPlusQty(id)}
        onMinus={handleOnMinusQty(id)}
        onQtyChange={handleOnQtyChange(id)}
        onDelete={handleOnDelete(id)}
      />
    );
  };

  return (
    <View style={style.wrapper}>
      <Stack.Screen
        options={{
          title: editPlanState.meals[Number(mealId)].name,
        }}
      />
      <FlatList
        ItemSeparatorComponent={() => <View style={style.separator} />}
        data={Object.values(editPlanState.meals[Number(mealId)].ingredients)}
        renderItem={({ item }) => renderIngredientRow(item)}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={style.flatListStyle}
      />
    </View>
  );
};

export default EditPlanMeal;

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
  });
