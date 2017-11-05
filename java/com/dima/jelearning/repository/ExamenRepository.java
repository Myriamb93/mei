package com.dima.jelearning.repository;

import com.dima.jelearning.domain.Examen;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Examen entity.
 */
@SuppressWarnings("unused")
public interface ExamenRepository extends JpaRepository<Examen,Long> {

    @Query("select examen from Examen examen where examen.examenUser.login = ?#{principal.username}")
    List<Examen> findByExamenUserIsCurrentUser();

}
