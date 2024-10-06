import "@/assets/globals.css";
import store from "@/toolkit/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
