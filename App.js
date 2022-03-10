import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

import NamzTime from "./NamzTime";
export default function App() {
  return (
    <ReduxProvider store={store}>
      <NamzTime />
    </ReduxProvider>
  );
}
