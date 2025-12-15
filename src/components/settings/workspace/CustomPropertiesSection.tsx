
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CustomPropertiesSectionProps {
  customProperties: { name: string; value: string }[];
  setCustomProperties: (properties: { name: string; value: string }[]) => void;
}

export const CustomPropertiesSection = ({ customProperties, setCustomProperties }: CustomPropertiesSectionProps) => {
  const { t } = useTranslation('settings');

  const addCustomProperty = () => {
    setCustomProperties([...customProperties, { name: "", value: "" }]);
  };

  const removeCustomProperty = (index: number) => {
    const newProperties = customProperties.filter((_, i) => i !== index);
    setCustomProperties(newProperties);
  };

  const updateCustomProperty = (index: number, field: "name" | "value", value: string) => {
    const newProperties = [...customProperties];
    newProperties[index][field] = value;
    setCustomProperties(newProperties);
  };

  return (
    <div data-testid="workspace-custom-properties-section">
      <div className="flex items-center justify-between mb-4" data-testid="workspace-custom-properties-header">
        <Label className="text-sm font-medium text-slate-700" data-testid="workspace-custom-properties-label">{t('workspace.customProperties')}</Label>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addCustomProperty}
          className="flex items-center space-x-1"
          data-testid="workspace-add-property-button"
        >
          <Plus className="h-4 w-4" data-testid="workspace-add-property-icon" />
          <span data-testid="workspace-add-property-text">{t('workspace.addProperty')}</span>
        </Button>
      </div>
      
      {customProperties.length > 0 && (
        <div className="space-y-3" data-testid="workspace-custom-properties-list">
          {customProperties.map((property, index) => (
            <div key={index} className="flex items-center space-x-2" data-testid={`workspace-custom-property-${index}`}>
              <Input 
                placeholder={t('workspace.propertyName')}
                value={property.name}
                onChange={(e) => updateCustomProperty(index, "name", e.target.value)}
                className="flex-1"
                data-testid={`workspace-property-name-${index}`}
              />
              <Input 
                placeholder={t('workspace.propertyValue')}
                value={property.value}
                onChange={(e) => updateCustomProperty(index, "value", e.target.value)}
                className="flex-1"
                data-testid={`workspace-property-value-${index}`}
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => removeCustomProperty(index)}
                className="text-slate-500 hover:text-red-500"
                data-testid={`workspace-remove-property-${index}`}
              >
                <X className="h-4 w-4" data-testid={`workspace-remove-property-icon-${index}`} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
