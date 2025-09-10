import AdminLoginForm from "@/components/admin/admin-login-form"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">MX2Twins Admin</h1>
          <p className="text-gray-400">Sign in to manage your content</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  )
}
