'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit2, Mail, MapPin, Clock, Shield, Upload, X } from 'lucide-react'

interface UserProfile {
    fullName: string
    email: string
    role: string
    location: string
    lastLogin: string
    joinedDate: string
    avatar: string | null
}

interface DialogState {
    editProfile: boolean
    changePassword: boolean
    uploadImage: boolean
}

export default function Profile() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [profile, setProfile] = useState<UserProfile>({
        fullName: 'Devon Lane',
        email: 'curtis.weaver@example.com',
        role: 'Super Admin',
        location: 'London',
        lastLogin: 'Oct 24, 2023 - 14:20 GMT',
        joinedDate: 'Jan 15, 2023',
        avatar: null,
    })

    const [editingName, setEditingName] = useState(profile.fullName)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [previewImage, setPreviewImage] = useState<string | null>(profile.avatar)
    const [dialogs, setDialogs] = useState<DialogState>({
        editProfile: false,
        changePassword: false,
        uploadImage: false,
    })

    const handleOpenDialog = (dialog: keyof DialogState) => {
        setDialogs((prev) => ({ ...prev, [dialog]: true }))
    }

    const handleCloseDialog = (dialog: keyof DialogState) => {
        setDialogs((prev) => ({ ...prev, [dialog]: false }))
        if (dialog === 'editProfile') {
            setEditingName(profile.fullName)
        } else if (dialog === 'changePassword') {
            setNewPassword('')
            setConfirmPassword('')
        } else if (dialog === 'uploadImage') {
            setPreviewImage(profile.avatar)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveImage = () => {
        if (previewImage) {
            setProfile((prev) => ({ ...prev, avatar: previewImage }))
            handleCloseDialog('uploadImage')
        }
    }

    const handleSaveProfile = () => {
        if (editingName.trim()) {
            setProfile((prev) => ({ ...prev, fullName: editingName }))
            handleCloseDialog('editProfile')
        }
    }

    const handleSavePassword = () => {
        if (newPassword === confirmPassword && newPassword.length >= 8) {
            console.log('Password changed successfully')
            alert('Password changed successfully!')
            handleCloseDialog('changePassword')
        } else if (newPassword !== confirmPassword) {
            alert('Passwords do not match')
        } else {
            alert('Password must be at least 8 characters')
        }
    }

    const avatarContent = previewImage ? (
        <img src={previewImage} alt={profile.fullName} className="w-full h-full object-cover" />
    ) : (
        <span className="text-4xl">👤</span>
    )

    return (
        <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
            <div className=" space-y-6">
                {/* Profile Header */}
                <div className="relative rounded-3xl overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-90"
                        style={{
                            background: 'linear-gradient(135deg, #8491FF 0%, #090A58 100%)',
                        }}
                    />

                    <div className="relative z-10 px-4 sm:px-8 py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center gap-6">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0 group">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-4xl font-bold text-white overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                                {avatarContent}
                            </div>
                            <button
                                onClick={() => handleOpenDialog('uploadImage')}
                                className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors shadow-lg"
                                title="Upload profile picture"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">{profile.fullName}</h1>

                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="inline-block px-4 py-1.5 bg-white text-gray-900 rounded-full text-sm font-semibold">
                                    {profile.role}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>Last Login: {profile.lastLogin}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{profile.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Account Information</h2>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 cursor-help" title="Account details">
                            <span>ℹ️</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        {/* Full Name */}
                        <div>
                            <Label htmlFor="fullname" className="text-sm font-medium text-gray-900 mb-2 block">
                                Full Name
                            </Label>
                            <div className="relative">
                                <input
                                    id="fullname"
                                    type="text"
                                    value={profile.fullName}
                                    readOnly
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium text-sm focus:outline-none"
                                />
                                <button
                                    onClick={() => handleOpenDialog('editProfile')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Email Address */}
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-900 mb-2 block">
                                Email Address
                            </Label>
                            <input
                                id="email"
                                type="email"
                                value={profile.email}
                                readOnly
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Role & Governance */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Role & Governance</h3>
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                                <Shield className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{profile.role} Access enabled</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <Button
                            variant="outline"
                            className="rounded-full border-gray-400 text-gray-900 hover:bg-gray-50 order-2 sm:order-1"
                            onClick={() => handleOpenDialog('changePassword')}
                        >
                            Change Password
                        </Button>
                        <Button
                            className="rounded-full bg-[#090A58] hover:bg-[#070847] text-white order-1 sm:order-2"
                            onClick={() => handleOpenDialog('editProfile')}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-xs text-gray-500">
                    Last updated by Devon Lane · 2 hours ago
                </div>
            </div>

            {/* Edit Profile Dialog */}
            {dialogs.editProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Profile</h2>

                        <div className="mb-6">
                            <Label htmlFor="edit-name" className="text-sm font-medium text-gray-900 mb-2 block">
                                Full Name
                            </Label>
                            <Input
                                id="edit-name"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="rounded-lg"
                            />
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => handleCloseDialog('editProfile')}
                                className="rounded-full border-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveProfile}
                                className="rounded-full bg-[#8491FF] hover:bg-[#7080E0] text-white"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Password Dialog */}
            {dialogs.changePassword && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Change Password</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <Label htmlFor="new-pwd" className="text-sm font-medium text-gray-900 mb-2 block">
                                    New Password
                                </Label>
                                <Input
                                    id="new-pwd"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="rounded-lg"
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirm-pwd" className="text-sm font-medium text-gray-900 mb-2 block">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirm-pwd"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => handleCloseDialog('changePassword')}
                                className="rounded-full border-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSavePassword}
                                className="rounded-full bg-[#090A58] hover:bg-[#070847] text-white"
                            >
                                Update Password
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Image Dialog */}
            {dialogs.uploadImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Upload Profile Picture</h2>
                            <button
                                onClick={() => handleCloseDialog('uploadImage')}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Image Preview */}
                        <div className="mb-6">
                            <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#8491FF] to-[#090A58] flex items-center justify-center overflow-hidden shadow-lg">
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Upload className="w-8 h-8 text-white" />
                                )}
                            </div>
                        </div>

                        {/* File Input */}
                        <div className="mb-6">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full rounded-lg border-2 border-dashed border-[#8491FF] text-[#8491FF] hover:bg-blue-50"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Choose Image
                            </Button>
                            <p className="text-xs text-gray-500 text-center mt-2">
                                PNG, JPG, GIF up to 5MB
                            </p>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => handleCloseDialog('uploadImage')}
                                className="rounded-full border-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveImage}
                                disabled={!previewImage}
                                className="rounded-full bg-[#8491FF] hover:bg-[#7080E0] text-white disabled:opacity-50"
                            >
                                Save Image
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
