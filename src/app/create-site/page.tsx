"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Globe, Check, X, Loader2, ArrowLeft, Zap, Crown, Rocket, CheckCircle } from "lucide-react"
import Link from "next/link"

interface FormData {
  siteName: string
  subdomain: string
  plan: string
}

interface SubdomainStatus {
  isChecking: boolean
  isAvailable: boolean | null
  isValid: boolean
  message: string
}

const plans = [
  {
    id: "free",
    name: "Free Tier",
    icon: Zap,
    price: "$0/month",
    features: ["1 website", "100GB bandwidth", "1GB storage", "Free subdomain", "SSL certificate"],
    limitations: "Perfect for personal projects",
  },
  {
    id: "basic",
    name: "Basic",
    icon: Rocket,
    price: "$9/month",
    features: ["5 websites", "500GB bandwidth", "10GB storage", "Custom domain support", "Priority support"],
    limitations: "Great for small businesses",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    price: "$29/month",
    features: [
      "Unlimited websites",
      "Unlimited bandwidth",
      "100GB storage",
      "Advanced analytics",
      "24/7 phone support",
    ],
    limitations: "For growing companies",
  },
]

export default function CreateSitePage() {
  const [formData, setFormData] = useState<FormData>({
    siteName: "",
    subdomain: "",
    plan: "basic",
  })

  const [subdomainStatus, setSubdomainStatus] = useState<SubdomainStatus>({
    isChecking: false,
    isAvailable: null,
    isValid: true,
    message: "",
  })

  const [isCreating, setIsCreating] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Debounced subdomain checking
  const checkSubdomainAvailability = useCallback(async (subdomain: string) => {
    if (!subdomain) {
      setSubdomainStatus({
        isChecking: false,
        isAvailable: null,
        isValid: true,
        message: "",
      })
      return
    }

    // Validate subdomain format
    const isValid =
      /^[a-z0-9-]+$/.test(subdomain) &&
      subdomain.length >= 3 &&
      subdomain.length <= 63 &&
      !subdomain.startsWith("-") &&
      !subdomain.endsWith("-")

    if (!isValid) {
      setSubdomainStatus({
        isChecking: false,
        isAvailable: false,
        isValid: false,
        message: "Use only lowercase letters, numbers, and hyphens (3-63 characters)",
      })
      return
    }

    setSubdomainStatus((prev) => ({ ...prev, isChecking: true }))

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Simulate some taken subdomains
      const takenSubdomains = ["test", "demo", "www", "api", "admin", "blog", "app"]
      const isAvailable = !takenSubdomains.includes(subdomain.toLowerCase())

      setSubdomainStatus({
        isChecking: false,
        isAvailable,
        isValid: true,
        message: isAvailable ? "Available!" : "This subdomain is already taken",
      })
    } catch (error) {
      setSubdomainStatus({
        isChecking: false,
        isAvailable: false,
        isValid: true,
        message: "Error checking availability",
      })
    }
  }, [])

  // Debounce subdomain checking
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.subdomain) {
        checkSubdomainAvailability(formData.subdomain)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [formData.subdomain, checkSubdomainAvailability])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Auto-generate subdomain from site name if subdomain is empty
    if (field === "siteName" && !formData.subdomain) {
      const autoSubdomain = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 30)

      if (autoSubdomain) {
        setFormData((prev) => ({ ...prev, subdomain: autoSubdomain }))
      }
    }
  }

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.siteName.trim()) {
      newErrors.siteName = "Site name is required"
    }

    if (!formData.subdomain.trim()) {
      newErrors.subdomain = "Subdomain is required"
    } else if (!subdomainStatus.isValid || !subdomainStatus.isAvailable) {
      newErrors.subdomain = "Please choose a valid, available subdomain"
    }

    if (!formData.plan) {
      newErrors.plan = "Please select a plan"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateSite = async () => {
    if (!validateForm()) return

    setIsCreating(true)

    try {
      // Simulate site creation
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setIsCreating(false)
      setShowSuccessModal(true)
    } catch (error) {
      setIsCreating(false)
      setErrors({ general: "Failed to create site. Please try again." })
    }
  }

  const getSubdomainIndicator = () => {
    if (subdomainStatus.isChecking) {
      return <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
    }

    if (subdomainStatus.isAvailable === true) {
      return <Check className="w-4 h-4 text-green-600" />
    }

    if (subdomainStatus.isAvailable === false || !subdomainStatus.isValid) {
      return <X className="w-4 h-4 text-red-600" />
    }

    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Static Website</h1>
            <p className="text-gray-600">Set up your new site in just a few steps</p>
          </div>

          {/* Form Container */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
              <CardDescription>Configure your new website settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* Site Name Input */}
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  type="text"
                  placeholder="My Awesome Project"
                  value={formData.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                  className={errors.siteName ? "border-red-500" : ""}
                />
                <p className="text-sm text-gray-500">This is for your internal reference</p>
                {errors.siteName && <p className="text-sm text-red-600">{errors.siteName}</p>}
              </div>

              {/* Subdomain Input */}
              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="subdomain"
                      type="text"
                      placeholder="my-site-name"
                      value={formData.subdomain}
                      onChange={(e) => handleInputChange("subdomain", e.target.value.toLowerCase())}
                      className={`pr-10 ${errors.subdomain ? "border-red-500" : ""}`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getSubdomainIndicator()}</div>
                  </div>

                  {/* Full URL Display */}
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="text-gray-500">Your site will be available at:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-blue-600 font-mono">
                      {formData.subdomain || "your-subdomain"}.OnPretty.dev
                    </code>
                  </div>

                  {/* Availability Status */}
                  {subdomainStatus.message && (
                    <p
                      className={`text-sm flex items-center gap-1 ${
                        subdomainStatus.isAvailable ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {getSubdomainIndicator()}
                      {subdomainStatus.message}
                    </p>
                  )}
                </div>
                {errors.subdomain && <p className="text-sm text-red-600">{errors.subdomain}</p>}
              </div>

              {/* Plan Selection */}
              <div className="space-y-4">
                <Label>Choose Your Plan</Label>
                <RadioGroup
                  value={formData.plan}
                  onValueChange={(value) => handleInputChange("plan", value)}
                  className="space-y-3"
                >
                  {plans.map((plan) => (
                    <div key={plan.id} className="relative">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-300 ${
                          formData.plan === plan.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <plan.icon className="w-5 h-5 text-blue-600" />
                                <Label htmlFor={plan.id} className="text-lg font-semibold cursor-pointer">
                                  {plan.name}
                                </Label>
                                {plan.popular && (
                                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Popular</span>
                                )}
                              </div>
                              <span className="text-lg font-bold text-gray-900">{plan.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{plan.limitations}</p>
                            <ul className="space-y-1">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                {errors.plan && <p className="text-sm text-red-600">{errors.plan}</p>}
              </div>

              {/* Create Site Button */}
              <Button
                onClick={handleCreateSite}
                disabled={isCreating || subdomainStatus.isChecking || !subdomainStatus.isAvailable}
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Site...
                  </>
                ) : (
                  "Create Site"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Loading Modal */}
      <Dialog open={isCreating} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              Setting Up Your Site
            </DialogTitle>
            <DialogDescription>Your site is being created. This may take a few minutes.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-6">
            <div className="text-center space-y-2">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
              <p className="text-sm text-gray-600">Please don't close this window</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Site Created Successfully!
            </DialogTitle>
            <DialogDescription>
              Your website "{formData.siteName}" is now live at{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-600">{formData.subdomain}.OnPretty.dev</code>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-4">
            <Button asChild className="flex-1">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href={`https://${formData.subdomain}.OnPretty.dev`} target="_blank">
                View Site
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
