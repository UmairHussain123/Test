import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List, ActivityIndicator, Button } from "react-native-paper";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { Provider as ReduxProvider } from "react-redux";
// import store from "../Redux/store";
import { updatenamzData } from "./redux/mainCacheSlice";
export default function NamzTime() {
  const [city, setcity] = useState("Karachi");
  const [country, setCountry] = useState("PAK");
  //   const [Fajr, setFajr] = useState("");
  //   const [Sunrise, setSunrise] = useState("");
  //   const [Dhuhr, setDhuhr] = useState("");
  //   const [Asr, setAsr] = useState("");
  //   const [Maghrib, setMaghrib] = useState("");
  //   const [Isha, setIsha] = useState("");
  const dispatch = useDispatch();
  let mainCache = useSelector((state) => state.mainCache);

  console.log("maincahs", mainCache.namzData);
  const [namzTime, setnamzTime] = useState();
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
  const getData = async () => {
    const res = await axios.get(
      // `https://api.aladhan.com/v1/timingsByAddress/18-01-2022?address=Karachi,PAK&method=8`
      `https://api.aladhan.com/v1/timingsByAddress/${getCurrentDate}?address=${city},${country}&method=8`
    );

    /// redux store
    dispatch(updatenamzData(res.data.data.timings));
  };
  useEffect(() => {
    getCurrentDate();
    if (mainCache.namzData == null) {
      getData();
    }
  }, []);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(">>>>", text);
  }

  return (
    <View style={styles.container}>
      {mainCache.namzData == null ? (
        <ActivityIndicator animating={true} color="green" />
      ) : (
        <View>
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
              <Text style={{ color: "green" }}>
                Time: {mainCache.namzData.Fajr}
              </Text>
            }
            left={(props) => <List.Icon icon="clock" />}
          />
          <List.Item
            title="Sunrise"
            description={
              //   Sunrise === null || Sunrise === "" ? (
              //     <ActivityIndicator animating={true} color="green" />
              //   ) : (
              <Text style={{ color: "green" }}>
                Time: {mainCache.namzData.Sunrise}
              </Text>
              //   )
            }
            left={(props) => <List.Icon icon="clock" />}
          />
          <List.Item
            title="Dhuhr"
            description={
              //   Dhuhr === null || Dhuhr === "" ? (
              //     <ActivityIndicator animating={true} color="green" />
              //   ) : (
              <Text style={{ color: "green" }}>
                Time: {mainCache.namzData.Dhuhr}
              </Text>
              //   )
            }
            left={(props) => <List.Icon icon="clock" />}
          />
          <List.Item
            title="Asr"
            description={
              //   Asr === null || Asr === "" ? (
              //     <ActivityIndicator animating={true} color="green" />
              //   ) : (
              <Text style={{ color: "green" }}>
                Time: {mainCache.namzData.Asr}
              </Text>
              //   )
            }
            left={(props) => <List.Icon icon="clock" />}
          />
          <List.Item
            title="Maghrib"
            description={
              //   Maghrib === null || Maghrib === "" ? (
              //     <ActivityIndicator animating={true} color="green" />
              //   ) : (
              <Text style={{ color: "green" }}>
                Time: {mainCache.namzData.Maghrib}
              </Text>
              //   )
            }
            left={(props) => <List.Icon icon="clock" />}
          />
          <List.Item
            title="Isha"
            description={
              //   Isha === null || Isha === "" ? (
              //     <ActivityIndicator animating={true} color="green" />
              //   ) : (
              <Text style={{ color: "green" }}>
                Time: {mainCache.namzData.Isha}
              </Text>
              //   )
            }
            left={(props) => <List.Icon icon="clock" />}
          />
          <Button
            onPress={() => {
              getData();
            }}
          >
            Refresh
          </Button>
        </View>
      )}
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
