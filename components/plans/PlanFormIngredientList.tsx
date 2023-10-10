import { Link, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useTheme, IconButton } from "react-native-paper";
import { useEditPlan } from "@components/plans/EditPlanContext";
import IngredientRow from "@components/ingredient/IngredientRow";
import { IngredientWithQty } from "@components/ingredient/types";

export default function PlanFormIngredientList() {
  const { id = "new" } = useLocalSearchParams();
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { editPlanState, setEditPlanState } = useEditPlan();

  const handleOnQtyChange = (ingredId) => (text) => {
    setEditPlanState((prev) => {
      const newPlanDetails = { ...prev };
      newPlanDetails.ingredients[ingredId].quantity = Number(text);
      return newPlanDetails;
    });
  };

  const handleOnPlusQty = (ingredId) => () => {
    setEditPlanState((prev) => {
      const newPlanDetails = { ...prev };
      newPlanDetails.ingredients[ingredId].quantity += 1;
      return newPlanDetails;
    });
  };

  const handleOnMinusQty = (ingredId) => () => {
    if (editPlanState.ingredients[ingredId].quantity >= 2) {
      setEditPlanState((prev) => {
        const newPlanDetails = { ...prev };
        newPlanDetails.ingredients[ingredId].quantity -= 1;
        return newPlanDetails;
      });
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
    <FlatList
      ListFooterComponent={
        <Link href={`/plans/${id}/addIngredient`} asChild>
          <TouchableOpacity style={style.addButton}>
            <IconButton style={style.addIcon} icon="plus" size={28} />
            <Text style={style.addText}>Add</Text>
          </TouchableOpacity>
        </Link>
      }
      ItemSeparatorComponent={() => <View style={style.separator} />}
      data={Object.values(editPlanState.ingredients)}
      renderItem={({ item }) => renderIngredientRow(item)}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={style.flatListStyle}
    />
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    flatListStyle: {
      flexGrow: 1,
      padding: 8,
    },
    separator: {
      borderColor: colors.outlineVariant,
      borderBottomWidth: 1,
    },
    addButton: {
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
    addIcon: {
      width: 28,
    },
    addText: {},
  });
