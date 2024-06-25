import AdminLayoutWrapper from "@/layout/admin/AdminLayoutWrapper";

interface IAdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FunctionComponent<IAdminLayoutProps> = ({
  children,
}) => {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
};

export default AdminLayout;
