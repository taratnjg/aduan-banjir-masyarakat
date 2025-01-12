import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import RouteList from "./RouteList";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={RouteList} />
    </Provider>
  );
}

export default App;
