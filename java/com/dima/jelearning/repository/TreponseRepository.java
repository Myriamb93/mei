package com.dima.jelearning.repository;

import com.dima.jelearning.domain.Treponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;


/**
 * Spring Data JPA repository for the Treponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TreponseRepository extends JpaRepository<Treponse,Long> {

    @Query( value = "SELECT ROUND(SUM(somme)/ COUNT(*)*100) AS result FROM (SELECT (NOT (rfirst XOR vfirst) AND NOT (rsecond XOR vsecond) AND NOT (rthird XOR vthird) AND NOT (rfourth XOR vfourth)) AS somme FROM treponse LEFT JOIN tquestion ON treponse.reponse_question_id = tquestion.id where reponse_result_id =:id) Alias", nativeQuery = true)
    Float calculResult(@Param("id") Long id);

    @Query(value = "SELECT * FROM treponse where reponse_result_id =:id", nativeQuery = true )
    List<Treponse> findAllDetails(@Param("id") Long id);

    @Modifying
    @Query("DELETE FROM Treponse r where r.reponseResult.id = ?1")
    void deleteReponses(Long id);
}
