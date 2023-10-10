import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useTheme, IconButton } from "react-native-paper";
import { useEditPlan } from "@components/plans/EditPlanContext";
import Tabs from "@components/shared/Tabs";
import { PlanDetail } from "@components/plans/types";
import PlanFormMealList from "./PlanFormMealList";
import PlanFormIngredientList from "./PlanFormIngredientList";
import { Meal } from "@components/meals/types";

interface PlanFormProps {
  submitTItle: string;
  onSubmit: (plan: PlanDetail) => Promise<void>;
}

const PlanForm = (props: PlanFormProps) => {
  const { onSubmit, submitTItle } = props;
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { editPlanState, setEditPlanState } = useEditPlan();

  const handleOnChangeName = (text) => {
    setEditPlanState((prev) => ({
      ...prev,
      name: text,
    }));
  };

  const handleOnClose = () => {
    router.back();
  };

  const handleOnSubmit = async () => {
    const { id, name, time, meals, ingredients } = editPlanState;

    const formatMeals = Object.values(meals).map((m) => {
      const formatMeal: Meal = {
        id: m.id,
        name: m.name,
        ingredients: Object.values(m.ingredients),
      };
      return formatMeal;
    });

    const plan = {
      id,
      name,
      time,
      meals: formatMeals,
      ingredients: Object.values(ingredients),
    };
    try {
      await onSubmit(plan);
      router.back();
    } catch {
      // error
    }
  };

  return (
    <SafeAreaView style={style.wrapper}>
      <View style={style.header}>
        <IconButton
          style={style.closeIcon}
          icon="close"
          size={24}
          iconColor="#ffffff"
          onPress={handleOnClose}
        />
        <TextInput
          placeholder="Enter Plan Name..."
          value={editPlanState.name}
          onChangeText={handleOnChangeName}
          style={style.nameInput}
          placeholderTextColor="#1c1e21"
        />
      </View>
      <Tabs>
        <Tabs.Tab name="Meals" content={PlanFormMealList} />
        <Tabs.Tab name="Items" content={PlanFormIngredientList} />
      </Tabs>
      <View style={style.footer}>
        <TouchableOpacity style={style.updateButton} onPress={handleOnSubmit}>
          <Text style={style.updateText}>{submitTItle}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PlanForm;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      backgroundColor: colors.background,
      padding: 8,
      borderBottomWidth: 1,
      borderColor: colors.outlineVariant,
      alignItems: "center",
      justifyContent: "center",
    },
    closeIcon: {
      backgroundColor: "#1c1e21",
      color: colors.background,
      borderRadius: 50,
      height: 40,
      width: 40,
      position: "absolute",
      left: 8,
    },
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
    nameInput: {
      marginLeft: 20,
      width: "50%",
      height: 40,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
      borderRadius: 8,
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
