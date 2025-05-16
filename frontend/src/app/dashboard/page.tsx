"use client"

import ProtectedRoute from "@/components/auth/protected-route"
import UserProfile from "@/components/auth/user-profile"
import { Sparkles } from "lucide-react"

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600 rounded-full filter blur-[150px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500 rounded-full filter blur-[150px] opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-fuchsia-500 rounded-full filter blur-[150px] opacity-10"></div>
        </div>

        <div className="container mx-auto py-16 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-fuchsia-400 text-transparent bg-clip-text">
                Your Dashboard
              </h1>
            </div>

            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 mr-2"></span>
              <span>Profile Information</span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
              <p className="text-white/70 mb-4">
                Welcome to your personal dashboard. Here you can view and manage your profile information.
              </p>
            </div>

            <UserProfile />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
