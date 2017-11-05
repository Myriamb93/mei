package com.dima.jelearning.service;

import com.dima.jelearning.domain.Quiz;
import com.dima.jelearning.repository.QuizRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Quiz.
 */
@Service
@Transactional
public class QuizService {

    private final Logger log = LoggerFactory.getLogger(QuizService.class);
    
    private final QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    /**
     * Save a quiz.
     *
     * @param quiz the entity to save
     * @return the persisted entity
     */
    public Quiz save(Quiz quiz) {
        log.debug("Request to save Quiz : {}", quiz);
        Quiz result = quizRepository.save(quiz);
        return result;
    }

    /**
     *  Get all the quizzes.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Quiz> findAll(Pageable pageable) {
        log.debug("Request to get all Quizzes");
        Page<Quiz> result = quizRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one quiz by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Quiz findOne(Long id) {
        log.debug("Request to get Quiz : {}", id);
        Quiz quiz = quizRepository.findOne(id);
        return quiz;
    }

    /**
     *  Delete the  quiz by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Quiz : {}", id);
        quizRepository.delete(id);
    }
}
