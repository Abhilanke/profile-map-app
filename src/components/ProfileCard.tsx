import React from 'react';
import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
  onShowSummary: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onShowSummary, onViewDetails }) => {
  return (
    <div className="profile-card">
      <img 
        src={typeof profile.photo === 'string' ? profile.photo : URL.createObjectURL(profile.photo)} 
        className="card-img-top" 
        alt={profile.name} 
      />
      <div className="card-body">
        <h5 className="card-title">{profile.name}</h5>
        <p className="card-text">{profile.description}</p>
        <div className="d-flex justify-content-between">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onShowSummary(profile.id)}
          >
            <i className="fas fa-map-marker-alt me-2"></i>
            Show on Map
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onViewDetails(profile.id)}
          >
            <i className="fas fa-info-circle me-2"></i>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

