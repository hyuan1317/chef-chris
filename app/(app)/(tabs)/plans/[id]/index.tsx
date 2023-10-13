import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { usePlan } from "@components/plans/PlanContext";
import { PlanDetail, EditPlanState } from "@components/plans/types";
import { useEditPlan } from "@components/plans/EditPlanContext";
import PlanForm from "@components/plans/PlanForm";

const EditPlan = () => {
  const { id } = useLocalSearchParams();
  const { plans, editPlan } = usePlan();
  const { setEditPlanState, reset } = useEditPlan();

  useEffect(() => {
    const plan = plans.find((m) => m.id === Number(id));
    setEditPlanState(parsePlan(plan));

    return reset;
  }, []);

  const handleOnSave = async (plan: PlanDetail) => {
    editPlan(plan);
  };

  return <PlanForm submitTItle="Save" onSubmit={handleOnSave} />;
};

export default EditPlan;

const parsePlan = (plan: PlanDetail): EditPlanState => {
  const details: EditPlanState = {
    id: plan.id,
    name: plan.name,
    time: plan.time,
    completed: plan.completed,
    meals: {},
    ingredients: {},
  };

  plan.meals.forEach((i) => {
    details.meals[i.id] = { ...i };
  });

  plan.ingredients.forEach((i) => {
    details.ingredients[i.id] = { ...i };
  });

  return details;
};
