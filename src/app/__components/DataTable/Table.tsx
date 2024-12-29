"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";

type TablePagination = {
  pageIndex: number;
  pageSize: number;
};

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
  isPaginated?: boolean;
};

const DataTable: React.FC<props<any>> = ({
  columns,
  data,
  columnFiltersState,
  columnVisibilityState,
  rowSelectionState,
  sortingState,
  isPaginated,
}) => {
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnNo, setColumnNo] = useState<string>("10");

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
    <>
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
      {isPaginated && (
        <div className="flex items-center justify-between w-full space-x-2 py-4 px-4 border-t-[1px] light:bg-gray-100 dark:bg-background">
          <div>
            <Select
              value={columnNo}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
                setColumnNo(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="10">Default</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 text-sm text-muted-foreground">
            {`Page ${pagination.pageIndex + 1} of ${table.getPageCount()}`}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default DataTable;
