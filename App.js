import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
export default function App() {
  const [city, setcity] = useState("Karachi");
  const [country, setCountry] = useState("PAK");
  const [Fajr, setFajr] = useState("");
  const [Sunrise, setSunrise] = useState("");
  const [Dhuhr, setDhuhr] = useState("");
  const [Asr, setAsr] = useState("");
  const [Maghrib, setMaghrib] = useState("");
  const [Isha, setIsha] = useState("");
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
  };
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        // `https://api.aladhan.com/v1/timingsByAddress/18-01-2022?address=Karachi,PAK&method=8`
        `https://api.aladhan.com/v1/timingsByAddress/${getCurrentDate}?address=${city},${country}&method=8`
      );
      const fajr = res.data.data.timings.Fajr;
      setFajr(fajr);
      const sunrise = res.data.data.timings.Sunrise;
      setSunrise(sunrise);
      const dhuhr = res.data.data.timings.Dhuhr;
      setDhuhr(dhuhr);
      const asr = res.data.data.timings.Asr;
      setAsr(asr);
      const maghrib = res.data.data.timings.Maghrib;
      setMaghrib(maghrib);
      const isha = res.data.data.timings.Isha;
      setIsha(isha);
      // console.log(new Date());
      getCurrentDate();
    };
    getData();
  });
  return (
    <View style={styles.container}>
      <View>
        <List.Item
          title="Date"
          description={"Time:" + Fajr}
          left={(props) => <List.Icon icon="calendar" />}
        />
      </View>
      <List.Item
        title="Fajr"
        description={"Time:" + Fajr}
        left={(props) => <List.Icon icon="clock" />}
      />
      <List.Item
        title="Sunrise"
        description={"Time:" + Sunrise}
        left={(props) => <List.Icon icon="clock" />}
      />
      <List.Item
        title="Dhuhr"
        description={"Time:" + Dhuhr}
        left={(props) => <List.Icon icon="clock" />}
      />
      <List.Item
        title="Asr"
        description={"Time:" + Asr}
        left={(props) => <List.Icon icon="clock" />}
      />
      <List.Item
        title="Isha"
        description={"Time:" + Isha}
        left={(props) => <List.Icon icon="clock" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
