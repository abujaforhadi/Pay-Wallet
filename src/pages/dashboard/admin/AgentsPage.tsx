/* eslint-disable */
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Eye,
  Filter,
  MapPin,
  Shield,
  ShieldOff,
  Users,
  Search,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard-layout";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import {
  useApproveUserMutation,
  useGetAgentsQuery,
  useSuspendUserMutation,
} from "@/redux/api/userApi";
import SkeletonTable from "./skeletons/TabelSkeletons";

export default function AdminAgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const itemsPerPage = 10;

  const {
    data: agentsData,
    refetch,
    isLoading: agentsIsLoading,
  } = useGetAgentsQuery();

  const [approveUser] = useApproveUserMutation();
  const [suspendUser] = useSuspendUserMutation();

  const agents = Array.isArray(agentsData?.data) ? agentsData.data : [];

  // --- Filtering Logic ---
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || agent.status === statusFilter;

    const matchesRisk = riskFilter === "all" || agent.isActive === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  // --- Pagination ---
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = filteredAgents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getRiskColor = (risk) => {
    switch (risk) {
      case "ACTIVE":
        return "bg-green-50 text-green-700";
      case "BLOCKED":
        return "bg-orange-50 text-orange-700";
      case "SUSPENDED":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const handleAgentAction = (agentId, action) => {
    if (action === "block") {
      suspendUser(agentId)
        .unwrap()
        .then(() => {
          toast.success("Agent blocked successfully");
          refetch();
          setModelOpen(false);
        })
        .catch(() => {
          toast.error("Failed to block agent");
        });
    } else if (action === "unblock") {
      approveUser(agentId)
        .unwrap()
        .then(() => {
          toast.success("Agent unblocked successfully");
          refetch();
          setModelOpen(false);
        })
        .catch(() => {
          toast.error("Failed to unblock agent");
        });
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Agent Management
            </h1>
            <p className="text-muted-foreground">
              Approve, manage, and monitor agent performance
            </p>
          </div>
          <div className="flex gap-2 sr-only">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Users className="h-4 w-4" />
              Export Agents
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Agents</p>
                  <p className="text-2xl font-bold">
                    {agentsIsLoading ? (
                      <NumberTicker value={1011} />
                    ) : (
                      agents.length || 0
                    )}
                  </p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                  <p className="text-2xl font-bold text-green-600">
                    {agentsIsLoading
                      ? "..."
                      : agents.filter((u) => u.isActive === "ACTIVE").length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blocked Agents</p>
                  <p className="text-2xl font-bold text-red-600">
                    {agentsIsLoading
                      ? "..."
                      : agents.filter((u) => u.isActive === "SUSPENDED").length}
                  </p>
                </div>
                <ShieldOff className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Agents ({agentsIsLoading ? "..." : filteredAgents.length})
            </CardTitle>
          </CardHeader>

          {agentsIsLoading ? (
            <SkeletonTable />
          ) : (
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAgents.map((agent) => (
                    <TableRow key={agent._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {agent.name
                                ?.split(" ")
                                ?.map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {agent._id}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>+88{agent.contact}</TableCell>
                      <TableCell>{agent.email}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {agent.location || "Bangladesh"}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {agent.role?.toLowerCase()}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getRiskColor(agent.isActive)}
                        >
                          {agent.isActive}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Dialog open={modelOpen} onOpenChange={setModelOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedAgent(agent)}
                              className="bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                Agent Details - {selectedAgent?.name}
                              </DialogTitle>
                              <DialogDescription>
                                View and manage agent account information
                              </DialogDescription>
                            </DialogHeader>

                            {selectedAgent && (
                              <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <label className="text-sm font-medium">
                                      Agent ID
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedAgent._id}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Phone
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedAgent.contact}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Join Date
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {format(
                                        new Date(selectedAgent.createdAt),
                                        "MMM dd, yyyy"
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Email
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedAgent.email}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <DialogFooter>
                              <div className="flex gap-2">
                                {selectedAgent?.isActive === "ACTIVE" ? (
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleAgentAction(
                                        selectedAgent._id,
                                        "block"
                                      )
                                    }
                                  >
                                    Block Agent
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      handleAgentAction(
                                        selectedAgent._id,
                                        "unblock"
                                      )
                                    }
                                  >
                                    Unblock Agent
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  onClick={() => setModelOpen(false)}
                                >
                                  Close
                                </Button>
                              </div>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}–
                  {Math.min(startIndex + itemsPerPage, filteredAgents.length)} of{" "}
                  {filteredAgents.length} agents
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.max(1, currentPage - 1))
                    }
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
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
