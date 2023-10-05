import { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import DismissKeyboardView from "@components/DismissKeyboardView";
import { useTheme, Searchbar } from "react-native-paper";
import PlanCard, { Plan } from "@components/plans/PlanCard";

const mockPlans: Plan[] = [
  {
    id: 1,
    name: "plan1",
    time: "9/15/2023",
  },
  {
    id: 2,
    name: "plan2",
    time: "9/15/2023",
  },
  {
    id: 3,
    name: "plan3",
    time: "9/15/2023",
  },
  {
    id: 4,
    name: "plan4",
    time: "9/15/2023",
  },
  {
    id: 5,
    name: "plan5",
    time: "9/15/2023",
  },
  {
    id: 6,
    name: "plan6",
    time: "9/15/2023",
  },
  {
    id: 7,
    name: "plan8t",
    time: "9/15/2023",
  },
  {
    id: 8,
    name: "plan7",
    time: "9/15/2023",
  },
];
const Plans = () => {
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const [searchInput, setSearchInput] = useState<string>("");

  const filterPlans = () => {
    const lowerCaseSearch = searchInput.toLowerCase();
    return mockPlans.filter((p) =>
      p.name.toLowerCase().includes(lowerCaseSearch)
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <DismissKeyboardView>
        <View style={style.header}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchInput}
            value={searchInput}
          />
        </View>
        <FlatList
          contentContainerStyle={style.body}
          ItemSeparatorComponent={() => <View style={style.separator} />}
          data={filterPlans()}
          renderItem={({ item }) => <PlanCard plan={item} />}
          keyExtractor={(plan) => plan.id.toString()}
        />
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default Plans;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.background,
      padding: 8,
      borderBottomWidth: 1,
      borderColor: colors.outlineVariant,
    },
    body: {
      flexGrow: 1,
      padding: 8,
    },
    separator: {
      height: 10,
    },
  });
