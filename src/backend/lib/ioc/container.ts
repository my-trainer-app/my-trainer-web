type Module = {
    repository: any;
    service: any;
    controller: any;
};

function registerModule<T extends Module>(
    Repository: new () => T['repository'],
    Service: new (repository: T['repository']) => T['service'],
    Controller: new (service: T['service']) => T['controller']
): T['controller'] {
    const repository = new Repository();
    const service = new Service(repository);
    return new Controller(service);
}

import { ExerciseRepository } from '@/backend/modules/exercise/exercise.repository';
import { ExerciseService } from '@/backend/modules/exercise/exercise.service';
import { ExerciseController } from '@/backend/modules/exercise/exercise.controller';

import { WorkoutExerciseRepository } from '@/backend/modules/workoutExercise/workoutExercise.repository';
import { WorkoutExerciseService } from '@/backend/modules/workoutExercise/workoutExercise.service';
import { WorkoutExerciseController } from '@/backend/modules/workoutExercise/workoutExercise.controller';

import { WorkoutDayRepository } from '@/backend/modules/workoutDay/workoutDay.repository';
import { WorkoutDayService } from '@/backend/modules/workoutDay/workoutDay.service';
import { WorkoutDayController } from '@/backend/modules/workoutDay/workoutDay.controller';

import { WorkoutProgramRepository } from '@/backend/modules/workoutProgram/workoutProgram.repository';
import { WorkoutProgramService } from '@/backend/modules/workoutProgram/workoutProgram.service';
import { WorkoutProgramController } from '@/backend/modules/workoutProgram/workoutProgram.controller';

import { FoodRepository } from '@/backend/modules/food/food.repository';
import { FoodService } from '@/backend/modules/food/food.service';
import { FoodController } from '@/backend/modules/food/food.controller';

import { MealItemRepository } from '@/backend/modules/mealItem/mealItem.repository';
import { MealItemService } from '@/backend/modules/mealItem/mealItem.service';
import { MealItemController } from '@/backend/modules/mealItem/mealItem.controller';

import { MealRepository } from '@/backend/modules/meal/meal.repository';
import { MealService } from '@/backend/modules/meal/meal.service';
import { MealController } from '@/backend/modules/meal/meal.controller';

import { NutritionProgramRepository } from '@/backend/modules/nutritionProgram/nutritionProgram.repository';
import { NutritionProgramService } from '@/backend/modules/nutritionProgram/nutritionProgram.service';
import { NutritionProgramController } from '@/backend/modules/nutritionProgram/nutritionProgram.controller';


import { UserRepository } from '@/backend/modules/user/user.repository';
import { UserService } from '@/backend/modules/user/user.service';
import { UserController } from '@/backend/modules/user/user.controller';

import { ProfileRepository } from '@/backend/modules/profile/profile.repository';
import { ProfileService } from '@/backend/modules/profile/profile.service';
import { ProfileController } from '@/backend/modules/profile/profile.controller';

export const container = {
    exerciseController: registerModule(ExerciseRepository, ExerciseService, ExerciseController),
    workoutExerciseController: registerModule(WorkoutExerciseRepository, WorkoutExerciseService, WorkoutExerciseController),
    workoutDayController: registerModule(WorkoutDayRepository, WorkoutDayService, WorkoutDayController),
    workoutProgramController: registerModule(WorkoutProgramRepository, WorkoutProgramService, WorkoutProgramController),
    foodController: registerModule(FoodRepository, FoodService, FoodController),
    mealItemController: registerModule(MealItemRepository, MealItemService, MealItemController),
    mealController: registerModule(MealRepository, MealService, MealController),
    nutritionProgramController: registerModule(NutritionProgramRepository, NutritionProgramService, NutritionProgramController),
    userController: registerModule(UserRepository, UserService, UserController),
    profileController: registerModule(ProfileRepository, ProfileService, ProfileController),
};