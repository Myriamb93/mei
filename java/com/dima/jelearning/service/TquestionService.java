package com.dima.jelearning.service;

import com.dima.jelearning.domain.Tquestion;
import com.dima.jelearning.repository.TquestionRepository;
import com.dima.jelearning.service.dto.TquestionDTO;
import com.dima.jelearning.service.dto.TquestDTO;
import com.dima.jelearning.service.mapper.TquestionMapper;
import com.dima.jelearning.service.mapper.TquestMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Tquestion.
 */
@Service
@Transactional
public class TquestionService {

    private final Logger log = LoggerFactory.getLogger(TquestionService.class);

    private final TquestionRepository tquestionRepository;

    private final TquestionMapper tquestionMapper;

    private final TquestMapper tquestMapper;

    public TquestionService(TquestionRepository tquestionRepository, TquestionMapper tquestionMapper, TquestMapper tquestMapper) {
        this.tquestionRepository = tquestionRepository;
        this.tquestionMapper = tquestionMapper;
        this.tquestMapper = tquestMapper;
    }
    /**
     *  Get the tquestions randomly limited by nbre in Tquiz.
     *
     *  @return the list of entities generated
     */
    @Transactional(readOnly = true)
    public List<TquestDTO> generateQuestion(Long id, int nbre) {
        log.debug("Request to get all Tquestions");
        return tquestionRepository.generateQuestion(id,nbre).stream()
            .map(tquestMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
    /**
     * Save a tquestion.
     *
     * @param tquestionDTO the entity to save
     * @return the persisted entity
     */
    public TquestionDTO save(TquestionDTO tquestionDTO) {
        log.debug("Request to save Tquestion : {}", tquestionDTO);
        Tquestion tquestion = tquestionMapper.toEntity(tquestionDTO);
        tquestion = tquestionRepository.save(tquestion);
        return tquestionMapper.toDto(tquestion);
    }

    /**
     *  Get all the tquestions.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TquestionDTO> findAll() {
        log.debug("Request to get all Tquestions");
        return tquestionRepository.findAll().stream()
            .map(tquestionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one tquestion by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TquestionDTO findOne(Long id) {
        log.debug("Request to get Tquestion : {}", id);
        Tquestion tquestion = tquestionRepository.findOne(id);
        return tquestionMapper.toDto(tquestion);
    }

    /**
     *  Delete the  tquestion by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Tquestion : {}", id);
        tquestionRepository.delete(id);
    }
}
