import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import { useState, useEffect } from "react";

export type Props = {
  getValues?: (input: string) => Promise<any[]>;
  renderChild?: any;
  transformData?: (item) => string;
};

function AutoComplete(props: Props) {
  const [showSuggestions, setShowSuggestions] = useState(() => false);

  const [suggestions, setSuggestions] = useState(() => []);

  const [inputVal, setInputVal] = useState(() => "");

  function setInputValue(value: string) {
    setInputVal(value);
  }

  function handleClick(item) {
    setInputValue(transform(item));
    setShowSuggestions(false);
  }

  function fetchVals(city: string) {
    if (props.getValues) {
      return props.getValues(city);
    }
    return fetch(
      `http://universities.hipolabs.com/search?name=${city}&country=united+states`
    ).then((x) => x.json());
  }

  function transform(x) {
    return props.transformData ? props.transformData(x) : x.name;
  }

  useEffect(() => {
    fetchVals(inputVal).then((newVals) => {
      if (!newVals?.filter) {
        console.error("Invalid response from getValues:", newVals);
        return;
      }
      setSuggestions(
        newVals.filter((data) =>
          transform(data).toLowerCase().includes(inputVal.toLowerCase())
        )
      );
    });
  }, [inputVal, props.getValues]);

  return (
    <View style={styles.view1}>
      <Text>Autocomplete:</Text>
      <View style={styles.view2}>
        <TextInput
          placeholder="Search for a U.S. university"
          value={inputVal}
          onChange={(event) => setInputVal(event.target.value)}
          onFocus={(event) => setShowSuggestions(true)}
          style={styles.textInput1}
        />
        <Button
          onPress={(event) => {
            setInputVal("");
            setShowSuggestions(false);
          }}
          style={styles.button1}
        >
          <Text>X</Text>
        </Button>
      </View>
      {suggestions.length > 0 && showSuggestions ? (
        <View style={styles.view3}>
          {suggestions?.map((item, idx) => (
            <Pressable
              key={idx}
              onPress={(event) => handleClick(item)}
              style={styles.pressable1}
            >
              {props.renderChild ? (
                <props.renderChild item={item} />
              ) : (
                <View>
                  <Text>{transform(item)}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  view1: { padding: 10, maxWidth: 700 },
  view2: {
    position: "relative",
    display: "flex",
    gap: 16,
    alignItems: "stretch",
  },
  textInput1: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.25rem",
    borderWidth: 1,
    borderColor: "#000000",
    width: "100%",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  button1: {
    cursor: "pointer",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.25rem",
    color: "#ffffff",
    backgroundColor: "#EF4444",
  },
  view3: {
    borderRadius: "0.25rem",
    height: "10rem",
    margin: "unset",
    padding: "unset",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  pressable1: {
    display: "flex",
    padding: "0.5rem",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    cursor: "pointer",
    ":hover": { backgroundColor: "#F3F4F6" },
  },
});

export default AutoComplete;
