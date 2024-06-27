import React, { useMemo, useState, useEffect } from 'react';
import { deleteTask } from '../../services/api';
import { 
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import styles from './TaskTable.module.css';
import EditTaskForm from './EditTask';

const TaskTable = ({ tasks, users, projectId }) => {
    const [taskList, setTaskList] = useState(tasks);  
    const [selectedTask, setSelectedTask] = useState(null);
    const [showEditTaskForm, setShowEditTaskForm] = useState(false);

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks]);

    const columnHelper = createColumnHelper();

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTaskList((prevTasks) => prevTasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    };

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
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <div className = {styles.buttonContainer}>
                <button
                    className = {styles.editButton}
                    onClick=  {() => {
                        setSelectedTask(row.original);
                        setShowEditTaskForm(true);
                    }}
                >
                    Edit
                </button>
                <button
                    className = {styles.deleteButton}
                    onClick = {() => handleDeleteTask(row.original._id)}
                >
                    Delete
                </button>
            </div>
        ),
      }),
    ], [users]);

    const data = useMemo(() => taskList, [taskList]);
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

    const handleEditTask = (updatedTask) => {
        setTaskList((prevTasks) => 
            prevTasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task)
        );
        setShowEditTaskForm(false);
    };

    return (
        <>
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
            {showEditTaskForm && selectedTask && (
                <EditTaskForm
                    taskId={selectedTask._id}
                    projectId={projectId}
                    onClose={() => setShowEditTaskForm(false)}
                    onEdit={handleEditTask}
                />        
            )}
        </>
    );
};

export default TaskTable;