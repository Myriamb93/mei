package com.dima.jelearning.repository;
import com.dima.jelearning.domain.Chapitre;
import com.dima.jelearning.domain.Question;
import com.dima.jelearning.domain.Quiz;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.dima.jelearning.repository.QuestionRepository;
import com.dima.jelearning.repository.ChapitreRepository;
import java.util.List;

/**
 * Created by Dima on 10/04/2017.
 */

public interface QuizCompRepository extends JpaRepository<Question, Long>{

    @Query ( value = "select * from  question q where q.chapitre_id=:id order by rand() limit 10", nativeQuery = true)
    Question[] findQuestionsByChapitre(@Param("id") Long id);


}
