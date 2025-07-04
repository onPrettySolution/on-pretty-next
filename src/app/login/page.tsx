"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation" // Use useRouter for client-side navigation
import { signIn } from 'aws-amplify/auth';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Globe, Eye, EyeOff, Github, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"

interface LoginFormData {
  username: string
  password: string
  rememberMe: boolean
}

interface LoginErrors {
  username?: string
  password?: string
  general?: string
}

export default function LoginPage() {
  const router = useRouter() // Initialize useRouter

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    rememberMe: false, // Cognito's Auth.signIn handles session persistence by default.
                      // 'rememberMe' could map to a custom attribute or be used to control
                      // session validity if you implement custom session management beyond Amplify's default.
                      // For standard Cognito, this might not directly translate unless you customize.
  })

  const [errors, setErrors] = useState<LoginErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): LoginErrors => {
    const newErrors: LoginErrors = {}

    // Username validation (simpler than email regex)
    if (!formData.username) {
      newErrors.username = "Username is required" // Changed error message
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) { // Cognito default minimum is 8, adjust as per your User Pool settings
      newErrors.password = "Password must be at least 6 characters"
    }

    return newErrors
  }

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field as keyof LoginErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      setErrors({ general: undefined }); // Clear previous general errors

      try {
        // Authenticate user with Cognito
        await signIn({username: formData.username, password: formData.password});

        console.log("Login successful, redirecting to dashboard...")
        router.push('/dashboard') // Client-side redirect
      } catch (error: any) { // Type 'any' for now, or define specific Amplify Auth errors
        console.error("Amplify Auth Error:", error);
        let errorMessage = "An unexpected error occurred. Please try again.";

        // Handle specific Cognito error codes
        switch (error.code) {
          case 'UserNotFoundException':
          case 'NotAuthorizedException':
            errorMessage = "Invalid username or password. Please check your credentials and try again.";
            break;
          case 'UserNotConfirmedException':
            errorMessage = "Your account is not confirmed. Please verify your username.";
            // Optionally, redirect to a confirmation page: router.push('/confirm-signup');
            break;
          case 'PasswordResetRequiredException':
            errorMessage = "Password reset is required. Please reset your password.";
            // Optionally, redirect to a forgot password page: router.push('/forgot-password');
            break;
          case 'EmptyChallengeException': // For MFA or new password required flows
            errorMessage = "Further authentication required. Please follow the instructions.";
            // You might need to handle this more deeply, e.g., prompt for MFA code
            break;
          default:
            errorMessage = error.message || errorMessage; // Use Amplify's error message if available
        }
        setErrors({ general: errorMessage });
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password'); // Assuming you have a /forgot-password page
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Login to Your Account</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {/* General Error Message */}
            {errors.general && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {/* Demo Credentials Info (Still useful for development, remove in production) */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-blue-800 font-medium mb-1">Demo Credentials (Set in Cognito):</p>
              <p className="text-xs text-blue-700">username: user01</p>
              <p className="text-xs text-blue-700">Password: user01</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* username Field */}
              <div className="space-y-2">
                <Label htmlFor="username">Username Address</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className={errors.username ? "border-red-500 focus:border-red-500" : ""}
                  disabled={isSubmitting}
                />
                {errors.username && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 font-normal text-sm text-blue-600 hover:text-blue-800"
                    onClick={handleForgotPassword}
                    disabled={isSubmitting}
                  >
                    Forgot Password?
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500 focus:border-red-500 pr-10" : "pr-10"}
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me - (Note: Amplify Auth.signIn typically handles session persistence) */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  disabled={isSubmitting}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me for this session
                </Label>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {"Don't have an account? "}
                  <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                    Sign up for free
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <Link href="/help" className="hover:text-gray-700 transition-colors">
              Need Help?
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}