"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type props<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  sortingState?: {
    sorting: any;
    setSorting: () => void;
  };
  columnFiltersState?: {
    columnFilters: any;
    setColumnFilters: () => void;
  };
  columnVisibilityState?: {
    columnVisibility: any;
    setColumnVisibility: () => void;
  };
  rowSelectionState?: {
    rowSelection: any;
    setRowSelection: () => void;
  };
};

const DataTable: React.FC<props<any>> = ({
  columns,
  data,
  columnFiltersState,
  columnVisibilityState,
  rowSelectionState,
  sortingState,
}) => {
  const table = useReactTable({
    data,
    columns,
    onSortingChange: sortingState?.setSorting || undefined,
    onColumnFiltersChange: columnFiltersState?.setColumnFilters || undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange:
      columnVisibilityState?.setColumnVisibility || undefined,
    onRowSelectionChange: rowSelectionState?.setRowSelection || undefined,
    state: {
      sorting: sortingState?.sorting || undefined,
      columnFilters: columnFiltersState?.columnFilters || undefined,
      columnVisibility: columnVisibilityState?.columnVisibility || undefined,
      rowSelection: rowSelectionState?.rowSelection || 0,
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default DataTable;
