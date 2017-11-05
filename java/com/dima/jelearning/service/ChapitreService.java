package com.dima.jelearning.service;

import com.dima.jelearning.domain.Chapitre;
import com.dima.jelearning.domain.User;
import com.dima.jelearning.repository.ChapitreRepository;
import com.dima.jelearning.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Chapitre.
 */
@Service
@Transactional
public class ChapitreService {

    private final Logger log = LoggerFactory.getLogger(ChapitreService.class);

    private final ChapitreRepository chapitreRepository;

    private final UserRepository userRepository;

    public ChapitreService(ChapitreRepository chapitreRepository, UserRepository userRepository) {
        this.chapitreRepository = chapitreRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a chapitre.
     *
     * @param chapitre the entity to save
     * @return the persisted entity
     */
    public Chapitre save(Chapitre chapitre) {
        log.debug("Request to save Chapitre : {}", chapitre);
        Chapitre result = chapitreRepository.save(chapitre);
        return result;
    }

    /**
     *  Get all the chapitres.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Chapitre> findAll(Pageable pageable) {
        log.debug("Request to get all Chapitres");
        Page<Chapitre> result = chapitreRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one chapitre by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Chapitre findOne(Long id) {
        log.debug("Request to get Chapitre : {}", id);
        Chapitre chapitre = chapitreRepository.findOne(id);
        return chapitre;
    }
    @Transactional(readOnly = true)
    public User getCurrentUser(String Login) {

        User user = userRepository.getUserByLogin(Login);
        return user;
    }

    /**
     *  Delete the  chapitre by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Chapitre : {}", id);
        chapitreRepository.delete(id);
    }
}
