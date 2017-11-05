package com.dima.jelearning.service;

import com.dima.jelearning.domain.Tquiz;
import com.dima.jelearning.repository.TquizRepository;
import com.dima.jelearning.service.dto.TquizDTO;
import com.dima.jelearning.service.mapper.TquizMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Tquiz.
 */
@Service
@Transactional
public class TquizService {

    private final Logger log = LoggerFactory.getLogger(TquizService.class);

    private final TquizRepository tquizRepository;

    private final TquizMapper tquizMapper;

    public TquizService(TquizRepository tquizRepository, TquizMapper tquizMapper) {
        this.tquizRepository = tquizRepository;
        this.tquizMapper = tquizMapper;
    }

    /**
     * Save a tquiz.
     *
     * @param tquizDTO the entity to save
     * @return the persisted entity
     */
    public TquizDTO save(TquizDTO tquizDTO) {
        log.debug("Request to save Tquiz : {}", tquizDTO);
        Tquiz tquiz = tquizMapper.toEntity(tquizDTO);
        tquiz = tquizRepository.save(tquiz);
        return tquizMapper.toDto(tquiz);
    }

    /**
     *  Get all the tquizs.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TquizDTO> findAll() {
        log.debug("Request to get all Tquizs");
        return tquizRepository.findAll().stream()
            .map(tquizMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one tquiz by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TquizDTO findOne(Long id) {
        log.debug("Request to get Tquiz : {}", id);
        Tquiz tquiz = tquizRepository.findOne(id);
        return tquizMapper.toDto(tquiz);
    }

    /**
     *  Delete the  tquiz by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Tquiz : {}", id);
        tquizRepository.delete(id);
    }
}
