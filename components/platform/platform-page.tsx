'use client'
import { FormEvent, useState } from 'react'
import { useCreateAdminMutation, useGetAllAdminQuery } from '@/redux/feature/adminSlice'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function PlatformPage() {
    const { data, isLoading, isError } = useGetAllAdminQuery()
    const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [submitError, setSubmitError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const admins = data?.data ?? []
    const imageBaseUrl = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? '').replace(/\/$/, '')

    const resolveImage = (imagePath?: string) => {
        if (!imagePath) return ''
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
        return imagePath.startsWith('/') ? `${imageBaseUrl}${imagePath}` : `${imageBaseUrl}/${imagePath}`
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitError('')

        if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
            setSubmitError('Name, email, and password are required.')
            return
        }

        try {
            const res = await createAdmin({
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
            }).unwrap()
            toast.success(res?.message || 'Admin created successfully!')
            setForm({ name: '', email: '', password: '' })
        } catch (error: any) {
            const message = error?.data?.message || 'Failed to create admin. Please try again.'
            toast.error(message)
            setSubmitError(message)
        }
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-full">
            <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
                <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Fetch all admins and create new admin users.
                </p>
            </div>

            <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Create Admin</h2>
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                            className="w-full px-3 py-2 pr-10 rounded-lg border border-border text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isCreating}
                        className="px-4 py-2 rounded-lg bg-[#090A58] text-white text-sm font-semibold disabled:opacity-60"
                    >
                        {isCreating ? 'Creating...' : 'Create Admin'}
                    </button>
                </form>
                {submitError ? <p className="text-sm text-red-600 mt-2">{submitError}</p> : null}
            </div>

            <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">All Admins</h2>
                    <span className="text-sm text-muted-foreground">Total: {admins.length}</span>
                </div>

                {isLoading && <p className="text-sm text-muted-foreground">Loading admins...</p>}
                {isError && <p className="text-sm text-red-600">Failed to load admin list.</p>}

                {!isLoading && !isError && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-3 py-2 text-left">Admin</th>
                                    <th className="px-3 py-2 text-left">Email</th>
                                    <th className="px-3 py-2 text-left">Role</th>
                                    <th className="px-3 py-2 text-left">Status</th>
                                    <th className="px-3 py-2 text-left">Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((admin) => (
                                    <tr key={admin.id} className="border-b border-border/50">
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-3">
                                                {admin.image ? (
                                                    <img
                                                        src={resolveImage(admin.image)}
                                                        alt={admin.name}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                                                        {admin.name?.slice(0, 1).toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-foreground">{admin.name}</p>
                                                    <p className="text-xs text-muted-foreground">{admin.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3">{admin.email}</td>
                                        <td className="px-3 py-3">{admin.role}</td>
                                        <td className="px-3 py-3">
                                            <span className={`text-xs font-semibold ${admin.online ? 'text-green-600' : 'text-gray-500'}`}>
                                                {admin.online ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3">
                                            {new Date(admin.updated_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    )
}
