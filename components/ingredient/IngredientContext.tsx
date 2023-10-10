import React, { createContext, useContext, useEffect, useState } from "react";
import * as ingredientService from "@services/ingredientService";
import { Ingredient } from "../meals/types";

interface IngredientContextValue {
  ingredients: Ingredient[];
  createIngredient: (name: string) => Promise<Ingredient>;
}

const IngredientContext = createContext<IngredientContextValue>({
  ingredients: [],
  createIngredient: undefined,
});

export default function IngredientProvider({ children }) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const data = await ingredientService.getIngredients();
      setIngredients(data);
    } catch {
      // error
    }
  };

  const createIngredient = async (name: string) => {
    try {
      const data = await ingredientService.createIngredient(name);
      fetchIngredients();
      return data;
    } catch {
      // error
    }
  };

  return (
    <IngredientContext.Provider value={{ ingredients, createIngredient }}>
      {children}
    </IngredientContext.Provider>
  );
}

export const useIngredient = () => {
  const ctx = useContext(IngredientContext);
  return ctx;
};

const mockIngredients: Ingredient[] = [
  {
    id: 99,
    name: "Jalapeno",
  },
  {
    id: 100,
    name: "Potato",
  },
];
