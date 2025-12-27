export interface FoodNutrition {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  description: string;
}

export const foodDatabase: FoodNutrition[] = [
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, description: 'Lean protein source' },
  { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fats: 1.8, fiber: 3.5, description: 'Complex carbohydrate' },
  { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fats: 0.4, fiber: 3.1, description: 'Natural energy booster' },
  { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fats: 11, fiber: 0, description: 'Complete protein' },
  { name: 'Oatmeal', calories: 158, protein: 6, carbs: 28, fats: 3, fiber: 4, description: 'Heart-healthy whole grain' },
  { name: 'Salmon', calories: 206, protein: 22, carbs: 0, fats: 13, fiber: 0, description: 'Rich in omega-3 fatty acids' },
  { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fats: 0.7, fiber: 0, description: 'High protein dairy' },
  { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fats: 14, fiber: 3.5, description: 'Healthy fats and protein' },
  { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fats: 0.6, fiber: 5, description: 'Nutrient-dense vegetable' },
  { name: 'Sweet Potato', calories: 180, protein: 4, carbs: 41, fats: 0.3, fiber: 6.6, description: 'Complex carbs with vitamins' },
  { name: 'Lentils', calories: 230, protein: 18, carbs: 40, fats: 0.8, fiber: 16, description: 'Plant-based protein' },
  { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fats: 0.3, fiber: 4.4, description: 'Natural sweetness' },
  { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fats: 3.6, fiber: 5, description: 'Complete protein grain' },
  { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, fiber: 2.2, description: 'Iron-rich leafy green' },
  { name: 'Tuna', calories: 132, protein: 28, carbs: 0, fats: 1.3, fiber: 0, description: 'Very lean protein source' },
  { name: 'Peanut Butter', calories: 188, protein: 8, carbs: 7, fats: 16, fiber: 2, description: 'Protein and healthy fats' },
];

export const chatResponses: Record<string, string> = {
  'rice': 'Rice is not bad for weight loss! Brown rice is a complex carbohydrate that provides sustained energy. The key is portion control.',
  'protein': 'Great vegetarian protein sources include: Lentils, Greek yogurt, Quinoa, Tofu, and Chickpeas. Mix these throughout your day!',
  'skip': 'Skipping meals can harm your weight loss efforts! It slows metabolism and causes energy crashes.',
  'water': 'Drinking water is crucial! Aim for 8-10 glasses daily. It boosts metabolism and helps burn calories.',
  'carbs': 'Carbohydrates are not the enemy! Choose complex carbs like whole grains and vegetables for sustained energy.',
  'muscle': 'Building muscle requires: 1) Strength training 3-4 times weekly, 2) Adequate protein (1.6-2.0g per kg), 3) Calorie surplus.',
  'breakfast': 'Breakfast kickstarts metabolism! Good options: Oatmeal with fruits, Eggs with toast, Greek yogurt, or protein smoothies.',
  'default': 'That is a great nutrition question! Focus on whole foods, balance your meals, stay hydrated, and listen to your body!',
};

export interface FoodFact {
  title: string;
  content: string;
  isMythBuster: boolean;
}

export const foodFacts: FoodFact[] = [
  { title: 'Myth: Eating late causes weight gain', content: 'Truth: Total daily calories matter more than timing. Focus on overall intake.', isMythBuster: true },
  { title: 'Protein keeps you full longer', content: 'Protein takes longer to digest, keeping you satisfied and naturally reducing calorie intake.', isMythBuster: false },
  { title: 'Myth: Fat-free products are healthier', content: 'Truth: Fat-free products often contain added sugars. Natural fats are essential.', isMythBuster: true },
  { title: 'Fiber is your friend', content: 'Fiber slows digestion, stabilizes blood sugar, and keeps you full. Aim for 25-30g daily.', isMythBuster: false },
  { title: 'Sleep affects your weight', content: 'Poor sleep disrupts hunger hormones and increases cravings. Aim for 7-9 hours nightly.', isMythBuster: false },
];

export function searchFood(query: string): FoodNutrition[] {
  const searchTerm = query.toLowerCase().trim();
  return foodDatabase.filter(food => food.name.toLowerCase().includes(searchTerm));
}

export function getChatResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();
  for (const [key, response] of Object.entries(chatResponses)) {
    if (lowerQuestion.includes(key)) return response;
  }
  return chatResponses.default;
}

export interface Meal {
  name: string;
  foods: string[];
  calories: number;
  protein: number;
  reason: string;
}

export interface DailyPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
}

export interface DietPlanResult extends DailyPlan {
  totalCalories: number;
  totalProtein: number;
  dietType: string;
  note: string;
}

export function generateDietPlan(profile: { goal: string; dailyCalories: number; dailyProtein: number }): DietPlanResult {
  const isVegetarian = Math.random() > 0.5;

  const plans: Record<string, DailyPlan> = {
    weight_loss: {
      breakfast: { name: 'Greek Yogurt Bowl', foods: ['Greek yogurt (200g)', 'Berries (100g)', 'Almonds (15g)'], calories: 350, protein: 25, reason: 'High protein breakfast keeps you full' },
      lunch: { name: 'Quinoa Buddha Bowl', foods: ['Quinoa (150g)', 'Chickpeas (100g)', 'Vegetables (200g)'], calories: 450, protein: 35, reason: 'Nutrient-dense, filling meal' },
      dinner: { name: 'Salmon with Broccoli', foods: ['Salmon (150g)', 'Broccoli (200g)', 'Sweet potato (150g)'], calories: 400, protein: 30, reason: 'Light yet satisfying' },
      snacks: { name: 'Healthy Options', foods: ['Apple with peanut butter', 'Carrot sticks', 'Almonds'], calories: 250, protein: 10, reason: 'Smart snacking' },
    },
    weight_gain: {
      breakfast: { name: 'Protein Oatmeal', foods: ['Oatmeal (100g)', 'Banana (1)', 'Peanut butter (2 tbsp)', 'Protein powder'], calories: 550, protein: 30, reason: 'Calorie-dense breakfast' },
      lunch: { name: 'Chicken Rice Bowl', foods: ['Chicken (200g)', 'Brown rice (200g)', 'Vegetables (150g)'], calories: 650, protein: 40, reason: 'Higher calorie meal' },
      dinner: { name: 'Steak with Potatoes', foods: ['Beef (200g)', 'Baked potato (300g)', 'Greens (150g)'], calories: 700, protein: 45, reason: 'Substantial dinner' },
      snacks: { name: 'High-Calorie Snacks', foods: ['Protein shake', 'Trail mix (100g)', 'Peanut butter sandwich'], calories: 600, protein: 35, reason: 'Reach calorie surplus' },
    },
    muscle_building: {
      breakfast: { name: 'Protein Pancakes', foods: ['Protein pancakes (3)', 'Greek yogurt (150g)', 'Berries (100g)'], calories: 500, protein: 40, reason: 'High protein for muscle repair' },
      lunch: { name: 'Lean Meat Lunch', foods: ['Chicken (200g)', 'Brown rice (150g)', 'Broccoli (150g)'], calories: 550, protein: 50, reason: 'Balanced for muscle synthesis' },
      dinner: { name: 'Salmon Dinner', foods: ['Salmon (200g)', 'Sweet potato (200g)', 'Asparagus (150g)'], calories: 600, protein: 45, reason: 'Recovery meal' },
      snacks: { name: 'Muscle-Building Snacks', foods: ['Protein shake', 'Cottage cheese', 'Tuna'], calories: 450, protein: 40, reason: 'Hit protein targets' },
    },
    maintain_health: {
      breakfast: { name: 'Balanced Breakfast', foods: ['Oatmeal (80g)', 'Greek yogurt (100g)', 'Berries (100g)', 'Almonds (20g)'], calories: 400, protein: 20, reason: 'Balanced nutrients' },
      lunch: { name: 'Mediterranean Bowl', foods: ['Falafel (4 pieces)', 'Hummus (50g)', 'Pita (1)', 'Salad (200g)'], calories: 500, protein: 30, reason: 'Well-rounded meal' },
      dinner: { name: 'Fish Dinner', foods: ['White fish (150g)', 'Vegetables (200g)', 'Brown rice (100g)'], calories: 450, protein: 28, reason: 'Easy to digest' },
      snacks: { name: 'Healthy Snacks', foods: ['Fresh fruit', 'Nuts', 'Vegetable sticks'], calories: 250, protein: 8, reason: 'Maintain energy' },
    },
  };

  const plan = plans[profile.goal] || plans.maintain_health;
  return {
    ...plan,
    totalCalories: plan.breakfast.calories + plan.lunch.calories + plan.dinner.calories + plan.snacks.calories,
    totalProtein: plan.breakfast.protein + plan.lunch.protein + plan.dinner.protein + plan.snacks.protein,
    dietType: isVegetarian ? 'Vegetarian' : 'Non-Vegetarian',
    note: 'Adjust portions based on your needs and preferences.',
  };
}
