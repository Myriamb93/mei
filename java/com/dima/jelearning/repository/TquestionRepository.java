package com.dima.jelearning.repository;

import com.dima.jelearning.domain.Tquestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Tquestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TquestionRepository extends JpaRepository<Tquestion,Long> {

    @Query( value = "select * from  tquestion q where q.question_quiz_id=:id order by rand() limit :nbre", nativeQuery = true)
    List<Tquestion> generateQuestion(@Param("id") Long id, @Param("nbre") int nbre);
}
