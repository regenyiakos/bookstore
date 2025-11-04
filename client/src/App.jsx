import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '@components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
