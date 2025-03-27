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
import { useState } from "react";

function TodoApp(props: any) {
  const [list, setList] = useState(() => ["hello", "world"]);

  const [newItemName, setNewItemName] = useState(() => "");

  function addItem() {
    if (!newItemName) {
      return;
    }
    setList([...list, newItemName]);
  }

  function deleteItem(idx: number) {
    setList(list.filter((x, i) => i !== idx));
  }

  return (
    <View style={styles.view1}>
      <View>
        <Text>TO-DO list:</Text>
      </View>
      <View style={styles.view2}>
        <TextInput
          placeholder="Add a new item"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
          style={styles.textInput1}
        />
        <Button onPress={(event) => addItem()} style={styles.button1}>
          <Text>Add</Text>
        </Button>
      </View>
      <View style={styles.view3}>
        <View style={styles.view4}>
          {list?.map((item, idx) => (
            <View key={idx} style={styles.view5}>
              <View>
                <Text>{item}</Text>
              </View>
              <Button
                onPress={(event) => {
                  deleteItem(idx);
                }}
                style={styles.button2}
              >
                <Text>Delete</Text>
              </Button>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: { padding: 10, maxWidth: 700 },
  view2: { display: "flex", width: "100%", gap: 16, alignItems: "stretch" },
  textInput1: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.25rem",
    flexGrow: "1",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  button1: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.25rem",
    fontWeight: "700",
    color: "#ffffff",
    backgroundColor: "#3B82F6",
    cursor: "pointer",
  },
  view3: { marginTop: "1rem" },
  view4: {
    borderRadius: "0.25rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    margin: "unset",
    padding: "unset",
  },
  view5: {
    display: "flex",
    padding: "0.625rem",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    gap: 16,
  },
  button2: {
    cursor: "pointer",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.25rem",
    color: "#ffffff",
    backgroundColor: "#EF4444",
  },
});

export default TodoApp;
