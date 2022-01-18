import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
useState;
export default function App() {
  const [city, setcity] = useState("Karachi");
  const [country, setCountry] = useState("PAK");
  const [Fajr, setFajr] = useState("");
  const [Sunrise, setSunrise] = useState("");
  const [Dhuhr, setDhuhr] = useState("");
  const [Asr, setAsr] = useState("");
  const [Maghrib, setMaghrib] = useState("");
  const [Isha, setIsha] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        // `https://api.aladhan.com/v1/timingsByAddress/18-01-2022?address=Karachi,PAK&method=8`
        `https://api.aladhan.com/v1/timingsByAddress/18-01-2022?address=${city},${country}&method=8`
      );
      const resp = res.data.data.timings.Fajr;
      console.log(resp);
      const response = resp.date;
      console.log(response);
    };
    getData();
  });
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
