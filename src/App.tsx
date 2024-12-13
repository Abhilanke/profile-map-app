
import React, { useState, useEffect, useCallback } from 'react';
import ProfileCard from './components/ProfileCard';
import MapComponent from './components/MapComponent';
import SearchBar from './components/SearchBar';
import ProfileDetails from './components/ProfileDetails';
import AdminPanel from './components/AdminPanel';
import { Profile } from './types';
import './styles/custom.css';

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [detailProfile, setDetailProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const fetchProfiles = useCallback(() => {
    setLoading(true);
    setError(null);
    // In a real application, you would fetch this data from an API
    // For this example, we'll use localStorage to persist the data
    const storedProfiles = localStorage.getItem('profiles');
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
      setFilteredProfiles(JSON.parse(storedProfiles));
      setLoading(false);
    } else {
      // If no stored profiles, use the initial data
      const initialProfiles: Profile[] = [
        { 
          id: 1, 
          name: "Kunal Nikam", 
          photo: "https://img.freepik.com/premium-photo/young-blond-businessman-thinking-about-strategy-his-working-place-with-computer-startup-business-means-working-hard-out-time-success-achievement_665183-11963.jpg?semt=ais_hybrid", 
          description: "Passionate Software Developer with 5 years of experience", 
          address: "Pune Maharastra India", 
          lat: 18.525364073492476,  
          lng: 73.85825214111551,
          contactInfo: "kunalnikam@gmail.com",
          interests: ["Coding", "Hiking", "Photography"]
        },
        { 
          id: 2, 
          name: "Sumit Chavhan", 
          photo: "https://st5.depositphotos.com/1000975/64655/i/450/depositphotos_646559990-stock-photo-young-businessman-employee-sitting-workplace.jpg", 
          description: "Creative UX Designer transforming ideas into intuitive designs", 
          address: "Nashik, Maharastra ,IND", 
          lat: 19.995783495377683, 
          lng: 73.79180213998009, 
          contactInfo: "sumitchavhan@gmail.com",
          interests: ["Design", "Travel", "Cooking"]
        },
        { 
          id: 3, 
          name: "Amol Gore", 
          photo: "https://img.freepik.com/premium-photo/happy-businessman-working-office-laptop_488220-42510.jpg?semt=ais_hybrid", 
          description: "Experienced Project Manager leading teams to success", 
          address: "Mumbai, Maharastra, IND", 
          lat: 19.066383171465073, 
          lng: 72.88383954624103 ,
          contactInfo: "amolgore@gmail.com",
          interests: ["Management", "Sports", "Reading"]
        },
        { 
          id: 4, 
          name: "Abhishek Kumar", 
          photo: "https://st5.depositphotos.com/1000975/64897/i/450/depositphotos_648974812-stock-photo-young-employee-too-much-work.jpg", 
          description: "Computer Science enthusiast with a passion for AI", 
          address: "101 Tech Park, Bangalore, India", 
          lat: 12.986228216417766, 
          lng: 77.73588233409822,
          contactInfo: "abhishek200@gmail.com",
          interests: ["Artificial Intelligence", "Machine Learning", "Robotics"]
        },
        {
          id: 5,
          name: "Samir Kote",
          photo: "https://img.pikbest.com/photo/20241022/office-boy-in-photo_10993810.jpg!w700wp",
          description: "Data Scientist specializing in machine learning algorithms",
          address: "Wagholi,Pune,Maharastra,IND",
          lat: 18.575596424933103, 
          lng: 73.97329689741805,
          contactInfo: "samirkote@gmail.com",
          interests: ["Machine Learning", "Data Visualization", "Quantum Computing"]
        },
        {
          id: 6,
          name: "Swapnil Shewale",
          photo: "https://static.vecteezy.com/system/resources/previews/036/054/437/non_2x/ai-generated-smiling-businessman-in-the-office-handsome-and-confident-photo.jpg",
          description: "Full-stack developer with a passion for cloud technologies",
          address: "Nashik,Maharatra,IND",
          lat: 19.975456714828137, 
          lng: 73.82098457313975,
          contactInfo: "shewaleswapnil@gmail.com",
          interests: ["Cloud Computing", "DevOps", "Web Development"]
        },
      ];
      setProfiles(initialProfiles);
      setFilteredProfiles(initialProfiles);
      localStorage.setItem('profiles', JSON.stringify(initialProfiles));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleShowSummary = (id: number) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
    }
  };

  const handleViewDetails = (id: number) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setDetailProfile(profile);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = profiles.filter(profile => 
      profile.name.toLowerCase().includes(query.toLowerCase()) ||
      profile.description.toLowerCase().includes(query.toLowerCase()) ||
      profile.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  const handleAddProfile = (newProfile: Omit<Profile, 'id'>) => {
    const profileWithId = { ...newProfile, id: profiles.length + 1 };
    const updatedProfiles = [...profiles, profileWithId];
    setProfiles(updatedProfiles);
    setFilteredProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  const handleEditProfile = (updatedProfile: Profile) => {
    const updatedProfiles = profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p);
    setProfiles(updatedProfiles);
    setFilteredProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  const handleDeleteProfile = (id: number) => {
    const updatedProfiles = profiles.filter(p => p.id !== id);
    setProfiles(updatedProfiles);
    setFilteredProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  const handleReloadProfiles = () => {
    fetchProfiles();
  };

  if (loading) {
    return (
      <div className="app-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="row my-4">
        <div className="col">
          <h1 className="text-center mb-4">Profile Explorer</h1>
          <button 
            className="btn btn-secondary float-end ms-2"
            onClick={() => setIsAdminMode(!isAdminMode)}
          >
            {isAdminMode ? 'Exit Admin Mode' : 'Enter Admin Mode'}
          </button>
          <button 
            className="btn btn-primary float-end"
            onClick={handleReloadProfiles}
          >
            Reload Profiles
          </button>
        </div>
      </div>
      {isAdminMode ? (
        <AdminPanel 
          profiles={profiles}
          onAddProfile={handleAddProfile}
          onEditProfile={handleEditProfile}
          onDeleteProfile={handleDeleteProfile}
        />
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-md-6 mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredProfiles.map(profile => (
                  <div className="col" key={profile.id}>
                    <ProfileCard
                      profile={profile}
                      onShowSummary={handleShowSummary}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0">
              {selectedProfile && (
                <div className="map-container">
                  <h2 className="mb-3">{selectedProfile.name}'s Location</h2>
                  <MapComponent lat={selectedProfile.lat} lng={selectedProfile.lng} />
                  <p className="mt-2">{selectedProfile.address}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {detailProfile && (
        <ProfileDetails profile={detailProfile} onClose={() => setDetailProfile(null)} />
      )}
    </div>
  );
};

export default App;







