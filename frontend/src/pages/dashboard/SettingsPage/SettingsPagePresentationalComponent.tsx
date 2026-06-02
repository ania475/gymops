import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Paintbrush, Bell } from "lucide-react";
import { GeneralSettingsContainer } from "./GeneralSettings/GeneralSettingsContainerComponent";
import { ThemeSettingsContainer } from "./ThemeSettings/ThemeSettingsContainerComponent";
import { NotificationSettingsContainer } from "./NotificationSettings/NotificationSettingsContainerComponent";

export function SettingsPagePresentational() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your gym profile, dashboard appearance, and notification
            preferences.
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="gap-2">
              <Settings className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="theme" className="gap-2">
              <Paintbrush className="w-4 h-4" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettingsContainer />
          </TabsContent>

          <TabsContent value="theme">
            <ThemeSettingsContainer />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettingsContainer />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
