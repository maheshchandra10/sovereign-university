import { sql } from '@sovereign-university/database';
import { CourseProgress } from '@sovereign-university/types';

export const completeChapterQuery = (
  uid: string,
  courseId: string,
  part: number,
  chapter: number,
) => {
  return sql<CourseProgress[]>`
    WITH 
    -- Insert into course_completed_chapters and return the affected rows
    inserted AS (
        INSERT INTO users.course_completed_chapters (uid, course_id, part, chapter)
        VALUES (${uid}, ${courseId}, ${part}, ${chapter})
        RETURNING *
    ),

    -- Calculate the count of completed chapters for the user and course (plus one as the newly completed chapter is not yet in the table)
    chapter_count AS (
        SELECT COUNT(*) + 1 as completed_count 
        FROM users.course_completed_chapters
        WHERE
          uid = ${uid}
          AND course_id = ${courseId}
    ),

    -- Calculate the total number of chapters for the course
    total_chapters AS (
        SELECT COUNT(*) as total 
        FROM content.course_chapters_localized 
        WHERE course_id = ${courseId} AND language = 'en'
    )

    -- Update the course_progress table with the new data
    INSERT INTO users.course_progress
    SELECT
      ${uid} as uid,
      ${courseId} as course_id,
      chapter_count.completed_count as completed_chapters_count,
      NOW() as last_updated,
      (chapter_count.completed_count::FLOAT / total_chapters.total) * 100 as progress_percentage
    FROM chapter_count, total_chapters
    ON CONFLICT (uid, course_id) DO UPDATE
    SET
      completed_chapters_count = EXCLUDED.completed_chapters_count,
      last_updated = NOW(),
      progress_percentage = EXCLUDED.progress_percentage
    RETURNING *;
  `;
};
