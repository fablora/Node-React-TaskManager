import React, { useMemo, useState } from 'react';
import { 
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import styles from './TaskTable.module.css';

const TaskTable = ({ tasks, users }) => {    
    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [

        columnHelper.accessor('taskTitle', {
            header: 'Task Title',
        }),
        columnHelper.accessor('assignedTo', {
            header: 'Assigned To',
            cell: ({ getValue }) => {
                const user = users.find(user => user._id === getValue());
                return user ? user.email : 'Unknown User';
        },
      }),
      columnHelper.accessor('taskStatus', {
        header: 'Status',
      }),
    columnHelper.accessor('dueDate', {
        header: 'Due Date',
        cell: ({ getValue }) => {
            return new Date(getValue()).toLocaleDateString('en-AU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        },
      }),
    ],
    [users]
  );

    const data = useMemo(() => tasks, [tasks]);
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    });

    return (
        <table className = {styles.table}>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key = {headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key = {header.id} colSpan = {header.colSpan}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        className = {header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                        onClick = {header.column.getToggleSortingHandler()}
                                        title = {
                                            header.column.getCanSort()
                                                ? header.column.getNextSortingOrder() === 'asc'
                                                    ? 'Sort ascending'
                                                    : header.column.getNextSortingOrder() === 'desc'
                                                        ? 'Sort descending'
                                                        : 'Clear sort'
                                                : undefined
                                        }
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted()?.toString()] ?? null}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key = {row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key = {cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskTable;