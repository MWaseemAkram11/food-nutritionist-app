// Mock diet and workout data

export interface Meal {
  id: string
  name: string
  type: "breakfast" | "lunch" | "dinner" | "snack"
  calories: number
  protein: number
  carbs: number
  fats: number
  ingredients: string[]
  reason: string
}

export interface DietPlan {
  id: string
  name: string
  description: string
  dailyCalories: number
  meals: Meal[]
}

export interface Exercise {
  id: string
  name: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  sets: number
  reps: number
  rest: number
  description: string
  caloriesBurned: number
}

export interface WorkoutPlan {
  id: string
  name: string
  difficulty: string
  type: "home" | "gym"
  duration: number
  exercises: Exercise[]
}

export interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  fiber: number
  serving: string
  category: string
}

export const MOCK_DIET_PLANS: DietPlan[] = [
  {
    id: "1",
    name: "Balanced Weight Loss Plan",
    description: "A comprehensive plan for healthy weight loss with balanced macronutrients",
    dailyCalories: 2000,
    meals: [
      {
        id: "m1",
        name: "Oatmeal with Berries",
        type: "breakfast",
        calories: 350,
        protein: 10,
        carbs: 55,
        fats: 8,
        ingredients: ["Oats", "Blueberries", "Honey", "Milk"],
        reason: "High in fiber for sustained energy and satiety",
      },
      {
        id: "m2",
        name: "Grilled Chicken Salad",
        type: "lunch",
        calories: 450,
        protein: 35,
        carbs: 30,
        fats: 12,
        ingredients: ["Chicken Breast", "Mixed Greens", "Cherry Tomatoes", "Olive Oil"],
        reason: "Lean protein with vegetables for nutritional balance",
      },
      {
        id: "m3",
        name: "Baked Salmon with Vegetables",
        type: "dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 20,
        ingredients: ["Salmon", "Broccoli", "Sweet Potato", "Olive Oil"],
        reason: "Omega-3 rich fish with complex carbs",
      },
      {
        id: "m4",
        name: "Greek Yogurt with Nuts",
        type: "snack",
        calories: 200,
        protein: 15,
        carbs: 20,
        fats: 8,
        ingredients: ["Greek Yogurt", "Almonds", "Honey"],
        reason: "Protein-rich snack for muscle maintenance",
      },
    ],
  },
  {
    id: "2",
    name: "Muscle Building Plan",
    description: "High protein plan for muscle growth and strength",
    dailyCalories: 2500,
    meals: [
      {
        id: "m5",
        name: "Protein Pancakes",
        type: "breakfast",
        calories: 400,
        protein: 30,
        carbs: 45,
        fats: 12,
        ingredients: ["Eggs", "Oats", "Protein Powder", "Banana"],
        reason: "High protein breakfast for muscle recovery",
      },
    ],
  },
]

export const MOCK_WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: "1",
    name: "Home Workout - Beginner",
    difficulty: "Beginner",
    type: "home",
    duration: 30,
    exercises: [
      {
        id: "e1",
        name: "Push-ups",
        category: "Chest",
        difficulty: "beginner",
        duration: 5,
        sets: 3,
        reps: 10,
        rest: 60,
        description: "Standard push-ups to build upper body strength",
        caloriesBurned: 50,
      },
      {
        id: "e2",
        name: "Squats",
        category: "Legs",
        difficulty: "beginner",
        duration: 5,
        sets: 3,
        reps: 15,
        rest: 60,
        description: "Bodyweight squats for leg strength",
        caloriesBurned: 60,
      },
      {
        id: "e3",
        name: "Plank",
        category: "Core",
        difficulty: "beginner",
        duration: 5,
        sets: 3,
        reps: 1,
        rest: 45,
        description: "Core strengthening exercise",
        caloriesBurned: 30,
      },
    ],
  },
  {
    id: "2",
    name: "Gym Workout - Intermediate",
    difficulty: "Intermediate",
    type: "gym",
    duration: 45,
    exercises: [
      {
        id: "e4",
        name: "Bench Press",
        category: "Chest",
        difficulty: "intermediate",
        duration: 8,
        sets: 4,
        reps: 8,
        rest: 90,
        description: "Barbell bench press for chest development",
        caloriesBurned: 80,
      },
      {
        id: "e5",
        name: "Deadlifts",
        category: "Back",
        difficulty: "intermediate",
        duration: 8,
        sets: 3,
        reps: 6,
        rest: 120,
        description: "Compound lift for full body strength",
        caloriesBurned: 120,
      },
    ],
  },
]

export const MOCK_FOOD_DATABASE: FoodItem[] = [
  {
    id: "1",
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    fiber: 0,
    serving: "100g",
    category: "Protein",
  },
  {
    id: "2",
    name: "Brown Rice",
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fats: 0.9,
    fiber: 1.8,
    serving: "100g",
    category: "Carbs",
  },
  {
    id: "3",
    name: "Broccoli",
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fats: 0.4,
    fiber: 2.4,
    serving: "100g",
    category: "Vegetables",
  },
  {
    id: "4",
    name: "Olive Oil",
    calories: 884,
    protein: 0,
    carbs: 0,
    fats: 100,
    fiber: 0,
    serving: "100ml",
    category: "Oils",
  },
  {
    id: "5",
    name: "Salmon",
    calories: 208,
    protein: 20,
    carbs: 0,
    fats: 13,
    fiber: 0,
    serving: "100g",
    category: "Protein",
  },
  {
    id: "6",
    name: "Sweet Potato",
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fats: 0.1,
    fiber: 3,
    serving: "100g",
    category: "Carbs",
  },
  {
    id: "7",
    name: "Almonds",
    calories: 579,
    protein: 21,
    carbs: 22,
    fats: 50,
    fiber: 12.5,
    serving: "100g",
    category: "Nuts",
  },
  {
    id: "8",
    name: "Egg",
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fats: 11,
    fiber: 0,
    serving: "1 large",
    category: "Protein",
  },
  {
    id: "9",
    name: "Greek Yogurt",
    calories: 59,
    protein: 10,
    carbs: 3.3,
    fats: 0.4,
    fiber: 0,
    serving: "100g",
    category: "Dairy",
  },
  {
    id: "10",
    name: "Banana",
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fats: 0.3,
    fiber: 2.6,
    serving: "1 medium",
    category: "Fruits",
  },
]
