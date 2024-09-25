import React, { useState, useEffect } from 'react';
import { fetchGroups, createGroup, joinGroup, fetchInvitations, createInviteLink } from './apiService';

const Group = () => {
    const [groups, setGroups] = useState([]);
    const [groupMap, setGroupMap] = useState({});
    const [newGroupName, setNewGroupName] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [invitations, setInvitations] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [maxUses, setMaxUses] = useState(1);
    const [expiryDate, setExpiryDate] = useState('');

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const data = await fetchGroups();
                setGroups(data.groups);

                // Create a map of group IDs to group names
                const groupMap = {};
                data.groups.forEach(group => {
                    groupMap[group._id] = group.name;
                });
                setGroupMap(groupMap);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        const loadInvitations = async () => {
            try {
                const data = await fetchInvitations();
                setInvitations(data.invitations);
            } catch (error) {
                console.error('Error fetching invitations:', error);
            }
        };

        loadGroups();
        loadInvitations();
    }, []);

    const handleCreateGroup = async () => {
        try {
            const data = await createGroup(newGroupName);
            setGroups([...groups, data.group]);
            setNewGroupName('');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    const handleJoinGroup = async () => {
        try {
            await joinGroup(invitationCode);
            
            const groups = await fetchGroups();
            setGroups(groups.groups);

            const invitations = await fetchInvitations();
            setInvitations(invitations.invitations);

            setInvitationCode('');
        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

    const handleCreateInviteLink = async () => {
        try {
            const data = await createInviteLink(selectedGroup, maxUses, expiryDate);
            setInvitations([...invitations, data.invitation]);
            setSelectedGroup('');
            setMaxUses(1);
            setExpiryDate('');
        } catch (error) {
            console.error('Error creating invite link:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Groups</h1>
            <ul className="mb-4">
                {groups.length === 0 ? (
                    <li className="p-2 border-b border-gray-200">No groups to display</li>
                ) : (
                    groups.map(group => (
                        <li key={group._id} className="p-2 border-b border-gray-200">{group.name}</li>
                    ))
                )}
            </ul>

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Create a Group</h2>
                <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Group Name"
                    className="p-2 border border-gray-300 rounded mb-2"
                />
                <button
                    onClick={handleCreateGroup}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Create Group
                </button>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Join a Group</h2>
                <input
                    type="text"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    placeholder="Invitation Code"
                    className="p-2 border border-gray-300 rounded mb-2"
                />
                <button
                    onClick={handleJoinGroup}
                    className="bg-green-500 text-white p-2 rounded"
                >
                    Join Group
                </button>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Group Invitations</h2>
                <ul>
                    {invitations.length === 0 ? (
                        <li className="p-2 border-b border-gray-200">No invitations to display</li>
                    ) : (
                        invitations.map(invitation => (
                            <li key={invitation._id} className="p-2 border-b border-gray-200">
                                {invitation.code} - {groupMap[invitation.group]}
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Create an Invite Link</h2>
                <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2"
                >
                    <option value="">Select Group</option>
                    {groups.map(group => (
                        <option key={group._id} value={group._id}>{group.name}</option>
                    ))}
                </select>
                <input
                    type="number"
                    value={maxUses}
                    onChange={(e) => setMaxUses(e.target.value)}
                    placeholder="Max Uses"
                    className="p-2 border border-gray-300 rounded mb-2"
                />
                <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="Expiry Date"
                    className="p-2 border border-gray-300 rounded mb-2"
                />
                <button
                    onClick={handleCreateInviteLink}
                    className="bg-purple-500 text-white p-2 rounded"
                >
                    Create Invite Link
                </button>
            </div>
        </div>
    );
};

export default Group;