import React, { useState } from 'react';
import { Profile } from '../types';

interface AdminPanelProps {
  profiles: Profile[];
  onAddProfile: (profile: Omit<Profile, 'id'>) => void;
  onEditProfile: (profile: Profile) => void;
  onDeleteProfile: (id: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ profiles, onAddProfile, onEditProfile, onDeleteProfile }) => {
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [newProfile, setNewProfile] = useState<Omit<Profile, 'id'>>({
    name: '',
    photo: '',
    description: '',
    address: '',
    lat: 0,
    lng: 0,
    contactInfo: '',
    interests: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProfile) {
      onEditProfile(editingProfile);
      setEditingProfile(null);
    } else {
      onAddProfile(newProfile);
      setNewProfile({
        name: '',
        photo: '',
        description: '',
        address: '',
        lat: 0,
        lng: 0,
        contactInfo: '',
        interests: [],
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
      onDeleteProfile(id);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{editingProfile ? 'Edit Profile' : 'Add New Profile'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={editingProfile ? editingProfile.name : newProfile.name}
            onChange={(e) => editingProfile 
              ? setEditingProfile({...editingProfile, name: e.target.value})
              : setNewProfile({...newProfile, name: e.target.value})}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">Photo URL</label>
          <input
            type="text"
            className="form-control"
            id="photo"
            value={editingProfile ? editingProfile.photo : newProfile.photo}
            onChange={(e) => editingProfile
              ? setEditingProfile({...editingProfile, photo: e.target.value})
              : setNewProfile({...newProfile, photo: e.target.value})}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={editingProfile ? editingProfile.description : newProfile.description}
            onChange={(e) => editingProfile
              ? setEditingProfile({...editingProfile, description: e.target.value})
              : setNewProfile({...newProfile, description: e.target.value})}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={editingProfile ? editingProfile.address : newProfile.address}
            onChange={(e) => editingProfile
              ? setEditingProfile({...editingProfile, address: e.target.value})
              : setNewProfile({...newProfile, address: e.target.value})}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lat" className="form-label">Latitude</label>
          <input
            type="number"
            className="form-control"
            id="lat"
            value={editingProfile ? editingProfile.lat : newProfile.lat}
            onChange={(e) => editingProfile
              ? setEditingProfile({...editingProfile, lat: parseFloat(e.target.value)})
              : setNewProfile({...newProfile, lat: parseFloat(e.target.value)})}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lng" className="form-label">Longitude</label>
          <input
            type="number"
            className="form-control"
            id="lng"
            value={editingProfile ? editingProfile.lng : newProfile.lng}
            onChange={(e) => editingProfile
              ? setEditingProfile({...editingProfile, lng: parseFloat(e.target.value)})
              : setNewProfile({...newProfile, lng: parseFloat(e.target.value)})}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactInfo" className="form-label">Contact Info</label>
          <input
            type="text"
            className="form-control"
            id="contactInfo"
            value={editingProfile ? editingProfile.contactInfo : newProfile.contactInfo}
            onChange={(e) => editingProfile
              ? setEditingProfile({...editingProfile, contactInfo: e.target.value})
              : setNewProfile({...newProfile, contactInfo: e.target.value})}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="interests" className="form-label">Interests (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="interests"
            value={editingProfile ? editingProfile.interests.join(', ') : newProfile.interests.join(', ')}
            onChange={(e) => {
              const interestsArray = e.target.value.split(',').map(i => i.trim());
              editingProfile
                ? setEditingProfile({...editingProfile, interests: interestsArray})
                : setNewProfile({...newProfile, interests: interestsArray});
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{editingProfile ? 'Update Profile' : 'Add Profile'}</button>
        {editingProfile && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingProfile(null)}>Cancel Edit</button>
        )}
      </form>
      <h2 className="mt-4">Existing Profiles</h2>
      <ul className="list-group">
        {profiles.map(profile => (
          <li key={profile.id} className="list-group-item d-flex justify-content-between align-items-center">
            {profile.name}
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => setEditingProfile(profile)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(profile.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;

