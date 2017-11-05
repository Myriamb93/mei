package com.dima.jelearning.service;

import com.dima.jelearning.domain.Cours;
import com.dima.jelearning.repository.CoursRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Cours.
 */
@Service
@Transactional
public class CoursService {

    private final Logger log = LoggerFactory.getLogger(CoursService.class);

    private final CoursRepository coursRepository;

    public CoursService(CoursRepository coursRepository) {
        this.coursRepository = coursRepository;
    }

    /**
     * Save a cours.
     *
     * @param cours the entity to save
     * @return the persisted entity
     */
    public Cours save(Cours cours) {
        log.debug("Request to save Cours : {}", cours);
        Cours result = coursRepository.save(cours);
        return result;
    }

    /**
     *  Get all the cours.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Cours> findAll(Pageable pageable) {
        log.debug("Request to get all Cours");
        Page<Cours> result = coursRepository.findAll(pageable);
        return result;
    }

    @Transactional(readOnly = true)
    public List<Cours> findAllWithoutPageable() {
        log.debug("Request to get all Cours");
        List<Cours> result = coursRepository.findAll();
        return result;
    }

    /**
     *  Get one cours by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Cours findOne(Long id) {
        log.debug("Request to get Cours : {}", id);
        Cours cours = coursRepository.findOne(id);
        return cours;
    }

    /**
     *  Delete the  cours by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Cours : {}", id);
        coursRepository.delete(id);
    }
}
