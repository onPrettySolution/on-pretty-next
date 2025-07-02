"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Globe, Eye, EyeOff, CheckCircle, Loader2, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface PasswordStrength {
  hasMinLength: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
  hasUpperCase: boolean
}

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const getPasswordStrength = (password: string): PasswordStrength => {
    return {
      hasMinLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
    }
  }

  const passwordStrength = getPasswordStrength(formData.newPassword)
  const isPasswordStrong = Object.values(passwordStrength).every(Boolean)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (!isPasswordStrong) {
      newErrors.newPassword = "Password does not meet strength requirements"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch (error) {
      setErrors({ general: "Failed to reset password. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">OnPretty</span>
            </Link>
          </div>

          <Card className="shadow-lg border-0">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <Button asChild className="w-full">
                <Link href="/login">
                  Go to Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">OnPretty</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
          <p className="text-gray-600">
            Enter your new password below. Make sure it's strong and something you'll remember.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Create New Password</CardTitle>
            <CardDescription className="text-center">Choose a secure password for your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* General Error Message */}
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* New Password Field */}
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    className={`pr-10 ${errors.newPassword ? "border-red-500 focus:border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={isSubmitting}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">Password requirements:</div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div
                        className={`flex items-center gap-1 ${passwordStrength.hasMinLength ? "text-green-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${passwordStrength.hasMinLength ? "bg-green-600" : "bg-gray-300"}`}
                        />
                        8+ characters
                      </div>
                      <div
                        className={`flex items-center gap-1 ${passwordStrength.hasNumber ? "text-green-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${passwordStrength.hasNumber ? "bg-green-600" : "bg-gray-300"}`}
                        />
                        One number
                      </div>
                      <div
                        className={`flex items-center gap-1 ${passwordStrength.hasSpecialChar ? "text-green-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${passwordStrength.hasSpecialChar ? "bg-green-600" : "bg-gray-300"}`}
                        />
                        Special character
                      </div>
                      <div
                        className={`flex items-center gap-1 ${passwordStrength.hasUpperCase ? "text-green-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${passwordStrength.hasUpperCase ? "bg-green-600" : "bg-gray-300"}`}
                        />
                        Uppercase letter
                      </div>
                    </div>
                  </div>
                )}

                {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pr-10 ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting || !isPasswordStrong}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Reset Password
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <Link href="/help" className="hover:text-gray-700 transition-colors">
              Need Help?
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gray-700 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
