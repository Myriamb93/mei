package com.dima.jelearning.repository;

import com.dima.jelearning.domain.Quiz;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Quiz entity.
 */
@SuppressWarnings("unused")
public interface QuizRepository extends JpaRepository<Quiz,Long> {

    @Query("select quiz from Quiz quiz where quiz.quizUser.login = ?#{principal.username}")
    List<Quiz> findByQuizUserIsCurrentUser();

    @Query("select count(quiz)  from Quiz quiz where  quiz.quizUser.login = ?#{principal.username} and quiz.chapitre.id=:id ")
    int quizTrouver(@Param("id") int id);




}
