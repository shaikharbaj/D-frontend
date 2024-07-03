"use client";
import React from "react";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Breadcrumb, Card, Loader, Section } from "@/components";
import { Button } from "@/components/ui/button";
import { ComponentHOC } from "@/HOC";
import { DataTable } from "@/components/dataTable/DataTable";
interface IListProps {}

let columns: ColumnDef<any>[] = [];

const List: React.FunctionComponent<IListProps> = () => {
  const breadcrumbData = {
    title: "Doctypes",
    hasButton: true,
    buttonLabel: "Add Doctype",
    childrens: [
      {
        labelName: "Dashboard",
        is_link: true,
        link: "/admin/doctype",
      },
      {
        labelName: "Doctypes",
        is_link: false,
      },
    ],
  };
  const PAGECODE = "doctype_list";
  const API_URL = `http://localhost:5000/doctypes`;
  const fields = [
    {
      _id: "doctype_name",
      name: "doctype_name",
      code: "doctype_name",
      displayName: "Doctype Name",
      type: "column",
      status: "active",
      childrens: [],
    },
    {
      _id: "doctype_code",
      name: "doctype_code",
      code: "doctype_code",
      displayName: "Doctype Code",
      type: "column",
      status: "active",
      childrens: [],
    },
    {
      _id: "doctype_status",
      name: "doctype_status",
      code: "doctype_status",
      displayName: "Doctype Status",
      type: "column",
      status: "active",
      childrens: [],
    },
    // {
    //   _id: "action",
    //   name: "action",
    //   code: "action",
    //   displayName: "Action",
    //   type: "column",
    //   status: "active",
    //   childrens: [],
    // },
  ];
  const router = useRouter();
  const [isPageInitialized, setIsPageInitialized] = React.useState(true);
  const [data, setData] = React.useState([]);

  //useEffect to run when componnet is rendered
  React.useEffect(() => {
    prepareColumns();
  }, []);
  const handleEditAction = (docktype: any) => {
    router.push(`/admin/doctypes/edit/${docktype?.id}`);
  };
  //Function to prepare table column array
  const prepareColumns = () => {
    columns = [];
    fields.forEach((field: any, _fieldIndex: number) => {
      columns.push({
        accessorKey: field.name,
        //header: field.label,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {field.displayName}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      });
    });
    columns.push({
      id: "edit",
      header: "Action",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleEditAction(row.original)}
        >
          Edit
        </Button>
      ),
    });

    fetchData();
  };

  //Function to fetch data for datatable
  const fetchData = () => {
    axios.get(API_URL).then((response) => {
      setData(response.data);
      setIsPageInitialized(true);
    });
  };

  //Function to navigate to add doctype page
  const handelAddAction = () => {
    router.push(`/admin/doctypes/add`);
  };

  return (
    <>
      <Loader show={isPageInitialized === true ? false : true} />
      <Breadcrumb breadcrumbData={breadcrumbData} action={handelAddAction} />
      <Section>
        <Card heading={"Doctypes"}>
          <DataTable columns={columns} data={data} />
        </Card>
      </Section>
    </>
  );
};

export default List;
