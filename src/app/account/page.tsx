"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  Globe,
  ArrowLeft,
  User,
  CreditCard,
  Eye,
  EyeOff,
  Download,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  HardDrive,
  Wifi,
  Calendar,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

// Sample data
const userData = {
  email: "john.doe@example.com",
  name: "John Doe",
  company: "Acme Corporation",
}

const billingData = {
  currentPlan: "Basic Plan",
  planPrice: "$9/month",
  paymentMethod: {
    type: "Visa",
    lastFour: "4242",
    expiryDate: "12/25",
  },
  usage: {
    storage: { used: 500, limit: 1000, unit: "MB" },
    bandwidth: { used: 10, limit: 50, unit: "GB" },
    sites: { used: 3, limit: 5 },
  },
  billingHistory: [
    {
      id: 1,
      date: "2024-01-01",
      amount: "$9.00",
      status: "paid",
      invoiceId: "INV-2024-001",
    },
    {
      id: 2,
      date: "2023-12-01",
      amount: "$9.00",
      status: "paid",
      invoiceId: "INV-2023-012",
    },
    {
      id: 3,
      date: "2023-11-01",
      amount: "$9.00",
      status: "failed",
      invoiceId: "INV-2023-011",
    },
    {
      id: 4,
      date: "2023-10-01",
      amount: "$9.00",
      status: "paid",
      invoiceId: "INV-2023-010",
    },
  ],
}

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showRemoveCardDialog, setShowRemoveCardDialog] = useState(false)

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: userData.name,
    company: userData.company,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileSave = () => {
    toast("Profile Updated", {
      description: "Your profile information has been saved successfully.",
    })
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast("Password Mismatch", {
        description: "New password and confirm password do not match.",
      })
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast("Password Too Short", {
        description: "Password must be at least 8 characters long.",
      })
      return
    }

    toast("Password Changed",{
      description: "Your password has been updated successfully.",
    })

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleAddUpdateCard = () => {
    toast("Payment Method", {
      description: "Redirecting to secure payment form...",
    })
  }

  const handleRemoveCard = () => {
    setShowRemoveCardDialog(false)
    toast("Card Removed", {
      description: "Your payment method has been removed.",
    })
  }

  const handleChangePlan = () => {
    toast("Plan Change", {
      description: "Redirecting to plan selection...",
    })
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast("Download Started", {
      description: `Downloading invoice ${invoiceId}...`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">OnPretty</span>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and billing information</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Billing</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              {/* Email Display */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Address</CardTitle>
                  <CardDescription>Your account email address cannot be changed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Input value={userData.email} disabled className="bg-gray-50" />
                    <Badge variant="secondary">Verified</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal and company information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profileForm.company}
                        onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                  <Button onClick={handleProfileSave}>Save Profile</Button>
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          placeholder="Enter new password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          placeholder="Confirm new password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription>
                      Password must be at least 8 characters long and contain a mix of letters, numbers, and special
                      characters.
                    </AlertDescription>
                  </Alert>

                  <Button onClick={handlePasswordChange}>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your active subscription plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">{billingData.currentPlan}</h3>
                      <p className="text-gray-600">{billingData.planPrice}</p>
                    </div>
                    <Button onClick={handleChangePlan}>Change Plan</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-medium">
                          {billingData.paymentMethod.type} ending in {billingData.paymentMethod.lastFour}
                        </p>
                        <p className="text-sm text-gray-600">Expires {billingData.paymentMethod.expiryDate}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleAddUpdateCard} className="bg-transparent">
                        Update
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowRemoveCardDialog(true)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button onClick={handleAddUpdateCard}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Card
                  </Button>
                </CardContent>
              </Card>

              {/* Usage Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage Details</CardTitle>
                  <CardDescription>Current billing cycle usage breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <HardDrive className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Storage Used</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {billingData.usage.storage.used} {billingData.usage.storage.unit} /{" "}
                          {billingData.usage.storage.limit} {billingData.usage.storage.unit}
                        </span>
                      </div>
                      <Progress
                        value={getUsagePercentage(billingData.usage.storage.used, billingData.usage.storage.limit)}
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Wifi className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Data Transfer</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {billingData.usage.bandwidth.used} {billingData.usage.bandwidth.unit} /{" "}
                          {billingData.usage.bandwidth.limit} {billingData.usage.bandwidth.unit}
                        </span>
                      </div>
                      <Progress
                        value={getUsagePercentage(billingData.usage.bandwidth.used, billingData.usage.bandwidth.limit)}
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Active Sites</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {billingData.usage.sites.used} / {billingData.usage.sites.limit} sites
                        </span>
                      </div>
                      <Progress
                        value={getUsagePercentage(billingData.usage.sites.used, billingData.usage.sites.limit)}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing History */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>Your past invoices and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingData.billingHistory.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{formatDate(invoice.date)}</span>
                          </TableCell>
                          <TableCell className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{invoice.amount}</span>
                          </TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadInvoice(invoice.invoiceId)}
                              className="bg-transparent"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Remove Card Confirmation Dialog */}
      <Dialog open={showRemoveCardDialog} onOpenChange={setShowRemoveCardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Payment Method</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this payment method? You'll need to add a new payment method to continue
              your subscription.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRemoveCardDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveCard}>
              Remove Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
