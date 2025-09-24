import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CrawlerDashboardPage from './pages/CrawlerDashboardPage';
import AIVerificationPage from './pages/AIVerificationPage';
import VisualizationPage from './pages/VisualizationPage';
import StatisticsPage from './pages/StatisticsPage';
import DevelopmentPlanPage from './pages/DevelopmentPlanPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminCollectionPage from './pages/AdminCollectionPage';
import AdminVerificationPage from './pages/AdminVerificationPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* User Routes */}
        <Route index element={<HomePage />} />
        <Route path="collection" element={<CrawlerDashboardPage />} />
        <Route path="verification" element={<AIVerificationPage />} />
        <Route path="visualization" element={<VisualizationPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="development-plan" element={<DevelopmentPlanPage />} />
        {/* Admin Routes */}
        <Route path="admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="admin/collection" element={<AdminCollectionPage />} />
        <Route path="admin/verification" element={<AdminVerificationPage />} />
        <Route path="admin/settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};

export default App;