package com.dima.jelearning.repository;

import com.dima.jelearning.domain.Chapitre;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Chapitre entity.
 */
@SuppressWarnings("unused")
public interface ChapitreRepository extends JpaRepository<Chapitre,Long> {

    @Query("select chapitre from Chapitre chapitre where chapitre.chapitreUser.login = ?#{principal.username}")
    List<Chapitre> findByChapitreUserIsCurrentUser();

}
