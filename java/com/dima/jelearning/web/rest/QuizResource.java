package com.dima.jelearning.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dima.jelearning.domain.Quiz;
import com.dima.jelearning.domain.Question;
import com.dima.jelearning.repository.QuizRepository;
import com.dima.jelearning.security.SecurityUtils;
import com.dima.jelearning.service.ChapitreService;
import com.dima.jelearning.service.QuizService;
import com.dima.jelearning.service.QuestionService;
import com.dima.jelearning.web.rest.util.HeaderUtil;
import com.dima.jelearning.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Quiz.
 */
@RestController
@RequestMapping("/api")
public class QuizResource {

    private final Logger log = LoggerFactory.getLogger(QuizResource.class);

    private static final String ENTITY_NAME = "quiz";

    private final QuizService quizService;

    private final QuizRepository quizRepository;

    private final ChapitreService chapitreService;

    public QuizResource(QuizService quizService, ChapitreService chapitreService, QuizRepository quizRepository) {
        this.quizService = quizService;
        this.chapitreService = chapitreService;
        this.quizRepository = quizRepository;
    }

    /**
     * POST  /quizzes : Create a new quiz.
     *
     * @param quiz the quiz to create
     * @return the ResponseEntity with status 201 (Created) and with body the new quiz, or with status 400 (Bad Request) if the quiz has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/quizzes")
    @Timed
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) throws URISyntaxException {
        log.debug("REST request to save Quiz : {}", quiz);
        if (quiz.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new quiz cannot already have an ID")).body(null);
        }
        quiz.setDate(ZonedDateTime.now());
        quiz.setQuizUser(chapitreService.getCurrentUser(SecurityUtils.getCurrentUserLogin()));
        Quiz result = quizService.save(quiz);
        return ResponseEntity.created(new URI("/api/quizzes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }


    /**
     * PUT  /quizzes : Updates an existing quiz.
     *
     * @param quiz the quiz to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated quiz,
     * or with status 400 (Bad Request) if the quiz is not valid,
     * or with status 500 (Internal Server Error) if the quiz couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/quizzes")
    @Timed
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) throws URISyntaxException {
        log.debug("REST request to update Quiz : {}", quiz);
        if (quiz.getId() == null) {
            return createQuiz(quiz);
        }
        quiz.setDate(ZonedDateTime.now());
        quiz.setQuizUser(chapitreService.getCurrentUser(SecurityUtils.getCurrentUserLogin()));
        Quiz result = quizService.save(quiz);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, quiz.getId().toString()))
            .body(result);
    }

    /**
     * GET  /quizzes : get all the quizzes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of quizzes in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/quizzes")
    @Timed
    public ResponseEntity<List<Quiz>> getAllQuizzes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Quizzes");
        Page<Quiz> page = quizService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/quizzes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }



    /**
     * GET  /quizzes/:id : get the "id" quiz.
     *
     * @param id the id of the quiz to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the quiz, or with status 404 (Not Found)
     */
    @GetMapping("/quizzes/{id}")
    @Timed
    public ResponseEntity<Quiz> getQuiz(@PathVariable Long id) {
        log.debug("REST request to get Quiz : {}", id);
        Quiz quiz = quizService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(quiz));
    }

    /**
     * DELETE  /quizzes/:id : delete the "id" quiz.
     *
     * @param id the id of the quiz to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/quizzes/{id}")
    @Timed
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        log.debug("REST request to delete Quiz : {}", id);
        quizService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
