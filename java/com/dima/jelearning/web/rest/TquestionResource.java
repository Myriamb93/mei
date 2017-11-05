package com.dima.jelearning.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dima.jelearning.service.TquestionService;
import com.dima.jelearning.service.TquizService;
import com.dima.jelearning.service.dto.TquestionDTO;
import com.dima.jelearning.service.dto.TquestDTO;
import com.dima.jelearning.service.dto.TquizDTO;

import com.dima.jelearning.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tquestion.
 */
@RestController
@RequestMapping("/api")
public class TquestionResource {

    private final Logger log = LoggerFactory.getLogger(TquestionResource.class);

    private static final String ENTITY_NAME = "tquestion";

    private final TquestionService tquestionService;

    private final TquizService tquizService;


    public TquestionResource(TquestionService tquestionService, TquizService tquizService) {
        this.tquestionService = tquestionService;
        this.tquizService = tquizService;
    }

    /**
     * POST  /tquestions : Create a new tquestion.
     *
     * @param tquestionDTO the tquestionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tquestionDTO, or with status 400 (Bad Request) if the tquestion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tquestions")
    @Timed
    public ResponseEntity<TquestionDTO> createTquestion(@RequestBody TquestionDTO tquestionDTO) throws URISyntaxException {
        log.debug("REST request to save Tquestion : {}", tquestionDTO);
        if (tquestionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tquestion cannot already have an ID")).body(null);
        }
        TquestionDTO result = tquestionService.save(tquestionDTO);
        return ResponseEntity.created(new URI("/api/tquestions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tquestions : Updates an existing tquestion.
     *
     * @param tquestionDTO the tquestionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tquestionDTO,
     * or with status 400 (Bad Request) if the tquestionDTO is not valid,
     * or with status 500 (Internal Server Error) if the tquestionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tquestions")
    @Timed
    public ResponseEntity<TquestionDTO> updateTquestion(@RequestBody TquestionDTO tquestionDTO) throws URISyntaxException {
        log.debug("REST request to update Tquestion : {}", tquestionDTO);
        if (tquestionDTO.getId() == null) {
            return createTquestion(tquestionDTO);
        }
        TquestionDTO result = tquestionService.save(tquestionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tquestionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tquestions : get all the tquestions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tquestions in body
     */
    @GetMapping("/tquestions")
    @Timed
    public List<TquestionDTO> getAllTquestions() {
        log.debug("REST request to get all Tquestions");
        return tquestionService.findAll();
    }
    @GetMapping("/tquestions/qcm/{id}")
    @Timed
    public List<TquestDTO> generateQuestion(@PathVariable Long id) {
        log.debug("REST request to generate randomly nbre of Tquestions");
        TquizDTO tquiz = tquizService.findOne(id);
        return tquestionService.generateQuestion(id, tquiz.getNbre());
    }

    /**
     * GET  /tquestions/:id : get the "id" tquestion.
     *
     * @param id the id of the tquestionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tquestionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tquestions/{id}")
    @Timed
    public ResponseEntity<TquestionDTO> getTquestion(@PathVariable Long id) {
        log.debug("REST request to get Tquestion : {}", id);
        TquestionDTO tquestionDTO = tquestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tquestionDTO));
    }

    /**
     * DELETE  /tquestions/:id : delete the "id" tquestion.
     *
     * @param id the id of the tquestionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tquestions/{id}")
    @Timed
    public ResponseEntity<Void> deleteTquestion(@PathVariable Long id) {
        log.debug("REST request to delete Tquestion : {}", id);
        tquestionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
