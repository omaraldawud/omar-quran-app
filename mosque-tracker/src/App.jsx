import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import "./assets/css/layout.css";

export default function App() {
  return (
    <Layout>
      <Dashboard currentUserId={1} organizationId={2} />
    </Layout>
  );
}
