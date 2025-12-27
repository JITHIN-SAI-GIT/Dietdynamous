export interface UserProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
}

export interface HealthMetrics {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  dailyCalories: number;
  dailyProtein: number;
}

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function getBMICategoryColor(bmi: number): string {
  if (bmi < 18.5) return 'text-yellow-600';
  if (bmi < 25) return 'text-green-600';
  if (bmi < 30) return 'text-orange-600';
  return 'text-red-600';
}

export function calculateBMR(weight: number, height: number, age: number, gender: string): number {
  if (!gender || typeof gender !== 'string') {
    // Default to male calculation logic or return a safe fallback if gender is missing
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  }
  if (gender.toLowerCase() === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

export function calculateDailyCalories(bmr: number, activityLevel: string, goal: string): number {
  let activityMultiplier = 1.2;

  if (activityLevel) {
    switch (activityLevel.toLowerCase()) {
      case 'low':
        activityMultiplier = 1.2;
        break;
      case 'moderate':
        activityMultiplier = 1.55;
        break;
      case 'high':
        activityMultiplier = 1.725;
        break;
      default:
        activityMultiplier = 1.2;
    }
  }

  let calories = bmr * activityMultiplier;

  if (!goal) return Math.round(calories);

  // Safely check goal
  try {
    switch (goal.toLowerCase()) {
      case 'weight_loss':
        calories -= 500;
        break;
      case 'weight_gain':
        calories += 500;
        break;
      case 'muscle_building':
        calories += 300;
        break;
    }
  } catch {
    // fallback if goal is weird
  }

  return Math.round(calories);
}

export function calculateDailyProtein(weight: number, goal: string): number {
  let proteinPerKg = 1.2;

  if (!goal) return Math.round(weight * proteinPerKg);

  try {
    switch (goal.toLowerCase()) {
      case 'weight_loss':
        proteinPerKg = 1.6;
        break;
      case 'weight_gain':
        proteinPerKg = 1.4;
        break;
      case 'muscle_building':
        proteinPerKg = 2.0;
        break;
      case 'maintain_health':
        proteinPerKg = 1.2;
        break;
    }
  } catch {
    // fallback
  }

  return Math.round(weight * proteinPerKg);
}

export function calculateHealthMetrics(profile: UserProfile): HealthMetrics {
  const bmi = calculateBMI(profile.weight, profile.height);
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  const dailyCalories = calculateDailyCalories(bmr, profile.activityLevel, profile.goal);
  const dailyProtein = calculateDailyProtein(profile.weight, profile.goal);

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    bmr: Math.round(bmr),
    dailyCalories,
    dailyProtein,
  };
}
