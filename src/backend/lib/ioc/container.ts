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

export const container = {
    exerciseController: registerModule(ExerciseRepository, ExerciseService, ExerciseController),
    workoutExerciseController: registerModule(WorkoutExerciseRepository, WorkoutExerciseService, WorkoutExerciseController),
    workoutDayController: registerModule(WorkoutDayRepository, WorkoutDayService, WorkoutDayController),
    workoutProgramController: registerModule(WorkoutProgramRepository, WorkoutProgramService, WorkoutProgramController),
    foodController: registerModule(FoodRepository, FoodService, FoodController),
    mealItemController: registerModule(MealItemRepository, MealItemService, MealItemController)
};