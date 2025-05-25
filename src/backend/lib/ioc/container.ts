import { ExerciseRepository } from '@/backend/modules/exercise/exercise.repository';
import { ExerciseService } from '@/backend/modules/exercise/exercise.service';
import { ExerciseController } from '@/backend/modules/exercise/exercise.controller';

const exerciseRepository = new ExerciseRepository();
const exerciseService = new ExerciseService(exerciseRepository);
const exerciseController = new ExerciseController(exerciseService);

import { WorkoutExerciseRepository } from '@/backend/modules/workoutExercise/workoutExercise.repository';
import { WorkoutExerciseService } from '@/backend/modules/workoutExercise/workoutExercise.service';
import { WorkoutExerciseController } from '@/backend/modules/workoutExercise/workoutExercise.controller';

const workoutExerciseRepository = new WorkoutExerciseRepository();
const workoutExerciseService = new WorkoutExerciseService(workoutExerciseRepository);
const workoutExerciseController = new WorkoutExerciseController(workoutExerciseService);


import { WorkoutDayRepository } from '@/backend/modules/workoutDay/workoutDay.repository';
import { WorkoutDayService } from '@/backend/modules/workoutDay/workoutDay.service';
import { WorkoutDayController } from '@/backend/modules/workoutDay/workoutDay.controller';

const workoutDayRepository = new WorkoutDayRepository();
const workoutDayService = new WorkoutDayService(workoutDayRepository);
const workoutDayController = new WorkoutDayController(workoutDayService);

export const container = {
    exerciseController,
    workoutExerciseController,
    workoutDayController,
};
