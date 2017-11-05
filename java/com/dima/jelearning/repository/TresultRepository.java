package com.dima.jelearning.repository;

import com.dima.jelearning.domain.Tresult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Tresult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TresultRepository extends JpaRepository<Tresult,Long> {

    @Query("select tresult from Tresult tresult where tresult.resultUser.login = ?#{principal.username}")
    List<Tresult> findByResultUserIsCurrentUser();

}
