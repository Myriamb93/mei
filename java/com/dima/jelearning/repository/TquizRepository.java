package com.dima.jelearning.repository;

import com.dima.jelearning.domain.Tquiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the Tquiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TquizRepository extends JpaRepository<Tquiz,Long> {

}
