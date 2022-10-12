import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import ProductContextProvider from './providers/ProductContext';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {
  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <ProductContextProvider>
              <AppRoutes>
              </AppRoutes>
          </ProductContextProvider>
                
      </ThemeProvider>
  );
}

export default App;
