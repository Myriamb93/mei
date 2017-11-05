package com.dima.jelearning.repository;

import com.dima.jelearning.domain.Question;


import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Question entity.
 */

public interface QuestionRepository extends JpaRepository<Question,Long> {


}
