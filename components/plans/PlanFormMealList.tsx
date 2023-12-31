import { Link, router, useLocalSearchParams } from "expo-router";
import { View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CCText from "@components/shared/CCText";
import { useTheme, IconButton } from "react-native-paper";
import { useEditPlan } from "@components/plans/EditPlanContext";
import MealCard from "@components/meals/MealCard";
import { Meal } from "@components/meals/types";

export default function PlanFormMealList() {
  const { id = "new" } = useLocalSearchParams();
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { editPlanState, setEditPlanState } = useEditPlan();

  const handleOnSelectMeal = (meal: Meal) => {
    router.push(`/plans/${id}/${meal.id}`);
  };

  const hanldeOnDeleteMeal = (id: number) => {
    setEditPlanState((prev) => {
      const newPlanDetails = { ...prev };
      delete newPlanDetails.meals[id];
      return newPlanDetails;
    });
  };

  return (
    <FlatList
      ListFooterComponent={
        <Link href={`/plans/${id}/addMeal`} asChild>
          <TouchableOpacity style={style.addButton}>
            <IconButton style={style.addIcon} icon="plus" size={28} />
            <CCText style={style.addText}>Add</CCText>
          </TouchableOpacity>
        </Link>
      }
      ItemSeparatorComponent={() => <View style={style.separator} />}
      data={Object.values(editPlanState.meals)}
      renderItem={({ item }) => (
        <MealCard
          meal={item}
          onSelect={handleOnSelectMeal}
          onDelete={hanldeOnDeleteMeal}
        />
      )}
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
