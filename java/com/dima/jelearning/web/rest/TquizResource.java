package com.dima.jelearning.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dima.jelearning.service.TquizService;
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
 * REST controller for managing Tquiz.
 */
@RestController
@RequestMapping("/api")
public class TquizResource {

    private final Logger log = LoggerFactory.getLogger(TquizResource.class);

    private static final String ENTITY_NAME = "tquiz";

    private final TquizService tquizService;

    public TquizResource(TquizService tquizService) {
        this.tquizService = tquizService;
    }

    /**
     * POST  /tquizs : Create a new tquiz.
     *
     * @param tquizDTO the tquizDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tquizDTO, or with status 400 (Bad Request) if the tquiz has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tquizs")
    @Timed
    public ResponseEntity<TquizDTO> createTquiz(@RequestBody TquizDTO tquizDTO) throws URISyntaxException {
        log.debug("REST request to save Tquiz : {}", tquizDTO);
        if (tquizDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tquiz cannot already have an ID")).body(null);
        }
        TquizDTO result = tquizService.save(tquizDTO);
        return ResponseEntity.created(new URI("/api/tquizs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tquizs : Updates an existing tquiz.
     *
     * @param tquizDTO the tquizDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tquizDTO,
     * or with status 400 (Bad Request) if the tquizDTO is not valid,
     * or with status 500 (Internal Server Error) if the tquizDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tquizs")
    @Timed
    public ResponseEntity<TquizDTO> updateTquiz(@RequestBody TquizDTO tquizDTO) throws URISyntaxException {
        log.debug("REST request to update Tquiz : {}", tquizDTO);
        if (tquizDTO.getId() == null) {
            return createTquiz(tquizDTO);
        }
        TquizDTO result = tquizService.save(tquizDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tquizDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tquizs : get all the tquizs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tquizs in body
     */
    @GetMapping("/tquizs")
    @Timed
    public List<TquizDTO> getAllTquizs() {
        log.debug("REST request to get all Tquizs");
        return tquizService.findAll();
    }

    /**
     * GET  /tquizs/:id : get the "id" tquiz.
     *
     * @param id the id of the tquizDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tquizDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tquizs/{id}")
    @Timed
    public ResponseEntity<TquizDTO> getTquiz(@PathVariable Long id) {
        log.debug("REST request to get Tquiz : {}", id);
        TquizDTO tquizDTO = tquizService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tquizDTO));
    }

    /**
     * DELETE  /tquizs/:id : delete the "id" tquiz.
     *
     * @param id the id of the tquizDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tquizs/{id}")
    @Timed
    public ResponseEntity<Void> deleteTquiz(@PathVariable Long id) {
        log.debug("REST request to delete Tquiz : {}", id);
        tquizService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
