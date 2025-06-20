import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useProductFruits } from "@/hooks/useProductFruits";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { workspaceData, updateWorkspaceData } = useWorkspace();
  const { initializeProductFruits } = useProductFruits();
  const { toast } = useToast();

  const [localWorkspaceData, setLocalWorkspaceData] = useState({
    workspaceName: workspaceData?.workspaceName || "",
    companySize: workspaceData?.companySize || "",
    industry: workspaceData?.industry || "",
  });

  const [customProperties, setCustomProperties] = useState(
    workspaceData?.customProperties || []
  );
  const [newPropertyName, setNewPropertyName] = useState("");
  const [newPropertyValue, setNewPropertyValue] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddCustomProperty = () => {
    if (newPropertyName && newPropertyValue) {
      setCustomProperties([
        ...customProperties,
        { name: newPropertyName, value: newPropertyValue },
      ]);
      setNewPropertyName("");
      setNewPropertyValue("");
    }
  };

  const handleDeleteCustomProperty = (index: number) => {
    const updatedProperties = [...customProperties];
    updatedProperties.splice(index, 1);
    setCustomProperties(updatedProperties);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalWorkspaceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const dataToSave = {
      ...localWorkspaceData,
      customProperties: customProperties.filter(prop => prop.name && prop.value)
    };
    
    // Save to context and localStorage
    updateWorkspaceData(dataToSave);
    
    // Re-initialize ProductFruits with the newly saved data
    initializeProductFruits(dataToSave);
    
    console.log('Workspace data saved and ProductFruits re-initialized:', dataToSave);
    
    // Show success toast
    toast({
      title: "Settings saved",
      description: "Your workspace settings have been successfully saved.",
    });
  };

  const handleDelete = () => {
    const emptyData = {
      workspaceName: "",
      companySize: "",
      industry: "",
      customProperties: []
    };
    
    updateWorkspaceData(emptyData);
    setLocalWorkspaceData(emptyData);
    setCustomProperties([]);
    initializeProductFruits(emptyData);
    
    console.log('Workspace data cleared and ProductFruits re-initialized');
    
    // Show success toast
    toast({
      title: "Data deleted",
      description: "All workspace data has been successfully cleared.",
      variant: "destructive"
    });
    
    setShowDeleteModal(false);
  };

  const showSavedData = () => {
    console.log("Saved Workspace Data:", workspaceData);
  };

  const handleViewSavedData = () => {
    showSavedData();
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Workspace Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="custom">Custom Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="workspaceName">Workspace Name</Label>
                  <Input
                    type="text"
                    id="workspaceName"
                    name="workspaceName"
                    value={localWorkspaceData.workspaceName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <Input
                    type="text"
                    id="companySize"
                    name="companySize"
                    value={localWorkspaceData.companySize}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    type="text"
                    id="industry"
                    name="industry"
                    value={localWorkspaceData.industry}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="custom">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {customProperties.map((prop, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            type="text"
                            placeholder="Property Name"
                            value={prop.name}
                            readOnly
                            className="w-1/2"
                          />
                          <Input
                            type="text"
                            placeholder="Property Value"
                            value={prop.value}
                            readOnly
                            className="w-1/2"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteCustomProperty(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          placeholder="Property Name"
                          value={newPropertyName}
                          onChange={(e) => setNewPropertyName(e.target.value)}
                          className="w-1/2"
                        />
                        <Input
                          type="text"
                          placeholder="Property Value"
                          value={newPropertyValue}
                          onChange={(e) => setNewPropertyValue(e.target.value)}
                          className="w-1/2"
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={handleAddCustomProperty}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex justify-between">
            <Button onClick={handleViewSavedData}>View Saved Data</Button>
            <div>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteModal(true)}
                className="mr-2"
              >
                Clear Data
              </Button>
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Are you sure you want to clear all workspace data?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
