import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
