package com.dima.jelearning.service;

import com.dima.jelearning.domain.Treponse;
import com.dima.jelearning.repository.TreponseRepository;
import com.dima.jelearning.service.dto.TreponseDTO;
import com.dima.jelearning.service.mapper.TreponseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Treponse.
 */
@Service
@Transactional
public class TreponseService {

    private final Logger log = LoggerFactory.getLogger(TreponseService.class);

    private final TreponseRepository treponseRepository;

    private final TreponseMapper treponseMapper;

    public TreponseService(TreponseRepository treponseRepository, TreponseMapper treponseMapper) {
        this.treponseRepository = treponseRepository;
        this.treponseMapper = treponseMapper;
    }

    @Transactional(readOnly = true)
    public float calculResult(Long id) {
        return this.treponseRepository.calculResult(id);
    }

    /**
     * Save a treponse.
     *
     * @param treponseDTO the entity to save
     * @return the persisted entity
     */
    public TreponseDTO save(TreponseDTO treponseDTO) {
        log.debug("Request to save Treponse : {}", treponseDTO);
        Treponse treponse = treponseMapper.toEntity(treponseDTO);
        treponse = treponseRepository.save(treponse);
        return treponseMapper.toDto(treponse);
    }

    /**
     *  Get all the treponses.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TreponseDTO> findAll() {
        log.debug("Request to get all Treponses");
        return treponseRepository.findAll().stream()
            .map(treponseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Transactional(readOnly = true)
    public List<Treponse> findAllDetails(Long id) {
        log.debug("Request to get all Treponses");
        return treponseRepository.findAllDetails(id);
    }

    /**
     *  Get one treponse by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TreponseDTO findOne(Long id) {
        log.debug("Request to get Treponse : {}", id);
        Treponse treponse = treponseRepository.findOne(id);
        return treponseMapper.toDto(treponse);
    }

    /**
     *  Delete the  treponse by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Treponse : {}", id);
        treponseRepository.delete(id);
    }

    public void deleteReponses(Long id) {
        log.debug("Request to delete Treponses with id Result");
        treponseRepository.deleteReponses(id);

    }
}
