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
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { UserProfile } from "@clerk/clerk-react";
import { useDbUser } from "@/client/hooks/useUser";
import { useProfile } from "@/client/hooks/useProfile";
import { Role } from "@/client/model/User";
import { completeOnboarding } from "@/app/onboarding/_actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProfileData {
  age: string;
  weight: string;
  height: string;
  fatPercentage: string;
  muscleMass: string;
  activityLevel: string;
  goal: string;
  sportExperience: string;
  disieaseHistory: string;
  injuryHistory: string;
  allergies: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Component() {
  const router = useRouter();
  const { user } = useUser();
  const { createDbUser } = useDbUser();
  const { createDbProfile } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProfileData>({
    age: "",
    weight: "",
    height: "",
    fatPercentage: "",
    muscleMass: "",
    activityLevel: "",
    goal: "",
    sportExperience: "",
    disieaseHistory: "",
    injuryHistory: "",
    allergies: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const totalSteps = 4;

  const updateFormData = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const markFieldAsTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateField = (field: keyof ProfileData, value: string): string => {
    switch (field) {
      case "age":
        if (!value) return "Age is required";
        const age = Number.parseInt(value);
        if (isNaN(age) || age < 13 || age > 120)
          return "Age must be between 13 and 120";
        return "";

      case "weight":
        if (!value) return "Weight is required";
        const weight = Number.parseFloat(value);
        if (isNaN(weight) || weight < 20 || weight > 300)
          return "Weight must be between 20 and 300 kg";
        return "";

      case "height":
        if (!value) return "Height is required";
        const height = Number.parseFloat(value);
        if (isNaN(height) || height < 100 || height > 250)
          return "Height must be between 100 and 250 cm";
        return "";

      case "fatPercentage":
        if (value && value.trim() !== "") {
          const fatPercentage = Number.parseFloat(value);
          if (isNaN(fatPercentage) || fatPercentage < 3 || fatPercentage > 50) {
            return "Body fat percentage must be between 3% and 50%";
          }
        }
        return "";

      case "muscleMass":
        if (value && value.trim() !== "") {
          const muscleMass = Number.parseFloat(value);
          if (isNaN(muscleMass) || muscleMass < 10 || muscleMass > 100) {
            return "Muscle mass must be between 10 and 100 kg";
          }
        }
        return "";

      case "activityLevel":
        if (!value) return "Activity level is required";
        return "";

      case "goal":
        if (!value) return "Fitness goal is required";
        return "";

      case "sportExperience":
        if (!value) return "Sport experience is required";
        return "";

      case "disieaseHistory":
        if (!value || value.trim().length < 2)
          return "Please provide disease history information (minimum 2 characters, write 'None' if not applicable)";
        if (value.trim().length > 500)
          return "Disease history must be less than 500 characters";
        return "";

      case "injuryHistory":
        if (!value || value.trim().length < 2)
          return "Please provide injury history information (minimum 2 characters, write 'None' if not applicable)";
        if (value.trim().length > 500)
          return "Injury history must be less than 500 characters";
        return "";

      case "allergies":
        if (!value || value.trim().length < 2)
          return "Please provide allergy information (minimum 2 characters, write 'None' if not applicable)";
        if (value.trim().length > 500)
          return "Allergies information must be less than 500 characters";
        return "";

      default:
        return "";
    }
  };

  const validateStep = (step: number): boolean => {
    const stepFields = getStepFields(step);
    const stepErrors: FormErrors = {};
    let isValid = true;

    stepFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        stepErrors[field] = error;
        isValid = false;
      }
    });

    setErrors((prev) => ({ ...prev, ...stepErrors }));
    return isValid;
  };

  const getStepFields = (step: number): (keyof ProfileData)[] => {
    switch (step) {
      case 1:
        return ["age", "weight", "height"];
      case 2:
        return ["fatPercentage", "muscleMass"];
      case 3:
        return ["activityLevel", "goal", "sportExperience"];
      case 4:
        return ["disieaseHistory", "injuryHistory", "allergies"];
      default:
        return [];
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate all steps before submission
    let allValid = true;
    for (let step = 1; step <= totalSteps; step++) {
      if (!validateStep(step)) {
        allValid = false;
      }
    }
    if (allValid) {
      if (!user) return alert("You must be logged in to submit your profile.");

      const userRes = await createDbUser.mutateAsync({
        role: Role.USER,
        clerkId: user.id,
      });

      if (!userRes) {
        return alert("Failed to create profile. Please try again.");
      }

      const profileRes = await createDbProfile.mutateAsync({
        userId: userRes.id,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        fatPercentage: parseFloat(formData.fatPercentage) || undefined,
        muscleMass: parseFloat(formData.muscleMass) || undefined,
        activityLevel: formData.activityLevel,
        goal: formData.goal,
        sportExperience: formData.sportExperience,
        disieaseHistory: formData.disieaseHistory,
        injuryHistory: formData.injuryHistory,
        allergies: formData.allergies,
      });

      if (!profileRes) {
        return alert("Failed to create profile. Please try again.");
      }

      const res = await completeOnboarding();
      if (res?.message) {
        // Reloads the user's data from the Clerk API
        await user?.reload();
        router.push("/dashboard");
      }
      if (res?.error) {
        toast.error(
          "There was an error completing your onboarding. Please try again."
        );
      }

      alert("Profile submitted successfully!");
    } else {
      alert("Please fix all validation errors before submitting.");
    }
  };

  const handleBlur = (field: keyof ProfileData) => {
    markFieldAsTouched(field);
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const isStepValid = () => {
    const stepFields = getStepFields(currentStep);
    return stepFields.every((field) => !validateField(field, formData[field]));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => updateFormData("age", e.target.value)}
                onBlur={() => handleBlur("age")}
                className={cn(errors.age && touched.age && "border-red-500")}
              />
              {errors.age && touched.age && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.age}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg) *</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="Enter your weight"
                value={formData.weight}
                onChange={(e) => updateFormData("weight", e.target.value)}
                onBlur={() => handleBlur("weight")}
                className={cn(
                  errors.weight && touched.weight && "border-red-500"
                )}
              />
              {errors.weight && touched.weight && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.weight}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm) *</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                placeholder="Enter your height"
                value={formData.height}
                onChange={(e) => updateFormData("height", e.target.value)}
                onBlur={() => handleBlur("height")}
                className={cn(
                  errors.height && touched.height && "border-red-500"
                )}
              />
              {errors.height && touched.height && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.height}
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fatPercentage">Body Fat Percentage (%)</Label>
              <Input
                id="fatPercentage"
                type="number"
                step="0.1"
                placeholder="Enter your body fat percentage (optional)"
                value={formData.fatPercentage}
                onChange={(e) =>
                  updateFormData("fatPercentage", e.target.value)
                }
                onBlur={() => handleBlur("fatPercentage")}
                className={cn(
                  errors.fatPercentage &&
                    touched.fatPercentage &&
                    "border-red-500"
                )}
              />
              {errors.fatPercentage && touched.fatPercentage && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fatPercentage}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="muscleMass">Muscle Mass (kg)</Label>
              <Input
                id="muscleMass"
                type="number"
                step="0.1"
                placeholder="Enter your muscle mass (optional)"
                value={formData.muscleMass}
                onChange={(e) => updateFormData("muscleMass", e.target.value)}
                onBlur={() => handleBlur("muscleMass")}
                className={cn(
                  errors.muscleMass && touched.muscleMass && "border-red-500"
                )}
              />
              {errors.muscleMass && touched.muscleMass && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.muscleMass}
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              These measurements are optional but help create a more accurate
              profile.
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level *</Label>
              <Select
                value={formData.activityLevel}
                onValueChange={(value) => {
                  updateFormData("activityLevel", value);
                  markFieldAsTouched("activityLevel");
                }}
              >
                <SelectTrigger
                  className={cn(
                    errors.activityLevel &&
                      touched.activityLevel &&
                      "border-red-500"
                  )}
                >
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">
                    Sedentary (little to no exercise)
                  </SelectItem>
                  <SelectItem value="light">
                    Light (light exercise 1-3 days/week)
                  </SelectItem>
                  <SelectItem value="moderate">
                    Moderate (moderate exercise 3-5 days/week)
                  </SelectItem>
                  <SelectItem value="active">
                    Active (hard exercise 6-7 days/week)
                  </SelectItem>
                  <SelectItem value="very-active">
                    Very Active (very hard exercise, physical job)
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.activityLevel && touched.activityLevel && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.activityLevel}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal">Fitness Goal *</Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => {
                  updateFormData("goal", value);
                  markFieldAsTouched("goal");
                }}
              >
                <SelectTrigger
                  className={cn(
                    errors.goal && touched.goal && "border-red-500"
                  )}
                >
                  <SelectValue placeholder="Select your primary goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintenance">
                    Weight Maintenance
                  </SelectItem>
                  <SelectItem value="strength">Strength Building</SelectItem>
                  <SelectItem value="endurance">
                    Endurance Improvement
                  </SelectItem>
                  <SelectItem value="general-fitness">
                    General Fitness
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.goal && touched.goal && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.goal}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sportExperience">Sport Experience *</Label>
              <Select
                value={formData.sportExperience}
                onValueChange={(value) => {
                  updateFormData("sportExperience", value);
                  markFieldAsTouched("sportExperience");
                }}
              >
                <SelectTrigger
                  className={cn(
                    errors.sportExperience &&
                      touched.sportExperience &&
                      "border-red-500"
                  )}
                >
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">
                    Beginner (0-6 months)
                  </SelectItem>
                  <SelectItem value="novice">
                    Novice (6 months - 2 years)
                  </SelectItem>
                  <SelectItem value="intermediate">
                    Intermediate (2-5 years)
                  </SelectItem>
                  <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                  <SelectItem value="expert">Expert/Professional</SelectItem>
                </SelectContent>
              </Select>
              {errors.sportExperience && touched.sportExperience && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.sportExperience}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="disieaseHistory">Disease History *</Label>
              <Textarea
                id="disieaseHistory"
                placeholder="Please list any chronic diseases, medical conditions, or ongoing health issues (write 'None' if not applicable)"
                value={formData.disieaseHistory}
                onChange={(e) =>
                  updateFormData("disieaseHistory", e.target.value)
                }
                onBlur={() => handleBlur("disieaseHistory")}
                className={cn(
                  "min-h-[80px]",
                  errors.disieaseHistory &&
                    touched.disieaseHistory &&
                    "border-red-500"
                )}
              />
              {errors.disieaseHistory && touched.disieaseHistory && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.disieaseHistory}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="injuryHistory">Injury History *</Label>
              <Textarea
                id="injuryHistory"
                placeholder="Please describe any past or current injuries that might affect your training (write 'None' if not applicable)"
                value={formData.injuryHistory}
                onChange={(e) =>
                  updateFormData("injuryHistory", e.target.value)
                }
                onBlur={() => handleBlur("injuryHistory")}
                className={cn(
                  "min-h-[80px]",
                  errors.injuryHistory &&
                    touched.injuryHistory &&
                    "border-red-500"
                )}
              />
              {errors.injuryHistory && touched.injuryHistory && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.injuryHistory}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies *</Label>
              <Textarea
                id="allergies"
                placeholder="Please list any allergies, including food allergies, medication allergies, or environmental allergies (write 'None' if not applicable)"
                value={formData.allergies}
                onChange={(e) => updateFormData("allergies", e.target.value)}
                onBlur={() => handleBlur("allergies")}
                className={cn(
                  "min-h-[80px]",
                  errors.allergies && touched.allergies && "border-red-500"
                )}
              />
              {errors.allergies && touched.allergies && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.allergies}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic Information";
      case 2:
        return "Body Composition";
      case 3:
        return "Activity & Goals";
      case 4:
        return "Health History";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Let's start with your basic physical information";
      case 2:
        return "Optional body composition measurements for better accuracy";
      case 3:
        return "Tell us about your activity level and fitness goals";
      case 4:
        return "Important health information for your safety";
      default:
        return "";
    }
  };

  const hasStepErrors = () => {
    const stepFields = getStepFields(currentStep);
    return stepFields.some((field) => errors[field] && touched[field]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>{getStepTitle()}</CardTitle>
              <CardDescription>{getStepDescription()}</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          <Progress
            value={(currentStep / totalSteps) * 100}
            className="w-full"
          />
        </CardHeader>
        <CardContent>
          {hasStepErrors() && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Please fix the validation errors below before proceeding.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            {renderStep()}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button type="button" onClick={handleSubmit}>
                  <Check className="w-4 h-4 mr-2" />
                  Submit Profile
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
