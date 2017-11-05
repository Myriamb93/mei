package com.dima.jelearning.service;

import com.dima.jelearning.domain.Examen;
import com.dima.jelearning.repository.ExamenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Examen.
 */
@Service
@Transactional
public class ExamenService {

    private final Logger log = LoggerFactory.getLogger(ExamenService.class);
    
    private final ExamenRepository examenRepository;

    public ExamenService(ExamenRepository examenRepository) {
        this.examenRepository = examenRepository;
    }

    /**
     * Save a examen.
     *
     * @param examen the entity to save
     * @return the persisted entity
     */
    public Examen save(Examen examen) {
        log.debug("Request to save Examen : {}", examen);
        Examen result = examenRepository.save(examen);
        return result;
    }

    /**
     *  Get all the examen.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Examen> findAll(Pageable pageable) {
        log.debug("Request to get all Examen");
        Page<Examen> result = examenRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one examen by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Examen findOne(Long id) {
        log.debug("Request to get Examen : {}", id);
        Examen examen = examenRepository.findOne(id);
        return examen;
    }

    /**
     *  Delete the  examen by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Examen : {}", id);
        examenRepository.delete(id);
    }
}
