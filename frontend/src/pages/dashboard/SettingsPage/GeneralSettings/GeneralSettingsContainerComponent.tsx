import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { GeneralSettingsPresentational } from "./GeneralSettingsPresentationalComponent";

export function GeneralSettingsContainer() {
  const { gym, user, updateGym } = useAuth();

  const [gymForm, setGymForm] = useState({
    name: gym?.name ?? "",
    email: gym?.email ?? "",
    phone: gym?.phone ?? "",
    website: gym?.website ?? "",
  });

  const [profileForm, setProfileForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
  });

  function handleGymSave() {
    updateGym(gymForm);
    toast.success("Gym information saved");
  }

  function handleProfileSave() {
    toast.success("Profile updated");
  }

  return (
    <GeneralSettingsPresentational
      gymForm={gymForm}
      profileForm={profileForm}
      planKey={gym?.plan ?? "starter"}
      userRole={user?.role ?? ""}
      onGymFormChange={setGymForm}
      onProfileFormChange={setProfileForm}
      onGymSave={handleGymSave}
      onProfileSave={handleProfileSave}
    />
  );
}
