// import React, { useMemo, useState } from "react";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";

// import type { SortingState, ColumnFiltersState } from "@tanstack/react-table";
// import type{ ColumnDef } from "@tanstack/react-table";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";

// import Footer from "../footer/Footer";
// import Logo from "../../assets/logo.png";

// /* Member type */
// type Member = {
//   id: number;
//   name: string;
//   email: string;
//   plan: string;
//   workoutsCompleted: number;
//   caloriesBurned: number;
//   streakDays: number;
//   nextPayment: string;
// };

// /*  Fetcher */
// const fetchMembers = async (): Promise<Member[]> => {
//   const res = await axios.get("https://mpa729bdc617d8988694.free.beeceptor.com/data");
//   return (res.data?.members ?? []) as Member[];
// };

// /* Columns */
// const columns: ColumnDef<Member, any>[] = [
//   { accessorKey: "id", header: "ID" },
//   { accessorKey: "name", header: "Name" },
//   { accessorKey: "email", header: "Email" },
//   { accessorKey: "plan", header: "Plan" },
//   { accessorKey: "workoutsCompleted", header: "Workouts" },
//   { accessorKey: "caloriesBurned", header: "Calories" },
//   { accessorKey: "streakDays", header: "Streak", cell: ({ row }) => `${row.original.streakDays}d` },
//   {
//     accessorKey: "nextPayment",
//     header: "Next Payment",
//     cell: ({ row }) => {
//       const d = new Date(row.original.nextPayment);
//       return isNaN(d.getTime()) ? row.original.nextPayment : d.toLocaleDateString();
//     },
//   },
// ];

// /* Component */
// const MemberList: React.FC = () => {
//   const [globalSearch, setGlobalSearch] = useState("");
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

//   // React Query fetch
//   const { data: members = [], isLoading, isError, refetch, isFetching } = useQuery<Member[], Error>({
//     queryKey: ["members"],
//     queryFn: fetchMembers,
//     staleTime: 1000 * 60 * 2, // 2 mins
//   });

//   // Filtered data
//   const filteredMembers = useMemo(() => {
//     const q = globalSearch.trim().toLowerCase();
//     if (!q) return members;
//     return members.filter((m) =>
//       m.name.toLowerCase().includes(q) ||
//       m.email.toLowerCase().includes(q) ||
//       m.plan.toLowerCase().includes(q)
//     );
//   }, [members, globalSearch]);

//   // React Table
//   const table = useReactTable({
//     data: filteredMembers,
//     columns,
//     state: { sorting, columnFilters },
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
//   });

//   // CSV export
//   const exportCSV = () => {
//     const header = ["id", "name", "email", "plan", "workouts", "calories", "streak", "nextPayment"];
//     const rows = members.map((m) =>
//       [
//         m.id, m.name, m.email, m.plan,
//         m.workoutsCompleted, m.caloriesBurned,
//         m.streakDays, m.nextPayment,
//       ]
//         .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
//         .join(",")
//     );
//     const csv = [header.join(","), ...rows].join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `members_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const totalMembers = members.length;
//   const avgWorkouts = totalMembers
//     ? Math.round(members.reduce((acc, m) => acc + m.workoutsCompleted, 0) / totalMembers)
//     : 0;
//   const avgStreak = totalMembers
//     ? Math.round(members.reduce((acc, m) => acc + m.streakDays, 0) / totalMembers)
//     : 0;

//   return (
//     <div className="min-h-screen relative bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
//       {/* Header */}
//       <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0b0b0b]/50">
//         <div className="flex items-center gap-4">
//           <img src={Logo} alt="FitClub" className="w-36 md:w-40 object-contain" />
//           <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
//             Members Data
//           </h1>
//         </div>

//         <div className="flex items-center gap-3">
//           <Button
//             onClick={exportCSV}
//             className="bg-blue-600 hover:bg-blue-700 shadow-[0_0_8px_rgba(0,153,255,0.6)]"
//           >
//             Export CSV
//           </Button>

//           <Button
//             variant="outline"
//             onClick={() => refetch()}
//             className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-[0_0_12px_rgba(255,98,0,0.9)]"
//           >
//             Refresh
//           </Button>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="max-w-7xl mx-auto p-6 space-y-6">
//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.55 }}
//           className="bg-[#2b2b2b]/60 rounded-2xl p-6 shadow-[0_0_20px_rgba(255,98,0,0.55)] backdrop-blur-sm"
//         >
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//             <h2 className="text-xl font-bold">All Members</h2>

//             <div className="flex items-center gap-3">
//               <Input
//                 placeholder="Search name, email or plan..."
//                 value={globalSearch}
//                 onChange={(e) => {
//                   setGlobalSearch(e.target.value);
//                   table.setPageIndex(0);
//                 }}
//                 className="w-full md:w-80 border-orange-500/40 shadow-[0_0_8px_rgba(255,98,0,0.28)]"
//               />
//             </div>
//           </div>

//           {/* Skeleton Shimmer */}
//           {(isLoading || isFetching) && (
//             <div className="overflow-x-auto rounded-lg border border-orange-500/20 shadow-[0_0_12px_rgba(255,98,0,0.25)]">
//               <Table className="min-w-full bg-[#1a1a1a]/60">
//                 <TableHeader>
//                   <TableRow>
//                     {columns.map((col) => (
//                       <TableHead
//                         key={col.accessorKey?.toString() || col.header}
//                         className="text-gray-400"
//                       >
//                         {typeof col.header === "string" ? col.header : ""}
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {Array.from({ length: 10 }).map((_, i) => (
//                     <TableRow key={i} className="animate-pulse">
//                       {columns.map((col) => (
//                         <TableCell key={col.accessorKey?.toString() || col.header} className="py-3">
//                           <div className="h-4 bg-[#222] rounded w-full" />
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}

//           {/* Actual Table */}
//           {!isLoading && !isFetching && !isError && (
//             <>
//               <div className="overflow-x-auto rounded-lg border border-orange-500/20 shadow-[0_0_12px_rgba(255,98,0,0.25)]">
//                 <Table className="min-w-full bg-[#1a1a1a]/60">
//                   <TableHeader>
//                     {table.getHeaderGroups().map((hg) => (
//                       <TableRow key={hg.id}>
//                         {hg.headers.map((header) => (
//                           <TableHead
//                             key={header.id}
//                             onClick={header.column.getToggleSortingHandler()}
//                             className="cursor-pointer select-none text-orange-300 font-semibold shadow-[0_0_10px_rgba(255,98,0,0.6)]"
//                           >
//                             <div className="flex items-center gap-2">
//                               <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
//                               <span className="text-xs text-gray-400">
//                                 {header.column.getIsSorted() === "asc"
//                                   ? "↑"
//                                   : header.column.getIsSorted() === "desc"
//                                   ? "↓"
//                                   : ""}
//                               </span>
//                             </div>
//                           </TableHead>
//                         ))}
//                       </TableRow>
//                     ))}
//                   </TableHeader>

//                   <TableBody>
//                     {table.getRowModel().rows.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={columns.length} className="text-center py-8 text-gray-400">
//                           No results found.
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       table.getRowModel().rows.map((row) => (
//                         <motion.tr
//                           key={row.id}
//                           initial={{ opacity: 0, y: 6 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.22 }}
//                           className="hover:bg-[#242424]/50 transition-colors"
//                         >
//                           {row.getVisibleCells().map((cell) => (
//                             <TableCell key={cell.id} className="py-3">
//                               {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                             </TableCell>
//                           ))}
//                         </motion.tr>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>

//               {/* Pagination */}
//               <div className="flex items-center justify-between pt-4">
//                 <Button
//                   variant="outline"
//                   onClick={() => table.previousPage()}
//                   disabled={!table.getCanPreviousPage()}
//                   className="text-orange-400 border-orange-500 shadow-[0_0_12px_rgba(255,98,0,0.9)]"
//                 >
//                   Previous
//                 </Button>

//                 <div className="text-sm text-gray-300">
//                   Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
//                 </div>

//                 <Button
//                   variant="outline"
//                   onClick={() => table.nextPage()}
//                   disabled={!table.getCanNextPage()}
//                   className="text-orange-400 border-orange-500 shadow-[0_0_12px_rgba(255,98,0,0.9)]"
//                 >
//                   Next
//                 </Button>
//               </div>
//             </>
//           )}

//           {isError && <div className="text-red-500 mt-4">Failed to load members.</div>}
//         </motion.div>

//         {/* Stats */}
//         {!isLoading && !isFetching && !isError && (
//           <motion.div
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.08 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-6"
//           >
//             <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl text-center shadow-[0_0_12px_rgba(255,98,0,0.6)]">
//               <div className="text-sm text-gray-300">Total Members</div>
//               <div className="text-3xl font-bold">{totalMembers}</div>
//             </div>

//             <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl text-center shadow-[0_0_12px_rgba(255,98,0,0.6)]">
//               <div className="text-sm text-gray-300">Average Workouts</div>
//               <div className="text-3xl font-bold">{avgWorkouts}</div>
//             </div>

//             <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl text-center shadow-[0_0_12px_rgba(255,98,0,0.6)]">
//               <div className="text-sm text-gray-300">Average Streak</div>
//               <div className="text-3xl font-bold">{avgStreak}d</div>
//             </div>
//           </motion.div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default MemberList;



import React, { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import type { SortingState, ColumnFiltersState, ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import Footer from "../footer/Footer";
import Logo from "../../assets/logo.png";

/* Member type */
type Member = {
  id: number;
  name: string;
  email: string;
  plan: string;
  workoutsCompleted: number;
  caloriesBurned: number;
  streakDays: number;
  nextPayment: string;
};

/* Fetcher */
const fetchMembers = async (): Promise<Member[]> => {
  const res = await axios.get("https://mpa729bdc617d8988694.free.beeceptor.com/data");
  return (res.data?.members ?? []) as Member[];
};

/* Columns */
const columns: ColumnDef<Member, any>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "plan", header: "Plan" },
  { accessorKey: "workoutsCompleted", header: "Workouts" },
  { accessorKey: "caloriesBurned", header: "Calories" },
  {
    accessorKey: "streakDays",
    header: "Streak",
    cell: ({ row }) => `${row.original.streakDays}d`,
  },
  {
    accessorKey: "nextPayment",
    header: "Next Payment",
    cell: ({ row }) => {
      const d = new Date(row.original.nextPayment);
      return isNaN(d.getTime()) ? row.original.nextPayment : d.toLocaleDateString();
    },
  },
];

/* Component */
const MemberList: React.FC = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: members = [], isLoading, isError, refetch, isFetching } = useQuery<Member[], Error>({
    queryKey: ["members"],
    queryFn: fetchMembers,
    staleTime: 1000 * 60 * 2,
  });

  // Filter members
  const filteredMembers = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.plan.toLowerCase().includes(q)
    );
  }, [members, globalSearch]);

  const table = useReactTable({
    data: filteredMembers,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  });

  // CSV export
  const exportCSV = () => {
    const header = ["id", "name", "email", "plan", "workouts", "calories", "streak", "nextPayment"];
    const rows = members.map((m) =>
      [
        m.id,
        m.name,
        m.email,
        m.plan,
        m.workoutsCompleted,
        m.caloriesBurned,
        m.streakDays,
        m.nextPayment,
      ]
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `members_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalMembers = members.length;
  const avgWorkouts = totalMembers
    ? Math.round(members.reduce((acc, m) => acc + m.workoutsCompleted, 0) / totalMembers)
    : 0;
  const avgStreak = totalMembers
    ? Math.round(members.reduce((acc, m) => acc + m.streakDays, 0) / totalMembers)
    : 0;

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0b0b0b]/50">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="FitClub" className="w-36 md:w-40 object-contain" />
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
            Members Data
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={exportCSV}
            className="bg-blue-600 hover:bg-blue-700 shadow-[0_0_8px_rgba(0,153,255,0.6)]"
          >
            Export CSV
          </Button>

          <Button
            variant="outline"
            onClick={() => refetch()}
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-[0_0_12px_rgba(255,98,0,0.9)]"
          >
            Refresh
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Table & Search */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="bg-[#2b2b2b]/60 rounded-2xl p-6 shadow-[0_0_20px_rgba(255,98,0,0.55)] backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold">All Members</h2>

            <div className="flex items-center gap-3">
              <Input
                placeholder="Search name, email or plan..."
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  table.setPageIndex(0);
                }}
                className="w-full md:w-80 border-orange-500/40 shadow-[0_0_8px_rgba(255,98,0,0.28)]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-orange-500/20 shadow-[0_0_12px_rgba(255,98,0,0.25)]">
            <Table className="min-w-full bg-[#1a1a1a]/60">
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none text-orange-300 font-semibold shadow-[0_0_10px_rgba(255,98,0,0.6)]"
                      >
                        <div className="flex items-center gap-2">
                          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                          <span className="text-xs text-gray-400">
                            {header.column.getIsSorted() === "asc"
                              ? "↑"
                              : header.column.getIsSorted() === "desc"
                              ? "↓"
                              : ""}
                          </span>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8 text-gray-400">
                      No results found.
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                      className="hover:bg-[#242424]/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-orange-400 border-orange-500 shadow-[0_0_12px_rgba(255,98,0,0.9)]"
            >
              Previous
            </Button>

            <div className="text-sm text-gray-300">
              Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </div>

            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-orange-400 border-orange-500 shadow-[0_0_12px_rgba(255,98,0,0.9)]"
            >
              Next
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl text-center shadow-[0_0_12px_rgba(255,98,0,0.6)]">
            <div className="text-sm text-gray-300">Total Members</div>
            <div className="text-3xl font-bold">{totalMembers}</div>
          </div>

          <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl text-center shadow-[0_0_12px_rgba(255,98,0,0.6)]">
            <div className="text-sm text-gray-300">Average Workouts</div>
            <div className="text-3xl font-bold">{avgWorkouts}</div>
          </div>

          <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl text-center shadow-[0_0_12px_rgba(255,98,0,0.6)]">
            <div className="text-sm text-gray-300">Average Streak</div>
            <div className="text-3xl font-bold">{avgStreak}d</div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default MemberList;
