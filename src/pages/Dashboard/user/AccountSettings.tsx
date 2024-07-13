import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { usersApi} from '../../../sevices/rtk-api/userApi';
import { Users } from '../../../types/types';
import { toast } from 'react-toastify';


const AccountSettings: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = user ? user.user_id : null;

    const { data: userData, error: userError, isLoading: isUserLoading } = usersApi.useGetUserQuery(userId);
    const [updateUser] = usersApi.useUpdateUserMutation();

    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
    const [fullName, setFullName] = useState(user?.full_name || '');
    const [contactPhone, setContactPhone] = useState(user?.contact_phone || '');
    const [address, setAddress] = useState(user?.address || '');

    useEffect(() => {
        if (userData) {
            setEmail(userData.email);
            setFullName(userData.full_name);
            setContactPhone(userData.contact_phone);
            setAddress(userData.address);
        }
    }, [userData]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const updatedUser: Partial<Users> = {
            email,
            full_name: fullName,
            contact_phone: contactPhone,
            address,
            ...(password && { password }),
        };

        try {
            if (userId) {
                await updateUser({ user_id: userId, ...updatedUser }).unwrap();
                toast.success('User updated successfully!');
            } else {
                toast.error('User ID is missing.');
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        
            toast.error('Failed to update user.');
        }
    };

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setProfilePicPreview(URL.createObjectURL(file));
        }
    };

    if (isUserLoading) return <div>Loading...</div>;
    if (userError) return <div>Error loading user data</div>;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                        Contact Phone
                    </label>
                    <input
                        type="text"
                        id="contactPhone"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        id="profilePic"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {profilePicPreview && (
                        <img
                            src={profilePicPreview}
                            alt="Profile Preview"
                            className="mt-2 w-24 h-24 rounded-full object-cover"
                        />
                    )}
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;