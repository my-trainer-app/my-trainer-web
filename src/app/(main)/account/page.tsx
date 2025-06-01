"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Settings,
  Activity,
  Target,
  AlertCircle,
  Save,
} from "lucide-react";
import { toast } from "sonner";

// Mock data - gerçek uygulamada Clerk ve veritabanından gelecek
const mockUser = {
  id: "user_123",
  clerkId: "clerk_456",
  role: "USER",
  name: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  imageUrl: "/placeholder.svg?height=100&width=100",
  profile: {
    id: "profile_789",
    age: 28,
    weight: 75.5,
    height: 180,
    fatPercentage: 15.2,
    muscleMass: 45.8,
    activityLevel: "MODERATE",
    goal: "MUSCLE_GAIN",
    sportExperience: "INTERMEDIATE",
    disieaseHistory: "Yok",
    injuryHistory: "2019'da diz sakatlığı",
    allergies: "Fıstık alerjisi",
  },
};

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(mockUser.profile);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Burada API çağrısı yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay

      toast("Bilgileriniz başarıyla kaydedildi.");
      setIsEditing(false);
    } catch (error) {
      toast("Profil güncellenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const activityLevels = {
    SEDENTARY: "Hareketsiz",
    LIGHT: "Az Aktif",
    MODERATE: "Orta Aktif",
    ACTIVE: "Aktif",
    VERY_ACTIVE: "Çok Aktif",
  };

  const goals = {
    WEIGHT_LOSS: "Kilo Verme",
    MUSCLE_GAIN: "Kas Kazanma",
    MAINTENANCE: "Koruma",
    ENDURANCE: "Dayanıklılık",
    STRENGTH: "Güç Artırma",
  };

  const experiences = {
    BEGINNER: "Başlangıç",
    INTERMEDIATE: "Orta",
    ADVANCED: "İleri",
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Account</h1>
          <p className="text-muted-foreground">
            View your account details and manage your profile settings.
          </p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </div>
          ) : isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="fitness" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Fitness Information
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Health Information
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>Base profile Information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={mockUser.imageUrl || "/placeholder.svg"}
                    alt={mockUser.name}
                  />
                  <AvatarFallback>
                    {mockUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{mockUser.name}</h3>
                  <p className="text-muted-foreground">{mockUser.email}</p>
                  <Badge variant="secondary">{mockUser.role}</Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Yaş</Label>
                  {isEditing ? (
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        handleInputChange(
                          "age",
                          Number.parseInt(e.target.value)
                        )
                      }
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {formData.age} yaş
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Kilo (kg)</Label>
                  {isEditing ? (
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange(
                          "weight",
                          Number.parseFloat(e.target.value)
                        )
                      }
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {formData.weight} kg
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Boy (cm)</Label>
                  {isEditing ? (
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) =>
                        handleInputChange(
                          "height",
                          Number.parseInt(e.target.value)
                        )
                      }
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {formData.height} cm
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Aktivite Seviyesi</Label>
                  {isEditing ? (
                    <Select
                      value={formData.activityLevel}
                      onValueChange={(value) =>
                        handleInputChange("activityLevel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(activityLevels).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {
                        activityLevels[
                          formData.activityLevel as keyof typeof activityLevels
                        ]
                      }
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fitness" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Fitness Hedefleri ve Deneyim
              </CardTitle>
              <CardDescription>Spor geçmişiniz ve hedefleriniz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="goal">Hedef</Label>
                  {isEditing ? (
                    <Select
                      value={formData.goal}
                      onValueChange={(value) =>
                        handleInputChange("goal", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(goals).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {goals[formData.goal as keyof typeof goals]}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sportExperience">Spor Deneyimi</Label>
                  {isEditing ? (
                    <Select
                      value={formData.sportExperience}
                      onValueChange={(value) =>
                        handleInputChange("sportExperience", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(experiences).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {
                        experiences[
                          formData.sportExperience as keyof typeof experiences
                        ]
                      }
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatPercentage">Yağ Oranı (%)</Label>
                  {isEditing ? (
                    <Input
                      id="fatPercentage"
                      type="number"
                      step="0.1"
                      value={formData.fatPercentage || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "fatPercentage",
                          Number.parseFloat(e.target.value)
                        )
                      }
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {formData.fatPercentage
                        ? `%${formData.fatPercentage}`
                        : "Belirtilmemiş"}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="muscleMass">Kas Kütlesi (kg)</Label>
                  {isEditing ? (
                    <Input
                      id="muscleMass"
                      type="number"
                      step="0.1"
                      value={formData.muscleMass || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "muscleMass",
                          Number.parseFloat(e.target.value)
                        )
                      }
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {formData.muscleMass
                        ? `${formData.muscleMass} kg`
                        : "Belirtilmemiş"}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Sağlık Bilgileri
              </CardTitle>
              <CardDescription>
                Sağlık geçmişiniz ve özel durumlarınız
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="disieaseHistory">Hastalık Geçmişi</Label>
                {isEditing ? (
                  <Textarea
                    id="disieaseHistory"
                    value={formData.disieaseHistory}
                    onChange={(e) =>
                      handleInputChange("disieaseHistory", e.target.value)
                    }
                    placeholder="Geçmiş hastalıklarınızı belirtiniz..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md min-h-[100px]">
                    {formData.disieaseHistory || "Belirtilmemiş"}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="injuryHistory">Sakatlık Geçmişi</Label>
                {isEditing ? (
                  <Textarea
                    id="injuryHistory"
                    value={formData.injuryHistory}
                    onChange={(e) =>
                      handleInputChange("injuryHistory", e.target.value)
                    }
                    placeholder="Geçmiş sakatlıklarınızı belirtiniz..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md min-h-[100px]">
                    {formData.injuryHistory || "Belirtilmemiş"}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Alerjiler</Label>
                {isEditing ? (
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) =>
                      handleInputChange("allergies", e.target.value)
                    }
                    placeholder="Alerjilerinizi belirtiniz..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md min-h-[100px]">
                    {formData.allergies || "Belirtilmemiş"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isEditing && (
        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setFormData(mockUser.profile);
            }}
          >
            İptal
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Kaydediliyor...
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Değişiklikleri Kaydet
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
