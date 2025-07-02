"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import {
  Globe,
  ExternalLink,
  ArrowLeft,
  FolderOpen,
  Settings,
  Link2,
  AlertTriangle,
  RotateCcw,
  BarChart3,
  Upload,
  FolderPlus,
  Download,
  Trash2,
  Edit,
  type File,
  ImageIcon,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
  Zap,
  HardDrive,
  Wifi,
} from "lucide-react"
import Link from "next/link"

// Sample data
const siteData = {
  id: "1",
  name: "My Awesome Blog",
  url: "myblog.OnPretty.dev",
  status: "active",
  customDomain: "www.myblog.com",
  sslStatus: "active",
}

const sampleFiles = [
  {
    id: 1,
    name: "index.html",
    type: "file",
    size: "2.4 KB",
    modified: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    name: "style.css",
    type: "file",
    size: "15.2 KB",
    modified: "1 day ago",
    icon: FileText,
  },
  {
    id: 3,
    name: "assets",
    type: "folder",
    size: "—",
    modified: "3 days ago",
    icon: FolderOpen,
  },
  {
    id: 4,
    name: "hero-image.jpg",
    type: "file",
    size: "245 KB",
    modified: "1 week ago",
    icon: ImageIcon,
  },
]

const navigationItems = [
  { id: "files", label: "Files", icon: FolderOpen },
  { id: "general", label: "General Settings", icon: Settings },
  { id: "domain", label: "Custom Domain", icon: Link2 },
  { id: "errors", label: "Error Pages", icon: AlertTriangle },
  { id: "redirects", label: "Redirects", icon: RotateCcw },
  { id: "cache", label: "Cache", icon: Zap },
  { id: "metrics", label: "Usage Metrics", icon: BarChart3 },
]

export default function SiteManagementPage() {
  const [activeSection, setActiveSection] = useState("files")
  const [files, setFiles] = useState(sampleFiles)
  const [currentPath, setCurrentPath] = useState(["root"])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [siteName, setSiteName] = useState(siteData.name)
  const [customDomain, setCustomDomain] = useState(siteData.customDomain)
  const [errorPage404, setErrorPage404] = useState("/404.html")
  const [errorPage500, setErrorPage500] = useState("/500.html")
  const [isDragOver, setIsDragOver] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "needs-files":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Needs Files
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }, [])

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    // Add files to the list
    const newFiles = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: "file" as const,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      modified: "Just now",
      icon: file.type.startsWith("image/") ? ImageIcon : FileText,
    }))

    setFiles((prev) => [...prev, ...newFiles])
    setIsUploading(false)
    setUploadProgress(0)

    toast("Upload Complete", {
      description: `${files.length} file(s) uploaded successfully`,
    })
  }

  const handleDeleteFile = (fileId: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
    toast("File Deleted", {
      description: "File has been removed from your site",
    })
  }

  const handleSaveSiteName = () => {
    toast("Settings Saved", {
      description: "Site name has been updated",
    })
  }

  const handleDeleteSite = () => {
    setShowDeleteModal(false)
    toast("Site Deleted", {
      description: "Your site has been permanently deleted",
    })
  }

  const handleClearCache = () => {
    toast("Cache Cleared", {
      description: "Site cache has been cleared successfully",
    })
  }

  const renderFileManager = () => (
    <div className="space-y-6">
      {/* Upload Progress */}
      {isUploading && (
        <Alert>
          <Upload className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <span>Uploading files...</span>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {currentPath.map((path, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <span className={index === currentPath.length - 1 ? "font-medium text-gray-900" : ""}>{path}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
        <Button variant="outline" className="bg-transparent">
          <FolderPlus className="w-4 h-4 mr-2" />
          Create Folder
        </Button>
      </div>

      {/* Drag and Drop Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">Drag & drop files or folders here to upload</p>
        <p className="text-gray-600">or click the Upload Files button above</p>
      </div>

      {/* File List */}
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
          <CardDescription>Manage your site files and folders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="flex items-center space-x-2">
                    <file.icon className="w-4 h-4 text-gray-500" />
                    <span>{file.name}</span>
                  </TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.modified}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteFile(file.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
          <CardDescription>Update your site's basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <div className="flex space-x-2">
              <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="flex-1" />
              <Button onClick={handleSaveSiteName}>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
            Delete Site
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Once you delete a site, there is no going back. Please be certain.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const renderCustomDomain = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
          <CardDescription>Connect your own domain to this site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customDomain">Domain Name</Label>
            <div className="flex space-x-2">
              <Input
                id="customDomain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="www.example.com"
                className="flex-1"
              />
              <Button>Add Domain</Button>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              To use a custom domain, add a CNAME record pointing to <code>{siteData.url}</code> in your DNS settings.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>SSL Certificate Status</Label>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-600" />
              <Badge className="bg-green-100 text-green-800 border-green-200">SSL Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderErrorPages = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Error Pages</CardTitle>
          <CardDescription>Customize error pages for your site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="error404">404 Not Found Page</Label>
            <div className="flex space-x-2">
              <Input
                id="error404"
                value={errorPage404}
                onChange={(e) => setErrorPage404(e.target.value)}
                placeholder="/404.html"
                className="flex-1"
              />
              <Button>Save</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="error500">500 Internal Server Error Page</Label>
            <div className="flex space-x-2">
              <Input
                id="error500"
                value={errorPage500}
                onChange={(e) => setErrorPage500(e.target.value)}
                placeholder="/500.html"
                className="flex-1"
              />
              <Button>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCache = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cache Management</CardTitle>
          <CardDescription>Manage your site's cache settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleClearCache} className="bg-orange-600 hover:bg-orange-700">
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear Site Cache
          </Button>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This will clear all cached content for your site and may temporarily slow down loading times.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsageMetrics = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 GB</div>
            <p className="text-xs text-muted-foreground">of 10 GB available</p>
            <Progress value={12} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Bandwidth</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50 GB</div>
            <p className="text-xs text-muted-foreground">of 100 GB available</p>
            <Progress value={50} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Over Time</CardTitle>
          <CardDescription>Bandwidth and storage usage for the past 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <BarChart3 className="w-8 h-8 mr-2" />
            <span>Usage charts would be displayed here</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "files":
        return renderFileManager()
      case "general":
        return renderGeneralSettings()
      case "domain":
        return renderCustomDomain()
      case "errors":
        return renderErrorPages()
      case "cache":
        return renderCache()
      case "metrics":
        return renderUsageMetrics()
      default:
        return renderFileManager()
    }
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

      {/* Site Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">{siteData.name}</h1>
              <div className="flex items-center space-x-4">
                <Link
                  href={`https://${siteData.url}`}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 font-mono text-sm"
                >
                  {siteData.url}
                </Link>
                {getStatusBadge(siteData.status)}
              </div>
            </div>
            <Button asChild>
              <Link href={`https://${siteData.url}`} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                Preview Site
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Site Management</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-sm font-medium rounded-none hover:bg-gray-50 transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Site</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{siteData.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSite}>
              Delete Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
