package com.dima.jelearning.service;

import com.dima.jelearning.domain.Tresult;
import com.dima.jelearning.repository.TreponseRepository;
import com.dima.jelearning.repository.TresultRepository;
import com.dima.jelearning.service.dto.TresultDTO;
import com.dima.jelearning.service.mapper.TresultMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Tresult.
 */
@Service
@Transactional
public class TresultService {

    private final Logger log = LoggerFactory.getLogger(TresultService.class);

    private final TresultRepository tresultRepository;

    private final TresultMapper tresultMapper;

    private final TreponseService treponseService;

    public TresultService(TresultRepository tresultRepository, TresultMapper tresultMapper, TreponseService treponseService) {
        this.tresultRepository = tresultRepository;
        this.tresultMapper = tresultMapper;
        this.treponseService = treponseService;
    }

    /**
     * Save a tresult.
     *
     * @param tresultDTO the entity to save
     * @return the persisted entity
     */
    public TresultDTO save(TresultDTO tresultDTO) {
        log.debug("Request to save Tresult : {}", tresultDTO);
        Tresult tresult = tresultMapper.toEntity(tresultDTO);
        tresult = tresultRepository.save(tresult);
        return tresultMapper.toDto(tresult);
    }

    /**
     *  Get all the tresults.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TresultDTO> findAll() {
        log.debug("Request to get all Tresults");
        return tresultRepository.findAll().stream()
            .map(tresultMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one tresult by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TresultDTO findOne(Long id) {
        log.debug("Request to get Tresult : {}", id);
        Tresult tresult = tresultRepository.findOne(id);
        return tresultMapper.toDto(tresult);
    }

    /**
     *  Delete the  tresult by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Tresult : {}", id);
        treponseService.deleteReponses(id);
        tresultRepository.delete(id);
    }
}
