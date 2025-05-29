import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { summarizeText } from "../api/summarize";

export default function SummaryScreen() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    try {
      const result = await summarizeText(input);
      setSummary(result);
    } catch (error) {
      setSummary("요약 실패");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="요약할 내용을 입력"
        style={styles.input}
        value={input}
        onChangeText={setInput}
        multiline
      />
      <Button title="요약 요청" onPress={handleSummarize} />
      <Text style={styles.output}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, minHeight: 100 },
  output: { marginTop: 20, fontSize: 16, color: "black" }
});
