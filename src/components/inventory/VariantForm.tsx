import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface VariantFormProps {
  onAddVariant: (variant: { variant_sku: string; attributes: Record<string, string> }) => void;
}

export const VariantForm = ({ onAddVariant }: VariantFormProps) => {
  const [variant_sku, setSku] = useState("");
  const [attributes, setAttributes] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleAttributeChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const variantAttributes = attributes.reduce(
      (acc, { key, value }) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );
    onAddVariant({ variant_sku, attributes: variantAttributes });
    setSku("");
    setAttributes([{ key: "", value: "" }]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="sku">SKU</Label>
        <Input
          id="sku"
          value={variant_sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Enter variant SKU"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Attributes</Label>
        {attributes.map((attr, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Attribute name"
              value={attr.key}
              onChange={(e) => handleAttributeChange(index, "key", e.target.value)}
              required
            />
            <Input
              placeholder="Value"
              value={attr.value}
              onChange={(e) => handleAttributeChange(index, "value", e.target.value)}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveAttribute(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddAttribute}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Attribute
        </Button>
      </div>
      
      <Button type="submit" className="w-full">
        Add Variant
      </Button>
    </form>
  );
};