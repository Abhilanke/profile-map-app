import React from 'react';
import { Profile } from '../types';

interface ProfileDetailsProps {
  profile: Profile;
  onClose: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile, onClose }) => {
  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{profile.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <img 
              src={typeof profile.photo === 'string' ? profile.photo : URL.createObjectURL(profile.photo)} 
              className="img-fluid rounded mb-3" 
              alt={profile.name} 
            />
            <p><strong>Description:</strong> {profile.description}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Contact Info:</strong> {profile.contactInfo}</p>
            <p><strong>Interests:</strong> {profile.interests.join(', ')}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

