import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#4C1D95",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#7C2D12",
              color: "#fff",
            },
          },
        }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
