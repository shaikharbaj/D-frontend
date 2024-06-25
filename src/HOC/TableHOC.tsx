"use client";
import React from "react";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { tableApiURL } from "@/lib/apiUrl";
import { DataTable } from "@/components/dataTable/DataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ITableHOCProps {
  componentConfig: any;
  handelTableAction?: any;
}
let columns: ColumnDef<any>[] = [];

const TableHOC: React.FunctionComponent<ITableHOCProps> = ({
  componentConfig,
  handelTableAction
}) => {
  const API_URL = tableApiURL(componentConfig?.code);
  const [data, setData] = React.useState([]);
  const [isTableInitilized, setIsTableInitilized] = React.useState(false);

  //useEffect to run when componnet is rendered
  React.useEffect(() => {
    prepareColumns();
  }, []);

  //Function to prepare table column array
  const prepareColumns = () => {
    columns = [];
    componentConfig?.fields.forEach((field: any, _fieldIndex: number) => {
      columns.push({
        accessorKey: field.code,
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
        cell: ({ row }) => {
          return cellFormatter(row, field);
        },
      });
    });
    fetchData();
  };

  //Function to format cell value
  const cellFormatter = (currentRow: any, currentColumn: any) => {
    if (currentColumn.code === "action") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{currentColumn.displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {currentColumn.childrens.length > 0 &&
              currentColumn.childrens.map((item: any, _itemIndex: number) => {
                return <DropdownMenuItem key={_itemIndex} onClick={() => handelActionClick(item, currentRow)}>{item.displayName}</DropdownMenuItem>;
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return currentRow.getValue(currentColumn.code);
    }
  };

  //Function to fetch data for datatable
  const fetchData = () => {
    axios.get(API_URL).then((response) => {
      setData(response.data);
      setIsTableInitilized(true);
    });
  };

  //Function to handel action click
  const handelActionClick = (currentAction: any, currentRow: any) => {
    return handelTableAction(currentAction, currentRow.original);
  };

  return (
    <React.Fragment>
      {isTableInitilized === true && columns.length > 0 && data.length && (
        <DataTable columns={columns} data={data} />
      )}
    </React.Fragment>
  );
};

export default TableHOC;
