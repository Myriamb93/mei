package com.dima.jelearning.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dima.jelearning.domain.Question;
import com.dima.jelearning.domain.Quiz;
import com.dima.jelearning.repository.QuizRepository;
import com.dima.jelearning.service.QuizService;
import com.dima.jelearning.web.rest.util.HeaderUtil;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dima.jelearning.repository.QuizCompRepository;
import com.dima.jelearning.service.QuizCompService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

/**
 * Created by Dima on 10/04/2017.
 */
@RestController
@RequestMapping("/api")
public class QuizCompResource {

    private final QuizCompRepository quizCompRepository ;
    private final Logger log = LoggerFactory.getLogger(QuizCompResource.class);

    private final QuizCompService quizCompService;
    private final QuizService quizService;
    private final QuizRepository quizRepository;

    public QuizCompResource(QuizCompService quizCompService, QuizCompRepository quizCompRepository, QuizService quizService, QuizRepository quizRepository) {
        this.quizCompService = quizCompService;
        this.quizService = quizService;
        this.quizRepository = quizRepository;
        this.quizCompRepository = quizCompRepository;
    }
    /**
     * Get 10 questions related to the chapter of id "id"
     *
     * */




    @GetMapping("/generateQuiz/{id}")
    @Timed
    public Question[] generateQuiz(@PathVariable Long id) {

        return quizCompRepository.findQuestionsByChapitre(id) ;

    }
}
