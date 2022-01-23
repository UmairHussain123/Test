import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List, ActivityIndicator } from "react-native-paper";
export default function App() {
  const [city, setcity] = useState("Karachi");
  const [country, setCountry] = useState("PAK");
  const [Fajr, setFajr] = useState("");
  const [Sunrise, setSunrise] = useState("");
  const [Dhuhr, setDhuhr] = useState("");
  const [Asr, setAsr] = useState("");
  const [Maghrib, setMaghrib] = useState("");
  const [Isha, setIsha] = useState("");
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var getDate = date + "-" + month + "-" + year;
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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    const loc = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    };

    loc();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "green",
          fontWeight: "bold",
          fontSize: 20,
          alignSelf: "center",
        }}
      >
        Namz Timings Today
      </Text>
      <View>
        <List.Item
          title="Date"
          description={"Date: " + getDate}
          left={(props) => <List.Icon icon="calendar" />}
        />
      </View>
      <List.Item
        title="Fajr"
        description={
          Fajr === null || Fajr === "" ? (
            <ActivityIndicator animating={true} color="green" />
          ) : (
            <Text style={{ color: "green" }}>Time: {Fajr}</Text>
          )
        }
        left={(props) => <List.Icon icon="clock" />}
      />
      <List.Item
        title="Sunrise"
        description={
          Sunrise === null || Sunrise === "" ? (
            <ActivityIndicator animating={true} color="green" />
          ) : (
            <Text style={{ color: "green" }}>Time: {Sunrise}</Text>
          )
        }
        left={(props) => <List.Icon icon="clock" />}
      />
      <List.Item
        title="Dhuhr"
        description={
          Dhuhr === null || Dhuhr === "" ? (
            <ActivityIndicator animating={true} color="green" />
          ) : (
            <Text style={{ color: "green" }}>Time: {Dhuhr}</Text>
          )
        }
        left={(props) => <List.Icon icon="clock" />}
      />
      <List.Item
        title="Asr"
        description={
          Asr === null || Asr === "" ? (
            <ActivityIndicator animating={true} color="green" />
          ) : (
            <Text style={{ color: "green" }}>Time: {Asr}</Text>
          )
        }
        left={(props) => <List.Icon icon="clock" />}
      />
      <List.Item
        title="Maghrib"
        description={
          Maghrib === null || Maghrib === "" ? (
            <ActivityIndicator animating={true} color="green" />
          ) : (
            <Text style={{ color: "green" }}>Time: {Maghrib}</Text>
          )
        }
        left={(props) => <List.Icon icon="clock" />}
      />
      <List.Item
        title="Isha"
        description={
          Isha === null || Isha === "" ? (
            <ActivityIndicator animating={true} color="green" />
          ) : (
            <Text style={{ color: "green" }}>Time: {Isha}</Text>
          )
        }
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
