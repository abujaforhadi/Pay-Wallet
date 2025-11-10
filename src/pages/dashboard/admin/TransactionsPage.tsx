/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { format } from "date-fns";
import { Download, Filter, Search } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonTable from "./skeletons/TabelSkeletons";
import { useGetBalanceQuery } from "@/redux/api/walletApi";

export default function AdminTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Fetch all wallets
  const { data: walletsData, isLoading: walletsIsLoading } = useGetBalanceQuery();

  const wallets = Array.isArray(walletsData?.data)
    ? walletsData.data
    : [];

  // ✅ Filter logic
  const filteredWallets = wallets.filter((wallet) => {
    const matchesSearch =
      wallet.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "all" || wallet.user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || wallet.status === statusFilter;
    const matchesAmountMin =
      !amountMin || wallet.balance >= parseFloat(amountMin);
    const matchesAmountMax =
      !amountMax || wallet.balance <= parseFloat(amountMax);
    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus &&
      matchesAmountMin &&
      matchesAmountMax
    );
  });

  // ✅ Pagination
  const totalPages = Math.ceil(filteredWallets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWallets = filteredWallets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ Totals
  const totalBalance = filteredWallets.reduce((sum, w) => sum + w.balance, 0);

  // ✅ Helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-50 text-green-700";
      case "BLOCKED":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-50 text-purple-700";
      case "ADMIN":
        return "bg-blue-50 text-blue-700";
      case "AGENT":
        return "bg-orange-50 text-orange-700";
      case "USER":
        return "bg-gray-50 text-gray-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Wallet Management
            </h1>
            <p className="text-muted-foreground">
              Monitor and analyze all user and agent wallets
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Wallets</p>
              <p className="text-2xl font-bold text-blue-600">
                {walletsIsLoading ? (
                  <NumberTicker value={0} decimalPlaces={0} />
                ) : (
                  filteredWallets.length
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-2xl font-bold text-green-600">
                $
                {walletsIsLoading ? (
                  <NumberTicker value={0} decimalPlaces={2} />
                ) : (
                  totalBalance.toFixed(2)
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="User Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="AGENT">Agent</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="BLOCKED">Blocked</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Min Balance"
                value={amountMin}
                onChange={(e) => setAmountMin(e.target.value)}
              />
              <Input
                placeholder="Max Balance"
                value={amountMax}
                onChange={(e) => setAmountMax(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        {walletsIsLoading ? (
          <SkeletonTable />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Wallets ({filteredWallets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedWallets.map((wallet) => (
                    <TableRow key={wallet._id}>
                      <TableCell>{wallet.user.name}</TableCell>
                      <TableCell>{wallet.user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`capitalize ${getRoleColor(wallet.user.role)}`}
                        >
                          {wallet.user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          ${wallet.balance.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${getStatusColor(wallet.status)} capitalize`}
                        >
                          {wallet.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(wallet.createdAt), "MMM dd, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredWallets.length)} of{" "}
                  {filteredWallets.length} wallets
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
