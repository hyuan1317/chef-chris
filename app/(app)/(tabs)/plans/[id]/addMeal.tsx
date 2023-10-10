import AddMealView from "@components/meals/AddMealView";
import { Meal } from "@components/meals/types";
import { useEditPlan } from "@components/plans/EditPlanContext";
import { router } from "expo-router";

const AddMeal = () => {
  const { setEditPlanState } = useEditPlan();

  const handleOnAdd = (meal: Meal) => {
    setEditPlanState((prev) => {
      const newPlanDetails = { ...prev };
      newPlanDetails.meals[meal.id] = {
        ...meal,
      };
      return newPlanDetails;
    });
    router.back();
  };

  return <AddMealView onAdd={handleOnAdd} />;
};

export default AddMeal;
